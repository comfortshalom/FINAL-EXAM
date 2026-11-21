
/* Import React to create the My Reports screen. */
import React from 'react';

/* Import the stylesheet for the My Reports screen. */
import './MyReports.css';

/* Create the Student My Reports screen component. */
function MyReports() {

  /* Store sample lost and found reports for the initial screen design. */
  const reports = [
    {
      id: 1,
      itemName: 'Black Backpack',
      description: 'Black school backpack with front pockets.',
      date: '15 Nov 2026',
      reportType: 'Lost',
      image: '/images/BLACK-BACKPACK.png',
    },
    {
      id: 2,
      itemName: 'Water Bottle',
      description: 'Blue stainless steel water bottle.',
      date: '12 Nov 2026',
      reportType: 'Found',
      image: '/images/WATER-BOTTLE.png',
    },
    {
      id: 3,
      itemName: 'Keys',
      description: 'A set of keys reported missing.',
      date: '08 Nov 2026',
      reportType: 'Lost',
      image: '/images/KEYS.png',
    },
    {
      id: 4,
      itemName: 'Red Wallet',
      description: 'Red wallet found around the university.',
      date: '02 Nov 2026',
      reportType: 'Found',
      image: '/images/RED-WALLET.png',
    },
  ];

  return (
    <div className="my-reports-page">

      {/* Maroon header containing the actual UCU logo. */}
      <header className="reports-header">
        <div className="reports-brand">
          <img
            className="reports-logo"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="Uganda Christian University logo"
          />

          <div className="reports-brand-text">
            <h2>UCU</h2>
            <span>UNI-FIND</span>
          </div>
        </div>

        {/* Open the Student Notifications screen. */}
        <button
          type="button"
          className="reports-notification"
          aria-label="Notifications"
          onClick={() => {
            window.location.href = '/notifications';
          }}
        >
          <i className="fa-solid fa-bell"></i>
        </button>
      </header>

      {/* Main content of the My Reports screen. */}
      <main className="reports-content">

        {/* Screen title and back navigation. */}
        <div className="reports-title-section">
          <button
            type="button"
            className="reports-back-button"
            aria-label="Go back to Student Home"
            onClick={() => {
              window.location.href = '/student';
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div>
            <h1>My Reports</h1>
            <p>View the items you have reported lost or found.</p>
          </div>
        </div>

        {/* Report summary. */}
        <div className="reports-summary">
          <h3>My Previous Reports</h3>
          <span>{reports.length} Reports</span>
        </div>

        {/* Display the student's reported items. */}
        <div className="reports-list">
          {reports.map((report) => (
            <article className="report-card" key={report.id}>

              {/* Item image. */}
              <div className="report-image-slot">
                {report.image ? (
                  <img
                    src={report.image}
                    alt={report.itemName}
                  />
                ) : (
                  <i className="fa-regular fa-image"></i>
                )}
              </div>

              {/* Item information. */}
              <div className="report-information">
                <h3>{report.itemName}</h3>

                <p className="report-description">
                  {report.description}
                </p>

                <p className="report-date">
                  Reported on: {report.date}
                </p>

                {/* Identify whether the report is Lost or Found. */}
                <span
                  className={`report-type ${
                    report.reportType === 'Lost'
                      ? 'report-lost'
                      : 'report-found'
                  }`}
                >
                  {report.reportType} Item
                </span>
              </div>

            </article>
          ))}
        </div>
      </main>

      {/* Reuse the existing five-item mobile navigation design. */}
      <nav className="student-bottom-nav">

        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/student';
          }}
        >
          <span>⌂</span>
          <small>Home</small>
        </button>

        
{/* Navigate to the My Reports screen. */}
<button
  className="student-nav-item"
  onClick={() => {
    window.location.href = '/my-reports';
  }}
>
  <span>▤</span>
  <small>My Report</small>
</button>
        
        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/item-list';
          }}
        >
          <span>⌕</span>
          <small>Search</small>
        </button>

        <button
          className="student-nav-item"
          onClick={() => {
            window.location.href = '/my-claims';
          }}
        >
          <span>▤</span>
          <small>My Claims</small>
        </button>

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
  );
}

/* Export the My Reports screen for use in App.jsx. */
export default MyReports;
