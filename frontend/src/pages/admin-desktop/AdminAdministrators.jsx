
// Import React so this file can define a React component.
import React from 'react';

// Import the stylesheet that controls the Administrators Desktop layout.
import './AdminAdministrators.css';

// Define the administrator records displayed in the table.
const administrators = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johnd@gmail.com',
    image: '/images/MAN.png',
  },
  {
    id: 2,
    name: 'Kato James',
    email: 'james@ucu.gmail.com',
    initial: 'J',
  },
  {
    id: 3,
    name: 'Mercy Nakato',
    email: 'mercy@ucu.gmail.com',
    image: '/images/MERCY.png',
  },
  {
    id: 4,
    name: 'Sarah Hope',
    email: 'sarahH@gmail.com',
    initial: 'S',
  },
  {
    id: 5,
    name: 'Grace Kisakye',
    email: 'graceK@gmail.com',
    image: '/images/GRACE-AVATAR.png',
  },
  {
    id: 6,
    name: 'Edgar Siso P',
    email: 'edgar@gmail.com',
    initial: 'E',
  },
];

// Define the Administrators Desktop screen component.
function AdminAdministrators() {
  return (
    <div className="admin-administrators-page">

    

      {/* Main application layout containing the sidebar and page content. */}
      <div className="admin-administrators-app">

        {/* Sidebar containing the UCU branding and administration navigation. */}
        <aside className="admin-administrators-sidebar">

          {/* Display the university crest and application name. */}
          <div className="admin-administrators-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
              className="admin-administrators-crest"
            />
            <span>UNI - FIND</span>
          </div>

          {/* Provide navigation links to the desktop administration pages. */}
          <nav className="admin-administrators-navigation">

            <a href="/admin-desktop" className="admin-administrators-nav-link">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a href="/admin-reports-desktop" className="admin-administrators-nav-link">
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

            <a href="/admin-claims-desktop" className="admin-administrators-nav-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a href="/admin-users-desktop" className="admin-administrators-nav-link">
              <i className="fa-regular fa-circle-user"></i>
              <span>Users</span>
            </a>

            <a
              href="/admin-administrators-desktop"
              className="admin-administrators-nav-link active"
            >
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            <a href="/admin-settings-desktop" className="admin-administrators-nav-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a href="/" className="admin-administrators-nav-link">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </a>

          </nav>
        </aside>

        {/* Main content area displaying the Manage Admins table. */}
        <main className="admin-administrators-main">

          {/* Display the menu icon at the top-left of the main area. */}
          <div className="admin-administrators-menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>

          {/* Page heading and Add User button. */}
          <div className="admin-administrators-heading-row">
            <h1>Manage Admins</h1>

            <button className="admin-administrators-add-button">
              <i className="fa-solid fa-circle-plus"></i>
              <span>Add User</span>
            </button>
          </div>

          {/* Search field displayed above the administrators table. */}
          <div className="admin-administrators-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search users...</span>
          </div>

          {/* Table card containing administrator information and pagination. */}
          <section className="admin-administrators-table-card">

            {/* Table headings. */}
            <div className="admin-administrators-table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {/* Display all six administrator records. */}
            <div className="admin-administrators-table-body">
              {administrators.map((administrator) => (
                <div
                  className="admin-administrators-table-row"
                  key={administrator.id}
                >

                  {/* Show the administrator's photo or initial avatar. */}
                  <div className="admin-administrators-name-cell">
                    {administrator.image ? (
                      <img
                        src={administrator.image}
                        alt={administrator.name}
                        className="admin-administrators-avatar"
                      />
                    ) : (
                      <div className="admin-administrators-initial-avatar">
                        {administrator.initial}
                      </div>
                    )}

                    <strong>{administrator.name}</strong>
                  </div>

                  {/* Display the administrator's email address. */}
                  <strong className="admin-administrators-email">
                    {administrator.email}
                  </strong>

                  {/* Display the administrator role. */}
                  <strong className="admin-administrators-role">
                    Admin
                  </strong>

                  {/* Display the account status. */}
                  <div>
                    <span className="admin-administrators-status">
                      Active
                    </span>
                  </div>

                  {/* Display the edit and delete action icons. */}
                  <div className="admin-administrators-actions">
                    <i className="fa-solid fa-pen"></i>
                    <i className="fa-regular fa-trash-can"></i>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer containing the record count and pagination. */}
            <div className="admin-administrators-table-footer">
              <strong>Showing 1-5 of 25</strong>

              <div className="admin-administrators-pagination">
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

// Export the component so it can be displayed through App.jsx.
export default AdminAdministrators;
