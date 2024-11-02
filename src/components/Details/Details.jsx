import { useState } from 'react';
import './Details.css';
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import depositImg from "../../assets/deposit.svg";
import closeImg from "../../assets/close.svg";


function Details({user, onDeposit}) {
    
    const [showInput, setShowInput] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [actionType, setActionType] = useState(''); // 'deposit' or 'withdraw'
    const [eye, setEye] = useState(false);

    const handleEye = () => {
        setEye(true);
        const eyeImg = visibility;
    }
    
    const handleDepositClick = (type) => {
        if (!user || user.balance <= 0) { // Check if user is selected
            alert("Please select a user before making a deposit.");
            return;
        }
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

       const amount = parseFloat(depositAmount);
        
        if (!isNaN(amount) && amount > 0) {
            onDeposit(amount); // Call the deposit function from props
            handleClose(); // Close the input after submission
        } else {
            alert("Please enter a valid deposit amount.");
        }
    };
      
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
            <span id="hide" onClick={handleEye}><img src={visibilityOff} alt="hidden"/></span>
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
                    <label>Enter Deposit Amount</label>
                    <input
                        id ='deposit-input'
                        type='number'
                        maxLength={7}
                        placeholder='PHP deposit amount'
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