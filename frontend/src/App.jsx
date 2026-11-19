
// Import React to create the main application component.
import React from 'react';

// Import the Login screen.
import Login from './pages/auth/Login';

// Create the main UNI-FIND application component.
function App() {

  // Display the Login screen when the application starts.
  return (
    <Login />
  );
}

// Export App so main.jsx can render it.
export default App;
