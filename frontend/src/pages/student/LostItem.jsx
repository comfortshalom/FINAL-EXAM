
import React, { useState, useEffect } from 'react';
import './LostItem.css';

// Display the mobile Lost Item reporting screen.
function LostItem() {

  // Store the selected image.
  const [selectedImage, setSelectedImage] = useState(null);

  // Store the selected image preview URL.
  const [imagePreview, setImagePreview] = useState('');

  // Store the information entered into the form.
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [dateFound, setDateFound] = useState('');

  // Control the success notification.
  const [showSuccess, setShowSuccess] = useState(false);

  // Create and clean up the image preview URL.
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview('');
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  // Handle image selection.
  const handleImageChange = (event) => {
    const image = event.target.files[0];

    if (image) {
      setSelectedImage(image);
    }
  };

  // Handle form submission.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Display the success notification.
    setShowSuccess(true);
  };

  // Clear the form after the success notification disappears.
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
      setItemName('');
      setCategory('');
      setLocation('');
      setDateFound('');
      setSelectedImage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="lost-item-page">

      {/* Maroon application header */}
      <header className="lost-item-header">

        {/* Back arrow returns to Student Home */}
        <i
          className="fa-solid fa-arrow-left"
          onClick={() => window.location.href = '/student'}
        ></i>

        {/* Screen title */}
        <h1>Lost Item</h1>

      </header>

      {/* Lost item form panel */}
      <main className="lost-item-content">

        {/* Image upload area */}
        <label className="lost-item-upload-box">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected item"
              className="lost-item-preview"
            />
          ) : (
            <>
              <i className="fa-solid fa-camera"></i>
              <span>Upload Photos (Optional)</span>
            </>
          )}

        </label>

        {/* Item details form */}
        <form
          className="lost-item-form-section"
          onSubmit={handleSubmit}
        >

          {/* Form heading */}
          <h2>Item Details</h2>

          {/* Item name field */}
          <div className="lost-item-field">
            <label htmlFor="lost-item-name">Item name</label>
            <input
              id="lost-item-name"
              className="lost-item-input"
              type="text"
              placeholder="e.g phone, wallet..."
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              required
            />
          </div>

          {/* Category field */}
          <div className="lost-item-field">
            <label htmlFor="lost-item-category">Category</label>
            <input
              id="lost-item-category"
              className="lost-item-input"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>

          {/* Location field */}
          <div className="lost-item-field">
            <label htmlFor="lost-item-location">Location Found</label>
            <input
              id="lost-item-location"
              className="lost-item-input"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>

          {/* Date field */}
          <div className="lost-item-field date-field">
            <label htmlFor="lost-item-date">Date Found</label>
            <input
              id="lost-item-date"
              className="lost-item-input"
              type="date"
              value={dateFound}
              onChange={(event) => setDateFound(event.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="lost-item-submit-button"
          >
            <span>Submit Lost Item</span>
            <i className="fa-solid fa-arrow-right-long"></i>
          </button>

        </form>

      </main>

      {/* Green success notification */}
      {showSuccess && (
        <div className="lost-item-success-message">
          <i className="fa-solid fa-circle-check"></i>
          <span>YOUR LOST ITEM REPORT HAS BEEN SUBMITTED</span>
        </div>
      )}

    </div>
  );
}

// Export the Lost Item screen.
export default LostItem;
