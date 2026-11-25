
import React from 'react';
import './AdminDashboard.css';

// Admin Desktop Dashboard component.
function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">

      

      <div className="admin-dashboard-layout">

        {/* ADMIN SIDEBAR */}
        <aside className="admin-dashboard-sidebar">

          {/* University branding. */}
          <div className="admin-sidebar-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
              className="admin-sidebar-crest"
            />

            <h1>UNI - FIND</h1>
          </div>

          {/* Sidebar navigation. */}
          <nav className="admin-sidebar-navigation">

            <a href="/admin-desktop" className="admin-sidebar-link active">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a href="/admin-reports-desktop" className="admin-sidebar-link reports-link">
  <i className="fa-regular fa-clipboard"></i>
  <span>Reports</span>
</a>
            <a href="/admin-claim-details-desktop" className="admin-sidebar-link claims-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a href="/admin-users-desktop" className="admin-sidebar-link users-link">
  <i className="fa-regular fa-circle-user"></i>
  <span>Users</span>
</a>

            <a href="/admin-administrators-desktop" className="admin-sidebar-link administrators-link">
  <i className="fa-solid fa-users"></i>
  <span>Administrators</span>
</a>

            <a href="/admin-settings" className="admin-sidebar-link settings-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a
  href="/"
  className="admin-sidebar-link logout-link"
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

        {/* MAIN DASHBOARD AREA */}
        <main className="admin-dashboard-main">

          {/* Top navigation. */}
          <header className="admin-dashboard-topbar">

            <i className="fa-solid fa-bars admin-main-menu-icon"></i>

            <div className="admin-account">
              <div className="admin-account-avatar">A</div>
              <span>Admin</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>

          </header>

          {/* Dashboard headings. */}
          <section className="admin-dashboard-heading">
            <h2>Dashboard</h2>
            <h3>Overview of Lost &amp; Found Activities</h3>
          </section>

          {/* DASHBOARD STATISTICS */}
          <section className="admin-statistics">

            <div className="admin-stat-card total-reports-card">
              <i className="fa-solid fa-file-lines"></i>
              <h4>Total Reports</h4>
              <p>248</p>
            </div>

            <div className="admin-stat-card pending-claims-card">
              <i className="fa-solid fa-user-list"></i>
              <h4>Pending Claims</h4>
              <p>42</p>
            </div>

            <div className="admin-stat-card returned-items-card">
              <i className="fa-solid fa-arrow-rotate-left"></i>
              <h4>Returned Items</h4>
              <p>180</p>
            </div>

            <div className="admin-stat-card total-users-card">
              <i className="fa-solid fa-users"></i>
              <h4>Total Users</h4>
              <p>2,340</p>
            </div>

          </section>

          {/* LOWER DASHBOARD CONTENT */}
          <section className="admin-dashboard-lower">

            {/* REPORTS TREND CARD */}
            <div className="admin-reports-trend-card">

              <h3>Reports Trend (Last 30 Days)</h3>

              <div className="admin-chart-legend">
                <div className="admin-legend-item">
                  <span className="legend-dot lost-dot"></span>
                  <span>Lost</span>
                </div>

                <div className="admin-legend-item">
                  <span className="legend-dot found-dot"></span>
                  <span>Found</span>
                </div>
              </div>

              {/* Reports line chart. */}
              <div className="admin-chart-container">

                <div className="admin-chart-y-labels">
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>

                <svg
                  className="admin-reports-chart"
                  viewBox="0 0 570 310"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Lost and Found reports trend over four weeks"
                >

                  {/* Chart background. */}
                  <rect
                    x="0"
                    y="0"
                    width="570"
                    height="270"
                    fill="#fafafa"
                  />

                  {/* Horizontal grid lines. */}
                  <line x1="0" y1="10" x2="570" y2="10" stroke="#dddddd" />
                  <line x1="0" y1="135" x2="570" y2="135" stroke="#dddddd" />
                  <line x1="0" y1="260" x2="570" y2="260" stroke="#dddddd" />

                  {/* Lost reports area. */}
                  <path
                    d="M 15 215 L 95 185 L 175 195 L 255 145 L 335 160 L 415 95 L 495 115 L 555 45 L 555 260 L 15 260 Z"
                    fill="#f7b6b2"
                    opacity="0.35"
                  />

                  {/* Found reports area. */}
                  <path
                    d="M 15 235 L 95 215 L 175 225 L 255 185 L 335 195 L 415 155 L 495 165 L 555 105 L 555 260 L 15 260 Z"
                    fill="#b9e5b5"
                    opacity="0.45"
                  />

                  {/* Lost reports line. */}
                  <polyline
                    points="15,215 95,185 175,195 255,145 335,160 415,95 495,115 555,45"
                    fill="none"
                    stroke="#e53935"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Found reports line. */}
                  <polyline
                    points="15,235 95,215 175,225 255,185 335,195 415,155 495,165 555,105"
                    fill="none"
                    stroke="#43a047"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Lost report data points. */}
                  {[
                    [15, 215],
                    [95, 185],
                    [175, 195],
                    [255, 145],
                    [335, 160],
                    [415, 95],
                    [495, 115],
                    [555, 45]
                  ].map(([x, y], index) => (
                    <circle
                      key={`lost-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#e53935"
                    />
                  ))}

                  {/* Found report data points. */}
                  {[
                    [15, 235],
                    [95, 215],
                    [175, 225],
                    [255, 185],
                    [335, 195],
                    [415, 155],
                    [495, 165],
                    [555, 105]
                  ].map(([x, y], index) => (
                    <circle
                      key={`found-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#43a047"
                    />
                  ))}

                  {/* X-axis labels. */}
                  <g
                    fill="#333333"
                    fontSize="15"
                    fontFamily="Poppins, sans-serif"
                    textAnchor="middle"
                  >
                    <text x="65" y="295">Week 1</text>
                    <text x="205" y="295">Week 2</text>
                    <text x="345" y="295">Week 3</text>
                    <text x="495" y="295">Week 4</text>
                  </g>

                </svg>
              </div>

            </div>

            {/* RECENT ACTIVITY CARD */}
            <div className="admin-recent-activity-card">

              <h3>Recent Activity</h3>

              <div className="admin-activity-list">

                <div className="admin-activity-row">

                  <div className="admin-activity-icon">
                    <i className="fa-solid fa-user"></i>
                  </div>

                  <div className="admin-activity-text">
                    <p>New Claim submitted</p>
                    <span>2 min ago</span>
                  </div>

                </div>

                <div className="admin-activity-row">

                  <div className="admin-activity-icon">
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                  </div>

                  <div className="admin-activity-text">
                    <p>Item returned</p>
                    <span>2 min ago</span>
                  </div>

                </div>

                <div className="admin-activity-row">

                  <div className="admin-activity-icon report-activity-icon">
                    <i className="fa-solid fa-file-lines"></i>
                  </div>

                  <div className="admin-activity-text">
                    <p>New Report</p>
                    <span>1 hour ago</span>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;
