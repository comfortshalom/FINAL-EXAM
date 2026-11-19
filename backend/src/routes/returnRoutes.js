const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const { confirmReturn } = require("../controllers/returnController");

// Create an Express router.
const router = express.Router();

// Require users to log in.
router.use(authMiddleware);

// Allow only Admins and the Main Administrator.
router.use(adminMiddleware);

// Confirm that a student has collected an approved item.
router.post("/:claim_id/confirm", confirmReturn);

// Export the routes.
module.exports = router;