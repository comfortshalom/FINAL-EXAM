 
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

// Create the main UNI-FIND application component.
function App() {
  // Read the current page address.
  const currentPath = window.location.pathname;

  // Display the Student Desktop Dashboard at /student-desktop.
  if (currentPath === '/student-desktop') {
    return <StudentDesktop />;
  }

  // Display the Student Item List at /item-list.
  if (currentPath === '/item-list') {
    return <ItemList />;
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
