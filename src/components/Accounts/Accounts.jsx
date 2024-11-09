import './Accounts.css';
import { useState, useEffect } from 'react';

function Accounts({users, onSelectUser}) { 
    const [userAvatars, setUserAvatars] = useState([]);

    useEffect(() => {
        const avatars = users.map(user => {
            // Generate RoboHash avatar URL based on user's email
            const avatar = `https://robohash.org/${user.email}.png?set=set4`; 
            return avatar;
        });

        setUserAvatars(avatars);
    }, [users]); // dependency - effect will only run when users array changes

    const handleUserClick = (user) => {
        onSelectUser(user);
    };

    return (
        <div id="accounts-container">
            <h2>Select a Kamote Account</h2>
            <ul id="userlist">
                {users.slice().reverse().map((user, index) => (
                    <div key={index} 
                         className="user-entry" 
                         onClick={() => handleUserClick(user)}
                    >
                        <img
                            src={userAvatars.slice().reverse()[index]} // Use the corresponding avatar URL for each user
                            alt="User Avatar"
                            className="avatar"
                        />
                        <li className="user-name"> {`${user["First Name"]} ${user["Last Name"]}`} </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Accounts;