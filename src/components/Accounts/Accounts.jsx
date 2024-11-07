import './Accounts.css';
// import { useState } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";

function Accounts({users, onSelectUser}) { // 
    
    const handleUserClick = (user) => {
        onSelectUser(user);
    };

    return (
        <div id="accounts-container">
            <h2>Select Kamote</h2>
            <ul id="userlist">
                {users.map((user, index) => (
                    <div key={index} 
                         className="user-entry" 
                         onClick={() => handleUserClick(user)}
                    >
                        <IoPersonCircleSharp 
                            className="avatar" 
                            alt="User Avatar" 
                        />
                        <li className="user-name"> {`${user["First Name"]} ${user["Last Name"]}`} </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Accounts;