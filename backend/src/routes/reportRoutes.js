
// Import Express to create the report API routes.
const express = require("express");

// Import the authentication middleware to protect report routes.
const authMiddleware = require("../middleware/authMiddleware");

// Import the report controller functions.
const {
  createReport,
  getMyReports,
  getAllReports,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

// Create an Express router for report management.
const router = express.Router();

// Require users to log in before accessing report routes.
router.use(authMiddleware);

// Route for browsing and searching all lost and found reports.
router.get("/", getAllReports);

// Route for creating a new lost-item or found-item report.
router.post("/", createReport);

// Route for retrieving reports belonging to the logged-in student.
router.get("/my-reports", getMyReports);

// Route for updating an existing report owned by the logged-in student.
router.put("/:report_id", updateReport);

// Route for deleting an existing report owned by the logged-in student.
router.delete("/:report_id", deleteReport);


// Export the router for use in the main server.
module.exports = router;
