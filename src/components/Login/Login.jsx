import './Login.css';
import sweetPotato from "../../assets/sweet-potato.png"
import { useState } from 'react';

function Login() {

       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = (event) => {
              console.log('Username:', username);
              console.log('Password:', password);
              
              if (username === 'admin' && password === 'admin') {
                     alert("Login successfully!");
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
    <div className="contianer">
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
                       onChange={handleUsername}/><br/>
                <input type="password" 
                       id="password" 
                       placeholder="password"
                       minLength="5"
                       maxLength="20"
                       autoComplete="off"
                       spellCheck = "false"
                       onChange={handlePassword}/><br/>
                <input type="submit" 
                       id="submit" 
                       onSubmit={handleSubmit}/>
            </div>
            </form>
     </div>
  );
};

export default Login;
