// Import bcryptjs to securely hash passwords and compare login passwords.
const bcrypt = require("bcryptjs");

// Import jsonwebtoken to create authentication tokens.
const jwt = require("jsonwebtoken");

// Import the MySQL database connection pool.
const db = require("../config/db");

// Register a new student account.
const register = async (req, res) => {
  try {
    // Extract the registration details from the request.
    const { full_name, email, student_number, password } = req.body;

    // Check that all required registration fields are provided.
    if (!full_name || !email || !student_number || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required registration details.",
      });
    }

    // Check that the email address has a valid format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Require passwords to contain at least eight characters.
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    // Check whether the email or student number already exists.
    const [existingUsers] = await db.query(
      "SELECT user_id FROM users WHERE email = ? OR student_number = ?",
      [email.trim().toLowerCase(), student_number.trim()]
    );

    // Prevent duplicate student accounts.
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email address or student number is already registered.",
      });
    }

    // Securely hash the student's password before saving it.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert the new student into the database.
    const [result] = await db.query(
      `INSERT INTO users (full_name, email, student_number, password, role)
       VALUES (?, ?, ?, ?, 'student')`,
      [
        full_name.trim(),
        email.trim().toLowerCase(),
        student_number.trim(),
        hashedPassword,
      ]
    );

   
// Create an authentication token for the newly registered student.
const token = jwt.sign(
  {
    user_id: result.insertId,
    role: "student",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

// Return the successful registration response with the student session.
return res.status(201).json({
  success: true,
  message: "Student account created successfully.",
  token,
  user: {
    user_id: result.insertId,
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    student_number: student_number.trim(),
    role: "student",
  },
});

  } catch (error) {
    // Log unexpected registration errors for debugging.
    console.error("Registration Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

// Log in an existing student or administrator.
const login = async (req, res) => {
  try {
    // Extract the email and password from the login request.
    const { email, password } = req.body;

    // Check that both login fields have been provided.
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address and password.",
      });
    }

    // Find the account associated with the supplied email address.
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    // Reject login if the email address does not exist.
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email address or password.",
      });
    }

    // Retrieve the matching user account.
    const user = users[0];

    // Compare the submitted password with the stored password hash.
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    // Reject login if the password is incorrect.
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email address or password.",
      });
    }

    // Create a JWT containing the user's ID and role.
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Return the token and safe user information.
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        student_number: user.student_number,
        role: user.role,
      },
    });
  } catch (error) {
    // Log unexpected login errors for debugging.
    console.error("Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

// Export the authentication functions for use in the routes.
module.exports = {
  register,
  login,
};