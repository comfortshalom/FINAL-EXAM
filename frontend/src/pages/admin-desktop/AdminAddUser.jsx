
// Import React and the useState hook for managing the form.
import React, { useState } from 'react';

// Import the stylesheet for the Create Administrator Account screen.
import './AdminAddUser.css';

// Define the Create Administrator Account desktop screen.
function AdminAddUser() {

  // Store the values entered into the administrator creation form.
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  // Update the appropriate form field whenever its value changes.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Clear all form fields when Create Account or Cancel is clicked.
  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Track whether the account creation success message is visible.
const [showSuccess, setShowSuccess] = useState(false);



// Validate all required fields before showing the success message.
const handleCreateAccount = () => {
  const { fullName, email, role, password, confirmPassword } = formData;

  // Stop if any required field is empty.
  if (!fullName.trim() || !email.trim() || !role || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
    return;
  }

  // Check that the email address has a valid format.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Ensure both password fields match.
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Clear the form and display the temporary success message.
  clearForm();
  setShowSuccess(true);

  // Hide the success message after 3 seconds.
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};


  return (
    <div className="admin-add-user-page">

    

      {/* Main application layout containing the sidebar and page content. */}
      <div className="admin-add-user-app">

        {/* Sidebar containing the administration navigation. */}
        <aside className="admin-add-user-sidebar">

          {/* Display the university crest and application name. */}
          <div className="admin-add-user-brand">
            <img
              src="/images/2 UCU LOGO TRANSPARENT.png"
              alt="UCU Crest"
              className="admin-add-user-crest"
            />
            <span>UNI - FIND</span>
          </div>

          {/* Provide links to the desktop administration pages. */}
          <nav className="admin-add-user-navigation">

            <a href="/admin-desktop" className="admin-add-user-nav-link">
              <i className="fa-solid fa-bars"></i>
              <span>Dashboard</span>
            </a>

            <a href="/admin-reports-desktop" className="admin-add-user-nav-link">
              <i className="fa-regular fa-clipboard"></i>
              <span>Reports</span>
            </a>

            <a href="/admin-claims-desktop" className="admin-add-user-nav-link">
              <i className="fa-solid fa-circle-check"></i>
              <span>Claims</span>
            </a>

            <a
              href="/admin-users-desktop"
              className="admin-add-user-nav-link active"
            >
              <i className="fa-regular fa-circle-user"></i>
              <span>Users</span>
            </a>

            <a href="/admin-administrators-desktop" className="admin-add-user-nav-link">
              <i className="fa-solid fa-users"></i>
              <span>Administrators</span>
            </a>

            <a href="/admin-settings-desktop" className="admin-add-user-nav-link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>

            <a href="/" className="admin-add-user-nav-link">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </a>

          </nav>
        </aside>

        {/* Main content area containing the administrator creation form. */}
        <main className="admin-add-user-main">

          {/* Return to the Administrators page. */}
          <a
            href="/admin-administrators-desktop"
            className="admin-add-user-back-button"
          >
            <i className="fa-solid fa-chevron-left"></i>
            <span>BACK</span>
          </a>

          {/* Display the user creation icon above the heading. */}
          <div className="admin-add-user-heading-icon">
            <i className="fa-solid fa-user-plus"></i>
          </div>

          {/* Display the form heading. */}
          <h1 className="admin-add-user-heading">
            Create Administrator Account
          </h1>

          {/* Administrator account creation form. */}
          <form
            className="admin-add-user-form"
            onSubmit={(event) => event.preventDefault()}
          >

            {/* Full name field. */}
            <div className="admin-add-user-field">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email address field. */}
            <div className="admin-add-user-field">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Role selection field with Student and Administrator options. */}
            <div className="admin-add-user-field">
              <label>Role *</label>

              <div className="admin-add-user-input-wrapper">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="admin-add-user-role-select"
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Administrator">Administrator</option>
                </select>

                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* Password field. */}
            <div className="admin-add-user-field">
              <label>Password *</label>
              <div className="admin-add-user-input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <i className="fa-regular fa-eye"></i>
              </div>
            </div>

            {/* Confirm password field. */}
            <div className="admin-add-user-field">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Display the Create Account and Cancel buttons. */}
            <div className="admin-add-user-buttons">

              <button
  type="button"
  className="admin-add-user-create-button"
  onClick={handleCreateAccount}
>
  Create Account
</button>
              <button
  type="button"
  className="admin-add-user-cancel-button"
  onClick={() => {
    clearForm();
    setShowSuccess(false);
  }}
>
  Cancel
</button>

{showSuccess && (
  <div className="admin-add-user-success-message">
    YOU ACCOUNT HAS BEEN CREATED
  </div>
)}
            </div>

          </form>
        </main>
      </div>
    </div>
  );
}

// Export the component so App.jsx can display this page.
export default AdminAddUser;
