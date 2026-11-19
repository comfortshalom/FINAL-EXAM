// Import Express to create the authentication routes.
const express = require("express");

// Import the registration and login functions.
const {
  register,
  login,
} = require("../controllers/authController");

// Create an Express router for authentication.
const router = express.Router();

// Route for registering a new student account.
router.post("/register", register);

// Route for logging into an existing account.
router.post("/login", login);

// Export the router so the main server can use it.
module.exports = router;
