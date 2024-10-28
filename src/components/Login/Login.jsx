import './Login.css';
import sweetPotato from "../../assets/sweet-potato.png"
// import React, { useState } from 'react';

// const Login = () => {
//   const [username, setUsername] = useState(''); // Initialize with an empty string
//   const [password, setPassword] = useState(''); // Initialize with an empty string

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Username:', username);
//     console.log('Password:', password);
//     // Handle login logic here
//   };
function Login() {
  return (
    <div className="contianer">
        <form id="login-container">
           <span>
              <img src={sweetPotato}
                   alt="kamote"
                   id="kamote"/>
           </span>
            <h1> Welcome to Kamote Banking</h1> 
            <div id="input-container">
                <h2>Login</h2>
                <input type="text" 
                       id="username" 
                       placeholder="username"
                       minlength="5"
                       maxlength="20"
                       autocomplete="off"/><br/>
                <input type="password" 
                       id="password" 
                       placeholder="password"
                       minlength="5"
                       maxlength="20"
                       autocomplete="off"/><br/>
                <input type="submit" 
                       id="submit" />
            </div>
            </form>
     </div>
  );
};

export default Login;
