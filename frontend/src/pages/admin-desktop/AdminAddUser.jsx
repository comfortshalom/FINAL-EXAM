
// Import React and the useState hook for managing the form.
import React, { useState } from 'react';

// Import the stylesheet for the Create Administrator Account screen.
import './AdminAddUser.css';

// Import the shared API connection for communicating with the backend.
import api from '../../services/api';

// Define the Create Administrator Account desktop screen.
function AdminAddUser() {

  // Store the values entered into the administrator creation form.
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Track whether the account creation request is processing.
  const [isLoading, setIsLoading] = useState(false);

  // Track whether the account creation success message is visible.
  const [showSuccess, setShowSuccess] = useState(false);

  // Store any error returned during account creation.
  const [errorMessage, setErrorMessage] = useState('');

  // Update the appropriate form field whenever its value changes.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear previous messages when the user edits the form.
    setErrorMessage('');
    setShowSuccess(false);
  };

  // Clear all administrator form fields.
  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Validate and save a new administrator account in the database.
  const handleCreateAccount = async (event) => {
    event.preventDefault();

    // Retrieve the administrator's form details.
    const { fullName, email, password, confirmPassword } = formData;

    // Clear previous messages before starting.
    setErrorMessage('');
    setShowSuccess(false);

    // Stop if any required field is empty.
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Check that the email address has a valid format.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Ensure both password fields match.
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Ensure the password meets the backend minimum length.
    if (password.length < 8) {
      setErrorMessage('Password must contain at least 8 characters.');
      return;
    }

    // Retrieve the Main Administrator's saved login token.
    const token = localStorage.getItem('token');

    // Stop if the Main Administrator is not logged in.
    if (!token) {
      setErrorMessage('Your session has expired. Please log in again.');
      return;
    }

    // Indicate that the account creation request is processing.
    setIsLoading(true);

    try {
      // Send the administrator details to the protected backend endpoint.
      const response = await api.post(
        '/super-admin/admins',
        {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
        },
        {
          // Attach the Main Administrator's authentication token.
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Display success only after the database confirms account creation.
      if (response.data.success) {
        setShowSuccess(true);

        // Clear the form after successful account creation.
        clearForm();

        // Hide the success message after three seconds.
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }

    } catch (error) {
      // Display the error message returned by the backend.
      setErrorMessage(
        error.response?.data?.message ||
        'Unable to create administrator account. Please try again.'
      );

    } finally {
      // Stop the loading state after the request finishes.
      setIsLoading(false);
    }
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
            onSubmit={handleCreateAccount}
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

            {/* Display backend error messages when account creation fails. */}
            {errorMessage && (
              <div className="admin-add-user-error-message">
                {errorMessage}
              </div>
            )}

            {/* Display success only after the backend saves the account. */}
            {showSuccess && (
              <div className="admin-add-user-success-message">
                YOUR ACCOUNT HAS BEEN CREATED SUCCESSFULLY.
              </div>
            )}

            {/* Display the Create Account and Cancel buttons. */}
            <div className="admin-add-user-buttons">

              <button
                type="submit"
                className="admin-add-user-create-button"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                type="button"
                className="admin-add-user-cancel-button"
                onClick={() => {
                  clearForm();
                  setShowSuccess(false);
                  setErrorMessage('');
                }}
                disabled={isLoading}
              >
                Cancel
              </button>

            </div>

          </form>
        </main>
      </div>
    </div>
  );
}

// Export the component so App.jsx can display this page.
export default AdminAddUser;
