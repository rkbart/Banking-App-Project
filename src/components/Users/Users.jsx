import './Users.css';
import { useState } from 'react';


function Users({ users, setUsers, onClose }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    
    // ^ = start of string
    // [a-zA-Z0-9._%+-]+ = lowercase, uppercase, digits, special charcters
    // + = 1 or more
    // @ = literal symbol
    // \. = literal period. Escape character
    // {2,} = at least 2 letters
    // $ = end of string
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const nameRegEx = /^[A-Za-z]+$/;

     
    // function for submit button
    const handleSubmit = (event) => {
        event.preventDefault(); // para d mag refresh pag submit

        // checks if all  states are not falsy (empty)
        if (!firstName || !lastName || !email || !password || !balance) {
            alert("All fields must be filled out properly!");
            return; 
        }
         // name validation
        if (!nameRegEx.test(firstName) || !nameRegEx.test(lastName)) {
            alert("Please enter a valid name.");
            return;
        }
        // email validation
        if (!emailRegEx.test(email)) {
            alert("Please enter a valid email address (e.g., name@example.com)");
            return;
        }

    // check if a user with the same first and last name already exists and returns a boolean value
    const isDuplicate = users.some(user => 
        user["First Name"] === firstName && user["Last Name"] === lastName
        );
        // if true, alert
        if (isDuplicate) {
            alert("An account with this name already exists. Please use a different name.");
            return;
        }

        // added feature: capitalized first letter of name and converts other letters to lower case
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    
        // create newUser object with capitalized names
        const newUser = {
            "First Name": capitalizedFirstName,
            "Last Name": capitalizedLastName,
            email: email,
            password: password,
            balance: Number(balance)
        };

        //updates users ARRAY with newUser values
        setUsers([...users, newUser]);
        
        // reset values input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setBalance('');

        alert(`${newUser['First Name']} ${newUser['Last Name']}'s account has been created.`)

        onClose(); // closes component

    }
    return (
        <div id="contain" className='fade-in'>
            <form id="form-container" onSubmit={handleSubmit}>
                
                <h2>Add Kamote</h2>
                <input
                    className="input-box"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={ (e) => setFirstName(e.target.value)}
                    required
                /><br/>
                <input
                    className="input-box"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br/>
                <input
                    className="input-box"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/>
                <input
                    className="input-box"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/>
                <input
                    className="input-box"
                    type="number"
                    placeholder="Balance"
                    min="0"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                /><br/>
                <div id="buttons">
                    <input type="submit" id="submit" />
                    <span id="cancel" onClick={onClose}>Cancel</span>
                </div>
                
            </form>
        </div>
    );
}


export default Users;