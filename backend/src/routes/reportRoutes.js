
// Import Express to create the report API routes.
const express = require("express");

// Import the authentication middleware to protect report routes.
const authMiddleware = require("../middleware/authMiddleware");

// Import Multer middleware to receive uploaded photographs.
const upload = require("../middleware/uploadMiddleware");

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
// Route for browsing and searching all visible lost and found reports.
router.get("/", getAllReports);

// Route for creating a new report with an optional photograph.
router.post("/", authMiddleware, upload.single("photo"), createReport);

// Route for retrieving reports belonging to the logged-in student.
router.get("/my-reports", authMiddleware, getMyReports);

// Route for updating an existing report with an optional new photograph.
router.put("/:report_id", authMiddleware, upload.single("photo"), updateReport);

// Route for deleting an existing report owned by the logged-in student.
router.delete("/:report_id", authMiddleware, deleteReport);

// Route for browsing and searching all lost and found reports.
router.get("/", getAllReports);

// Route for creating a new report with an optional photograph.
router.post("/", upload.single("photo"), createReport);

// Route for retrieving reports belonging to the logged-in student.
router.get("/my-reports", getMyReports);

// Route for updating an existing report with an optional new photograph.
router.put("/:report_id", upload.single("photo"), updateReport);

// Route for deleting an existing report owned by the logged-in student.
router.delete("/:report_id", deleteReport);

// Export the router for use in the main server.
module.exports = router;
