
// Middleware to check whether the logged-in user is the Main Administrator.
const superAdminMiddleware = (req, res, next) => {
  // Check whether the authenticated user's role is super_admin.
  if (req.user.role !== "super_admin") {
    // Reject access when the user is not the Main Administrator.
    return res.status(403).json({
      success: false,
      message: "Access denied. Main Administrator privileges required.",
    });
  }

  // Allow the request to continue when the user is the Main Administrator.
  next();
};

// Export the middleware for protecting Main Administrator routes.
module.exports = superAdminMiddleware;
