
/*
  UNI-FIND MAIN ADMINISTRATOR CONTROLLER

  This file contains functions that allow the Main Administrator
  to create, view and delete ordinary administrator accounts.
*/

// Import bcryptjs to securely hash administrator passwords.
const bcrypt = require("bcryptjs");

// Import the MySQL database connection pool.
const db = require("../config/db");


// =====================================================
// FUNCTION 1: CREATE A NEW ADMINISTRATOR ACCOUNT
// =====================================================

const createAdmin = async (req, res) => {
  // Retrieve the administrator's details from the request body.
  const { full_name, email, password } = req.body;

  // Check that all required fields have been provided.
  if (!full_name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      success: false,
      message: "Full name, email and password are required.",
    });
  }

  // Validate the email address format.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  // Ensure the administrator's password is sufficiently long.
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 8 characters.",
    });
  }

  try {
    // Check whether the email address is already registered.
    const [existingUsers] = await db.execute(
      "SELECT user_id FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    // Prevent duplicate administrator accounts.
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash the password before saving it in the database.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert the new account with the admin role.
    const [result] = await db.execute(
      `INSERT INTO users (full_name, email, student_number, password, role)
       VALUES (?, ?, NULL, ?, 'admin')`,
      [
        full_name.trim(),
        email.trim().toLowerCase(),
        hashedPassword,
      ]
    );

    // Return the newly created administrator's public details.
    return res.status(201).json({
      success: true,
      message: "Administrator account created successfully.",
      administrator: {
        user_id: result.insertId,
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        role: "admin",
      },
    });

  } catch (error) {
    // Log the error for backend troubleshooting.
    console.error("Create administrator error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to create administrator account.",
    });
  }
};


// =====================================================
// FUNCTION 2: VIEW ALL ADMINISTRATOR ACCOUNTS
// =====================================================

const getAllAdmins = async (req, res) => {
  try {
    // Retrieve all ordinary administrator and Main Administrator accounts.
    const [administrators] = await db.execute(
      `SELECT
        user_id,
        full_name,
        email,
        role,
        created_at
      FROM users
      WHERE role IN ('admin', 'super_admin')
      ORDER BY created_at DESC`
    );

    // Return the administrator accounts.
    return res.status(200).json({
      success: true,
      count: administrators.length,
      administrators,
    });

  } catch (error) {
    // Log the error for backend troubleshooting.
    console.error("Get administrators error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve administrator accounts.",
    });
  }
};


// =====================================================
// FUNCTION 3: DELETE AN ADMINISTRATOR ACCOUNT
// =====================================================

const deleteAdmin = async (req, res) => {
  // Retrieve the administrator's user ID from the request URL.
  const { admin_id } = req.params;

  // Check whether a valid administrator ID was provided.
  if (!/^\d+$/.test(admin_id)) {
    return res.status(400).json({
      success: false,
      message: "A valid administrator ID is required.",
    });
  }

  try {
    // Find the requested account and confirm that it is an ordinary admin.
    const [administrators] = await db.execute(
      `SELECT user_id, role
       FROM users
       WHERE user_id = ?
       AND role = 'admin'`,
      [admin_id]
    );

    // Stop if the account does not exist or is not an ordinary administrator.
    if (administrators.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Administrator account not found.",
      });
    }

    // Check whether the administrator has reviewed any claims.
    const [reviewedClaims] = await db.execute(
      "SELECT claim_id FROM claims WHERE reviewed_by = ? LIMIT 1",
      [admin_id]
    );

    // Check whether the administrator has confirmed any item returns.
    const [confirmedReturns] = await db.execute(
      "SELECT return_id FROM return_records WHERE confirmed_by = ? LIMIT 1",
      [admin_id]
    );

    // Preserve administrator records needed for historical accountability.
    if (reviewedClaims.length > 0 || confirmedReturns.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This administrator has existing records and cannot be deleted.",
      });
    }

    // Delete the selected ordinary administrator account.
    const [result] = await db.execute(
      "DELETE FROM users WHERE user_id = ? AND role = 'admin'",
      [admin_id]
    );

    // Confirm that the account was deleted.
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Administrator account could not be deleted.",
      });
    }

    // Return a successful deletion response.
    return res.status(200).json({
      success: true,
      message: "Administrator account deleted successfully.",
    });

  } catch (error) {
    // Log the error for backend troubleshooting.
    console.error("Delete administrator error:", error);

    // Return an error response.
    return res.status(500).json({
      success: false,
      message: "Unable to delete administrator account.",
    });
  }
};


// =====================================================
// EXPORT ALL MAIN ADMINISTRATOR FUNCTIONS
// =====================================================

module.exports = {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
};
