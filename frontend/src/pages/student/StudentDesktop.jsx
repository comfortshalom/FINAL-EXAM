// Import React state to control the report selection pop-up.
import { useState } from 'react';


// Import React styles for the Student Desktop page.
import './StudentDesktop.css';

// Define the Student Desktop component.
function StudentDesktop() {
  // Store the recent items displayed on the dashboard.

  // Control whether the report selection pop-up is visible.
const [showReportOptions, setShowReportOptions] = useState(false);


 const recentItems = [
  {
    id: 1,
    name: 'Black Backpack',
    status: 'LOST',
    date: 'Apr 23',
    image: '/images/BLACK-BACKPACK.png',
  },
  {
    id: 2,
    name: 'Water bottle',
    status: 'FOUND',
    date: 'Mar 8',
    image: '/images/WATER-BOTTLE.png',
  },
  {
    id: 3,
    name: 'Grey Novel',
    status: 'LOST',
    date: 'Sept 15',
    image: '/images/GREY-NOVEL.png',
  },
  {
    id: 4,
    name: 'Pink Headsets',
    status: 'FOUND',
    date: 'Nov 2',
    image: '/images/PINK-HEADSETS.png',
  },
];

  // Display the Student Desktop dashboard.
  return (
    <div className="student-desktop">

      {/* Sidebar navigation */}
      <aside className="sidebar">

        {/* University branding */}
        <div className="brand">
          <img src="/images/2%20UCU%20LOGO%20TRANSPARENT.png" />
          <span>UNI - FIND</span>
        </div>

        {/* Dashboard navigation links */}
        <nav className="sidebar-menu">

          <div className="menu-item active">
            <div className="menu-icon">
              <i className="fa-solid fa-bars"></i>
            </div>
            <span>Dashboard</span>
          </div>


          {/* Search navigation link to the desktop Search page. */}
<a href="/search" className="menu-item">
  <div className="menu-icon">
    <i className="fa-solid fa-magnifying-glass"></i>
  </div>
  <span>Search</span>
</a>

          {/* Lost Items navigation link to the Desktop Lost Item page. */}
<a href="/lost-item-desktop" className="menu-item">
  <div className="menu-icon question-icon">?</div>
  <span>Lost Items</span>
</a>




            {/* Report Items navigation option with a red plus icon. */}




          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-list-ul"></i>
            </div>
            <span>My Reports</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-regular fa-clipboard"></i>
            </div>
            <span>My Claims</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-bell"></i>
            </div>
            <span>Notifications</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <span>Profile</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-right-from-bracket logout-icon"></i>
            </div>
            <span>Logout</span>
          </div>

        </nav>
      </aside>

      {/* Main dashboard content */}
      <main className="main">

        {/* Top navigation bar */}
        <header className="topbar">
          <img
            className="topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          <h1>UCU Lost &amp; Found</h1>

          <i className="fa-solid fa-bell topbar-bell"></i>

          <img
            className="profile-avatar"
            src="/images/GRACE-AVATAR.png"
            alt="Grace Profile"
          />
        </header>

        {/* Welcome banner */}
        <section className="hero">
          <div className="hero-text">
            <h2>Welcome back, Grace !</h2>

            <p>
              Together we keep UCU community
              <span>connected</span>
            </p>
          </div>
        </section>

        {/* Dashboard statistics */}
        <section className="stats">



          {/* Open the report selection pop-up when the red card is tapped. */}
{/* Red Dashboard card for creating a new item report. */}
<div
  className="stat-card reports-stat"
  onClick={() => setShowReportOptions(true)}
  style={{ cursor: 'pointer' }}
>
  {/* Red plus icon replaces the number 2. */}
  <i className="fa-solid fa-plus stat-report-icon"></i>

  {/* Change the card label to Report Items. */}
  <strong style={{ fontSize: '40px' }}>Report <br />Items</strong>
</div>

          <div className="stat-card claims-stat">
            <span className="stat-check-circle">
              <i className="fa-solid fa-check"></i>
            </span>
            <strong>3</strong>
            <span>My Claims</span>
          </div>

          <div className="stat-card notifications-stat">
            <i className="fa-solid fa-bell stat-notification-icon"></i>
            <strong>1</strong>
            <span>Notifications</span>
          </div>

        </section>

        {/* Report selection pop-up displayed when My Reports is tapped. */}
{showReportOptions && (
  <div className="report-modal-overlay">

    {/* Report selection window. */}
    <div className="report-modal">

      <h2>Report an Item</h2>

      <p>What would you like to report?</p>

      {/* Navigate to the Lost Item reporting screen. */}
      <button
        className="report-option-button"
        onClick={() => {
          window.location.href = '/lost-item-desktop';
        }}
      >
        Lost Item
      </button>

      {/* Navigate to the Found Item reporting screen. */}
      <button
        className="report-option-button"
        onClick={() => {
          window.location.href = '/found-item';
        }}
      >
        Found Item
      </button>

      {/* Close the pop-up without navigating. */}
      <button
        className="report-cancel-button"
        onClick={() => setShowReportOptions(false)}
      >
        Cancel
      </button>

    </div>
  </div>
)}

        {/* Recently reported items */}
        <section className="recent">

          <div className="recent-heading">
            <h2>Recent Items</h2>

            <div className="view-all">
              <span>View All</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          {/* Recent item cards */}
          <div className="recent-items-grid">

            {recentItems.map((item) => (
              <div className="item-card" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />

                <h3>{item.name}</h3>

                <div className="item-details">

                  <span
                    className={`badge ${
                      item.status === 'LOST' ? 'lost' : 'found'
                    }`}
                  >
                    {item.status}
                  </span>

                  <div className="item-date">
                    <span>●</span>
                    <strong>{item.date}</strong>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

// Export the Student Desktop component.
export default StudentDesktop;