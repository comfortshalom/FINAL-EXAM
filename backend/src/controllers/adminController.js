
// Import the MySQL database connection pool.
const db = require("../config/db");


// FUNCTION 1: Retrieve all claims submitted by students.
const getAllClaims = async (req, res) => {
  try {
    // Retrieve all claims together with their report and claimant details.
    const [claims] = await db.execute(
      `SELECT
        c.claim_id,
        c.report_id,
        c.claim_evidence,
        c.status,
        c.admin_response,
        c.reviewed_by,
        c.reviewed_at,
        c.created_at,
        r.title,
        r.category,
        r.description,
        r.private_details,
        r.location,
        r.date_lost_found,
        u.full_name AS claimant_name,
        u.email AS claimant_email,
        u.student_number AS claimant_student_number
      FROM claims c
      INNER JOIN reports r ON c.report_id = r.report_id
      INNER JOIN users u ON c.claimant_id = u.user_id
      ORDER BY c.created_at DESC`
    );

    // Return all claims and their associated information.
    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });

  } catch (error) {
    // Log the database error for troubleshooting.
    console.error("Get all claims error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve claims.",
    });
  }
};


// FUNCTION 2: Approve or reject a student's claim.
const reviewClaim = async (req, res) => {
  // Get the claim ID from the request URL.
  const { claim_id } = req.params;

  // Get the administrator's decision and response.
  const { status, admin_response } = req.body;

  // Check whether the submitted decision is valid.
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Decision must be approved or rejected.",
    });
  }

  // Require an explanation when rejecting a claim.
  if (status === "rejected" && !admin_response?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a reason for rejecting the claim.",
    });
  }

  // Obtain a dedicated database connection.
  const connection = await db.getConnection();

  try {
    // Start a transaction to protect the review operation.
    await connection.beginTransaction();

    // Find the report associated with this claim.
    const [claimRows] = await connection.execute(
      "SELECT report_id FROM claims WHERE claim_id = ?",
      [claim_id]
    );

    // Stop if the claim does not exist.
    if (claimRows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Claim not found.",
      });
    }

    // Lock the report to prevent simultaneous approvals
    // of competing claims for the same item.
    const [reportRows] = await connection.execute(
      `SELECT report_id, status
       FROM reports
       WHERE report_id = ?
       FOR UPDATE`,
      [claimRows[0].report_id]
    );

    // Stop if the related report does not exist.
    if (reportRows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Related report not found.",
      });
    }

    // Retrieve and lock the claim being reviewed.
    const [claims] = await connection.execute(
      `SELECT claim_id, report_id, status
       FROM claims
       WHERE claim_id = ?
       FOR UPDATE`,
      [claim_id]
    );

    // Ensure the claim is still awaiting review.
    if (claims[0].status !== "pending") {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "This claim has already been reviewed.",
      });
    }

    // Prevent approval if the item has already been returned.
    if (status === "approved" && reportRows[0].status === "returned") {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Cannot approve a claim for an item that has already been returned.",
      });
    }

    // Check whether another claim for this item has already been approved.
    if (status === "approved") {
      const [approvedClaims] = await connection.execute(
        `SELECT claim_id
         FROM claims
         WHERE report_id = ?
         AND status = 'approved'
         AND claim_id != ?`,
        [claims[0].report_id, claim_id]
      );

      // Prevent multiple approved claims for the same item.
      if (approvedClaims.length > 0) {
        await connection.rollback();

        return res.status(409).json({
          success: false,
          message: "Another claim has already been approved for this item.",
        });
      }
    }

    // Save the administrator's decision and review information.
    await connection.execute(
      `UPDATE claims
       SET status = ?,
           admin_response = ?,
           reviewed_by = ?,
           reviewed_at = CURRENT_TIMESTAMP
       WHERE claim_id = ?`,
      [
        status,
        admin_response?.trim() || null,
        req.user.user_id,
        claim_id,
      ]
    );

    // Commit the completed review.
    await connection.commit();

    // Return a successful response.
    return res.status(200).json({
      success: true,
      message: `Claim ${status} successfully.`,
    });

  } catch (error) {
    // Roll back database changes if the review fails.
    await connection.rollback();

    // Log the error for troubleshooting.
    console.error("Review claim error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to review claim.",
    });

  } finally {
    // Release the database connection for reuse.
    connection.release();
  }
};


/**
 * FUNCTION 3: Retrieve all lost and found reports for Admin management.
 */
const getAllReports = async (req, res) => {
  try {
    // Retrieve all reports together with the names of the students who submitted them.
    const [reports] = await db.execute(
      `SELECT
        r.report_id,
        r.user_id,
        r.report_type,
        r.title,
        r.category,
        r.description,
        r.private_details,
        r.date_lost_found,
        r.location,
        r.photo,
        r.status,
        r.moderation_status,
        r.created_at,
        r.updated_at,
        u.full_name AS reporter_name,
        u.email AS reporter_email,
        u.student_number AS reporter_student_number
      FROM reports r
      INNER JOIN users u ON r.user_id = u.user_id
      ORDER BY r.created_at DESC`
    );

    // Return all reports and their associated reporter information.
    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });

  } catch (error) {
    // Log database errors for troubleshooting.
    console.error("Get all reports error:", error);

    // Return an error response if retrieval fails.
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve reports.",
    });
  }
};

// FUNCTION 4: Allow Admins to hide or restore a report.
const updateReportModeration = async (req, res) => {
  try {
    // Get the report ID from the request URL.
    const { report_id } = req.params;

    // Get the requested moderation status from the request body.
    const { moderation_status } = req.body;

    // Accept only visible or hidden as moderation statuses.
    if (!["visible", "hidden"].includes(moderation_status)) {
      return res.status(400).json({
        success: false,
        message: "Moderation status must be visible or hidden.",
      });
    }

    // Check whether the report exists before updating it.
    const [reports] = await db.execute(
      "SELECT report_id FROM reports WHERE report_id = ?",
      [report_id]
    );

    // Return an error if the report does not exist.
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    // Update the report's moderation status.
    await db.execute(
      "UPDATE reports SET moderation_status = ? WHERE report_id = ?",
      [moderation_status, report_id]
    );

    // Confirm that the moderation update was successful.
    return res.status(200).json({
      success: true,
      message: `Report ${moderation_status} successfully.`,
      report_id,
      moderation_status,
    });
  } catch (error) {
    // Log unexpected errors for backend debugging.
    console.error("Update report moderation error:", error);

    // Return a safe error message to the client.
    return res.status(500).json({
      success: false,
      message: "Unable to update report moderation status.",
    });
  }
};



// Export the Admin controller functions.
module.exports = {
  getAllClaims,
  reviewClaim,
  getAllReports,
  updateReportModeration,
};