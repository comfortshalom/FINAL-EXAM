
// Import Express to create the claims API routes.
const express = require("express");

// Import the authentication middleware to protect claim routes.
const authMiddleware = require("../middleware/authMiddleware");

// Import the claim controller functions.
const {
  createClaim,
  getMyClaims,
} = require("../controllers/claimController");

// Create an Express router for claim management.
const router = express.Router();

// Require users to log in before accessing claim routes.
router.use(authMiddleware);

// Route for submitting a claim for a found item.
router.post("/:report_id", createClaim);

// Route for retrieving claims belonging to the logged-in student.
router.get("/my-claims", getMyClaims);

// Export the router for use in the main server.
module.exports = router;
