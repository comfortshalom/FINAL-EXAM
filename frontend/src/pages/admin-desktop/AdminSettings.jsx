
/* Import the CSS file that controls the Admin Settings desktop layout. */
import './AdminSettings.css';

// Create the Admin Settings desktop screen component.
function AdminSettings() {
  return (
    <div className="admin-settings-page">


      {/* Create the main application container with sidebar and content. */}
      <div className="admin-settings-app">

        {/* Display the maroon administrator navigation sidebar. */}
        <aside className="admin-settings-sidebar">

          {/* Display the university crest and application name. */}
          <div className="admin-settings-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
              className="admin-settings-logo"
            />
            <h1>UNI - FIND</h1>
          </div>

          {/* Display the administrator navigation menu. */}
          <nav className="admin-settings-navigation">

            {/* Link to the administrator dashboard. */}
            <a href="/admin-desktop" className="admin-settings-nav-item">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            {/* Link to administrator reports. */}
            <a href="/admin-reports-desktop" className="admin-settings-nav-item">
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

            {/* Link to administrator claims. */}
            <a href="/admin-claims-desktop" className="admin-settings-nav-item">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            {/* Link to administrator users. */}
            <a href="/admin-users-desktop" className="admin-settings-nav-item">
              <i className="fa-regular fa-user-group"></i>
              <span>Users</span>
            </a>

            {/* Link to administrator management. */}
            <a href="/admin-administrators-desktop" className="admin-settings-nav-item">
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            {/* Display Settings as the active sidebar menu item. */}
            <a
              href="/admin-settings-desktop"
              className="admin-settings-nav-item active"
            >
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a
  href="/"
  className="admin-settings-nav-item"
  onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }}
>
  <i className="fa-solid fa-arrow-right-from-bracket"></i>
  <span>Logout</span>
</a>

          </nav>
        </aside>

        {/* Display the main Settings content area. */}
        <main className="admin-settings-main">

          {/* Display the Settings banner and its back navigation. */}
          <div className="admin-settings-banner">
            <a href="/admin-desktop" className="admin-settings-back">
              <i className="fa-solid fa-chevron-left"></i>
            </a>

            <h2>SETTINGS</h2>
          </div>

          {/* Display the six Settings menu options. */}
          <div className="admin-settings-options">

            {/* Display the Profile Information option. */}
            <div className="admin-settings-option">
              <i className="fa-solid fa-user"></i>
              <span>profile information</span>
              <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
            </div>

            {/* Display the Change Password option. */}
            <div className="admin-settings-option">
              <i className="fa-solid fa-lock"></i>
              <span>Change password</span>
              <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
            </div>

            {/* Display the About UCU Lost and Found option. */}
            <div className="admin-settings-option">
              <i className="fa-regular fa-circle-question"></i>
              <span>About UCU Lost and Found</span>
              <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
            </div>

            {/* Display the System Preferences option. */}
            <div className="admin-settings-option">
              <i className="fa-solid fa-gear"></i>
              <span>System preferences</span>
              <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
            </div>

            {/* Display the Help and Support option. */}
            <div className="admin-settings-option">
              <i className="fa-solid fa-circle-info"></i>
              <span>Help and Support</span>
              <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
            </div>

            {/* Display the Logout option and return to the Login page. */}
<a
  href="/"
  className="admin-settings-option"
  onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }}
>
  <i className="fa-solid fa-right-from-bracket"></i>
  <span>Logout</span>
  <i className="fa-solid fa-chevron-right admin-settings-option-arrow"></i>
</a>

          </div>
        </main>
      </div>
    </div>
  );
}

// Export the Admin Settings screen for use in the application.
export default AdminSettings;
