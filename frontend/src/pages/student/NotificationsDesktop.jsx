
 // Import React to create the Notifications Desktop screen.
import React from 'react';

// Import the CSS styles for the Notifications Desktop screen.
import './NotificationsDesktop.css';

// Create the Notifications Desktop component.
function NotificationsDesktop() {

  // Navigate between the existing desktop pages.
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Display the complete Notifications Desktop screen.
  return (
    <div className="notifications-desktop-wrapper">

      {/* Display the screen identification label above the application. */}
      <div className="notifications-desktop-label">
        DS NOTIFICATION
      </div>

      {/* Display the fixed desktop application layout. */}
      <div className="desktop-lost-item-page">

        {/* Display the maroon sidebar. */}
        <aside className="desktop-lost-item-sidebar">

          {/* Display the UCU crest and application name. */}
          <div className="desktop-lost-item-brand">
            <img
              src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
              alt="UCU Crest"
            />
            <span>UNI - FIND</span>
          </div>

          {/* Display the desktop navigation menu. */}
          <nav className="desktop-lost-item-navigation">

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/student-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-bars"></i>
              </span>
              <span>Dashboard</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/lost-item-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">?</span>
              <span>Lost Items</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/found-item-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Found Items</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/my-reports-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-list-ul"></i>
              </span>
              <span>My Reports</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/my-claims-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-regular fa-clipboard"></i>
              </span>
              <span>My Claims</span>
            </button>

            {/* Highlight Notifications as the active sidebar page. */}
            <button
              className="desktop-lost-item-nav-item active"
              onClick={() => navigateTo('/notifications-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-bell"></i>
              </span>
              <span>Notifications</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/profile-desktop')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-user"></i>
              </span>
              <span>Profile</span>
            </button>

            <button
              className="desktop-lost-item-nav-item"
              onClick={() => navigateTo('/')}
            >
              <span className="desktop-lost-item-nav-icon">
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
              <span>Logout</span>
            </button>

          </nav>
        </aside>

        {/* Display the white main content area. */}
        <main className="desktop-lost-item-main">

          {/* Display the top bar with the crest and profile photo only. */}
          <header className="desktop-lost-item-topbar">

            <div className="desktop-lost-item-topbar-brand">
              <img
                className="desktop-lost-item-topbar-crest"
                src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
                alt="UCU Crest"
              />
            </div>

            <div className="desktop-lost-item-topbar-actions">
              <img
                className="desktop-lost-item-avatar"
                src="/images/GRACE-AVATAR.png"
                alt="Student profile"
              />
            </div>

          </header>

          {/* Display the notifications content. */}
          <section className="notifications-desktop-content">

            {/* Display the dark maroon Notifications banner. */}
            <div className="notifications-desktop-banner">
              <i className="fa-solid fa-bell"></i>
              <h2>Notifications</h2>
            </div>

            {/* Display the View all notifications text and arrow. */}
            <div className="notifications-desktop-view-all">
              <span>View all notifications</span>
              <span className="notifications-desktop-arrow">→</span>
            </div>

            {/* Display the five notification cards in the specified order. */}
            <div className="notifications-desktop-list">

              {/* Notification 1: Green water bottle found. */}
              <article className="notifications-desktop-card">
                <img
                  src="/images/GREEN-BOTTLE.png"
                  alt="Green water bottle"
                />
                <p>
                  A new item has been found(water bottle green in colour)
                </p>
                <span className="notifications-desktop-time">
                  30mins ago
                </span>
              </article>

              {/* Notification 2: Blue novel and charger found. */}
              <article className="notifications-desktop-card">
                <img
                  src="/images/GREY-NOVEL.png"
                  alt="Blue novel and charger"
                />
                <p>
                  A new item has been found(Blue novel and charger)
                </p>
                <span className="notifications-desktop-time">
                  45mins ago
                </span>
              </article>

              {/* Notification 3: Red wallet report available. */}
              <article className="notifications-desktop-card">
                <img
                  src="/images/RED-WALLET.png"
                  alt="Red leather wallet"
                />
                <p>
                  your report (Red Wallet ) is now available
                </p>
                <span className="notifications-desktop-time">
                  1hr ago
                </span>
              </article>

              {/* Notification 4: iPhone claim approved. */}
              <article className="notifications-desktop-card">
                <img
                  src="/images/IPHONE.png"
                  alt="Lavender and white iPhone"
                />

                <div className="notifications-desktop-message">
                  <p>
                    your claim for iPhone has been approved
                  </p>

                  <span className="notifications-desktop-approved">
                    Approved
                  </span>
                </div>

                <span className="notifications-desktop-time">
                  2h  ago
                </span>
              </article>

              {/* Notification 5: Keys claim deadline approaching. */}
              <article className="notifications-desktop-card">
                <img
                  src="/images/PINK-KEYS.png"
                  alt="Pink keys and strawberry keychain"
                />
                <p>
                  claim deadline for keys  is tomorrow
                </p>
                <span className="notifications-desktop-time">
                  a day ago
                </span>
              </article>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Export the Notifications Desktop component.
export default NotificationsDesktop;
