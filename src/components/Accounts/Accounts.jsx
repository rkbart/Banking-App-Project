import './Accounts.css';
import closeAccountsBtn from "../../assets/close.svg"
import userImg from "../../assets/user.svg"
// import { useState } from 'react';


// recieves users(Array) at data(json) as props.. declared in App.js                
function Accounts({ users, onSelectUser, onClose }) { // 
    
    const formatBalance = (amount) => {
        return amount.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
    };

    function handleCloseClick() {
       onClose();    
    }

    const handleUserClick = (user) => {
        onSelectUser(user); // notify the parent component
        onClose();
    };

    
    return (
        <div id="accounts-container">
            <img src={closeAccountsBtn} id="close-accts-button" alt="Close" onClick={handleCloseClick} />
            <h2>Select Kamote</h2>
            <ul id="userlist">
                {users.map((user, index) => (
                    <div key={index} className="user-entry" onClick={() => handleUserClick(user)}>
                        <img src={userImg} className="avatar" alt="User Avatar" />
                        <li className="user-name">{`${user["First Name"]} ${user["Last Name"]} has PHP ${formatBalance(user.balance)} `}</li>
            </div>
                ))}
            </ul>
        </div>
    );
}

export default Accounts;