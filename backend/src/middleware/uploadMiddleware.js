// Import Multer to handle image uploads.
const multer = require("multer");

// Store uploaded images temporarily in memory before sending them to Cloudinary.
const storage = multer.memoryStorage();

// Allow only JPEG, PNG, and WebP images.
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed."));
  }
};

// Configure Multer with storage, file validation, and a 5 MB limit.
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Export the upload middleware for use in report routes.
module.exports = upload;