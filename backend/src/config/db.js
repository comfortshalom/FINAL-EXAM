// Import the MySQL promise-based library for database communication.
const mysql = require("mysql2/promise");

// Import the path module to locate the environment configuration file.
const path = require("path");

// Load environment variables from the backend .env file.
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

// Create a MySQL connection pool for managing database connections.
const db = mysql.createPool({
  // The address where the MySQL database server is running.
  host: process.env.DB_HOST || "localhost",

  // The port used by MySQL.
  port: Number(process.env.DB_PORT) || 3306,

  // The MySQL username.
  user: process.env.DB_USER,

  // The MySQL password.
  password: process.env.DB_PASSWORD,

  // The name of the UNI-FIND database.
  database: process.env.DB_NAME,

  // Allow the application to wait when all connections are busy.
  waitForConnections: true,

  // Set the maximum number of simultaneous database connections.
  connectionLimit: 10,

  // Allow waiting requests to remain in the queue.
  queueLimit: 0,
});

// Export the connection pool so other backend files can use it.
module.exports = db;