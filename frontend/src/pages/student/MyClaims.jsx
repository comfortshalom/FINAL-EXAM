
/* Import React and useState to manage the claims displayed on the screen. */
import React, { useState } from 'react';



/* Import the stylesheet for the My Claims screen. */
import './MyClaims.css';

/* Create the My Claims screen component. */
function MyClaims() {

  /* Store the student's previous claims.
     These are temporary sample records for the screen design. */
  const [claims, setClaims] = useState([
    {
  id: 1,
  itemName: 'Black Backpack',
  description: 'Black school backpack with front pockets.',
  date: '15 Nov 2026',
  status: 'Approved',
  image: '/images/BLACK-BACKPACK.png',
},
    {
  id: 2,
  itemName: 'Umbrella',
  description: 'Blue umbrella with UV protection.',
  date: '10 Nov 2026',
  status: 'Approved',
  image: '/images/UMBRELLA.png',
},
    {
  id: 3,
  itemName: 'Red Wallet',
  description: 'Red leather wallet with multiple card slots.',
  date: '05 Nov 2026',
  status: 'Approved',
  image: '/images/RED-WALLET.png',
},
    {
      id: 4,
      itemName: 'SPECTACLES',
      description: 'Unisex glasses with UV protection.',
      date: '28 Oct 2026',
      status: 'Approved',
      image: '/images/SPECTACLES.png',   
    },
  ]);

  /* Remove a claim from the displayed list after confirmation. */
  const handleDelete = (claimId) => {

    /* Ask the student to confirm before deleting the claim. */
    const confirmed = window.confirm(
      'Are you sure you want to delete this claim?'
    );

    /* Stop if the student cancels the deletion. */
    if (!confirmed) {
      return;
    }

    /* Remove the selected claim from the list. */
    setClaims((previousClaims) =>
      previousClaims.filter((claim) => claim.id !== claimId)
    );
  };

  /* Display the My Claims screen. */
  return (
    <div className="my-claims-page">

      {/* Maroon university header. */}
      <header className="claims-header">

        {/* UCU branding. */}
        <div className="claims-brand">
          <img
  className="claims-logo"
  src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
  alt="Uganda Christian University logo"
/>

          <div className="claims-brand-text">
            <h2>UCU</h2>
            <span>UNI-FIND</span>
          </div>
        </div>

        {/* Notification bell. */}
        {/* Navigate to the Student Notifications screen. */}
<button
  type="button"
  className="claims-notification"
  aria-label="Notifications"
  onClick={() => {
    window.location.href = '/notifications';
  }}
>
  <i className="fa-solid fa-bell"></i>
</button>
      </header>

      {/* Main claims content. */}
      <main className="claims-content">

        {/* Screen heading. */}
        <div className="claims-title-section">

          {/* Back button. */}
          <button
            type="button"
            className="claims-back-button"
            onClick={() => {
              window.location.href = '/student';
            }}
            aria-label="Go back to Student Home"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div>
            <h1>My Claims</h1>
            <p>View and manage your previous claims.</p>
          </div>

        </div>

        {/* Number of previous claims. */}
        <div className="claims-summary">
          <h3>Previous Claims</h3>
          <span>{claims.length} Claims</span>
        </div>

        {/* Display the student's claims. */}
        <div className="claims-list">

          {claims.length > 0 ? (

            claims.map((claim) => (

              /* Individual claim card. */
              <article className="claim-card" key={claim.id}>

                {/* Item image slot. */}
                <div className="claim-image-slot">

                  {claim.image ? (

                    <img
                      src={claim.image}
                      alt={claim.itemName}
                    />

                  ) : (

                    <i className="fa-regular fa-image"></i>

                  )}

                </div>

                {/* Item information. */}
                <div className="claim-information">

                  <h3>{claim.itemName}</h3>

                  <p className="claim-description">
                    {claim.description}
                  </p>

                  <p className="claim-date">
                    Claimed on: {claim.date}
                  </p>

                  {/* Claim approval status. */}
                  <span
                    className={`claim-status ${
                      claim.status === 'Approved'
                        ? 'status-approved'
                        : claim.status === 'Rejected'
                        ? 'status-rejected'
                        : 'status-review'
                    }`}
                  >
                    {claim.status}
                  </span>

                </div>

                {/* Delete claim button. */}
                <button
                  type="button"
                  className="delete-claim-button"
                  onClick={() => handleDelete(claim.id)}
                  aria-label={`Delete ${claim.itemName} claim`}
                >
                  <i className="fa-solid fa-trash"></i>
                  <span>Delete</span>
                </button>

              </article>

            ))

          ) : (

            /* Message displayed when no claims remain. */
            <div className="no-claims-message">
              <i className="fa-regular fa-folder-open"></i>
              <h3>No Claims Yet</h3>
              <p>Your previous claims will appear here.</p>
            </div>

          )}

        </div>

      </main>

      
{/* Reuse the existing five-item mobile navigation. */}
<nav className="student-bottom-nav">

  {/* Home navigation item. */}
  <button
    className="student-nav-item"
    onClick={() => {
      window.location.href = '/student';
    }}
  >
    <span>⌂</span>
    <small>Home</small>
  </button>

  {/* My Report navigation item. */}
  <button
    className="student-nav-item"
    onClick={() => {
      window.location.href = '/my-reports';
    }}
  >
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

  {/* Navigate to the My Claims screen. */}
<button
  className="student-nav-item"
  onClick={() => {
    window.location.href = '/my-claims';
  }}
>
  <span>▤</span>
  <small>My Claims</small>
</button>
  {/* Profile navigation item. */}
  <button
    className="student-nav-item"
    onClick={() => {
      window.location.href = '/profile';
    }}
  >
    <span>♙</span>
    <small>Profile</small>
  </button>

</nav>


    </div>
  );
}

/* Export the My Claims screen. */
export default MyClaims;
