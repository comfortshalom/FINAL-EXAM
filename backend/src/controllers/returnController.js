
// Import the MySQL database connection pool.
const db = require("../config/db");

// Confirm that a student has collected an approved found item.
const confirmReturn = async (req, res) => {
  // Retrieve the claim ID from the request URL.
  const { claim_id } = req.params;

  // Retrieve optional collection notes from the request body.
  const { notes } = req.body;

  // Validate the claim ID.
  if (!/^\d+$/.test(claim_id)) {
    return res.status(400).json({
      success: false,
      message: "A valid claim ID is required.",
    });
  }

  // Ensure collection notes are text when provided.
  if (notes !== undefined && typeof notes !== "string") {
    return res.status(400).json({
      success: false,
      message: "Collection notes must be text.",
    });
  }

  // Prepare a variable for the database connection.
  let connection;

  try {
    // Obtain a dedicated database connection.
    connection = await db.getConnection();

    // Start a transaction to protect the return process.
    await connection.beginTransaction();

    // Retrieve and lock the claim and its associated report.
    const [claims] = await connection.execute(
      `SELECT
        c.claim_id,
        c.report_id,
        c.status AS claim_status,
        r.status AS report_status,
        r.report_type
      FROM claims c
      INNER JOIN reports r ON c.report_id = r.report_id
      WHERE c.claim_id = ?
      FOR UPDATE`,
      [claim_id]
    );

    // Check whether the claim exists.
    if (claims.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Claim not found.",
      });
    }

    // Store the retrieved claim and report information.
    const claim = claims[0];

    // Only approved claims can proceed to item collection.
    if (claim.claim_status !== "approved") {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Only approved claims can be confirmed as returned.",
      });
    }

    // Ensure the report represents a found item.
    if (claim.report_type !== "found") {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Only found items can be confirmed as returned.",
      });
    }

    // Prevent an item from being returned more than once.
    if (claim.report_status === "returned") {
      await connection.rollback();

      return res.status(409).json({
        success: false,
        message: "This item has already been returned.",
      });
    }

    // Record the completed item collection.
    await connection.execute(
      `INSERT INTO return_records
       (report_id, claim_id, confirmed_by, collection_date, notes)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)`,
      [
        claim.report_id,
        claim.claim_id,
        req.user.user_id,
        notes?.trim() || null,
      ]
    );

    // Update the report to show that the item has been returned.
    await connection.execute(
      `UPDATE reports
       SET status = 'returned'
       WHERE report_id = ?`,
      [claim.report_id]
    );

    // Commit both database changes together.
    await connection.commit();

    // Return a successful confirmation response.
    return res.status(200).json({
      success: true,
      message: "Item collection confirmed successfully.",
      return: {
        claim_id: claim.claim_id,
        report_id: claim.report_id,
        status: "returned",
        confirmed_by: req.user.user_id,
      },
    });

  } catch (error) {
    // Roll back database changes if an error occurs.
    if (connection) {
      await connection.rollback();
    }

    // Log the error for backend troubleshooting.
    console.error("Confirm item return error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to confirm item return.",
    });

  } finally {
    // Release the database connection when finished.
    if (connection) {
      connection.release();
    }
  }
};

// Export the return controller function.
module.exports = {
  confirmReturn,
};
