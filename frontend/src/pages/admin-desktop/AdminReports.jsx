
/* Import React for creating the Admin Reports screen. */
import React from 'react';

/* Import the stylesheet for the Admin Reports screen. */
import './AdminReports.css';



/* Create the Admin Reports Desktop component. */
function AdminReports() {
  /* Store the report items displayed on the screen. */
  const reports = [
    {
      image: '/images/SPECTACLES.png',
      name: 'Spectacles',
      status: 'FOUND',
      date: 'Oct 10',
    },
    {
      image: '/images/BLACK-BACKPACK.png',
      name: 'Black Backpack',
      status: 'LOST',
      date: 'Apr 23',
    },
    {
      image: '/images/BLUE-BACKPACK.png',
      name: 'Blue Backpack',
      status: 'LOST',
      date: 'Oct 17',
    },
    {
      image: '/images/KEYS.png',
      name: 'Keys',
      status: 'LOST',
      date: 'Apr 23',
    },
    {
      image: '/images/PINK-HEADSETS.png',
      name: 'Pink Headsets',
      status: 'FOUND',
      date: 'Nov 2',
    },
    {
      image: '/images/WATER-BOTTLE.png',
      name: 'Water Bottle',
      status: 'LOST',
      date: 'Jun 23',
    },
    {
      image: '/images/CHARGER.png',
      name: 'Phone Charger',
      status: 'Under Review',
      date: 'Apr 23',
    },
  ];

  /* Display the Admin Reports screen. */
  return (
    <div className="reports-page">

      
      {/* Main application layout. */}
      <div className="reports-app">

        {/* ADMIN SIDEBAR */}
        <aside className="reports-sidebar">

          {/* Display the UCU branding. */}
          <div className="reports-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
            />
            <h1>UNI - FIND</h1>
          </div>

          {/* Admin navigation links. */}
          <nav className="reports-navigation">

            <a href="/admin-desktop" className="reports-nav-link">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a
              href="/admin-reports-desktop"
              className="reports-nav-link active"
            >
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

            <a href="/admin-claim-details-desktop" className="reports-nav-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a href="/admin-users-desktop" className="reports-nav-link">
              <i className="fa-regular fa-circle-user"></i>
              <span>Users</span>
            </a>

            <a href="/admin-administrators-desktop" className="reports-nav-link">
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            <a href="/admin-settings-desktop" className="reports-nav-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a
              href="/"
              className="reports-nav-link logout-link"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </a>

          </nav>
        </aside>

        {/* MAIN REPORTS AREA */}
        <main className="reports-main">

          {/* Search bar. */}
          <div className="reports-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Browse Items</span>
            <i className="fa-solid fa-bars reports-search-menu"></i>
          </div>

          {/* Lost and Found tabs. */}
          <div className="reports-tabs">

            <a
              href="/admin-reports-desktop?type=lost"
              className="reports-tab selected"
            >
              LOST ITEMS
            </a>

            <a
              href="/admin-reports-desktop?type=found"
              className="reports-tab"
            >
              FOUND ITEMS
            </a>

          </div>

          {/* Report item cards. */}
          <div className="reports-grid">

            {reports.map((report, index) => (
              <article className="report-card" key={index}>

                <img
                  src={report.image}
                  alt={report.name}
                  className="report-image"
                />

                <h3>{report.name}</h3>

                <div className="report-card-bottom">

                  <span
                    className={`report-status ${
                      report.status === 'LOST'
                        ? 'status-lost'
                        : report.status === 'FOUND'
                        ? 'status-found'
                        : 'status-review'
                    }`}
                  >
                    {report.status === 'Under Review' ? (
                      <>
                        Under
                        <br />
                        Review
                      </>
                    ) : (
                      report.status
                    )}
                  </span>

                  <span className="report-date-dot"></span>

                  <span className="report-date">
                    {report.date}
                  </span>

                </div>

              </article>
            ))}

          </div>

        </main>
      </div>
    </div>
  );
}

/* Export the Admin Reports component. */
export default AdminReports;
