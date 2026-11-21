
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

// Import the Student My Claims page.
import MyClaims from './pages/student/MyClaims';

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
