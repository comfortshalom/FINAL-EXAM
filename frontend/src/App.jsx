
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

// Import the Student Profile page.
import Profile from './pages/student/Profile';

// Create the main UNI-FIND application component.
function App() {

  // Read the current page address.
  const currentPath = window.location.pathname;

  // Display the Student Desktop Dashboard at /student-desktop.
  if (currentPath === '/student-desktop') {
    return <StudentDesktop />;
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
