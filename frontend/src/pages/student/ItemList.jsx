
import React from 'react';
import './ItemList.css';



// Display the original mobile Item List screen.
function ItemList() {
  return (
    <div className="item-list-page">

      {/* Screen heading */}
      <h2 className="item-list-label">ITEM LIST</h2>

      {/* Mobile phone screen */}
      <div className="item-list-phone">
        <div className="item-list-screen">

          
          

          {/* Browse Items search bar */}
          <div className="item-list-content">

            <div className="item-list-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Browse Items</span>
              <i className="fa-solid fa-bars"></i>
            </div>

            {/* Lost and Found tabs */}
            <div className="item-list-tabs">
              <button className="item-tab active">
                LOST ITEMS
              </button>

              <button className="item-tab">
                FOUND ITEMS
              </button>
            </div>

            {/* List of reported items */}
            <div className="item-list-cards">

              {/* Blue Backpack */}
              {/* Blue Backpack - Opens the Item Details page. */}
<div
  className="item-list-card"
  onClick={() => {
    window.location.href = '/item-details';
  }}
  style={{ cursor: 'pointer' }}
>
                <img
                  src="/images/BLUE-BACKPACK.png"
                  alt="Blue Backpack"
                />

                <div className="item-list-information">
                  <strong>BLUE BACKPACK</strong>
                  <span>Library</span>
                  <span>April 20, 2025</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Keys */}
              <div className="item-list-card">
                <img
                  src="/images/KEYS.png"
                  alt="Keys"
                />

                <div className="item-list-information">
                  <strong>KEYS</strong>
                  <span>M Block M4</span>
                  <span>Jan 8, 2025</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* iPhone 14 */}
              <div className="item-list-card">
                <img
                  src="/images/IPHONE.png"
                  alt="iPhone 14"
                />

                <div className="item-list-information">
                  <strong>I PHONE 14</strong>
                  <span>N Block N11B</span>
                  <span>Nov 28, 2025</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Water Bottle */}
              <div className="item-list-card">
                <img
                  src="/images/WATER-BOTTLE.png"
                  alt="Water Bottle"
                />

                <div className="item-list-information">
                  <strong>WATER BOTTLE</strong>
                  <span>UCU Pitch</span>
                  <span>Sept 14, 2025</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Spectacles */}
              <div className="item-list-card">
                <img
                  src="/images/SPECTACLES.png"
                  alt="Spectacles"
                />

                <div className="item-list-information">
                  <strong>SPECTACLES (GLASSES)</strong>
                  <span>Cafeteria</span>
                  <span>March 04, 2025</span>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
              </div>

            </div>
          </div>

          
      {/* Standard five-tab mobile bottom navigation. */}
      <nav className="student-bottom-nav">

        {/* Home navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/student';
          }}
        >
          <span>⌂</span>
          <small>Home</small>
        </button>

        {/* My Report navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/my-reports';
          }}
        >
          <span>▤</span>
          <small>My Report</small>
        </button>

        {/* Search navigation item. */}
        <button className="student-nav-item active">
          <span>⌕</span>
          <small>Search</small>
        </button>

        {/* My Claims navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/my-claims';
          }}
        >
          <span>▤</span>
          <small>My Claims</small>
        </button>

        {/* Profile navigation item. */}
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/profile';
          }}
        >
          <span>♙</span>
          <small>Profile</small>
        </button>

      </nav>

    
      </div>
    </div>
    </div>
  );
}

// Export the Item List screen.
export default ItemList;
