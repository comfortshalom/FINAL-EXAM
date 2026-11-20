
// Import React and useState to manage the Found Item form.
import React, { useState } from 'react';

// Reuse the Lost Item stylesheet to maintain the same design.
import './LostItem.css';

// Display the mobile Found Item reporting screen.
function FoundItem() {

  // Store the selected image.
  const [selectedImage, setSelectedImage] = useState(null);

  // Store the information entered into the form.
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [dateFound, setDateFound] = useState('');

  // Control the success notification.
  const [showSuccess, setShowSuccess] = useState(false);

  // Open the phone gallery and select an image.
  const handleImageChange = (event) => {
    const image = event.target.files[0];

    if (image) {
      setSelectedImage(image);
    }
  };

  // Submit the form and display the success message.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that all required fields have been completed.
    if (!itemName || !category || !location || !dateFound) {
      alert('Please fill in all the item details.');
      return;
    }

    // Display the Found Item success notification.
    setShowSuccess(true);

    // Hide the notification after three seconds.
    setTimeout(() => {

      setShowSuccess(false);

      // Clear all form fields after the notification disappears.
      setItemName('');
      setCategory('');
      setLocation('');
      setDateFound('');
      setSelectedImage(null);

      // Clear the image picker selection.
      const imageInput = document.getElementById('found-item-image');

      if (imageInput) {
        imageInput.value = '';
      }

    }, 3000);
  };

  return (
    <div className="lost-item-page">

      {/* Maroon application header */}
      <header className="lost-item-header">

        {/* Back arrow returns to Student Home */}
        <i
          className="fa-solid fa-arrow-left"
          onClick={() => {
            window.location.href = '/student';
          }}
        ></i>

        {/* Screen title */}
        <h1>Found Item</h1>

      </header>

      {/* Found Item form panel */}
      <main className="lost-item-content">

        {/* Image upload area */}
        <label className="lost-item-upload-box">

          <input
            id="found-item-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected found item"
              className="lost-item-preview"
            />
          ) : (
            <>
              <i className="fa-solid fa-camera"></i>
              <span>Upload Photos (Optional)</span>
            </>
          )}

        </label>

        {/* Found Item details form */}
        <form
          className="lost-item-form-section"
          onSubmit={handleSubmit}
        >

          {/* Form heading */}
          <h2>Item Details</h2>

          {/* Item name */}
          <div className="lost-item-field">
            <label htmlFor="found-item-name">Item name</label>
            <input
              id="found-item-name"
              className="lost-item-input"
              type="text"
              placeholder="e.g phone, wallet..."
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="lost-item-field">
            <label htmlFor="found-item-category">Category</label>
            <input
              id="found-item-category"
              className="lost-item-input"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>

          {/* Location where the item was found */}
          <div className="lost-item-field">
            <label htmlFor="found-item-location">Location Found</label>
            <input
              id="found-item-location"
              className="lost-item-input"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>

          {/* Date the item was found */}
          <div className="lost-item-field date-field">
            <label htmlFor="found-item-date">Date Found</label>
            <input
              id="found-item-date"
              className="lost-item-input"
              type="date"
              value={dateFound}
              onChange={(event) => setDateFound(event.target.value)}
              required
            />
          </div>

          {/* Submit Found Item button */}
          <button
            type="submit"
            className="lost-item-submit-button"
          >
            <span>Submit Found Item</span>
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>

        </form>

      </main>

      {/* Found Item success notification */}
      {showSuccess && (
        <div className="lost-item-success-message">
          <i className="fa-solid fa-circle-check"></i>
          <span>THIS ITEM HAS BEEN SUBMITTED THANK YOU !</span>
        </div>
      )}

    </div>
  );
}

// Export the Found Item screen.
export default FoundItem;
