import './Login.css';
import sweetPotato from "../../assets/sweet-potato.png"
import { useState } from 'react';

function Login({ onLoginSuccess }) { // parameter value declared inside App.js

       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = (event) => {
              console.log('Username:', username);
              console.log('Password:', password);
              
              event.preventDefault(); // prevent refreshing the page upon submission
              if (username === 'admin' && password === 'admin') {
                     alert("Login successfully!");
                     onLoginSuccess();
              } else {
                     alert("Login failed!");
              }
       }

       const handleUsername = (event) => {
              setUsername(event.target.value);
       }

       const handlePassword = (event) => {
              setPassword(event.target.value);
       }

  return (
    <div className="container">
        <form id="login-container" onSubmit={handleSubmit}>
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
                       minLength="5"
                       maxLength="20"
                       autoComplete="off"
                       spellCheck = "false"
                       value={username}
                       onChange={handleUsername}/><br/>
                <input type="password" 
                       id="password" 
                       placeholder="password"
                       minLength="5"
                       maxLength="20"
                       autoComplete="off"
                       spellCheck = "false"
                       value={password}
                       onChange={handlePassword}/><br/>
                <input type="submit" 
                       id="submit" 
                       value="Login"
                       onSubmit={handleSubmit}/>
            </div>
            </form>
     </div>
  );
};

export default Login;
