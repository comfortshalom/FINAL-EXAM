
/* Import React to create the desktop My Reports page. */
import React, { useState } from 'react';

/* Reuse the existing Student Desktop layout and sidebar styles. */
import './StudentDesktop.css';

/* Import the dedicated Desktop My Reports stylesheet. */
import './MyReportsDesktop.css';

/* Create the Student Desktop My Reports component. */
function MyReportsDesktop() {
  /* Store the student's previously reported items. */
  const [reports] = useState([
    {
      id: 1,
      itemName: 'Black Backpack',
      description: 'Black school backpack with front pockets.',
      date: '15 Nov 2026',
      type: 'Lost',
      image: '/images/BLACK-BACKPACK.png',
    },
    {
      id: 2,
      itemName: 'Water Bottle',
      description: 'Blue stainless steel water bottle.',
      date: '12 Nov 2026',
      type: 'Found',
      image: '/images/WATER-BOTTLE.png',
    },
    {
      id: 3,
      itemName: 'Keys',
      description: 'A set of keys reported missing.',
      date: '08 Nov 2026',
      type: 'Lost',
      image: '/images/KEYS.png',
    },
    {
      id: 4,
      itemName: 'Red Wallet',
      description: 'Red wallet found around the university.',
      date: '02 Nov 2026',
      type: 'Found',
      image: '/images/RED-WALLET.png',
    },
  ]);

  /* Navigate to another desktop page. */
  const navigateTo = (path) => {
    window.location.href = path;
  };

  /* Display the desktop My Reports screen. */
  return (
    <div className="student-desktop">
      {/* Display the existing maroon desktop sidebar. */}
      <aside className="sidebar">
        {/* Display the university branding. */}
        <div className="brand">
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Logo"
          />
          <span>UNI - FIND</span>
        </div>

        {/* Display the desktop navigation links. */}
        <nav className="sidebar-menu">
          {/* Navigate to the desktop dashboard. */}
          <a href="/student-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-bars"></i>
            </div>
            <span>Dashboard</span>
          </a>

          {/* Navigate to desktop Search. */}
          <a href="/search" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <span>Search</span>
          </a>

          {/* Navigate to desktop Lost Items. */}
          <a href="/lost-item-desktop" className="menu-item">
            <div className="menu-icon question-icon">?</div>
            <span>Lost Items</span>
          </a>

          {/* Highlight My Reports as the active page. */}
          <a href="/my-reports-desktop" className="menu-item active">
            <div className="menu-icon">
              <i className="fa-solid fa-list-ul"></i>
            </div>
            <span>My Reports</span>
          </a>

          {/* Navigate to desktop My Claims. */}
          <a href="/my-claims-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-regular fa-clipboard"></i>
            </div>
            <span>My Claims</span>
          </a>

          {/* Navigate to desktop Notifications. */}
          <a href="/notifications-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-bell"></i>
            </div>
            <span>Notifications</span>
          </a>

          {/* Navigate to desktop Profile. */}
          <a href="/profile-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <span>Profile</span>
          </a>

          {/* Log out and return to Login. */}
          <a
            href="/"
            className="menu-item"
            onClick={(event) => {
              event.preventDefault();
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
          >
            <div className="menu-icon">
              <i className="fa-solid fa-right-from-bracket logout-icon"></i>
            </div>
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Display the main white desktop content area. */}
      <main className="main">
        {/* Display the existing desktop topbar. */}
        <header className="topbar">
          <img
            className="topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          <h1>UCU Lost &amp; Found</h1>

          <i
            className="fa-solid fa-bell topbar-bell"
            onClick={() => navigateTo('/notifications-desktop')}
            style={{ cursor: 'pointer' }}
          ></i>

          <img
            className="profile-avatar"
            src="/images/GRACE-AVATAR.png"
            alt="Student Profile"
          />
        </header>

        {/* Display the desktop reports content. */}
        <section className="reports-desktop-content">
          {/* Display the My Reports page heading. */}
          <div className="reports-desktop-heading">
            <h2>My Reports</h2>
            <p>View the items you have reported lost or found.</p>
          </div>

          {/* Display the previous reports summary. */}
          <div className="reports-desktop-summary">
            <h3>My Previous Reports</h3>
            <span>{reports.length} Reports</span>
          </div>

          {/* Display all previously reported items. */}
          <div className="reports-desktop-list">
            {reports.length > 0 ? (
              reports.map((report) => (
                <article
                  className="reports-desktop-card"
                  key={report.id}
                >
                  {/* Display the reported item's photograph. */}
                  <div className="reports-desktop-image">
                    <img
                      src={report.image}
                      alt={report.itemName}
                    />
                  </div>

                  {/* Display the report information. */}
                  <div className="reports-desktop-information">
                    <h3>{report.itemName}</h3>

                    <p>{report.description}</p>

                    <span className="reports-desktop-date">
                      Reported on: {report.date}
                    </span>

                    {/* Display whether the item was lost or found. */}
                    <span
                      className={`reports-desktop-status ${
                        report.type === 'Lost'
                          ? 'lost-report'
                          : 'found-report'
                      }`}
                    >
                      {report.type} Item
                    </span>
                  </div>
                </article>
              ))
            ) : (
              /* Display a message when there are no reports. */
              <div className="reports-desktop-empty">
                <i className="fa-regular fa-folder-open"></i>
                <h3>No Reports Yet</h3>
                <p>Your previous reports will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* Export the component so App.jsx can display it. */
export default MyReportsDesktop;
