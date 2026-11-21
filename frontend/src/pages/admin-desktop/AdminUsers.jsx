
/* Import React to build the Admin Users desktop screen. */
import React from 'react';

/* Import the stylesheet for the Admin Users desktop screen. */
import './AdminUsers.css';

/* Store the six users displayed in the Manage Users table. */
const users = [
  {
    name: 'David Kato',
    email: 'david@ucu.gmail.com',
    role: 'Student',
    avatar: '/images/MAN.png',
    image: true,
  },
  {
    name: 'James Okello',
    email: 'james@ucu.gmail.com',
    role: 'Admin',
    avatar: 'J',
    image: false,
  },
  {
    name: 'Mercy Nankya',
    email: 'mercy@gmail.com',
    role: 'Admin',
    avatar: '/images/MERCY.png',
    image: true,
  },
  {
    name: 'Sarah Businga',
    email: 'sarah@ucu.gmail.com',
    role: 'Student',
    avatar: 'S',
    image: false,
  },
  {
    name: 'Grace Nalwa...',
    email: 'grace@ucu.gmail.com',
    role: 'Student',
    avatar: '/images/GRACE-AVATAR.png',
    image: true,
  },
  {
    name: 'Edgar Siso',
    email: 'peter@gmail.com',
    role: 'Admin',
    avatar: 'E',
    image: false,
  },
];

/* Create the Admin Users desktop page component. */
function AdminUsers() {
  return (
    <div className="admin-users-page">

      

      {/* Main application container containing the sidebar and content. */}
      <div className="admin-users-app">

        {/* Admin navigation sidebar. */}
        <aside className="admin-users-sidebar">

          {/* Display the university crest and application name. */}
          <div className="admin-users-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
              className="admin-users-crest"
            />

            <h1>UNI - FIND</h1>
          </div>

          {/* Display the Admin navigation links. */}
          <nav className="admin-users-navigation">

            <a href="/admin-desktop" className="admin-users-nav-link dashboard-link">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a href="/admin-reports-desktop" className="admin-users-nav-link reports-link">
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

            <a href="/admin-claims-desktop" className="admin-users-nav-link claims-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a href="/admin-users-desktop" className="admin-users-nav-link users-link active">
              <i className="fa-regular fa-user"></i>
              <span>Users</span>
            </a>

            <a href="/admin-administrators-desktop" className="admin-users-nav-link administrators-link">
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            <a href="/admin-settings-desktop" className="admin-users-nav-link settings-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a href="/" className="admin-users-nav-link logout-link">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </a>

          </nav>
        </aside>

        {/* Main content area displaying the Manage Users table. */}
        <main className="admin-users-main">

          {/* Display the top hamburger menu icon. */}
          <div className="admin-users-menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>

          {/* Display the page heading. */}
          <h2 className="admin-users-heading">
            Manage Users
          </h2>

          {/* Display the users search box. */}
          <div className="admin-users-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search users...</span>
          </div>

          {/* Display the users table card. */}
          <section className="admin-users-table-card">

            {/* Display the table column headings. */}
            <div className="admin-users-table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {/* Display the six user records. */}
            <div className="admin-users-table-body">

              {users.map((user, index) => (
                <div className="admin-users-table-row" key={index}>

                  {/* Display the user's avatar and name. */}
                  <div className="admin-users-name-cell">
                    {user.image ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="admin-users-avatar"
                      />
                    ) : (
                      <div className="admin-users-letter-avatar">
                        {user.avatar}
                      </div>
                    )}

                    <span>{user.name}</span>
                  </div>

                  {/* Display the user's email address. */}
                  <div className="admin-users-email-cell">
                    {user.email}
                  </div>

                  {/* Display the user's role. */}
                  <div
                    className={`admin-users-role-cell ${
                      user.role === 'Admin' ? 'admin-role' : ''
                    }`}
                  >
                    {user.role}
                  </div>

                  {/* Display the user's account status. */}
                  <div className="admin-users-status-cell">
                    <span>Active</span>
                  </div>

                  {/* Display the edit and delete action icons. */}
                  <div className="admin-users-actions-cell">
                    <i className="fa-solid fa-pencil"></i>
                    <i className="fa-regular fa-trash-can"></i>
                  </div>

                </div>
              ))}

            </div>

            {/* Display the table footer and pagination. */}
            <div className="admin-users-table-footer">

              <span className="admin-users-showing">
                Showing 1-5 of 25
              </span>

              <div className="admin-users-pagination">
                <span>&lt;</span>
                <span className="current-page">1</span>
                <span>2</span>
                <span>3</span>
                <span>&gt;</span>
              </div>

            </div>

          </section>
        </main>
      </div>
    </div>
  );
}

/* Export the Admin Users page for use in App.jsx. */
export default AdminUsers;
