
import React, { useRef, useState } from 'react';
import './ProfileDesktop.css';

// Display the Student Desktop Profile screen.
function ProfileDesktop() {
  // Store the selected profile photo for the preview.
  const [profilePhoto, setProfilePhoto] = useState('/images/GRACE-AVATAR.png');

  // Create a reference to the real image file picker.
  const fileInputRef = useRef(null);

  // Open the device gallery when the camera icon is selected.
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Preview the image selected from the device.
  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setProfilePhoto(URL.createObjectURL(selectedFile));
    }
  };

  // Navigate only through the sidebar links.
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="profile-desktop-wrapper">

      {/* Fixed desktop application layout. */}
      <div className="profile-desktop-page">

        {/* Maroon navigation sidebar. */}
        <aside className="profile-desktop-sidebar">

          {/* University crest and application name. */}
          <div className="profile-desktop-brand">
            <img
              src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
              alt="UCU Crest"
            />
            <span>UNI - FIND</span>
          </div>

          {/* Sidebar navigation menu. */}
          <nav className="profile-desktop-navigation">

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/student-desktop')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-bars"></i>
              </span>
              <span>Dashboard</span>
            </button>

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/lost-item-desktop')}
            >
              <span className="profile-desktop-nav-icon">?</span>
              <span>Lost Items</span>
            </button>

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/found-item-desktop')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Found Items</span>
            </button>

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/my-reports')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-list-ul"></i>
              </span>
              <span>My Reports</span>
            </button>

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/my-claims-desktop')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-regular fa-clipboard"></i>
              </span>
              <span>My Claims</span>
            </button>

            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/notifications-desktop')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-bell"></i>
              </span>
              <span>Notifications</span>
            </button>

            {/* Highlight Profile as the active page. */}
            <button
              className="profile-desktop-nav-item active"
              onClick={() => navigateTo('/profile-desktop')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-user"></i>
              </span>
              <span>Profile</span>
            </button>

            {/* Logout returns the user to the login page. */}
            <button
              className="profile-desktop-nav-item"
              onClick={() => navigateTo('/')}
            >
              <span className="profile-desktop-nav-icon">
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
              <span>Logout</span>
            </button>

          </nav>
        </aside>

        {/* White main profile area. */}
        <main className="profile-desktop-main">

          {/* MY PROFILE banner. */}
          <header className="profile-desktop-banner">
            <span
              className="profile-desktop-back"
              onClick={() => navigateTo('/student-desktop')}
            >
              &lt;
            </span>
            <h1>MY PROFILE</h1>
          </header>

          {/* Profile photo and camera picker. */}
          <section className="profile-desktop-photo-section">

            <img
              className="profile-desktop-photo"
              src={profilePhoto}
              alt="Student profile"
            />

            {/* Hidden real file input opened by the camera icon. */}
            <input
              ref={fileInputRef}
              className="profile-desktop-file-input"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />

            {/* Camera icon opens the image file picker. */}
            <button
              type="button"
              className="profile-desktop-camera"
              onClick={openFilePicker}
              aria-label="Choose profile photo"
            >
              <i className="fa-solid fa-camera"></i>
            </button>

          </section>

          {/* Five profile menu cards are now display-only. */}
          <section className="profile-desktop-menu-panel">

            <div className="profile-desktop-menu-card">
              <i className="fa-solid fa-user"></i>
              <span>Account overview</span>
              <b>&gt;</b>
            </div>

            <div className="profile-desktop-menu-card">
              <i className="fa-regular fa-file-lines"></i>
              <span>My reports</span>
              <b>&gt;</b>
            </div>

            <div className="profile-desktop-menu-card">
              <i className="fa-solid fa-bell"></i>
              <span>Notifications</span>
              <b>&gt;</b>
            </div>

            <div className="profile-desktop-menu-card">
              <i className="fa-regular fa-clipboard"></i>
              <span>My Claims</span>
              <b>&gt;</b>
            </div>

            <div className="profile-desktop-menu-card">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
              <b>&gt;</b>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}

// Export the Student Desktop Profile screen.
export default ProfileDesktop;
