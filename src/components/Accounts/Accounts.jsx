import './Accounts.css';
import closeAccountsBtn from "../../assets/close.svg"
import userImg from "../../assets/user.svg"
// import { useState } from 'react';


// recieves users(Array) at data(json) as props.. declared in App.js                
function Accounts({ users, onSelectUser, onClose }) { // 
    
    function handleCloseClick() {
       onClose();    
    }

    // Function to handle user selection
    const handleUserClick = (user) => {
        onSelectUser(user); // Notify the parent component
    };

    return (
        <div id="accounts-container">
            <img src={closeAccountsBtn} id="close-accts-button" alt="Close" onClick={handleCloseClick} />
            <h2>Select Kamote</h2>
            <ul id="userlist">
                {/* Display users from the Users component */}
                {users.map((user, index) => (
                    <div key={index} className="user-entry" onClick={() => handleUserClick(user)}>
                        <img src={userImg} className="avatar" alt="User Avatar" />
                        <li className="user-name">{`${user["First Name"]} ${user["Last Name"]}`}</li>
            </div>
                ))}
            </ul>
        </div>
    );
}

export default Accounts;