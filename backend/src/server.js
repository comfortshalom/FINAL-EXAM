// Import Express to create and manage the backend server.
const express = require("express");

// Import the authentication routes for student and administrator login.
const authRoutes = require("./routes/authRoutes");

// Import the routes used to manage student lost-and-found reports.
const reportRoutes = require("./routes/reportRoutes");

// Import the routes used to manage student claims.
const claimRoutes = require("./routes/claimRoutes");

// Import the Admin routes.
const adminRoutes = require("./routes/adminRoutes");

const superAdminRoutes = require("./routes/superAdminRoutes");

const returnRoutes = require("./routes/returnRoutes");

// Import CORS to allow the frontend to communicate with the backend.
const cors = require("cors");

// Import dotenv to load environment variables from the .env file.
require("dotenv").config();

// Create an Express application.
const app = express();

// Define the port on which the backend server will run.
const PORT = process.env.PORT || 5001;

// Enable CORS so the frontend can send requests to the backend.
app.use(cors());

// Allow the server to receive and process JSON data.
app.use(express.json());

// Allow the server to process URL-encoded form data.
app.use(express.urlencoded({ extended: true }));

// Make the registration and login endpoints available under /api/auth.
app.use("/api/auth", authRoutes);

// Make student report management endpoints available under /api/reports.
app.use("/api/reports", reportRoutes);

// Make student claim management endpoints available under /api/claims.
app.use("/api/claims", claimRoutes);


// Connect the Admin API routes.
app.use("/api/admin", adminRoutes);

app.use("/api/super-admin", superAdminRoutes);

app.use("/api/returns", returnRoutes);


// Create a basic route to confirm that the backend is running.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to UNI-FIND - UCU Campus Lost and Found Management System",
  });
});

// Create a health-check route to test the backend.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "UNI-FIND backend is running successfully.",
  });
});

// Import the authentication middleware to protect private routes.
const authMiddleware = require("./middleware/authMiddleware");

// Create a protected test route that requires a valid login token.
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have accessed a protected route successfully.",
    user: req.user,
  });
});

// Handle requests made to routes that do not exist.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The requested route was not found.",
  });
});

// Handle unexpected errors in the backend.
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
  });
});

// Start the backend server and listen for incoming requests.
app.listen(PORT, () => {
  console.log(`UNI-FIND backend is running on port ${PORT}`);
});