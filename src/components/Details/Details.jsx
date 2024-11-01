import { useState } from 'react';
import './Details.css';
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import depositImg from "../../assets/deposit.svg";
import closeImg from "../../assets/close.svg";

function Details({user}) {
    // const [deposit,setDeposit] = useState(0);
    // const [withdraw,setWithdraw] = useState(0);
    // const [transfer,setTransfer] = useState(0);
    
      
    if (!user) {
        return <div>Select a user to see details.</div>;
    }

//     return (
//         <div id="details-container">
//             <h2>User Details</h2>
//             <p><strong>Name:</strong> {`${user["First Name"]} ${user["Last Name"]}`}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Balance:</strong> ${user.balance}</p>
//         </div>
//     );
// }

    const formatBalance = (amount) => {
        return amount.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

    return (
        <div id="user-info">
            <h2 id="user">{`${user["First Name"]} ${user["Last Name"]}`}</h2>
            <span id="email-holder">{user.email}</span>
            <p>Available Balance</p>
            <span id="balance-holder">{`PHP ${formatBalance(user.balance)}`}</span>
            <span id="hide"><img src={visibilityOff} alt="hidden"/></span>
            <br/>

            <div id="depo-with">
                <span id="deposit">
                    <img src={depositImg} alt="deposit"/> Deposit
                </span>
                <span id="withdraw">
                    <i className="fa-solid fa-sack-dollar"></i> Withdraw
                </span>
                <span id="transfer">
                    <i className="fa-solid fa-money-bill-transfer"></i>Transfer
                </span>
            </div>

            <div id="deposit-container"></div>
            <div id="withdraw-container"></div>
            <div id="transfer-container"></div>
        </div>

    )
}

export default Details;