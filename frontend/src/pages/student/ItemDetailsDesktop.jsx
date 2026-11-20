
// Import React and the hooks needed for the claim success notification.
import React, { useEffect, useState } from 'react';

// Import the desktop Item Details styles.
import './ItemDetailsDesktop.css';

// Define the desktop Item Details component.
function ItemDetailsDesktop() {
  // Track whether the claim success notification is visible.
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Hide the success notification automatically after four seconds.
  useEffect(() => {
    if (!claimSubmitted) return;

    // Start the notification dismissal timer.
    const timer = setTimeout(() => {
      setClaimSubmitted(false);
    }, 4000);

    // Clear the timer when the component updates or unmounts.
    return () => clearTimeout(timer);
  }, [claimSubmitted]);

  // Display the desktop Item Details screen.
  return (
    <div className="desktop-item-details-page">

      {/* Display the maroon desktop sidebar. */}
      <aside className="item-details-sidebar">

        {/* Display the university branding. */}
        <div className="item-details-brand">
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />
          <span>UNI - FIND</span>
        </div>

        {/* Display the desktop navigation links. */}
        <nav className="item-details-sidebar-menu">

          {/* Link back to the Student Desktop Dashboard. */}
          <a href="/student-desktop" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-bars"></i>
            </span>
            <span>Dashboard</span>
          </a>

          {/* Mark Lost Items as the active sidebar section. */}
          <a href="/lost-item" className="item-details-menu-item active">
            <span className="item-details-menu-icon question-icon">?</span>
            <span>Lost Items</span>
          </a>

          {/* Link to Found Items. */}
          <a href="/found-item" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-circle-check"></i>
            </span>
            <span>Found Items</span>
          </a>

          {/* Link to My Reports. */}
          <a href="/my-reports" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-list-ul"></i>
            </span>
            <span>My Reports</span>
          </a>

          {/* Link to My Claims. */}
          <a href="/my-claims" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-regular fa-clipboard"></i>
            </span>
            <span>My Claims</span>
          </a>

          {/* Link to Notifications. */}
          <a href="/notifications" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-bell"></i>
            </span>
            <span>Notifications</span>
          </a>

          {/* Link to Profile. */}
          <a href="/profile" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-user"></i>
            </span>
            <span>Profile</span>
          </a>

          {/* Link to Logout. */}
          <a href="/" className="item-details-menu-item">
            <span className="item-details-menu-icon">
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span>Logout</span>
          </a>

        </nav>
      </aside>

      {/* Display the main desktop content area. */}
      <main className="item-details-main">

        {/* Display the white top navigation bar. */}
        <header className="item-details-topbar">
          <img
            className="item-details-topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          <h1>UCU Lost &amp; Found</h1>

          <i className="fa-solid fa-bell item-details-topbar-bell"></i>

          <img
            className="item-details-avatar"
            src="/images/GRACE-AVATAR.png"
            alt="Profile"
          />
        </header>

        {/* Display the item details card. */}
        <section className="desktop-item-details-card">

          {/* Display the Blue Backpack photograph. */}
          <img
            className="desktop-item-details-photo"
            src="/images/BLUE-BACKPACK.png"
            alt="Blue Backpack"
          />

          {/* Display the item name and Lost status. */}
          <div className="desktop-item-details-title-row">
            <h2>Blue Backpack</h2>
            <span className="desktop-item-details-status">Lost</span>
          </div>

          {/* Display the item's date, category and location. */}
          <div className="desktop-item-details-information">

            {/* Display the date reported. */}
            <div className="desktop-item-details-information-row">
              <i className="fa-solid fa-calendar-days"></i>
              <p><strong>Date:</strong> 20 Apr 2025</p>
            </div>

            {/* Display the item category. */}
            <div className="desktop-item-details-information-row">
              <i className="fa-solid fa-grip"></i>
              <p><strong>Category:</strong> Bags</p>
            </div>

            {/* Display the item location. */}
            <div className="desktop-item-details-information-row">
              <i className="fa-solid fa-location-dot"></i>
              <p><strong>Location:</strong> Library</p>
            </div>

          </div>

          {/* Display the item description. */}
          <div className="desktop-item-details-description">
            <h3>Description</h3>
            <p>
              Blue backpack with university logo and a black water bottle in
              the side pocket
            </p>
          </div>

          {/* Submit the claim and display the success notification. */}
          <button
            className="desktop-item-details-submit"
            onClick={() => setClaimSubmitted(true)}
          >
            Submit Claim
          </button>

          {/* Display the pale-green floating success notification. */}
          {claimSubmitted && (
            <div
              className="desktop-claim-success-message"
              role="status"
              aria-live="polite"
            >
              YOUR CLAIM HAS BEEN SUBMITTED, AWAIT APPROVAL, ITEM UNDER REVIEW
            </div>
          )}

          {/* Return to the desktop Search page. */}
          <button
            className="desktop-item-details-back"
            onClick={() => {
              window.location.href = '/search';
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
            <span>Back To List</span>
          </button>

        </section>
      </main>
    </div>
  );
}

// Export the desktop Item Details component for use in App.jsx.
export default ItemDetailsDesktop;
