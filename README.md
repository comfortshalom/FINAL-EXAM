# UNI-FIND – UCU Campus Lost and Found Management System

## Project Overview

UNI-FIND is a web-based Lost and Found Management System designed for Uganda Christian University (UCU).

The system provides a central platform where students can report lost and found items, search for missing belongings, submit ownership claims and track the progress of their claims.

Administrators manage reports, review submitted claims, moderate inappropriate reports and confirm the successful return of recovered items.

The system aims to make the process of recovering lost belongings more organised, accessible, secure and efficient within the university community.

## Project Objectives

- Provide students with a platform to report lost and found items.
- Allow students to search for reported items.
- Enable students to submit claims using private ownership evidence.
- Allow administrators to review and manage claims.
- Track the successful collection and return of recovered items.
- Protect private information through authentication and role-based access control.

## Technologies Used

### Frontend
- React – User interface development.
- HTML, CSS and JavaScript – Web application structure, styling and functionality.

### Backend
- Node.js – JavaScript runtime environment.
- Express.js – Backend API and server framework.
- MySQL – Relational database management system.
- mysql2 – MySQL database connectivity.
- bcryptjs – Secure password hashing.
- JSON Web Token (JWT) – User authentication.
- dotenv – Environment variable management.
- CORS – Cross-origin resource sharing.

### Development Tools
- Visual Studio Code – Code editor.
- Git and GitHub – Version control and project hosting.
- Postman / cURL – API testing.
- MySQL 8.4 – Database server.

## Project Structure

The project is organised into the following main directories:

```text
FINAL-EXAM/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── frontend/
│
└── README.md
```

### Directory Descriptions

- `backend/` – Contains the Node.js and Express backend application.
- `src/config/` – Contains database connection configuration.
- `src/controllers/` – Contains the logic for authentication, reports, claims, administration and returns.
- `src/middleware/` – Contains authentication and role-based access control.
- `src/routes/` – Defines the backend API endpoints.
- `src/server.js` – Configures and starts the Express server.
- `database/` – Contains the SQL database schema and sample data.
- `frontend/` – Reserved for the React frontend application.
- `README.md` – Contains project documentation.

## System Requirements

The following software is required to run the UNI-FIND application:

- Node.js (version 20 or later recommended).
- npm (Node Package Manager).
- MySQL Server 8.4.
- Visual Studio Code or another code editor.
- Git for version control.
- A modern web browser.

## Database Configuration

UNI-FIND uses MySQL as its relational database management system.

The database is named `uni_find` and contains four main tables:

| Table | Purpose |
|---|---|
| `users` | Stores student and administrator accounts. |
| `reports` | Stores lost and found item reports. |
| `claims` | Stores student ownership claims and administrator responses. |
| `return_records` | Records confirmed collection and return of items. |

### Database Setup

1. Start the MySQL server.
2. Open a terminal in the project root directory.
3. Run the following command to create the database and its tables:

```bash
mysql -u root -p < database/schema.sql
```

4. Enter your MySQL password when prompted.
5. To insert fictional demonstration data, run:

```bash
mysql -u root -p < database/seed.sql
```

The SQL files are provided in the `database/` directory.

## Backend Installation and Setup

Follow these steps to install and run the UNI-FIND backend.

### 1. Navigate to the Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory.

Add the following variables using your own local configuration:

```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=uni_find
JWT_SECRET=your_private_jwt_secret
```

**Important:** Replace the example values with your actual local settings. Never upload the `.env` file or expose database passwords and JWT secrets on GitHub.

### 4. Start the Backend Server

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The backend server runs on port `5001` by default.

### 5. Verify the Server

Open the following address in a browser:

```text
http://localhost:5001/api/health
```

A successful response confirms that the backend server is running.

## Backend API Endpoints

The backend exposes REST API endpoints for authentication, reports, claims, administration and item returns.

All protected endpoints require a valid JWT authentication token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### 1. Authentication Routes

Base URL: `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a student account. |
| POST | `/login` | Authenticate a user and generate a JWT. |

### 2. Report Routes

Base URL: `/api/reports`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Retrieve visible reports and apply search filters. |
| POST | `/` | Create a lost or found item report. |
| GET | `/my-reports` | Retrieve reports belonging to the logged-in student. |
| PUT | `/:report_id` | Update an owned report. |
| DELETE | `/:report_id` | Delete an owned report. |

### 3. Claim Routes

Base URL: `/api/claims`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/:report_id` | Submit an ownership claim. |
| GET | `/my-claims` | Retrieve claims belonging to the logged-in student. |

### 4. Administrator Routes

Base URL: `/api/admin`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/reports` | Retrieve reports for administration. |
| PUT | `/reports/:report_id/moderation` | Hide or restore a report. |
| GET | `/claims` | Retrieve claims for review. |
| PUT | `/claims/:claim_id` | Approve or reject a claim. |

### 5. Main Administrator Routes

Base URL: `/api/super-admin`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admins` | View administrator accounts. |
| POST | `/admins` | Create an administrator account. |
| DELETE | `/admins/:admin_id` | Delete an administrator account. |

These endpoints are restricted to the Main Administrator.

### 6. Return Routes

Base URL: `/api/returns`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/:claim_id/confirm` | Confirm collection and record the return of an item. |

These endpoints require administrator authentication and authorisation.

### 7. Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check whether the backend server is running. |

## Security Features

UNI-FIND implements several security measures to protect user accounts and information.

### Password Protection
- Passwords are hashed using bcryptjs before being stored in the database.
- Plain-text passwords are never stored.

### Authentication
- JSON Web Tokens (JWT) are used to authenticate users.
- Protected API routes require a valid authentication token.
- Invalid or expired tokens are rejected.

### Role-Based Access Control

The system supports three user roles:

- **Student:** Can manage personal reports, search for items and submit ownership claims.
- **Administrator:** Can manage reports, review claims and confirm item returns.
- **Main Administrator:** Has additional privileges to create and delete administrator accounts.

### Data Protection
- Students can only manage their own reports and claims.
- Private ownership evidence is restricted to the claimant and authorised administrators.
- Private identifying details are excluded from public report searches.
- Students cannot claim their own found-item reports.
- Returned items cannot receive additional claims.

### Environment Security
- Sensitive configuration values are stored in environment variables.
- The `.env` file and installed dependencies are excluded from Git using `.gitignore`.

## Demonstration Accounts

The `database/seed.sql` file provides fictional accounts for testing the different user roles.

| Role | Email |
|---|---|
| Student | demo.student1@ucu.ac.ug |
| Student | demo.student2@ucu.ac.ug |
| Administrator | demo.admin@ucu.ac.ug |
| Main Administrator | demo.mainadmin@ucu.ac.ug |

**Demonstration password for all four accounts:**

`UniFindDemo2026!`

**Important:** These are public demonstration credentials intended only for local testing. They must not be used for real accounts or production deployment.

## Project Status

The backend implementation includes:

- User registration and login.
- Password hashing and JWT authentication.
- Role-based access control.
- Lost and found report management.
- Report searching and filtering.
- Ownership claim submission and review.
- Report moderation.
- Administrator account management.
- Item collection and return confirmation.
- MySQL database integration and sample data.

## Frontend Development

The React frontend will provide the user interface through which students and administrators interact with the UNI-FIND backend.

It will communicate with the backend REST API to perform authentication, report management, claim submission, administration and item return operations.

Frontend development and integration will be documented as implementation progresses.

## Disclaimer

UNI-FIND is an academic project developed for Uganda Christian University's CSC1202 Web and Mobile Applications Development course.

The demonstration data is fictional and is provided strictly for development and testing purposes.
