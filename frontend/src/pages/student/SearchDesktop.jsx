
// Import React hooks for storing and loading search information.
import React, { useEffect, useState } from 'react';

// Import the shared API connection to retrieve database reports.
import api from '../../services/api';

import './SearchDesktop.css';

// Reuse the existing Student Dashboard styles for the standard mobile bottom navigation.
import './StudentDashboard.css';

// Student Desktop Search screen.
function Search() {
  // Store the search text entered by the student.
  const [searchTerm, setSearchTerm] = useState('');

  // Store the selected item category.
  const [activeTab, setActiveTab] = useState('LOST ITEMS');

  // Store the reports retrieved from the backend database.
const [reportedItems, setReportedItems] = useState([]);

// Store whether reports are currently being loaded.
const [isLoading, setIsLoading] = useState(true);

// Retrieve visible lost and found reports when the Search page opens.
useEffect(() => {
  // Define the function that retrieves reports from the backend.
  const fetchReports = async () => {
    try {
      // Retrieve the student's authentication token.
      const token = localStorage.getItem('token');

      // Request all visible reports from the backend.
      const response = await api.get('/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Store the reports returned by the database.
      setReportedItems(response.data.reports || []);
    } catch (error) {
      // Log an error if the reports cannot be retrieved.
      console.error('Unable to retrieve reports:', error);
    } finally {
      // Stop displaying the loading state.
      setIsLoading(false);
    }
  };

  // Start retrieving reports.
  fetchReports();
}, []);


  // Store the items displayed on the Search screen.
  const items = [
    {
      id: 1,
      image: '/images/CHARGER.png',
      name: 'Phone Charger',
      status: 'UNDER REVIEW',
      date: 'Jan 11',
    },
    {
      id: 2,
      image: '/images/PINK-HEADSETS.png',
      name: 'Pink Headsets',
      status: 'FOUND',
      date: 'Nov 2',
    },
    {
      id: 3,
      image: '/images/BLUE-BACKPACK.png',
      name: 'Blue Backpack',
      status: 'LOST',
      date: 'Oct 17',
    },
    {
      id: 4,
      image: '/images/SPECTACLES.png',
      name: 'Spectacles (Glasses)',
      status: 'FOUND',
      date: 'Sept 18',
    },
    {
      id: 5,
      image: '/images/BLACK-BACKPACK.png',
      name: 'Black Backpack',
      status: 'LOST',
      date: 'Apr 23',
    },
    {
      id: 6,
      image: '/images/WATER-BOTTLE.png',
      name: 'Black Water Bottle',
      status: 'UNDER REVIEW',
      date: 'Mar 5',
    },
  ];

    // Convert database reports into the format used by the Search item cards.
  const databaseItems = reportedItems.map((report) => ({
    id: `report-${report.report_id}`,
    image: report.photo || '/images/CHARGER.png',
    name: report.title,
    status: report.report_type.toUpperCase(),
    date: new Date(report.date_lost_found).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    reportType: report.report_type,
    category: report.category,
    description: report.description,
    location: report.location,
  }));

  // Combine the existing sample items with reports from the database.
  const allItems = [...items, ...databaseItems];

  // Filter items using the search text and selected category.
// Filter sample items and database reports using the search text and selected tab.
const filteredItems = allItems.filter((item) => {
  // Search by item name, category, description, or location.
  const searchableText = [
    item.name,
    item.category || '',
    item.description || '',
    item.location || '',
  ].join(' ').toLowerCase();

  const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

  // Show Lost reports or Found reports according to the selected tab.
 const matchesCategory =
  activeTab === 'LOST ITEMS'
    ? ['LOST', 'UNDER REVIEW'].includes(item.status?.trim().toUpperCase())
    : item.status?.trim().toUpperCase() === 'FOUND';

  return matchesSearch && matchesCategory;
});
  // Navigate to another desktop section.
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="desktop-search-page">

      {/* Sidebar */}
      <aside className="desktop-search-sidebar">

        {/* University branding */}
        <div className="desktop-search-brand">
          <img src="/images/2%20UCU%20LOGO%20TRANSPARENT.png" alt="UCU Crest" />
          <h1>UNI - FIND</h1>
        </div>

        {/* Sidebar navigation */}
        <nav className="desktop-search-navigation">

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/student-desktop')}
          >
            <span className="desktop-search-nav-icon">☰</span>
            <span>Dashboard</span>
          </button>

          <button
            className="desktop-search-nav-item active"
            onClick={() => navigateTo('/search')}
          >
            <span className="desktop-search-nav-icon">⌕</span>
            <span>Search</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/lost-item-desktop')}
          >
            <span className="desktop-search-nav-icon">?</span>
            <span>Lost Items</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/found-item-desktop')}
          >
            <span className="desktop-search-nav-icon">●</span>
            <span>Found Items</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/my-reports')}
          >
            <span className="desktop-search-nav-icon">☷</span>
            <span>My Reports</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/my-claims')}
          >
            <span className="desktop-search-nav-icon">▤</span>
            <span>My Claims</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/notifications')}
          >
            <span className="desktop-search-nav-icon">♟</span>
            <span>Notifications</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/profile')}
          >
            <span className="desktop-search-nav-icon">♟</span>
            <span>Profile</span>
          </button>

          <button
            className="desktop-search-nav-item"
            onClick={() => navigateTo('/')}
          >
            <span className="desktop-search-nav-icon">⇦</span>
            <span>Logout</span>
          </button>

        </nav>
      </aside>

      {/* Main content */}
      <main className="desktop-search-main">

        {/* Top bar */}
        <header className="desktop-search-topbar">
          <div className="desktop-search-topbar-brand">
            <img src="/images/2%20UCU%20LOGO%20TRANSPARENT.png" alt="UCU Crest" />
            <h2>UCU Lost &amp; Found</h2>
          </div>

          <div className="desktop-search-topbar-actions">
            <button
              className="desktop-search-notification"
              aria-label="Notifications"
              onClick={() => navigateTo('/notifications')}
            >
              ♟
            </button>

            <img
              className="desktop-search-avatar"
              src="/images/GRACE-AVATAR.png"
              alt="Student profile"
            />
          </div>
        </header>

        {/* Search bar */}
        <section className="desktop-search-searchbar">
          <span className="desktop-search-magnifier">⌕</span>

          <input
            type="text"
            placeholder="Browse Items"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <span className="desktop-search-filter-icon">☰</span>
        </section>

        {/* Item category tabs */}
        <section className="desktop-search-tabs">

          <button
            className={activeTab === 'LOST ITEMS' ? 'selected' : ''}
            onClick={() => setActiveTab('LOST ITEMS')}
          >
            LOST ITEMS
          </button>

          <button
            className={activeTab === 'FOUND ITEMS' ? 'selected' : ''}
            onClick={() => setActiveTab('FOUND ITEMS')}
          >
            FOUND ITEMS
          </button>

        </section>

        {/* Item cards */}
        {/* Item cards */}

        
<section className="desktop-search-item-grid">

  {/* Show a message while database reports are loading. */}
  {isLoading && (
    <p>Loading reported items...</p>
  )}

  {/* Display matching sample items and database reports. */}
  {!isLoading && filteredItems.map((item) => (


            <article
  className="desktop-search-item-card"
  key={item.id}
  onClick={() => {
    if (item.name === 'Blue Backpack') {
      navigateTo('/item-details-desktop');
    }
  }}
  style={{
    cursor: item.name === 'Blue Backpack' ? 'pointer' : 'default',
  }}
>

              <img
                className="desktop-search-item-image"
                src={item.image}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              <div className="desktop-search-item-details">

                <span
                  className={`desktop-search-status ${item.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {item.status}
                </span>

                <span className="desktop-search-item-date">
                  ● &nbsp; {item.date}
                </span>

              </div>

            </article>
          ))}
          
          {/* Explain when no items match the search or selected tab. */}
{!isLoading && filteredItems.length === 0 && (
  <p className="desktop-search-empty">
    No items found. Try another search.
  </p>
)}

        </section>

      </main>
    </div>
  );
}

export default Search;
