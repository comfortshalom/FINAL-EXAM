// Import React and useState to manage the selected profile picture.
import React, { useState, useRef } from 'react';

// Import the Profile page stylesheet.
import './Profile.css';

// Create the Student Profile component.
function Profile() {

  // Store the currently displayed profile picture.
  const [profileImage, setProfileImage] = useState('/images/GRACE-AVATAR.png');

  // Create a reference to the hidden gallery input.
  const galleryInputRef = useRef(null);

  // Open the phone's gallery when the camera icon is tapped.
  const openGallery = () => {
    galleryInputRef.current.click();
  };

  // Display the selected image on the profile.
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setProfileImage(imageURL);
    }
  };

  return (
    <main className="profile-page">

      {/* Profile header banner. */}
      <header className="profile-header">

        {/* Back button. */}
        <button
          className="profile-back-button"
          onClick={() => {
            window.location.href = '/student';
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Profile heading. */}
        <h1>MY PROFILE</h1>

        {/* Logout button. */}
        <button
          className="profile-logout-button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Logout
        </button>

      </header>

      {/* Profile picture section. */}
      <section className="profile-picture-section">

        {/* Circular profile picture. */}
        <div className="profile-picture-wrapper">

          <img
            src={profileImage}
            alt="Student profile"
            className="profile-picture"
          />

          {/* Hidden input that opens the real device gallery. */}
          <input
            type="file"
            accept="image/*"
            ref={galleryInputRef}
            onChange={handleImageChange}
            className="profile-gallery-input"
          />

          {/* Camera button. */}
          <button
            type="button"
            className="profile-camera-button"
            onClick={openGallery}
            aria-label="Change profile picture"
          >
            <i className="fa-solid fa-camera"></i>
          </button>

        </div>

      </section>

      {/* Profile menu panel. */}
      <section className="profile-menu-panel">

        {/* Account overview. */}
        <button
          className="profile-menu-row"
          onClick={() => {
            window.location.href = '/account-overview';
          }}
        >
          <i className="fa-solid fa-user menu-row-icon"></i>
          <span>Account overview</span>
          <i className="fa-solid fa-chevron-right menu-row-arrow"></i>
        </button>

        {/* My reports. */}
        <button
          className="profile-menu-row"
          onClick={() => {
            window.location.href = '/my-reports';
          }}
        >
          <i className="fa-regular fa-file-lines menu-row-icon"></i>
          <span>My reports</span>
          <i className="fa-solid fa-chevron-right menu-row-arrow"></i>
        </button>

        {/* Notifications. */}
        <button
          className="profile-menu-row"
          onClick={() => {
            window.location.href = '/notifications';
          }}
        >
          <i className="fa-solid fa-bell menu-row-icon"></i>
          <span>Notifications</span>
          <i className="fa-solid fa-chevron-right menu-row-arrow"></i>
        </button>

        {/* My Claims. */}
        <button
          className="profile-menu-row"
          onClick={() => {
            window.location.href = '/my-claims';
          }}
        >
          <i className="fa-regular fa-clipboard menu-row-icon"></i>
          <span>My Claims</span>
          <i className="fa-solid fa-chevron-right menu-row-arrow"></i>
        </button>

        {/* Settings. */}
        <button
          className="profile-menu-row"
          onClick={() => {
            window.location.href = '/settings';
          }}
        >
          <i className="fa-solid fa-gear menu-row-icon"></i>
          <span>Settings</span>
          <i className="fa-solid fa-chevron-right menu-row-arrow"></i>
        </button>

      </section>

      {/* Student bottom navigation. */}
           {/* Fixed bottom navigation bar. */}
      <nav className="student-bottom-nav">

        {/* Home navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/student';
          }}
        >
          <span>⌂</span>
          <small>HOME</small>
        </button>

        {/* My Report navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/my-reports';
          }}
        >
          <span>▤</span>
          <small>REPORTS</small>
        </button>

        {/* Search navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/item-list';
          }}
        >
          <span>⌕</span>
          <small>SEARCH</small>
        </button>

        {/* My Claims navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/my-claims';
          }}
        >
          <span>▤</span>
          <small>CLAIMS</small>
        </button>

        {/* Profile navigation item. */}
        <button className="student-nav-item active">
          <span>♙</span>
          <small>PROFILE</small>
        </button>

      </nav>

    </main>
  );
}

// Export the Profile component.
export default Profile;