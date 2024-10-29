import './Users.css';
import { useState } from 'react';

function Users() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    const [users, setUsers] = useState([]);

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleBalance = (event) => {
        setBalance(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !password || !balance) {
            alert("All fields must be filled out!");
            return; 
        }
        
        if (!emailRegEx.test(email)) {
            alert("Please enter a valid email address (e.g., name@example.com)");
            return;
        }
        const newUser = {
            "First Name": firstName,
            "Last Name": lastName,
            email: email,
            password: password,
            balance: Number(balance)
        };

        setUsers([...users, newUser]);
        console.log([...users, newUser]);

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setBalance('');

    }
    return (
        <div id="container">
        <form id="form-container" onSubmit={handleSubmit}>
            <button id="close-button">&times;</button>
            <h2>Add Account</h2>
            <input
                className="input-box"
                type = "text"
                id="first-name"
                placeholder="First Name"
                spellCheck="false"
                autoComplete="off"
                value={firstName}
                onChange={handleFirstName}
                required
                /><br/>
            <input
                className="input-box"
                type = "text"
                id="last-name"
                placeholder="Last Name"
                spellCheck="false"
                autoComplete="off"
                value={lastName}
                onChange={handleLastName}
                required
                /> <br/>
            <input
                className="input-box"
                type = "email"
                id="email"
                placeholder="Email"
                spellCheck="false"
                autoComplete="off"
                value={email}
                onChange={handleEmail}
                required
                /><br/>
            <input
                className="input-box"
                type = "password"
                id="password"
                placeholder="Password"
                spellCheck="false"
                autoComplete="off"
                value={password}
                onChange={handlePassword}
                required
                /><br/>
            <input
                className="input-box"
                type = "number"
                id="balance"
                placeholder="Balance"
                spellCheck="false"
                autoComplete="off"
                min="0"
                value={balance}
                onChange={handleBalance}
                required
                /><br/>
            <input
                type = "submit"
                id="submit"
                />
        </form>
     </div>
    )



}

export default Users;