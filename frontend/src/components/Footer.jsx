// Import React to create the reusable Footer component.
import React from 'react';

// Create the Footer component shared by Login and Sign Up.
function Footer() {
  // Display UNI-FIND project information.
  return (
    <footer className="page-footer">
      {/* Display the project name. */}
      <h3>UNI-FIND</h3>

      {/* Describe the system. */}
      <p>UCU Campus Lost &amp; Found Management System</p>

      {/* Display the university name. */}
      <p>Uganda Christian University</p>

      {/* Display the project's purpose. */}
      <p>Helping the UCU community find and recover lost items.</p>

      {/* Display copyright information. */}
      <small>© 2026 UNI-FIND. All rights reserved.</small>
    </footer>
  );
}

// Make the Footer component available to other pages.
export default Footer;