
import React, { useState, useEffect } from 'react';
import './ItemDetails.css';

// Display the mobile Item Details screen.
function ItemDetails() {

  // Track whether the claim has been submitted.
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Automatically hide the success message after 4 seconds.
  useEffect(() => {
    if (claimSubmitted) {
      const timer = setTimeout(() => {
        setClaimSubmitted(false);
      }, 4000);

      // Clear the timer when the component updates or unmounts.
      return () => clearTimeout(timer);
    }
  }, [claimSubmitted]);

  return (
    <div className="item-details-page">

      {/* Maroon header section */}
      <header className="details-header">

        {/* App navigation bar */}
        <div className="details-app-bar">

          {/* Back arrow - returns to Item List */}
          <i
            className="fa-solid fa-arrow-left"
            onClick={() => window.location.href = '/item-list'}
            style={{ cursor: 'pointer' }}
          ></i>

          {/* Share icon */}
          <i className="fa-solid fa-share-nodes"></i>

        </div>
      </header>

      {/* Backpack photograph */}
      <div className="details-item-photo">
        <img
          src="/images/BLUE-BACKPACK.png"
          alt="Blue Backpack"
        />
      </div>

      {/* Item details content */}
      <section className="details-content">

        {/* Item title and status */}
        <div className="details-title-row">
          <h1>Blue Backpack</h1>
          <span className="details-status-badge">Lost</span>
        </div>

        {/* Item information */}
        <div className="details-information">

          <div className="details-information-row">
            <i className="fa-solid fa-calendar-days"></i>
            <p><strong>Date:</strong> 20 Apr 2025</p>
          </div>

          <div className="details-information-row">
            <i className="fa-solid fa-grip"></i>
            <p><strong>Category:</strong> Bags</p>
          </div>

          <div className="details-information-row">
            <i className="fa-solid fa-location-dot"></i>
            <p><strong>Location:</strong> Library</p>
          </div>

        </div>

        {/* Item description */}
        <div className="details-description">
          <h2>Description</h2>
          <p>
            Blue backpack with university logo and a black water bottle in the side pocket
          </p>
        </div>

        {/* Submit claim button */}
        <button
          className="details-submit-button"
          onClick={() => setClaimSubmitted(true)}
        >
          Submit Claim
        </button>

        {/* Pale green success message */}
        {claimSubmitted && (
          <div className="claim-success-message">
            YOU HAVE SUBMITTED YOUR CLAIM.. AWAIT FEEDBACK
          </div>
        )}

        {/* Back to item list button */}
        <button
          className="details-back-button"
          onClick={() => window.location.href = '/item-list'}
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span>Back To List</span>
        </button>

      </section>

    </div>
  );
}

// Export the Item Details screen.
export default ItemDetails;
