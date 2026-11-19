const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const superAdminMiddleware = require("../middleware/superAdminMiddleware");

const {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
} = require("../controllers/superAdminController");

// Create an Express router.
const router = express.Router();

// Require authentication.
router.use(authMiddleware);

// Allow only the Main Administrator.
router.use(superAdminMiddleware);

// View all administrator accounts.
router.get("/admins", getAllAdmins);

// Create a new administrator account.
router.post("/admins", createAdmin);

// Delete an administrator account.
router.delete("/admins/:admin_id", deleteAdmin);

// Export the router.
module.exports = router;