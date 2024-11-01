import './Users.css';
import { useState } from 'react';
import closeBtn from "../../assets/close.svg"

function Users({ users, setUsers, onClose }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    
    // const [users, setUsers] = useState([]); // array of objects

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // filter for email format

    // function for handling firstName
    // const handleFirstName = (event) => {  // event handler (value of input box nilalagay sa variable)
    //     setFirstName(event.target.value); // taga lagay ng value
    // }
    // const handleLastName = (event) => {
    //     setLastName(event.target.value);
    // }
    // const handleEmail = (event) => {
    //     setEmail(event.target.value);
    // }
    // const handlePassword = (event) => {
    //     setPassword(event.target.value);
    // }
    // const handleBalance = (event) => {
    //     setBalance(event.target.value);
    // }

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
        <div id="container">
            <form id="form-container" onSubmit={handleSubmit}>
                <img src={closeBtn} id="close-button" alt="Close" onClick={onClose} />
                <h2>Add Account</h2>
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
                <input type="submit" id="submit" />
            </form>
        </div>
    );
}


export default Users;