import './Login.css';
import google from "../../assets/google.png";
import kamote from "../../assets/sweet-potato.png";
import kamoteLoginImg from "../../assets/kamoteLogin-img.svg"
import { useState } from 'react';

function Login({ onLogin }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up form
  const [users, setUsers] = useState([
    {
      email: "admin@kamote.ph",
      password: "kamote"
    }
  ]);
  const [isKamoteLogin, setIsKamoteLogin] = useState(false); // Track if Kamote login is selected

  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle login form submission
  const handleLogin = (event) => {
    event.preventDefault();
    
    // If the user is logging in via Kamote, skip email validation
    if (!isKamoteLogin && !emailRegEx.test(userEmail)) {
      alert("Please enter a valid email address (e.g., name@example.com)");
      return;
    }

    // Validate user credentials (either via Kamote or standard login)
    const user = users.find((u) => u.email === userEmail && u.password === userPassword);
    if (user || (isKamoteLogin && userPassword === 'kamote')) {
      alert("Login successful!");
      onLogin();
    } else {
      alert("Invalid email or password.");
    }
  };

  // Handle sign-up form submission
  const handleSignUp = (event) => {
    event.preventDefault();
    
    if (!emailRegEx.test(userEmail)) {
      alert("Please enter a valid email address (e.g., name@example.com)");
      return;
    }

    // Check if the email already exists
    const existingUser = users.find((u) => u.email === userEmail);
    if (existingUser) {
      alert("This email is already registered.");
      return;
    }

    // Add the new user to the users array
    setUsers([...users, { email: userEmail, password: userPassword }]);
    alert("User registered successfully!");

    // Reset the form and switch to the login form
    setUserEmail('');
    setUserPassword('');
    setIsSignUp(false); // Switch back to login form after signing up
  };

  // Handle Kamote login option
  const handleKamoteLogin = () => {
    setIsKamoteLogin(true); // Mark that Kamote login was selected
    setUserEmail('admin@kamote.ph'); // Set a dummy value for the email
    setUserPassword('kamote'); // Set the predefined password for Kamote
  };

  return (
    <div className="login_form">
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <h3>{isSignUp ? "Sign Up" : "Log in with"}</h3>

        {!isSignUp && (
          <div className="login_option">
            <div className="option">
              <a href="#" onClick={handleLogin}>
                <img src={google} alt="Google" />
                <span>Google</span>
              </a>
            </div>
            <div className="option">
              <a href="#" onClick={handleKamoteLogin}>
                <img src={kamote} alt="kamote" />
                <span>Kamote</span>
              </a>
            </div>
          </div>
        )}

        {!isSignUp && <p className="separator"><span>or</span></p>}

        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter email address"
            autoComplete="off"
            required={!isKamoteLogin} // Only require email if it's not a Kamote login
          />
        </div>

        <div className="input_box">
          <div className="password_title">
            <label htmlFor="password">Password</label>
            {!isSignUp && <a href="#">Forgot Password?</a>}
          </div>
          <input
            type="password"
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>

        {isSignUp ? (
          <p className="sign_up">
            Already have an account? <a href="#" onClick={() => setIsSignUp(false)}>Log In</a>
          </p>
        ) : (
          <p className="sign_up">
            Don't have an account? <a href="#" onClick={() => setIsSignUp(true)}>Sign up</a>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
