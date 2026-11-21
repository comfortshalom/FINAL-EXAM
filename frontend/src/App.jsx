// Import React to create the main application component.
import React from 'react';

// Import the Login page.
import Login from './pages/auth/Login';

// Import the Sign Up page.
import SignUp from './pages/auth/SignUp';

// Import the Student Mobile Dashboard page.
import StudentDashboard from './pages/student/StudentDashboard';

// Import the Student Desktop Dashboard page.
import StudentDesktop from './pages/student/StudentDesktop';

// Import the Student Item List page.
import ItemList from './pages/student/ItemList';

// Import the Student Item Details page.
import ItemDetails from './pages/student/ItemDetails';

// Import the Student Lost Item page.
import LostItem from './pages/student/LostItem';

// Import the Student Found Item page.
import FoundItem from './pages/student/FoundItem';

// Import the Student Notifications page.
import Notifications from './pages/student/Notifications';

// Import the Student Desktop Notifications screen.
import NotificationsDesktop from './pages/student/NotificationsDesktop';

// Import the Student Profile page.
import Profile from './pages/student/Profile';

// Import the Student My Reports page.
import MyReports from './pages/student/MyReports';

// Import the Student My Claims page.
import MyClaims from './pages/student/MyClaims';

// Import the Student Desktop My Claims page.
import MyClaimsDesktop from './pages/student/MyClaimsDesktop';


// Import the Student Desktop My Reports page.
import MyReportsDesktop from './pages/student/MyReportsDesktop';


// Import the Student Desktop Profile screen.
import ProfileDesktop from './pages/student/ProfileDesktop';

// Import the Student Desktop Search page.
import Search from './pages/student/SearchDesktop';

// Import the Student Desktop Item Details screen.
import ItemDetailsDesktop from './pages/student/ItemDetailsDesktop';

// Import the Student Desktop Lost Item screen.
import LostItemDesktop from './pages/student/LostItemDesktop';

// Import the Student Desktop Found Item screen.
import FoundItemDesktop from './pages/student/FoundItemDesktop';

// Import the Admin Mobile Profile page.
import AdminProfile from './pages/admin-mobile/profile';

// Import the Admin Mobile Settings page.
import AdminSettings from './pages/admin-mobile/settings';

// Import the Admin Mobile Reports page.
import AdminReports from './pages/admin-mobile/reports';

// Import the Admin Mobile Claim Details screen.
import AdminClaimDetailsMobile from './pages/admin-mobile/claim-details';

// Import the Admin Desktop Dashboard page.
import AdminDashboard from './pages/admin-desktop/AdminDashboard';

// Import the Admin Desktop Reports page.
import AdminReportsDesktop from './pages/admin-desktop/AdminReports';

// Import the Admin Desktop Claim Details screen.
import AdminClaimDetails from './pages/admin-desktop/AdminClaimDetails';


// Import the Admin Desktop Users page.
import AdminUsers from './pages/admin-desktop/AdminUsers';


// Import the Admin Desktop Administrators page.
import AdminAdministrators from './pages/admin-desktop/AdminAdministrators';


// Create the main UNI-FIND application component.
function App() {

  // Read the current page address.
  const currentPath = window.location.pathname;
   
  // Display the Admin Mobile Profile page at /admin-profile.
if (currentPath === '/admin-profile') {
  return <AdminProfile />;
}

// Display the Admin Mobile Settings page at /admin-settings.
if (currentPath === '/admin-settings') {
  return <AdminSettings />;
}

// Display the Admin Mobile Reports page at /admin-reports.
if (currentPath === '/admin-reports') {
  return <AdminReports />;
}

// Display the Admin Mobile Claim Details page at /admin-claim-details.
if (currentPath === '/admin-claim-details') {
  return <AdminClaimDetailsMobile />;
}

  // Display the Student Desktop Dashboard at /student-desktop.
  if (currentPath === '/student-desktop') {
    return <StudentDesktop />;
  }

  // Display the Student Desktop Search page at /search.
  if (currentPath === '/search') {
    return <Search />;
  }

  // Display the Student Desktop Lost Item screen.
  if (currentPath === '/lost-item-desktop') {
    return <LostItemDesktop />;
  }

  

  // Display the Student Desktop Found Item screen.
  if (currentPath === '/found-item-desktop') {
    return <FoundItemDesktop />;
  }

  // Display the Student Desktop Notifications screen.
  if (currentPath === '/notifications-desktop') {
    return <NotificationsDesktop />;
  }


// Display the Admin Desktop Dashboard.
if (currentPath === '/admin-desktop') {
  return <AdminDashboard />;
}


if (currentPath === '/admin-reports-desktop') {
  return <AdminReportsDesktop />;
}

/* Display the Admin Claim Details desktop screen. */
if (currentPath === '/admin-claim-details-desktop') {
  return <AdminClaimDetails />;
}


// Display the Admin Desktop Users page.
if (currentPath === '/admin-users-desktop') {
  return <AdminUsers />;
}

  // Display the Student Desktop My Claims screen.
if (currentPath === '/my-claims-desktop') {
  return <MyClaimsDesktop />;
}


// Display the Student Desktop My Reports screen.
if (currentPath === '/my-reports-desktop') {
  return <MyReportsDesktop />;
}

// Display the Admin Desktop Administrators page.
if (currentPath === '/admin-administrators-desktop') {
  return <AdminAdministrators />;
}





  // Display the Student Desktop Profile screen.
  if (currentPath === '/profile-desktop') {
    return <ProfileDesktop />;
  }

  // Display the Student Desktop Item Details screen.
  if (currentPath === '/item-details-desktop') {
    return <ItemDetailsDesktop />;
  }

  // Display the Student Lost Item page at /lost-item.
  if (currentPath === '/lost-item') {
    return <LostItem />;
  }

  // Display the Student Found Item page at /found-item.
  if (currentPath === '/found-item') {
    return <FoundItem />;
  }

  // Display the Student Notifications page at /notifications.
  if (currentPath === '/notifications') {
    return <Notifications />;
  }

  // Display the Student Item Details page at /item-details.
  if (currentPath === '/item-details') {
    return <ItemDetails />;
  }

  // Display the Student Item List page at /item-list.
  if (currentPath === '/item-list') {
    return <ItemList />;
  }

  // Display the Student Profile page at /profile.
  if (currentPath === '/profile') {
    return <Profile />;
  }

  // Display the Student My Claims page at /my-claims.
if (currentPath === '/my-claims') {
  return <MyClaims />;
}

// Display the Student My Reports page at /my-reports.
if (currentPath === '/my-reports') {
  return <MyReports />;
}

  // Display the Student Mobile Dashboard at /student.
  if (currentPath === '/student') {
    return <StudentDashboard />;
  }

  // Display Sign Up when the address is /signup.
  if (currentPath === '/signup') {
    return <SignUp />;
  }

  // Display Login for the main address.
  return <Login />;
}

// Make the App component available to the application.
export default App;