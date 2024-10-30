import './Accounts.css';
import closeBtn from "../../assets/close.svg"
import data from '../../data/data.json';

function Accounts() {
    
    function handleCloseClick() {
        alert("Close button clicked!");    
    }
    
    return (
        <div id="container">
            <h2>Select Account</h2>
            <ul id="userlist">
                <img src={closeBtn} id="close-button" alt="Close" onClick={handleCloseClick} />
                {data.map(({ firstName, lastName }, index) => (
                    <div key={index} className="user-entry">
                        <img src="user.svg" className="avatar" alt="User Avatar" />
                        <li className="user-name">{`${firstName} ${lastName}`}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Accounts;