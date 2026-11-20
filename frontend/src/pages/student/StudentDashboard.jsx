
// Import React to create the Student Dashboard component.
import React from 'react';

// Import the stylesheet for the Student Dashboard.
import './StudentDashboard.css';

// Create the Student Dashboard component.
function StudentDashboard() {
  return (
    // Main container for the mobile Student Dashboard.
    <main className="student-dashboard">

      {/* Top header containing the notification bell and UCU logo. */}
      <header className="student-header">

        {/* White notification bell positioned at the top right. */}
  <button className="student-notification" aria-label="Notifications">
  <svg
  width="25"
  height="25"
  viewBox="0 0 24 24"
  fill="#FFFFFF"
  stroke="#FFFFFF"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
  <path d="M10 21h4" fill="none" strokeWidth="2" />
</svg>
  </button>


        {/* Display the UCU logo badge and university name together. */}
 <div className="student-logo-container">

  {/* UCU logo badge. */}
  <img
    src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
    alt="Uganda Christian University Logo"
    className="student-ucu-logo"
  />

  {/* University name beside the logo. */}
  <span className="student-ucu-text">UCU</span>

 </div>

      </header>

      {/* Welcome message for the logged-in student. */}
      <section className="student-welcome">
        <h1>Hello, Grace!</h1>
        <p>Welcome to UCU Lost and Found</p>
      </section>

      {/* UCU courtyard image section. */}
      <section className="student-campus-image">
        <img
          src="/images/COURTYARD.png"
          alt="UCU Campus Courtyard"
        />
      </section>

      {/* Four main student action cards. */}
      <section className="student-actions">

        {/* Browse Items card. */}
        <button className="student-action-card browse-card">
          <span className="action-icon">⌕</span>
          <span>Browse Items</span>
        </button>

        {/* Report Items card. */}
        <button className="student-action-card report-card">
          <span className="action-icon">+</span>
          <span>Report Items</span>
        </button>

        {/* My Reports card. */}
        <button className="student-action-card reports-card">
          <span className="action-icon">▤</span>
          <span>My Reports</span>
        </button>

        {/* My Claims card. */}
        <button className="student-action-card claims-card">
          <span className="action-icon">♟</span>
          <span>My Claims</span>
        </button>

      </section>

        {/* Recent items heading and View All link. */}
     <section className="recent-items-section">

  {/* Recent Items heading. */}
  <h2>Recent Items</h2>

  {/* View All link with a right-pointing arrow. */}
  <button className="view-all-button">
    View All <span>→</span>
  </button>

    </section>


    {/* Display a recently reported lost item. */}
<section className="recent-item-card">

  {/* Image displayed on the left side of the card. */}
  <div className="recent-item-image">
    <img
      src="/images/BACKPACK.png"
      alt="Blue Backpack"
    />
  </div>

  {/* Description displayed beside the image. */}
  <div className="recent-item-details">

    {/* Item name. */}
    <h3>Blue Backpack</h3>

    {/* Display the LOST label, location and arrow. */}
<div className="recent-item-status">

  {/* LOST status inside a faint red rounded box. */}
  <span className="lost-status-label">LOST</span>

  {/* Black dot separating the status and location. */}
  <span className="status-dot"></span>

  {/* Location where the item was lost. */}
  <span className="status-location">Library</span>

  {/* Arrow pointing to the right. */}
  <span className="recent-item-arrow">→</span>

</div>

    {/* Date the item was reported. */}
    <p className="recent-item-date">April 20, 2025</p>

  </div>

</section>




      {/* Bottom navigation for the student pages. */}
      <nav className="student-bottom-nav">

        {/* Home navigation item. */}
        <button className="student-nav-item active">
          <span>⌂</span>
          <small>Home</small>
        </button>

        {/* My Report navigation item. */}
        <button className="student-nav-item">
          <span>▤</span>
          <small>My Report</small>
        </button>

        {/* Search navigation item. */}
        <button className="student-nav-item">
          <span>⌕</span>
          <small>Search</small>
        </button>

        {/* My Claims navigation item. */}
        <button className="student-nav-item">
          <span>▤</span>
          <small>My Claims</small>
        </button>

        {/* Profile navigation item. */}
        <button className="student-nav-item">
          <span>♙</span>
          <small>Profile</small>
        </button>

      </nav>

    </main>
  );
}

// Export the Student Dashboard component.
export default StudentDashboard;
