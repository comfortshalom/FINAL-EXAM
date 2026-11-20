// Import React styles for the Student Desktop page.
import './StudentDesktop.css';

// Define the Student Desktop component.
function StudentDesktop() {
  // Store the recent items displayed on the dashboard.
 const recentItems = [
  {
    id: 1,
    name: 'Black Backpack',
    status: 'LOST',
    date: 'Apr 23',
    image: '/images/BLACK-BACKPACK.png',
  },
  {
    id: 2,
    name: 'Water bottle',
    status: 'FOUND',
    date: 'Mar 8',
    image: '/images/WATER-BOTTLE.png',
  },
  {
    id: 3,
    name: 'Grey Novel',
    status: 'LOST',
    date: 'Sept 15',
    image: '/images/GREY-NOVEL.png',
  },
  {
    id: 4,
    name: 'Pink Headsets',
    status: 'FOUND',
    date: 'Nov 2',
    image: '/images/PINK-HEADSETS.png',
  },
];

  // Display the Student Desktop dashboard.
  return (
    <div className="student-desktop">

      {/* Sidebar navigation */}
      <aside className="sidebar">

        {/* University branding */}
        <div className="brand">
          <img src="/images/2%20UCU%20LOGO%20TRANSPARENT.png" />
          <span>UNI - FIND</span>
        </div>

        {/* Dashboard navigation links */}
        <nav className="sidebar-menu">

          <div className="menu-item active">
            <div className="menu-icon">
              <i className="fa-solid fa-bars"></i>
            </div>
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon question-icon">?</div>
            <span>Lost Items</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <span className="found-menu-icon">
                <i className="fa-solid fa-check"></i>
              </span>
            </div>
            <span>Found Items</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-list-ul"></i>
            </div>
            <span>My Reports</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-regular fa-clipboard"></i>
            </div>
            <span>My Claims</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-bell"></i>
            </div>
            <span>Notifications</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <span>Profile</span>
          </div>

          <div className="menu-item">
            <div className="menu-icon">
              <i className="fa-solid fa-right-from-bracket logout-icon"></i>
            </div>
            <span>Logout</span>
          </div>

        </nav>
      </aside>

      {/* Main dashboard content */}
      <main className="main">

        {/* Top navigation bar */}
        <header className="topbar">
          <img
            className="topbar-crest"
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="UCU Crest"
          />

          <h1>UCU Lost &amp; Found</h1>

          <i className="fa-solid fa-bell topbar-bell"></i>

          <img
            className="profile-avatar"
            src="/images/GRACE-AVATAR.png"
            alt="Grace Profile"
          />
        </header>

        {/* Welcome banner */}
        <section className="hero">
          <div className="hero-text">
            <h2>Welcome back, Grace !</h2>

            <p>
              Together we keep UCU community
              <span>connected</span>
            </p>
          </div>
        </section>

        {/* Dashboard statistics */}
        <section className="stats">

          <div className="stat-card reports-stat">
            <i className="fa-regular fa-file-lines stat-report-icon"></i>
            <strong>2</strong>
            <span>My Reports</span>
          </div>

          <div className="stat-card claims-stat">
            <span className="stat-check-circle">
              <i className="fa-solid fa-check"></i>
            </span>
            <strong>3</strong>
            <span>My Claims</span>
          </div>

          <div className="stat-card notifications-stat">
            <i className="fa-solid fa-bell stat-notification-icon"></i>
            <strong>1</strong>
            <span>Notifications</span>
          </div>

        </section>

        {/* Recently reported items */}
        <section className="recent">

          <div className="recent-heading">
            <h2>Recent Items</h2>

            <div className="view-all">
              <span>View All</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          {/* Recent item cards */}
          <div className="recent-items-grid">

            {recentItems.map((item) => (
              <div className="item-card" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />

                <h3>{item.name}</h3>

                <div className="item-details">

                  <span
                    className={`badge ${
                      item.status === 'LOST' ? 'lost' : 'found'
                    }`}
                  >
                    {item.status}
                  </span>

                  <div className="item-date">
                    <span>●</span>
                    <strong>{item.date}</strong>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

// Export the Student Desktop component.
export default StudentDesktop;