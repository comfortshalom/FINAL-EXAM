// Import the MySQL database connection pool.
const db = require("../config/db");

// Import Cloudinary to store uploaded report photographs.
const cloudinary = require("../config/cloudinary");

// Upload an image buffer to Cloudinary and return its secure URL.
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    // Create a Cloudinary upload stream for the image.
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uni-find/reports",
        resource_type: "image",
      },
      (error, result) => {
        // Return the uploaded image URL or report the error.
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    // Send the image buffer to Cloudinary.
    uploadStream.end(fileBuffer);
  });
};

// Create a new lost-item or found-item report.
const createReport = async (req, res) => {
  try {
    // Extract the report details submitted by the student.
    const {
      report_type,
      title,
      category,
      description,
      private_details,
      date_lost_found,
      location,
    } = req.body;

    // Store the uploaded photograph URL.
    let photo = null;

    // Upload the photograph to Cloudinary if one was provided.
    if (req.file) {
      photo = await uploadToCloudinary(req.file.buffer);
        }

    // Check that all required report fields have been provided.
    if (
      !report_type ||
      !title ||
      !category ||
      !description ||
      !date_lost_found ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required report details.",
      });
    }

    // Ensure the report type is either lost or found.
    if (!["lost", "found"].includes(report_type)) {
      return res.status(400).json({
        success: false,
        message: "Report type must be either lost or found.",
      });
    }

    // Save the report and associate it with the logged-in student.
    const [result] = await db.query(
      `INSERT INTO reports
       (user_id, report_type, title, category, description,
        private_details, date_lost_found, location, photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.user_id,
        report_type,
        title.trim(),
        category.trim(),
        description.trim(),
        private_details || null,
        date_lost_found,
        location.trim(),
        photo || null,
      ]
    );

    // Return the ID of the newly created report.
    return res.status(201).json({
      success: true,
      message: "Report created successfully.",
      report_id: result.insertId,
    });
  } catch (error) {
    // Log unexpected errors for debugging.
    console.error("Create Report Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the report.",
    });
  }
};

// Retrieve reports created by the logged-in student.
const getMyReports = async (req, res) => {
  try {
    // Retrieve only reports belonging to the authenticated student.
    const [reports] = await db.query(
      `SELECT report_id, report_type, title, category, description,
        private_details, date_lost_found, location, photo,
        status, moderation_status, created_at
       FROM reports
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.user_id]
    );

    // Return the student's reports.
    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    // Log unexpected errors for debugging.
    console.error("Get Reports Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving reports.",
    });
  }
};


// Update an existing report belonging to the logged-in student.
const updateReport = async (req, res) => {
  try {
    // Get the report ID from the URL.
    const { report_id } = req.params;

    // Extract the updated report details.
    // Extract the updated report details.
const {
  report_type,
  title,
  category,
  description,
  private_details,
  date_lost_found,
  location,
} = req.body;



    // Check that all required fields have been provided.
    if (
      !report_type ||
      !title ||
      !category ||
      !description ||
      !date_lost_found ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required report details.",
      });
    }

    // Ensure the report type is either lost or found.
    if (!["lost", "found"].includes(report_type)) {
      return res.status(400).json({
        success: false,
        message: "Report type must be either lost or found.",
      });
    }

    // Retrieve the report details, including its existing photograph.
const [reports] = await db.query(
  "SELECT report_id, status, photo FROM reports WHERE report_id = ? AND user_id = ?",
  [report_id, req.user.user_id]
);

    // Reject the request if the report does not belong to this student.
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Report not found or you are not authorized to update it.",
      });
    }

    // Prevent editing a report that has already been returned.
    if (reports[0].status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Returned reports cannot be edited.",
      });
    }

      // Preserve the existing photograph unless a new one is uploaded.
    let photo = reports[0].photo;

    // Upload the replacement photograph when provided.
    if (req.file) {
      photo = await uploadToCloudinary(req.file.buffer);
    }

    // Update the report without changing its owner or status.
    await db.query(
      `UPDATE reports
       SET report_type = ?, title = ?, category = ?, description = ?,
           private_details = ?, date_lost_found = ?, location = ?, photo = ?
       WHERE report_id = ? AND user_id = ?`,
      [
        report_type,
        title.trim(),
        category.trim(),
        description.trim(),
        private_details || null,
        date_lost_found,
        location.trim(),
        photo || null,
        report_id,
        req.user.user_id,
      ]
    );

    // Confirm that the report was updated successfully.
    return res.status(200).json({
      success: true,
      message: "Report updated successfully.",
    });
  } catch (error) {
    // Log unexpected update errors for debugging.
    console.error("Update Report Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the report.",
    });
  }
};


// Delete an existing report belonging to the logged-in student.
const deleteReport = async (req, res) => {
  try {
    // Get the report ID from the URL.
    const { report_id } = req.params;

       // Retrieve the report details, including its existing photograph.
    const [reports] = await db.query(
      "SELECT report_id, status, photo FROM reports WHERE report_id = ? AND user_id = ?",
      [report_id, req.user.user_id]
    );

    // Reject the request if the report does not belong to this student.
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Report not found or you are not authorized to delete it.",
      });
    }

    // Prevent deletion of a report that has already been returned.
    if (reports[0].status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Returned reports cannot be deleted.",
      });
    }

    // Delete the report belonging to the authenticated student.
    await db.query(
      "DELETE FROM reports WHERE report_id = ? AND user_id = ?",
      [report_id, req.user.user_id]
    );

    // Confirm that the report was deleted successfully.
    return res.status(200).json({
      success: true,
      message: "Report deleted successfully.",
    });
  } catch (error) {
    // Log unexpected deletion errors for debugging.
    console.error("Delete Report Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the report.",
    });
  }
};


// Retrieve lost and found reports for the student browsing page.
const getAllReports = async (req, res) => {
  try {
  // Retrieve optional search and filter values from the URL.
 const { search, category, report_type, status, date } = req.query;

    // Start building the database query.
    let sql = `
      SELECT
        report_id,
        report_type,
        title,
        category,
        description,
        date_lost_found,
        location,
        photo,
        status,
        created_at
       FROM reports
       WHERE moderation_status = 'visible'
    `;

    // Store database values separately to prevent SQL injection.
    const values = [];

    // Search the title, category, description and location.
    if (search && search.trim()) {
      sql += `
        AND (
          title LIKE ?
          OR category LIKE ?
          OR description LIKE ?
          OR location LIKE ?
        )
      `;

      // Add the search term to all four search conditions.
      const searchTerm = `%${search.trim()}%`;

      values.push(
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm
      );
    }

    // Filter reports by category when a category is selected.
    if (category && category.trim()) {
      sql += " AND category = ?";
      values.push(category.trim());
    }



    // Filter reports by the date they were lost or found.
if (date && date.trim()) {
  sql += " AND date_lost_found = ?";
  values.push(date.trim());
}

    // Filter reports by lost or found.
    if (report_type && report_type.trim()) {
      if (!["lost", "found"].includes(report_type)) {
        return res.status(400).json({
          success: false,
          message: "Report type must be lost or found.",
        });
      }

      sql += " AND report_type = ?";
      values.push(report_type);
    }

    // Filter reports by their current status.
    if (status && status.trim()) {
      if (!["open", "returned"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be open or returned.",
        });
      }

      sql += " AND status = ?";
      values.push(status);
    }

    // Display the newest matching reports first.
    sql += " ORDER BY created_at DESC";

    // Execute the search against the database.
    const [reports] = await db.query(sql, values);

    // Return the matching reports.
    return res.status(200).json({
      success: true,
      count: reports.length,
      message:
        reports.length === 0
          ? "No items found."
          : "Reports retrieved successfully.",
      reports,
    });

  } catch (error) {
    // Log unexpected search errors for debugging.
    console.error("Get All Reports Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred while searching reports.",
    });
  }
};


// Export the controller functions for use in the report routes.
module.exports = {
  createReport,
  getMyReports,
  getAllReports,
  updateReport,
  deleteReport,
};