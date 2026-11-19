
// Import the MySQL database connection pool.
const db = require("../config/db");

// Allow a student to submit a claim for a found item.
const createClaim = async (req, res) => {
  try {
    // Extract the report ID from the request URL.
    const { report_id } = req.params;

    // Extract the private identifying evidence from the request body.
    const { claim_evidence } = req.body;

    // Check that the student has provided identifying evidence.
    if (!claim_evidence || !claim_evidence.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide evidence to support your claim.",
      });
    }

    // Find the report that the student wants to claim.
    const [reports] = await db.query(
      `SELECT report_id, user_id, report_type, status
       FROM reports
       WHERE report_id = ?`,
      [report_id]
    );

    // Reject the claim if the report does not exist.
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "The requested report was not found.",
      });
    }

    // Retrieve the found-item report details.
    const report = reports[0];

    // Allow claims only for found-item reports.
    if (report.report_type !== "found") {
      return res.status(400).json({
        success: false,
        message: "You can only claim found items.",
      });
    }

    // Prevent a student from claiming their own found item.
    if (report.user_id === req.user.user_id) {
      return res.status(403).json({
        success: false,
        message: "You cannot claim an item you reported as found.",
      });
    }

    // Prevent claims for items that have already been returned.
    if (report.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "This item has already been returned.",
      });
    }

    // Check whether this student has already claimed this item.
    const [existingClaims] = await db.query(
      `SELECT claim_id
       FROM claims
       WHERE report_id = ? AND claimant_id = ?`,
      [report_id, req.user.user_id]
    );

    // Prevent duplicate claims by the same student.
    if (existingClaims.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a claim for this item.",
      });
    }

    // Save the claim and its private evidence in the database.
    const [result] = await db.query(
      `INSERT INTO claims (report_id, claimant_id, claim_evidence)
       VALUES (?, ?, ?)`,
      [
        report_id,
        req.user.user_id,
        claim_evidence.trim(),
      ]
    );

    // Return confirmation that the claim was submitted.
    return res.status(201).json({
      success: true,
      message: "Claim submitted successfully.",
      claim_id: result.insertId,
    });
  } catch (error) {
    // Log unexpected claim creation errors for debugging.
    console.error("Create Claim Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the claim.",
    });
  }
};

// Retrieve claims submitted by the logged-in student.
const getMyClaims = async (req, res) => {
  try {
    // Retrieve only claims belonging to the authenticated student.
    const [claims] = await db.query(
      `SELECT
         c.claim_id,
         c.report_id,
         c.claim_evidence,
         c.status,
         c.admin_response,
         c.created_at,
         r.title,
         r.category,
         r.location
       FROM claims c
       INNER JOIN reports r ON c.report_id = r.report_id
       WHERE c.claimant_id = ?
       ORDER BY c.created_at DESC`,
      [req.user.user_id]
    );

    // Return the student's claims, including their own private evidence.
    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    // Log unexpected claim retrieval errors for debugging.
    console.error("Get Claims Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving claims.",
    });
  }
};

// Export the claim controller functions for use in the routes.
module.exports = {
  createClaim,
  getMyClaims,
};
