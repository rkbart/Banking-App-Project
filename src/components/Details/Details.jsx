import { useState } from 'react';
import './Details.css';
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import depositImg from "../../assets/deposit.svg";
import closeImg from "../../assets/close.svg";
// import InputModal from '../InputModal/InputModal';

function Details({user}) {
    
    const [showInput, setShowInput] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');

    const handleDepositClick = () => {
        setShowInput(true);
    };

    const handleClose = () => {
        setShowInput(false);
        setDepositAmount(''); // Reset the input field
    };

    const handleDepositChange = (event) => {
        setDepositAmount(event.target.value);
    };

    const handleDeposit = (event) => {
        event.preventDefault();
        // Handle deposit logic here, e.g., update user balance
        console.log(`Deposited: ${depositAmount}`);
        handleClose(); // Close the input after submission
    };
      
    if (!user) {
        return <div>Select a user to see details.</div>;
    }

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
                <span id="deposit" onClick={handleDepositClick}>
                    <img src={depositImg} alt="deposit"/> Deposit
                </span>
                <span id="withdraw">
                    <i className="fa-solid fa-sack-dollar"></i> Withdraw
                </span>
                <span id="transfer">
                    <i className="fa-solid fa-money-bill-transfer"></i>Transfer
                </span>
            </div>

            {/* input for deposit */}
            {showInput && (
                <div id="deposit-container">
                    <label>Deposit Amount</label>
                    <input
                        id ='deposit-input'
                        type='number'
                        maxLength={7}
                        placeholder='input deposit amount'
                        min={1}
                        value={depositAmount}
                        onChange={handleDepositChange}
                     />
                    <img    id='depo-img'
                            src={depositImg}
                            onClick={handleDeposit}
                    />
                    <img    id='close-button'
                            src={closeImg}
                            onClick={handleClose}
                    />
                </div>
            )}
           
        </div>

    )
}

export default Details;