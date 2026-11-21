
// Import React to create the Admin Mobile Dashboard component.
import React from 'react';

// Import the stylesheet that controls the Admin Mobile Dashboard design.
import './dashboard.css';

// Create a reusable icon component using inline SVG.
function DashboardIcon({ name, size = 22 }) {
  // Define the SVG icons used throughout the dashboard.
  const icons = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    return: <><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><path d="M9 4.5V3h6v1.5M8 11h8M8 15h5M8 19h6" /></>,
    grid: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
  };

  // Render the selected icon.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

// Create the Admin Mobile Dashboard screen.
function AdminMobileDashboard() {
  // Render the complete dashboard content.
  return (
    <main className="admin-mobile-dashboard">

      {/* Maroon application header. */}
      <header className="admin-mobile-header">
        <div className="admin-mobile-header-row">
          <DashboardIcon name="menu" size={25} />

          <div className="admin-mobile-brand">
            <img src="/images/2 UCU LOGO TRANSPARENT.png" alt="UCU crest" />
            <span>UNI-FIND</span>
          </div>

          <div className="admin-mobile-notification">
            <DashboardIcon name="bell" size={25} />
            <span className="admin-mobile-notification-dot"></span>
          </div>
        </div>
      </header>

      {/* Administrator welcome information. */}
      <section className="admin-mobile-welcome">
        <img
          className="admin-mobile-avatar"
          src="/images/MERCY.png"
          alt="Mercy Nankya"
        />

        <div className="admin-mobile-welcome-text">
          <span>Welcome back,</span>
          <strong>Mercy Nankya</strong>
        </div>

        <span className="admin-mobile-role">Administrator</span>
      </section>

      {/* Dashboard page heading. */}
      <section className="admin-mobile-heading">
        <h1>Dashboard</h1>
        <p>Overview of Lost &amp; Found Activities</p>
      </section>

      {/* Dashboard statistics cards. */}
      <section className="admin-mobile-statistics">

        <article className="admin-mobile-stat-card">
          <div className="admin-mobile-stat-text">
            <span>Total Reports</span>
            <strong>248</strong>
          </div>
          <div className="admin-mobile-stat-icon">
            <DashboardIcon name="file" size={22} />
          </div>
        </article>

        <article className="admin-mobile-stat-card">
          <div className="admin-mobile-stat-text">
            <span>Pending Claims</span>
            <strong>42</strong>
          </div>
          <div className="admin-mobile-stat-icon">
            <DashboardIcon name="clock" size={22} />
          </div>
        </article>

        <article className="admin-mobile-stat-card">
          <div className="admin-mobile-stat-text">
            <span>Returned Items</span>
            <strong>180</strong>
          </div>
          <div className="admin-mobile-stat-icon">
            <DashboardIcon name="return" size={22} />
          </div>
        </article>

        <article className="admin-mobile-stat-card">
          <div className="admin-mobile-stat-text">
            <span>Total Users</span>
            <strong>2,340</strong>
          </div>
          <div className="admin-mobile-stat-icon">
            <DashboardIcon name="users" size={22} />
          </div>
        </article>

      </section>

      {/* Reports trend chart card. */}
      <section className="admin-mobile-trend-card">
        <div className="admin-mobile-trend-heading">
          <h2>Reports Trend</h2>
          <span>Last 30 Days</span>
        </div>

        <div className="admin-mobile-chart-legend">
          <span className="admin-mobile-legend-item">
            <i className="admin-mobile-legend-lost"></i>
            Lost
          </span>
          <span className="admin-mobile-legend-item">
            <i className="admin-mobile-legend-found"></i>
            Found
          </span>
        </div>

        {/* Inline SVG used to draw the two reports trend lines. */}
        <svg
          className="admin-mobile-chart"
          viewBox="0 0 390 115"
          role="img"
          aria-label="Reports Trend chart showing Lost and Found reports"
        >
          <line x1="0" y1="15" x2="390" y2="15" />
          <line x1="0" y1="55" x2="390" y2="55" />
          <line x1="0" y1="95" x2="390" y2="95" />

          <polyline
  className="admin-mobile-chart-lost"
  points="0,48 64,53 128,35 193,39 257,28 322,33 390,18"
  stroke="#de606b"
  strokeWidth="3"
  fill="none"
/>
         <polyline
  className="admin-mobile-chart-found"
  points="0,70 64,44 128,55 193,20 257,38 322,10 390,20"
  stroke="#5fe79a"
  strokeWidth="3"
  fill="none"
/>

          {[
            [0, 48], [64, 53], [128, 35], [193, 39],
            [257, 28], [322, 33], [390, 18],
          ].map(([x, y], index) => (
            <circle className="admin-mobile-chart-lost-dot" cx={x} cy={y} r="3" key={`lost-${index}`} />
          ))}

          {[
            [0, 70], [64, 44], [128, 55], [193, 20],
            [257, 38], [322, 10], [390, 20],
          ].map(([x, y], index) => (
            <circle className="admin-mobile-chart-found-dot" cx={x} cy={y} r="3" key={`found-${index}`} />
          ))}
        </svg>

        {/* Chart week labels. */}
        <div className="admin-mobile-chart-labels">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </section>

      {/* Recent activity heading and activity cards. */}
      <section className="admin-mobile-activity">
        <h2>Recent Activity</h2>

        <div className="admin-mobile-activity-list">

          <article className="admin-mobile-activity-card">
            <div className="admin-mobile-activity-icon">
              <DashboardIcon name="clipboard" size={21} />
            </div>
            <div className="admin-mobile-activity-text">
              <strong>New Claim submitted</strong>
              <span>2 min ago</span>
            </div>
          </article>

          <article className="admin-mobile-activity-card">
            <div className="admin-mobile-activity-icon">
              <DashboardIcon name="return" size={21} />
            </div>
            <div className="admin-mobile-activity-text">
              <strong>Item returned</strong>
              <span>2 min ago</span>
            </div>
          </article>

        </div>
      </section>

      {/* Admin Mobile bottom navigation. */}
      <nav className="admin-mobile-bottom-nav">

  {/* Navigate to the Admin Mobile Dashboard. */}
  <div
    className="admin-mobile-nav-item active"
    onClick={() => window.location.href = '/admin-dashboard'}
  >
    <DashboardIcon name="grid" size={25} />
    <span>Dashboard</span>
  </div>

  {/* Navigate to the Admin Mobile Reports page. */}
  <div
    className="admin-mobile-nav-item"
    onClick={() => window.location.href = '/admin-reports'}
  >
    <DashboardIcon name="file" size={25} />
    <span>Reports</span>
  </div>

  {/* Navigate to the Admin Mobile Claims page. */}
  <div
    className="admin-mobile-nav-item"
    onClick={() => window.location.href = '/admin-claim-details'}
  >
    <DashboardIcon name="clipboard" size={25} />
    <span>Claims</span>
  </div>

  {/* Navigate to the Admin Mobile Users page. */}
  <div
    className="admin-mobile-nav-item"
    onClick={() => window.location.href = '/admin-users'}
  >
    <DashboardIcon name="users" size={25} />
    <span>Users</span>
  </div>

</nav>

    </main>
  );
}

// Make the Admin Mobile Dashboard available to the application.
export default AdminMobileDashboard;
