// Import Cloudinary to manage uploaded images.
const cloudinary = require("cloudinary").v2;

// Load Cloudinary credentials from the backend .env file.
require("dotenv").config();

// Configure Cloudinary using environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance.
module.exports = cloudinary;