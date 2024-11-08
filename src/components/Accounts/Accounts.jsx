import './Accounts.css';
import { useState, useEffect } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";


function Accounts({users, onSelectUser}) { // 
    const [userAvatars, setUserAvatars] = useState([]);

    useEffect(() => {
        const avatars = users.map(user => {
            // Generate RoboHash avatar URL based on user's email
            const avatar = `https://robohash.org/${user.email}.png?set=set4`; // Using set1 for robots
            return avatar;
        });

        setUserAvatars(avatars);
    }, [users]);

    const handleUserClick = (user) => {
        onSelectUser(user);
    };

    return (
        <div id="accounts-container">
            <h2>Select a Kamote Account</h2>
            <ul id="userlist">
                {users.map((user, index) => (
                    <div key={index} 
                         className="user-entry" 
                         onClick={() => handleUserClick(user)}
                    >
                        {/* <IoPersonCircleSharp 
                            className="avatar" 
                            alt="User Avatar" 
                        /> */}
                        <img
                            src={userAvatars[index]} // Use the corresponding avatar URL for each user
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