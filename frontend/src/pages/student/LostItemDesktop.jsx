// Import React and the hooks needed for form state and the success notification.
import React, { useEffect, useState } from 'react';

// Import the desktop Lost Item screen styles.
import './LostItemDesktop.css';

// Import the shared API connection for communicating with the backend.
import api from '../../services/api';

// Define the Student Desktop Lost Item component.
function LostItemDesktop() {
  // Store the name of the item being reported.
  const [itemName, setItemName] = useState('');

  // Store the description of the lost item.
const [description, setDescription] = useState('');

// Track whether the report is currently being submitted.
const [isSubmitting, setIsSubmitting] = useState(false);

  // Store the selected item category.
  const [category, setCategory] = useState('');

  // Store the location where the item was lost.
  const [location, setLocation] = useState('');

  // Store the date the item was lost.
  const [dateFound, setDateFound] = useState('');

  // Store the optional image selected from the computer.
  const [imageFile, setImageFile] = useState(null);

  // Store the preview URL for the selected image.
  const [imagePreview, setImagePreview] = useState('');

  // Track whether the submission success notification is visible.
  const [showSuccess, setShowSuccess] = useState(false);

  // Hide the success notification after three seconds.
  useEffect(() => {
    if (!showSuccess) return;

    // Start the notification dismissal timer.
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // Clear the timer if the component updates or unmounts.
    return () => clearTimeout(timer);
  }, [showSuccess]);

  // Navigate to the selected desktop page.
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // Return to the page the student visited immediately before this screen.
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('/search');
    }
  };

  // Store the selected image and create its preview.
  const handleImageChange = (event) => {
    // Get the first selected image file.
    const selectedFile = event.target.files[0];

    // Stop if the student did not select a file.
    if (!selectedFile) return;

    // Accept image files only.
    if (!selectedFile.type.startsWith('image/')) return;

    // Release the previous preview URL when another image is selected.
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Save the selected image file.
    setImageFile(selectedFile);

    // Create a temporary URL to display the selected image.
    setImagePreview(URL.createObjectURL(selectedFile));
  };


// Submit the Lost Item report to the backend.
const handleSubmit = async (event) => {
  // Prevent the browser from reloading the page.
  event.preventDefault();

  // Retrieve the logged-in student's authentication token.
  const token = localStorage.getItem('token');

  // Stop submission if the student is not logged in.
  if (!token) {
    alert('Your session has expired. Please log in again.');
    return;
  }

  // Create FormData to send text fields and the optional photograph.
  const formData = new FormData();

  // Add the report details using the backend's expected field names.
  formData.append('report_type', 'lost');
  formData.append('title', itemName);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('location', location);
  formData.append('date_lost_found', dateFound);

  // Add the photograph if the student selected one.
  if (imageFile) {
    formData.append('photo', imageFile);
  }

  try {
    // Show that the report is being submitted.
    setIsSubmitting(true);

    // Send the report and authentication token to the backend.
    await api.post('/reports', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Display success only after the backend saves the report.
    setShowSuccess(true);

    // Clear the form fields.
    setItemName('');
    setDescription('');
    setCategory('');
    setLocation('');
    setDateFound('');

    // Release the selected image preview URL.
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Clear the selected photograph and preview.
    setImageFile(null);
    setImagePreview('');

    // Reset the native form fields.
    event.target.reset();

  } catch (error) {
    // Display the error returned by the backend, if available.
    alert(
      error.response?.data?.message ||
      'Unable to submit your report. Please try again.'
    );

  } finally {
    // Allow another submission after the request finishes.
    setIsSubmitting(false);
  }
};

  // Display the Student Desktop Lost Item screen.
  return (
    <div className="desktop-lost-item-page">

      {/* Display the maroon desktop sidebar. */}
      <aside className="desktop-lost-item-sidebar">

        {/* Display the university branding. */}
        <div className="desktop-lost-item-brand">
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />
          <span>UNI - FIND</span>
        </div>

        {/* Display the desktop navigation links. */}
        <nav className="desktop-lost-item-navigation">

          {/* Navigate to the Student Desktop Dashboard. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/student-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-bars"></i>
            </span>
            <span>Dashboard</span>
          </button>

          {/* Navigate to Search. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/search')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <span>Search</span>
          </button>

          {/* Mark Lost Items as the active sidebar section. */}
          <button
            className="desktop-lost-item-nav-item active"
            onClick={() => navigateTo('/lost-item-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">?</span>
            <span>Lost Items</span>
          </button>

          {/* Navigate to Found Items. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/found-item-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-circle-check"></i>
            </span>
            <span>Found Items</span>
          </button>

          {/* Navigate to My Reports. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/my-reports-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-list-ul"></i>
            </span>
            <span>My Reports</span>
          </button>

          {/* Navigate to My Claims. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/my-claims-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-regular fa-clipboard"></i>
            </span>
            <span>My Claims</span>
          </button>

          {/* Navigate to Notifications. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/notifications-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-bell"></i>
            </span>
            <span>Notifications</span>
          </button>

          {/* Navigate to Profile. */}
          <button
            className="desktop-lost-item-nav-item"
            onClick={() => navigateTo('/profile-desktop')}
          >
            <span className="desktop-lost-item-nav-icon">
              <i className="fa-solid fa-user"></i>
            </span>
            <span>Profile</span>
          </button>

          {/* Log out and return to the login page. */}
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

      {/* Display the main desktop content area. */}
      <main className="desktop-lost-item-main">

        {/* Display the white top navigation bar. */}
        <header className="desktop-lost-item-topbar">

          {/* Display the university crest. */}
          <img
            className="desktop-lost-item-topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          {/* Display the top-bar actions. */}
          <div className="desktop-lost-item-topbar-actions">

            {/* Navigate to Notifications. */}
            <button
              className="desktop-lost-item-notification"
              aria-label="Notifications"
              onClick={() => navigateTo('/notifications-desktop')}
            >
              <i className="fa-solid fa-bell"></i>
            </button>

            {/* Display the student profile photograph. */}
            <img
              className="desktop-lost-item-avatar"
              src="/images/GRACE-AVATAR.png"
              alt="Student profile"
            />

          </div>
        </header>

        {/* Display the Lost Item form card. */}
        <section className="desktop-lost-item-card">

          {/* Display the maroon form heading bar. */}
          <div className="desktop-lost-item-card-header">

            {/* Return to the previous page. */}
            <button
              type="button"
              className="desktop-lost-item-back-arrow"
              aria-label="Go back"
              onClick={goBack}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* Display the form title. */}
            <h2>Lost Item</h2>

          </div>

          {/* Handle the Lost Item form submission. */}
          <form
            className="desktop-lost-item-form"
            onSubmit={handleSubmit}
          >

            {/* Open the computer file picker and display the selected image. */}
            <label
              className="desktop-lost-item-upload"
              htmlFor="desktop-lost-item-image"
            >

              {/* Display the selected image preview or upload prompt. */}
              {imagePreview ? (
                <img
                  className="desktop-lost-item-image-preview"
                  src={imagePreview}
                  alt="Selected item"
                />
              ) : (
                <>
                  <i className="fa-solid fa-camera"></i>
                  <span>Upload Photos (Optional)</span>
                </>
              )}

            </label>

            {/* Keep the actual file picker hidden behind the upload box. */}
            <input
              id="desktop-lost-item-image"
              className="desktop-lost-item-file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* Display the item details heading. */}
            <h3 className="desktop-lost-item-section-title">
              Item Details
            </h3>

            {/* Enter the lost item's name. */}
            <div className="desktop-lost-item-field">
              <label htmlFor="desktop-lost-item-name">Item name</label>
              <input
                id="desktop-lost-item-name"
                type="text"
                placeholder="e.g phone, wallet..."
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
                required
              />
            </div>

            {/* Enter the lost item's category. */}
            <div className="desktop-lost-item-field">
              <label htmlFor="desktop-lost-item-category">Category</label>
              <div className="desktop-lost-item-input-wrapper">
                <input
                  id="desktop-lost-item-category"
                  type="text"
                  placeholder="Select Category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                />
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* Enter the location where the item was lost. */}


            {/* Enter a description of the lost item. */}
<div className="desktop-lost-item-field">
  <label htmlFor="desktop-lost-item-description">
    Description
  </label>

  <textarea
    id="desktop-lost-item-description"
    placeholder="Describe the lost item..."
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    required
  />
</div>


            <div className="desktop-lost-item-field">
              <label htmlFor="desktop-lost-item-location">Location Found</label>
              <div className="desktop-lost-item-input-wrapper">
                <input
                  id="desktop-lost-item-location"
                  type="text"
                  placeholder="Select Location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* Enter the date the item was lost. */}
            <div className="desktop-lost-item-field">
              <label htmlFor="desktop-lost-item-date">Date Found</label>
              <div className="desktop-lost-item-input-wrapper">
                <input
                  id="desktop-lost-item-date"
                  type="date"
                  value={dateFound}
                  onChange={(event) => setDateFound(event.target.value)}
                  required
                />
                <i className="fa-regular fa-calendar-days"></i>
              </div>
            </div>

            {/* Submit the Lost Item report. */}
                        {/* Submit the Lost Item report. */}
            <button
              type="submit"
              className="desktop-lost-item-submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting ? 'Submitting...' : 'Submit Lost Item'}
              </span>

              <i className="fa-solid fa-arrow-right"></i>
            </button>

          </form>
        </section>

        {/* Display the temporary success notification after submission. */}
        {showSuccess && (
          <div
            className="desktop-lost-item-success"
            role="status"
            aria-live="polite"
          >
            YOUR LOST ITEM REPORT HAS BEEN SUBMITTED
          </div>
        )}

      </main>
      
    </div>
  );
}

// Export the desktop Lost Item component for use in App.jsx.
export default LostItemDesktop;