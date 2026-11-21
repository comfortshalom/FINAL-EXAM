/* Import React and its hooks for the Sign Up component. */
import React, { useState, useEffect } from 'react';

/* Import the Sign Up stylesheet. */
import './SignUp.css';

/* Import the service that communicates with the backend. */
import authService from '../../services/authService';

/* Create the UNI-FIND student registration component. */
function SignUp() {

  /* Store the student's full name. */
  const [fullName, setFullName] = useState('');

  /* Store the student's UCU access number. */
  const [accessNumber, setAccessNumber] = useState('');

  /* Store the student's UCU email address. */
  const [email, setEmail] = useState('');

  /* Store the password entered by the student. */
  const [password, setPassword] = useState('');

  /* Store the password confirmation. */
  const [confirmPassword, setConfirmPassword] = useState('');

  /* Store messages returned during student registration. */
const [signupMessage, setSignupMessage] = useState('');

/* Track whether registration is currently processing. */
const [isLoading, setIsLoading] = useState(false);

/* Automatically remove signup messages after three seconds. */
useEffect(() => {
  if (!signupMessage) return;

  const timer = setTimeout(() => {
    setSignupMessage('');
  }, 3000);

  /* Clear the timer if the message changes or the component unmounts. */
  return () => clearTimeout(timer);
}, [signupMessage]);
  
/* Handle submission of the registration form. */
const handleSignUp = async (event) => {
  /* Prevent the browser from refreshing the page. */
  event.preventDefault();

  /* Clear previous registration messages. */
  setSignupMessage('');

  /* Check whether both password fields match. */
  if (password !== confirmPassword) {
    setSignupMessage('Passwords do not match.');
    return;
  }

  /* Require a password of at least eight characters. */
  if (password.length < 8) {
    setSignupMessage('Password must contain at least 8 characters.');
    return;
  }

  /* Indicate that registration is processing. */
  setIsLoading(true);

  try {
    /* Send the registration details to the backend. */
    const response = await authService.register(
      fullName,
      email,
      accessNumber,
      password
    );

    /* Display the successful registration message. */
    setSignupMessage(response.message || 'Account created successfully.');

  } catch (error) {
    /* Display the error returned by the backend. */
    setSignupMessage(
      error.response?.data?.message ||
      'Registration failed. Please try again.'
    );

  } finally {
    /* Allow another registration attempt. */
    setIsLoading(false);
  }
};


  /* Display the UNI-FIND Sign Up screen. */
  return (
    <main className="signup-page">

      {/* LEFT SECTION — Reused UCU branding and campus photograph. */}
      <section className="signup-brand-section">

        {/* UCU logo and university name. */}
        <div className="signup-branding">

          {/* Display the transparent UCU logo. */}
          <img
            src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
            alt="Uganda Christian University Logo"
            className="signup-ucu-logo"
          />

          {/* Display the university name. */}
          <div className="signup-university-name">
            <h1>UCU</h1>
            <p>Uganda Christian University</p>
          </div>

        </div>

        {/* Display the welcome message. */}
        <div className="signup-welcome">
          <h2>WELCOME</h2>
          <h3>UCU Lost &amp; Found</h3>
          <p>
            Find what you've lost or return what you've found.
          </p>
        </div>

        {/* Display the university courtyard photograph. */}
        <div className="signup-campus-image">
          <img
            src="/images/COURTYARD.png"
            alt="Uganda Christian University Campus"
          />
        </div>

        {/* Display the shared UNI-FIND footer below the campus photograph. */}
     <Footer />

      </section>

      {/* RIGHT SECTION — Student registration form. */}
      <section className="signup-form-section">

        {/* Floating cream registration board. */}
        <div className="signup-form-container">

          {/* Transparent logo and Create Account heading. */}
          <div className="signup-heading">

            <img
              src="/images/2%20UCU%20LOGO%20TRANSPARENT.png"
              alt="UCU Logo"
              className="signup-heading-logo"
            />

            <h2>CREATE ACCOUNT</h2>

          </div>

          {/* Short registration introduction. */}
          <p className="signup-description">
            Register to access the UCU Lost &amp; Found system.
          </p>

          {/* Student registration form. */}
          <form className="signup-form" onSubmit={handleSignUp}>

            {/* Student full name. */}
            <div className="signup-input-group">
              <label htmlFor="signup-full-name">
                Full Name
              </label>

              <input
                id="signup-full-name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            {/* UCU student access number. */}
            <div className="signup-input-group">
              <label htmlFor="signup-access-number">
                UCU Access Number
              </label>

              <input
                id="signup-access-number"
                type="text"
                placeholder="Enter your access number"
                value={accessNumber}
                onChange={(event) => setAccessNumber(event.target.value)}
                required
              />
            </div>

            {/* UCU student email address. */}
            <div className="signup-input-group">
              <label htmlFor="signup-email">
  Email Address
</label>

              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Student password. */}
            <div className="signup-input-group">
              <label htmlFor="signup-password">
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Password confirmation. */}
            <div className="signup-input-group">
              <label htmlFor="signup-confirm-password">
                Confirm Password
              </label>

              <input
                id="signup-confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            
{/* Display registration success or error messages. */}
{signupMessage && (
  <p className="signup-message" role="alert">
    {signupMessage}
  </p>
)}

{/* Create account button. */}
<button
  type="submit"
  className="signup-submit-button"
  disabled={isLoading}
>
  {isLoading ? 'Creating Account...' : 'Create Account'}
</button>


          </form>

          {/* Link back to the Login screen. */}
          <div className="signup-login-link">
            <p>
              Already have an account?{' '}
              <a href="/">Login</a>
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

/* Export SignUp so the application can display it. */
export default SignUp;


// Import the reusable UNI-FIND footer.
import Footer from '../../components/Footer';

// Import the footer styling.
import '../../components/Footer.css';
