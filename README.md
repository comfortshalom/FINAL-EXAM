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
- `frontend/` – Contains the React and Vite frontend application, including authentication, student interfaces and administrator interfaces.
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

The UNI-FIND frontend is developed using React.js and Vite. It provides the user interface through which students and administrators interact with the Lost and Found Management System.

The application contains separate Student and Administrator interfaces, with mobile and desktop screens.

### 1. Frontend Technologies

The following technologies and tools are used:

- **React.js** – Building reusable user interface components.
- **JavaScript** – Implementing application logic and interactions.
- **Vite** – Frontend development server and build tool.
- **HTML5 and JSX** – Structuring the application interface.
- **CSS3** – Styling and positioning interface elements.
- **Font Awesome** – Providing interface icons.
- **Google Fonts (Poppins)** – Providing application typography.

### 2. Frontend Project Structure

The frontend application is organised within the `frontend/` directory.

```text
frontend/
│
├── public/
│   └── images/
│       └── University logos, crests and interface images
│
├── src/
│   │
│   ├── pages/
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   │
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── StudentDesktop.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── ItemDetails.jsx
│   │   │   ├── LostItem.jsx
│   │   │   ├── FoundItem.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── NotificationsDesktop.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProfileDesktop.jsx
│   │   │   ├── SearchDesktop.jsx
│   │   │   ├── MyClaims.jsx
│   │   │   ├── MyClaimsDesktop.jsx
│   │   │   ├── MyReports.jsx
│   │   │   ├── MyReportsDesktop.jsx
│   │   │   ├── ItemDetailsDesktop.jsx
│   │   │   ├── LostItemDesktop.jsx
│   │   │   └── FoundItemDesktop.jsx
│   │   │
│   │   ├── admin-mobile/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   ├── reports/
│   │   │   └── claim-details/
│   │   │
│   │   └── admin-desktop/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminDashboard.css
│   │       ├── AdminReports.jsx
│   │       ├── AdminReports.css
│   │       ├── AdminClaimDetails.jsx
│   │       ├── AdminClaimDetails.css
│   │       ├── AdminUsers.jsx
│   │       ├── AdminUsers.css
│   │       ├── AdminAdministrators.jsx
│   │       ├── AdminAdministrators.css
│   │       ├── AdminAddUser.jsx
│   │       ├── AdminAddUser.css
│   │       ├── AdminSettings.jsx
│   │       └── AdminSettings.css
│   │
│   └── App.jsx
│
├── package.json
└── index.html
```

### 3. Authentication Interface

The authentication section provides the entry point into the UNI-FIND application.

**Login Page**

The Login page provides:

- Email address input.
- Password input.
- Role selection.
- Login button.
- Forgot Password option.
- Sign Up navigation.

**Student Registration**

The Sign Up page provides a registration interface where students can enter their personal information and account credentials.

**Role-Based Navigation**

The application provides separate access for Students and Administrators.

After successful login, users are directed to the appropriate interface according to their assigned role.

- Students access the Student interface.
- Administrators access the Administrator interface.

### 4. Student Interface

The Student interface provides access to the main Lost and Found functionality.

The application includes mobile and desktop screens.

The implemented student screens include:

| Screen | Description |
|---|---|
| Student Dashboard | Main student landing page. |
| Search | Provides access to item searching. |
| Lost Item | Interface for reporting lost belongings. |
| Found Item | Interface for reporting found belongings. |
| Item List | Displays reported items. |
| Item Details | Displays information about a selected item. |
| Notifications | Provides access to notifications. |
| My Claims | Displays the student's submitted claims. |
| My Reports | Displays reports submitted by the student. |
| Profile | Provides access to student account information. |

### 5. Administrator Interface

The Administrator interface provides administrative screens for managing the Lost and Found system.

The desktop administrator interface uses a maroon sidebar, white main content area, navigation icons and structured content layouts.

#### 5.1 Administrator Dashboard

**Files:** `AdminDashboard.jsx`, `AdminDashboard.css`

The dashboard provides an overview of system activities.

It includes:

- Total Reports summary.
- Pending Claims summary.
- Returned Items summary.
- Total Users summary.
- Reports trend chart.
- Recent Activity section.
- Administrator navigation sidebar.

#### 5.2 Administrator Reports

**Files:** `AdminReports.jsx`, `AdminReports.css`

The Reports screen provides an interface for viewing lost and found reports.

It includes:

- Reports heading.
- Lost and Found category tabs.
- Report cards.
- Item information.
- Search area.
- Administrator navigation sidebar.

#### 5.3 Administrator Claim Details

**Files:** `AdminClaimDetails.jsx`, `AdminClaimDetails.css`

The Claim Details screen displays information about a selected claim.

It includes:

- Item photograph.
- Item name.
- Lost or Found status.
- Date.
- Category.
- Location.
- Description.
- Approve Claim button.
- Reject Claim button.

#### 5.4 Manage Users

**Files:** `AdminUsers.jsx`, `AdminUsers.css`

The Users screen provides an interface for viewing registered users.

It includes:

- User names.
- Email addresses.
- Profile photographs or initials.
- User roles.
- Account status.
- Search area.
- Pagination controls.

#### 5.5 Manage Administrators

**Files:** `AdminAdministrators.jsx`, `AdminAdministrators.css`

The Administrators screen provides an interface for viewing administrator accounts.

It includes:

- Administrator names.
- Email addresses.
- Profile photographs or initials.
- Administrator roles.
- Account status.
- Search area.
- Pagination controls.
- Add User button.

The Add User button provides navigation to the administrator account creation screen.

#### 5.6 Create Administrator Account

**Files:** `AdminAddUser.jsx`, `AdminAddUser.css`

The Add User screen provides a form for entering administrator account information.

The form includes:

- Full Name.
- Email Address.
- Role selection.
- Password.
- Confirm Password.
- Create Account button.
- Cancel button.
- Back navigation.

Frontend validation checks that:

- All required fields are completed.
- The email address follows a valid format.
- The password and confirmation password match.

A temporary success message appears after successful frontend validation and disappears automatically after three seconds.

#### 5.7 Administrator Settings

**Files:** `AdminSettings.jsx`, `AdminSettings.css`

The Settings screen provides access to six menu options:

1. Profile information.
2. Change password.
3. About UCU Lost and Found.
4. System preferences.
5. Help and Support.
6. Logout.

The screen also contains the administrator navigation sidebar.

Both Logout options clear the stored authentication token and user information from local storage before returning to the Login page.

### 6. Frontend Navigation and Routes

The application uses pathname-based navigation implemented in `App.jsx`.

#### Authentication Routes

| Route | Screen |
|---|---|
| `/` | Login |
| `/signup` | Student Sign Up |

#### Student Mobile Routes

| Route | Screen |
|---|---|
| `/student` | Student Dashboard |
| `/lost-item` | Lost Item |
| `/found-item` | Found Item |
| `/notifications` | Notifications |
| `/item-details` | Item Details |
| `/item-list` | Item List |
| `/profile` | Student Profile |
| `/my-claims` | My Claims |
| `/my-reports` | My Reports |

#### Student Desktop Routes

| Route | Screen |
|---|---|
| `/student-desktop` | Student Desktop Dashboard |
| `/search` | Search |
| `/lost-item-desktop` | Lost Item Desktop |
| `/found-item-desktop` | Found Item Desktop |
| `/notifications-desktop` | Notifications Desktop |
| `/item-details-desktop` | Item Details Desktop |
| `/profile-desktop` | Profile Desktop |
| `/my-claims-desktop` | My Claims Desktop |
| `/my-reports-desktop` | My Reports Desktop |

#### Administrator Mobile Routes

| Route | Screen |
|---|---|
| `/admin-profile` | Administrator Profile |
| `/admin-settings` | Administrator Settings |
| `/admin-reports` | Administrator Reports |
| `/admin-claim-details` | Administrator Claim Details |

#### Administrator Desktop Routes

| Route | Screen |
|---|---|
| `/admin-desktop` | Administrator Dashboard |
| `/admin-reports-desktop` | Administrator Reports |
| `/admin-claim-details-desktop` | Administrator Claim Details |
| `/admin-users-desktop` | Manage Users |
| `/admin-administrators-desktop` | Manage Administrators |
| `/admin-add-user-desktop` | Create Administrator Account |
| `/admin-settings-desktop` | Administrator Settings |

### 7. Frontend Design and Styling

The frontend follows a consistent design approach across the application.

**Colour Scheme**

The Administrator desktop interface primarily uses:

- Maroon: `#52100d`
- Active sidebar background: `#6b1512`
- White: `#ffffff`
- Page background: `#f5f5f5`
- Grey borders: `#cfcfcf`

**Typography and Icons**

- Poppins is used for application typography.
- Font Awesome provides interface icons.

**Administrator Desktop Layout**

The desktop administrator screens use:

- A maroon sidebar.
- University crest and UNI-FIND branding.
- Sidebar navigation.
- White main content area.
- Structured cards, forms and tables.

The desktop screens are designed to display the application content without a device frame or mobile status bar.

### 8. Frontend Installation and Setup

The frontend requires Node.js and npm.

**Step 1: Navigate to the Frontend Directory**

```bash
cd frontend
```

**Step 2: Install Dependencies**

```bash
npm install
```

**Step 3: Start the Development Server**

```bash
npm run dev
```

Vite starts the frontend development server and displays the local address in the terminal.

For example:

```text
http://localhost:5173/
```

If port 5173 is already occupied, Vite automatically selects another available port.

**Step 4: Open the Application**

Open the local address displayed in the terminal using a web browser.

To access a particular screen, append its route to the local address.

For example:

```text
http://localhost:5173/admin-desktop
```

```text
http://localhost:5173/admin-users-desktop
```

```text
http://localhost:5173/admin-settings-desktop
```

Use the actual port displayed by Vite.

### 9. Frontend Implementation Status

The frontend currently includes:

- Login and student registration interfaces.
- Student mobile and desktop screens.
- Administrator mobile screens.
- Administrator desktop dashboard.
- Administrator reports screen.
- Administrator claim details screen.
- Administrator users screen.
- Administrator administrators screen.
- Administrator account creation screen.
- Administrator settings screen.
- Role-based navigation.
- Application route handling.
- Frontend validation for administrator account creation.
- Logout navigation and local session clearing on the Administrator Dashboard and Settings screens.

Some administrator screens currently use sample information for their layouts. The administrator account creation success message currently confirms frontend validation only; it does not itself confirm that an account has been saved to the database.

Further functionality and integration with the backend API will continue as development progresses.

### 10. Frontend and Backend Integration

The React frontend is designed to communicate with the Node.js and Express.js backend through REST API endpoints.

The backend is responsible for:

- User authentication.
- Database operations.
- Report management.
- Claim management.
- Administrator operations.
- Item return records.
- Access control and data security.

The frontend provides the screens through which users interact with these backend services.

The two parts form the complete UNI-FIND web application.