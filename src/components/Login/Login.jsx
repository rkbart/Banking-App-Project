import './Login.css';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState(''); // Initialize with an empty string
  const [password, setPassword] = useState(''); // Initialize with an empty string

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Handle login logic here
  };

  return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
    <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
