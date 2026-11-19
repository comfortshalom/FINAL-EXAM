
// Middleware to check whether the logged-in user is an administrator.
const adminMiddleware = (req, res, next) => {
  // Allow both ordinary administrators and the Main Administrator.
  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    // Reject users who do not have administrator privileges.
    return res.status(403).json({
      success: false,
      message: "Access denied. Administrator privileges required.",
    });
  }

  // Allow authorised administrators to continue.
  next();
};

// Export the middleware for protected Admin routes.
module.exports = adminMiddleware;
