
/* Import React for creating the Admin Claim Details screen. */
import React from 'react';

/* Import the CSS styles for the Admin Claim Details screen. */
import './AdminClaimDetails.css';



/* Create the Admin Claim Details desktop component. */
function AdminClaimDetails() {
  return (
    /* Main page background and screen label. */
    <div className="claim-details-page">

    

      {/* Main application rectangle. */}
      <div className="claim-details-app">

        {/* ADMIN SIDEBAR */}
        <aside className="claim-details-sidebar">

          {/* Sidebar branding. */}
          <div className="claim-details-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
            />
            <h1>UNI - FIND</h1>
          </div>

          {/* Sidebar navigation links. */}
          <nav className="claim-details-navigation">

            <a href="/admin-desktop" className="claim-details-nav-link dashboard-link">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a href="/admin-reports-desktop" className="claim-details-nav-link reports-link">
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

             <a href="/admin-claim-details-desktop" className="claim-details-nav-link active claims-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a href="/admin-users-desktop" className="claim-details-nav-link users-link">
              <i className="fa-regular fa-circle-user"></i>
              <span>Users</span>
            </a>

            <a href="/admin-administrators-desktop" className="claim-details-nav-link administrators-link">
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            <a href="/admin-settings-desktop" className="claim-details-nav-link settings-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

          </nav>

          {/* Logout navigation link. */}
          <a
            href="/"
            className="claim-details-nav-link logout-link"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </a>

        </aside>

        {/* MAIN CLAIM DETAILS AREA */}
        <main className="claim-details-main">

          {/* Claim details card. */}
          <section className="claim-details-card">

            {/* Reported item photograph. */}
            <img
              src="/images/BACKPACK.png"
              alt="Blue Backpack"
              className="claim-details-photo"
            />

            {/* Item title and status. */}
            <div className="claim-details-title-row">
              <h2>Blue Backpack</h2>
              <span className="claim-details-status">Lost</span>
            </div>

            {/* Claim information. */}
            <div className="claim-details-information">

              <div className="claim-information-row">
                <i className="fa-regular fa-calendar"></i>
                <p><strong>Date:</strong> 20 Apr 2025</p>
              </div>

              <div className="claim-information-row">
                <i className="fa-solid fa-border-all"></i>
                <p><strong>Category:</strong> Bags</p>
              </div>

              <div className="claim-information-row">
                <i className="fa-solid fa-location-dot"></i>
                <p><strong>Location:</strong> Library</p>
              </div>

            </div>

            {/* Private item description. */}
            <div className="claim-details-description">

              <h3>
                Description * <span>(Private)</span>
              </h3>

              <p>
                Blue backpack with university logo and a black water bottle in
                <br />
                the side pocket
              </p>

            </div>

            {/* Claim approval and rejection buttons. */}
            <div className="claim-details-actions">

              <button className="approve-claim-button">
                Approve claim
              </button>

              <button className="reject-claim-button">
                Reject Claim
              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

/* Export the Admin Claim Details screen for use in App.jsx. */
export default AdminClaimDetails;
