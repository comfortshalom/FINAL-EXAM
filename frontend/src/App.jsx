
// Import React to create the main application component.
import React from 'react';

// Import the Login page.
import Login from './pages/auth/Login';

// Import the Sign Up page.
import SignUp from './pages/auth/SignUp';

// Import the Student Dashboard page.
import StudentDashboard from './pages/student/StudentDashboard';

// Create the main UNI-FIND application component.
function App() {
  // Read the current page address.
  const currentPath = window.location.pathname;

  // Display the Student Dashboard when the address is /student.
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
