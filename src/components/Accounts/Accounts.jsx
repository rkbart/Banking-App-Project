import './Accounts.css';
import closeBtn from "../../assets/close.svg"
import userImg from "../../assets/user.svg"
// import { useState } from 'react';


// recieves users(Array) at data(json) as props.. declared in App.js                
function Accounts({ users, data, onSelectUser }) { // 
    // const [selectedUser, setSelectedUser] = useState(null);

    function handleCloseClick() {
        alert("Close button clicked!");    
    }

    // Function to handle user selection
    const handleUserClick = (user) => {
        onSelectUser(user); // Notify the parent component
    };

// Function to render user entries from JSON data
// const renderDataUsers = () => {
//     return data.map(({ "First Name": firstName, "Last Name": lastName }, index) => (
//         <div key={index} className="user-entry">
//             <img src={userImg} className="avatar" alt="User Avatar" />
//             <li className="user-name">{`${firstName} ${lastName}`}</li>
//         </div>
//     ));
// };

// // Function to render user entries from Users component
// const renderUserEntries = () => {
//     return users.map((user, index) => (
//         <div key={index} className="user-entry">
//             <img src={userImg} className="avatar" alt="User Avatar" />
//             <li className="user-name">{`${user["First Name"]} ${user["Last Name"]}`}</li>
//         </div>
//     ));
// };

    return (
        <div id="container">
            <h2>Select Account</h2>
            <ul id="userlist">
                <img src={closeBtn} id="close-button" alt="Close" onClick={handleCloseClick} />
                {/* {renderDataUsers()}
                {renderUserEntries()} */}

                {/* Display users from the JSON file */}
                {data.map(({ "First Name": firstName, "Last Name": lastName, email, balance }, index) => (
                    <div key={index} className="user-entry" onClick={() => handleUserClick({ "First Name": firstName, "Last Name": lastName, email, balance })}>
                        <img src={userImg} className="avatar" alt="User Avatar" />
                        <li className="user-name">{`${firstName} ${lastName}`}</li>
                    </div>
                ))}

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