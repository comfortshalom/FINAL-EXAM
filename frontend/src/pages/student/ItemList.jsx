
import React from 'react';
import './ItemList.css';

// Display the mobile Item List screen.
function ItemList() {
  return (
    <div className="item-list-page">

      {/* Label displayed above the mobile phone */}
      <div className="item-list-label">ITEM LIST</div>

      {/* Outer Android phone frame */}
      <div className="item-list-phone">
        <div className="item-list-screen">

          {/* Screen content */}
          <div className="item-list-content">

            {/* Search bar */}
            <div className="item-list-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Browse Items</span>
              <i className="fa-solid fa-bars"></i>
            </div>

            {/* Lost and found tabs */}
            <div className="item-list-tabs">
              <button className="item-tab active">LOST ITEMS</button>
              <button className="item-tab">FOUND ITEMS</button>
            </div>

            {/* Lost item cards */}
            <div className="item-list-cards">

              {/* Blue Backpack card - opens Item Details */}
              <div
                className="item-list-card"
                onClick={() => window.location.href = '/item-details'}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/BACKPACK.png" alt="Blue backpack" />
                <div className="item-list-information">
                  <strong>BLUE BACKPACK</strong>
                  <span>LOST • Library</span>
                  <span>April 20, 2025</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Keys card */}
              <div className="item-list-card">
                <img src="/images/KEYS.png" alt="Keys" />
                <div className="item-list-information">
                  <strong>KEYS</strong>
                  <span>LOST • M Block M4</span>
                  <span>Jan 8, 2025</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* iPhone card */}
              <div className="item-list-card">
                <img src="/images/IPHONE.png" alt="iPhone 14" />
                <div className="item-list-information">
                  <strong>I PHONE 14</strong>
                  <span>LOST • N Block N11B</span>
                  <span>Nov 28, 2025</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Water Bottle card */}
              <div className="item-list-card">
                <img src="/images/WATER-BOTTLE.png" alt="Water bottle" />
                <div className="item-list-information">
                  <strong>WATER BOTTLE</strong>
                  <span>LOST • UCU Pitch</span>
                  <span>Sept 14, 2025</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Spectacles card */}
              <div className="item-list-card">
                <img src="/images/SPECTACLES.png" alt="Spectacles" />
                <div className="item-list-information">
                  <strong>SPECTACLES (GLASSES)</strong>
                  <span>LOST • Cafeteria</span>
                  <span>March 04, 2025</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

            </div>
          </div>

          {/* Bottom navigation */}
          <nav className="student-bottom-nav">

            {/* Home navigation item */}
            <button className="student-nav-item">
              <span>⌂</span>
              <small>Home</small>
            </button>

            {/* Reports navigation item */}
            <button className="student-nav-item">
              <span>▤</span>
              <small>My Report</small>
            </button>

            {/* Search navigation item */}
            <button className="student-nav-item active">
              <span>⌕</span>
              <small>Search</small>
            </button>

            {/* Claims navigation item */}
            <button className="student-nav-item">
              <span>▤</span>
              <small>My Claims</small>
            </button>

            {/* Profile navigation item */}
            <button className="student-nav-item">
              <span>♙</span>
              <small>Profile</small>
            </button>

          </nav>

          {/* Android home indicator */}
          <div className="item-list-home-indicator"></div>

        </div>
      </div>
    </div>
  );
}

// Export the Item List screen.
export default ItemList;
