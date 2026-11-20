
// Import React and useState to manage the Report Items selection window.
import React, { useState } from 'react';

// Import the stylesheet for the Student Dashboard.
import './StudentDashboard.css';

// Create the Student Dashboard component.
function StudentDashboard() {

  // Control the Report Items selection window.
  const [showReportOptions, setShowReportOptions] = useState(false);

  return (
    // Main container for the mobile Student Dashboard.
    <main className="student-dashboard">

      {/* Top header containing the notification bell and UCU logo. */}
      <header className="student-header">

        {/* Login button positioned at the top left. */}
        <button
          className="student-login-button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Login
        </button>

        {/* White notification bell positioned at the top right. */}
        <button
  className="student-notification"
  aria-label="Notifications"
  onClick={() => {
    window.location.href = '/notifications';
  }}
>
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

        {/* Browse Items button opens the Item List page. */}
        <button
          className="student-action-card browse-card"
          onClick={() => {
            window.location.href = '/item-list';
          }}
        >
          <span className="action-icon">⌕</span>
          <span>Browse Items</span>
        </button>

        {/* Report Items button opens the report choices. */}
        <button
          className="student-action-card report-card"
          onClick={() => setShowReportOptions(true)}
        >
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

      {/* Complete Recent Item box. */}
      <section className="recent-item-card">

        {/* Recent item image. */}
        <div className="recent-item-image">
          <img
            src="/images/BACKPACK.png"
            alt="Blue Backpack"
          />
        </div>

        {/* Recent item information. */}
        <div className="recent-item-details">

          <h3>Blue Backpack</h3>

          <div className="recent-item-status">
            <span className="lost-status-label">LOST</span>
            <span className="status-location">Library</span>
            <span className="recent-item-arrow">→</span>
          </div>

          <p className="recent-item-date">April 20, 2025</p>

        </div>

      </section>

      {/* Bottom navigation placed OUTSIDE and AFTER the Recent Item box. */}
     
      {/* Fixed bottom navigation bar. */}
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
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/item-list';
          }}
        >
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

          
      {/* Display the Report Items selection window when requested. */}
      {showReportOptions && (
        <div className="report-options-overlay">

          {/* White popup containing the reporting choices. */}
          <div className="report-options-modal">

            {/* Popup heading. */}
            <h2>Report an Item</h2>

            {/* Popup description. */}
            <p>What would you like to report?</p>

            {/* Navigate to the Lost Item reporting page. */}
            <button
              className="report-option-button"
              onClick={() => {
                window.location.href = '/lost-item';
              }}
            >
              Report Lost Item
            </button>

            {/* Navigate to the Found Item reporting page. */}
            <button
              className="report-option-button"
              onClick={() => {
                window.location.href = '/found-item';
              }}
            >
              Report Found Item
            </button>

            {/* Close the popup without navigating. */}
            <button
              className="report-options-close"
              onClick={() => setShowReportOptions(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </main>
  );
}

// Export the Student Dashboard component.
export default StudentDashboard;
