
/* Import React so we can create the Login component. */
import React from 'react';

/* Import useState and useEffect for managing login notifications. */
import { useState, useEffect } from 'react';

/* Import the stylesheet that controls the Login screen design. */
import './Login.css';

/* Import the service that communicates with the backend login endpoint. */
import authService from '../../services/authService';

/* Create the Login component used by Students and Administrators. */
function Login() {

  /* Store the currently selected user role. */
  const [selectedRole, setSelectedRole] = useState('student');

  /* Store whether the password should be visible or hidden. */
  const [showPassword, setShowPassword] = useState(false);

  /* Store the email address entered by the user. */
  const [email, setEmail] = useState('');

  /* Store the password entered by the user. */
  const [password, setPassword] = useState('');

  /* Store messages returned when login succeeds or fails. */
const [loginMessage, setLoginMessage] = useState('');

/* Track whether a login request is currently processing. */
const [isLoading, setIsLoading] = useState(false);

/* Automatically remove login messages after three seconds. */
useEffect(() => {
  if (!loginMessage) return;

  const timer = setTimeout(() => {
    setLoginMessage('');
  }, 3000);

  /* Clear the timer if the message changes or the component unmounts. */
  return () => clearTimeout(timer);
}, [loginMessage]);

 
/* Handle submission of the login form. */
const handleLogin = async (event) => {
  /* Prevent the browser from refreshing the page. */
  event.preventDefault();

  /* Clear any previous login message. */
  setLoginMessage('');

  /* Prevent another submission while login is processing. */
  setIsLoading(true);

  try {
    /* Send the email and password to the backend. */
    const response = await authService.login(email, password);

    /* Check whether the selected role matches the account role. */
    if (response.user.role !== selectedRole) {
      setLoginMessage('The selected role does not match this account.');
      return;
    }

    /* Save the authentication token in the browser. */
    localStorage.setItem('token', response.token);

    /* Save the authenticated user's details. */
    localStorage.setItem('user', JSON.stringify(response.user));

   /* Display a successful login message. */
setLoginMessage('Login successful!');

/* Redirect Students after allowing the message to display. */
if (response.user.role === 'student') {
  setTimeout(() => {
    window.location.href = '/student-desktop';
  }, 3000);
}

  } catch (error) {
    /* Display the error returned by the backend. */
    setLoginMessage(
      error.response?.data?.message || 'Login failed. Please try again.'
    );

  } finally {
    /* Allow another login attempt. */
    setIsLoading(false);
  }
};


  /* Display the shared UNI-FIND login screen. */
  return (
    <main className="login-page">

      {/* LEFT SECTION — UCU branding and university photograph. */}
      <section className="login-brand-section">

        {/* Display the UCU branding over the university image. */}
        <div className="login-branding">

          {/* Display the university logo. */}
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="Uganda Christian University Logo"
            className="login-ucu-logo"
          />

          {/* Display the university name beside the logo. */}
          <div className="login-university-name">
            <h1>UCU</h1>
            <p>Uganda Christian University</p>
          </div>

        </div>

        {/* Display the UNI-FIND welcome message. */}
        <div className="login-welcome">

          <h2>WELCOME</h2>

          <h3>UCU Lost &amp; Found</h3>

          <p>
            Find what you've lost or return what you've found.
          </p>

        </div>

        {/* Display the university courtyard photograph. */}
        <div className="login-campus-image">
          <img
            src="/images/COURTYARD.png"
            alt="Uganda Christian University Campus"
          />
        </div>

      </section>

      {/* RIGHT SECTION — Login form and account links. */}
      <section className="login-form-section">

        {/* Decorative wrapper for the login form. */}
        <div className="login-form-container">

          {/* Login heading and introductory text. */}
          <div className="login-heading">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to UCU Lost &amp; Found.</p>
          </div>

          {/* Login form. */}
          <form className="login-form" onSubmit={handleLogin}>

            {/* User role selection. */}
            <div className="login-role-section">

              <label className="login-field-label">
                Select User Role
              </label>

              <div className="login-role-options">

                {/* Student role option. */}
                <button
                  type="button"
                  className={`login-role-button ${
                    selectedRole === 'student' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedRole('student')}
                  aria-pressed={selectedRole === 'student'}
                >
                  Student
                </button>

                {/* Administrator role option. */}
                <button
                  type="button"
                  className={`login-role-button ${
                    selectedRole === 'admin' ? 'active' : ''
                  }`}
                  onClick={() => setSelectedRole('admin')}
                  aria-pressed={selectedRole === 'admin'}
                >
                  Administrator
                </button>

              </div>

            </div>

            {/* Email address input field. */}
            <div className="login-input-group">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon" aria-hidden="true">
                  ✉
                </span>

                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* Password input field. */}
            <div className="login-input-group">

              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon" aria-hidden="true">
                  ♙
                </span>

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                {/* Toggle password visibility. */}
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>

              </div>

            </div>

            {/* Forgot Password link. */}
            <div className="login-forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            {/* Display login success or error messages. */}
{loginMessage && (
  <p className="login-message" role="alert">
    {loginMessage}
  </p>
)}

{/* Main Login button. */}
<button
  type="submit"
  className="login-submit-button"
  disabled={isLoading}
>
  {isLoading ? 'Logging in...' : 'Login'}
</button>
          </form>

          {/* Link to the student registration screen. */}
          <div className="login-signup-link">
            <p>
              Don't have an account?{' '}
              <a href="/signup">Sign Up</a>
            </p>
          </div>

        </div>

    

      </section>

      {/* Display the footer across the entire page width. */}
       <Footer />

    </main>
  );
}

/* Export Login so the main application can display it. */
export default Login;

// Import the reusable UNI-FIND footer.
import Footer from '../../components/Footer';

// Import the shared footer styling.
import '../../components/Footer.css';
