// Import jsonwebtoken to verify authentication tokens.
const jwt = require("jsonwebtoken");

// Create middleware to protect private backend routes.
const authMiddleware = (req, res, next) => {
  try {
    // Retrieve the authorization header from the request.
    const authHeader = req.headers.authorization;

    // Check whether the authorization header contains a Bearer token.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in.",
      });
    }

    // Extract the token from the authorization header.
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret stored in the environment file.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user's information to the request.
    req.user = {
      user_id: decoded.user_id,
      role: decoded.role,
    };

    // Allow the request to continue to the protected route.
    next();
  } catch (error) {
    // Reject requests containing invalid or expired tokens.
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

// Export the middleware for use in protected routes.
module.exports = authMiddleware;
