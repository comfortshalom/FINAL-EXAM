
/* Import React and useState to manage the student's claims. */
import React, { useState } from 'react';

/* Reuse the existing Student Desktop dashboard layout. */
import './StudentDesktop.css';

/* Import the dedicated desktop My Claims styles. */
import './MyClaimsDesktop.css';

/* Create the Student Desktop My Claims component. */
function MyClaimsDesktop() {

  /* Store the student's previous claims. */
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
      itemName: 'Spectacles',
      description: 'Unisex glasses with UV protection.',
      date: '28 Oct 2026',
      status: 'Approved',
      image: '/images/SPECTACLES.png',
    },
  ]);

  /* Navigate to another desktop page. */
  const navigateTo = (path) => {
    window.location.href = path;
  };

  /* Delete a selected claim after confirmation. */
  const handleDelete = (claimId) => {

    /* Ask the student to confirm the deletion. */
    const confirmed = window.confirm(
      'Are you sure you want to delete this claim?'
    );

    /* Stop if the student cancels. */
    if (!confirmed) {
      return;
    }

    /* Remove the selected claim from the list. */
    setClaims((previousClaims) =>
      previousClaims.filter((claim) => claim.id !== claimId)
    );
  };

  /* Display the desktop My Claims screen. */
  return (
    <div className="student-desktop">

      {/* Display the existing maroon desktop sidebar. */}
      <aside className="sidebar">

        {/* Display the university branding. */}
        <div className="brand">
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Logo"
          />
          <span>UNI - FIND</span>
        </div>

        {/* Display the desktop navigation links. */}
        <nav className="sidebar-menu">

          {/* Navigate to the desktop dashboard. */}
          <a
            href="/student-desktop"
            className="menu-item"
          >
            <div className="menu-icon">
              <i className="fa-solid fa-bars"></i>
            </div>
            <span>Dashboard</span>
          </a>

          {/* Navigate to desktop Search. */}
          <a href="/search" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <span>Search</span>
          </a>

          {/* Navigate to desktop Lost Items. */}
          <a href="/lost-item-desktop" className="menu-item">
            <div className="menu-icon question-icon">?</div>
            <span>Lost Items</span>
          </a>

          {/* Navigate to desktop My Reports. */}
          <a href="/my-reports-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-list-ul"></i>
            </div>
            <span>My Reports</span>
          </a>

          {/* Highlight My Claims as the active page. */}
          <a
            href="/my-claims-desktop"
            className="menu-item active"
          >
            <div className="menu-icon">
              <i className="fa-regular fa-clipboard"></i>
            </div>
            <span>My Claims</span>
          </a>

          {/* Navigate to desktop Notifications. */}
          <a href="/notifications-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-bell"></i>
            </div>
            <span>Notifications</span>
          </a>

          {/* Navigate to desktop Profile. */}
          <a href="/profile-desktop" className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <span>Profile</span>
          </a>

          {/* Log out and return to Login. */}
          <a
            href="/"
            className="menu-item"
            onClick={(event) => {
              event.preventDefault();

              /* Clear the saved authentication token. */
              localStorage.removeItem('token');

              /* Clear the saved user information. */
              localStorage.removeItem('user');

              /* Return to the Login page. */
              window.location.href = '/';
            }}
          >
            <div className="menu-icon">
              <i className="fa-solid fa-right-from-bracket logout-icon"></i>
            </div>
            <span>Logout</span>
          </a>

        </nav>
      </aside>

      {/* Display the main white desktop content area. */}
      <main className="main">

        {/* Display the existing desktop topbar. */}
        <header className="topbar">

          <img
            className="topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          <h1>UCU Lost &amp; Found</h1>

          {/* Navigate to desktop Notifications. */}
          <i
            className="fa-solid fa-bell topbar-bell"
            onClick={() => navigateTo('/notifications-desktop')}
            style={{ cursor: 'pointer' }}
          ></i>

          <img
            className="profile-avatar"
            src="/images/GRACE-AVATAR.png"
            alt="Student Profile"
          />

        </header>

        {/* Display the desktop claims content. */}
        <section className="claims-desktop-content">

          {/* Display the My Claims page heading. */}
          <div className="claims-desktop-heading">
            <h2>My Claims</h2>
            <p>View and manage your previous claims.</p>
          </div>

          {/* Display the previous claims summary. */}
          <div className="claims-desktop-summary">
            <h3>Previous Claims</h3>
            <span>{claims.length} Claims</span>
          </div>

          {/* Display all previous claim cards. */}
          <div className="claims-desktop-list">

            {claims.length > 0 ? (

              claims.map((claim) => (

                /* Display an individual claim card. */
                <article
                  className="claims-desktop-card"
                  key={claim.id}
                >

                  {/* Display the claimed item's photograph. */}
                  <div className="claims-desktop-image">
                    <img
                      src={claim.image}
                      alt={claim.itemName}
                    />
                  </div>

                  {/* Display the claim information. */}
                  <div className="claims-desktop-information">

                    <h3>{claim.itemName}</h3>

                    <p>{claim.description}</p>

                    <span className="claims-desktop-date">
                      Claimed on: {claim.date}
                    </span>

                    {/* Display the claim approval status. */}
                    <span className="claims-desktop-status">
                      {claim.status}
                    </span>

                  </div>

                  {/* Delete the selected claim. */}
                  <button
                    type="button"
                    className="claims-desktop-delete"
                    onClick={() => handleDelete(claim.id)}
                    aria-label={`Delete ${claim.itemName} claim`}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                  </button>

                </article>

              ))

            ) : (

              /* Display a message when no claims remain. */
              <div className="claims-desktop-empty">
                <i className="fa-regular fa-folder-open"></i>
                <h3>No Claims Yet</h3>
                <p>Your previous claims will appear here.</p>
              </div>

            )}

          </div>
        </section>

      </main>
    </div>
  );
}

/* Export the desktop My Claims component. */
export default MyClaimsDesktop;
