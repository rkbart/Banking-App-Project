import './Users.css';
import { useState } from 'react';
import closeBtn from "../../assets/close.svg"

function Users({ users, setUsers, onClose }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // filter for email format
    const nameRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     // Handlers to prevent invalid input in name fields
     const handleFirstNameChange = (e) => {
        if (nameRegEx.test(e.target.value)) {
            setFirstName(e.target.value);
        } else {
            alert("Please enter letters only for First Name.");
        }
    };

    const handleLastNameChange = (e) => {
        if (nameRegEx.test(e.target.value)) {
            setLastName(e.target.value);
        } else {
            alert("Please enter letters only for Last Name.");
        }
    };

    // function for submit button
    const handleSubmit = (event) => {
        event.preventDefault(); // para d mag refresh pag submit

        if (!firstName || !lastName || !email || !password || !balance) {
            alert("All fields must be filled out!");
            return; 
        }
        
        if (!emailRegEx.test(email)) {
            alert("Please enter a valid email address (e.g., name@example.com)");
            return;
        }

        // create newUser object
        const newUser = {
            "First Name": firstName,
            "Last Name": lastName,
            email: email,
            password: password,
            balance: Number(balance)
        };
        //updates users ARRAY with newUser values
        setUsers([...users, newUser]);
        console.log([...users, newUser]);

        // reset values input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setBalance('');

        alert(`${newUser['First Name']} ${newUser['Last Name']}'s account has been created.`)

        onClose();

    }
    return (
        <div id="contain">
            <form id="form-container" onSubmit={handleSubmit}>
                {/* <img src={closeBtn} id="close-button" alt="Close" onClick={onClose} /> */}
                <h2>Add Kamote</h2>
                <input
                    className="input-box"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br/>
                <input
                    className="input-box"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={{handleLastNameChange}}
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