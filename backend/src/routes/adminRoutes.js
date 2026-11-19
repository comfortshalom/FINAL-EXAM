
// Import Express to create the Admin API routes.
const express = require("express");

// Import authentication middleware to verify login tokens.
const authMiddleware = require("../middleware/authMiddleware");

// Import Admin middleware to restrict access to administrators.
const adminMiddleware = require("../middleware/adminMiddleware");

// Import the Admin controller functions.
const {
  getAllClaims,
  reviewClaim,
  getAllReports,
  updateReportModeration,
} = require("../controllers/adminController");


// Create an Express router for Admin operations.
const router = express.Router();

// Require users to log in before accessing Admin routes.
router.use(authMiddleware);

// Allow only administrators to access these routes.
router.use(adminMiddleware);

// Retrieve all lost and found reports for Admin management.
router.get("/reports", getAllReports);

// Hide or restore a report from student browsing.
router.put("/reports/:report_id/moderation", updateReportModeration);

// Retrieve all student claims for Admin review.
router.get("/claims", getAllClaims);

// Approve or reject a student's claim.
router.put("/claims/:claim_id", reviewClaim);

// Export the Admin router for use in the main server.
module.exports = router;
