
// Import React to create the Notifications screen.
import React from 'react';

// Import the Notifications screen styling.
import './Notifications.css';

// Display the student's Notifications screen.
function Notifications() {

  // Store the notification details displayed on the screen.
  const notifications = [
    {
      id: 1,
      image: '/images/GREEN-BOTTLE.png',
      alt: 'Green water bottle',
      message: 'A new item has been found(water bottle green in colour)',
      time: '30mins ago',
    },
    {
      id: 2,
      image: '/images/CHARGER.png',
      alt: 'Blue novel and charger',
      message: 'A new item has been found(Blue novel and charger)',
      time: '45mins ago',
    },
    {
      id: 3,
      image: '/images/RED-WALLET.png',
      alt: 'Red wallet',
      message: 'Your report (Red Wallet ) is now available',
      time: '1hr ago',
    },
    {
      id: 4,
      image: '/images/IPHONE.png',
      alt: 'Lavender iPhone',
      message: 'Your claim for iPhone has been approved',
      time: '2h  ago',
      approved: true,
    },
    {
      id: 5,
      image: '/images/PINK-KEYS.png',
      alt: 'Keys with pink keychain',
      message: 'Claim deadline for keys  is tomorrow',
      time: 'a day ago',
    },


    {
  id: 6,
  image: '/images/HOODIE.png',
  alt: 'Blue and white hoodie',
  message: 'A new item has been found(A blue and white hoodie)',
  time: '30mins ago',
 },


  ];

  return (
    <div className="notifications-page">

      {/* Notifications heading banner */}
      <header className="notifications-header">
        <i className="fa-solid fa-bell"></i>
        <h1>Notifications</h1>
      </header>

      {/* View all notifications link */}
      <div className="notifications-view-all">
        <span>View all notifications</span>
        <i className="fa-solid fa-arrow-right"></i>
      </div>

      {/* List of notification cards */}
      <main className="notifications-list">

        {notifications.map((notification) => (

          <article
            className="notification-card"
            key={notification.id}
          >

            {/* Notification image */}
            <img
              src={notification.image}
              alt={notification.alt}
              className="notification-image"
            />

            {/* Notification message */}
            <div className="notification-message">

              <p>{notification.message}</p>

              {/* Approved status badge */}
              {notification.approved && (
                <span className="notification-approved">
                  Approved
                </span>
              )}

            </div>

            {/* Notification time */}
            <span className="notification-time">
              {notification.time}
            </span>

          </article>

        ))}

      </main>

      {/* Student bottom navigation */}
      <nav className="student-bottom-nav">

        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/student';
          }}
        >
          <i className="fa-solid fa-house"></i>
          <small>HOME</small>
        </button>

        <button className="student-nav-item">
          <i className="fa-solid fa-file-lines"></i>
          <small>REPORTS</small>
        </button>

        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/item-list';
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          <small>SEARCH</small>
        </button>

        <button className="student-nav-item">
          <i className="fa-solid fa-clipboard-list"></i>
          <small>CLAIMS</small>
        </button>

        <button className="student-nav-item">
          <i className="fa-solid fa-user"></i>
          <small>PROFILE</small>
        </button>

      </nav>

      {/* Android home indicator */}
      <div className="notifications-home-indicator"></div>

    </div>
  );
}

// Export the Notifications screen.
export default Notifications;
