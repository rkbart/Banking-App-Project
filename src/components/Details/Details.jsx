import { useState, useEffect } from 'react';
import './Details.css';
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import depositImg from "../../assets/deposit.svg";
import closeImg from "../../assets/close.svg";


function Details({user, users, onDeposit, onWithdrawal, isUserSelected, onSubmitTransfer}) {
    useEffect(() => {
        // This effect runs whenever the 'user' prop changes
        setSelectedTransferUser(users.find(u => u.email === user.email));
    }, [user, users]); // When user or users change, update selectedTransferUser


    const [showInput, setShowInput] = useState(false);
    const [inputAmount, setInputAmount] = useState('');
    const [actionType, setActionType] = useState(''); // deposit, withdraw, transfer
    const [isBalanceVisible, setIsBalanceVisible] = useState(true); // the eye
    const [selectedTransferUser, setSelectedTransferUser] = useState(null); // select for user transfer

    const handleEye = () => {
        setIsBalanceVisible((prev) => !prev);
    }
    
    const handleActionClick = (type) => {
        if (!isUserSelected) { // Check if user is selected
            alert("Please select a user before performing any actions.");
            return; // Prevent further actions if no user is selected
        }
        if (type === 'withdraw' && user.balance <= 0) {
            alert("You cannot withdraw with a zero balance.");
            return;
        }
        setActionType(type);
        setShowInput(true);
    
        if (type === 'transfer') {
            setSelectedTransferUser(users[0]); // default to the first user
        }
    };

    const handleClose = () => {
        setShowInput(false);
        setInputAmount(''); // Reset the input field
        setSelectedTransferUser(null); // Reset selected transfer user
    };
    
    const handleInputChange = (event) => {
        setInputAmount(event.target.value);
    };

    const handleTransferUserChange = (event) => {
        const selectedUserEmail = event.target.value;
        const selectedUser = users.find(user => user.email === selectedUserEmail);
        setSelectedTransferUser(selectedUser);
    };
    
    const formatBalance = (amount) => {
        return amount.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
    };

const handleSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(inputAmount);
    
    if (!user) { // check to ensure a user is selected
        alert("Please select a user before performing any action.");
        return;
    }

    if (!isNaN(amount) && amount > 0) {
        if (actionType === 'deposit') {
            onDeposit(amount); // Call the deposit function from props
        } else if (actionType === 'withdraw') {
            if (amount > user.balance) { // Check if withdrawal exceeds balance
                alert("Withdrawal amount exceeds the available balance.");
                return; // Exit the function if the alert is shown
            }
            onWithdrawal(amount); // Call the withdrawal function from props
        } else if (actionType === 'transfer') {
            if (!selectedTransferUser) {
                alert("Please select a user to transfer to."); 
                return;
            }
            
            if (selectedTransferUser.email === user.email) {
                alert("You cannot transfer money to yourself.");
                return;
            }
            if (amount > user.balance) {
                alert("Transfer amount exceeds the available balance.");
                return;
            }
            
            onSubmitTransfer(amount, selectedTransferUser);
        }
        handleClose(); 
    } else {
        alert("Please enter a valid amount.");
    }
};

    return (
        <div id="user-info">
            <h2 id="user">{`${user["First Name"]} ${user["Last Name"]}`}</h2>
            <span id="email-holder">{user.email}</span>
            <p>Available Balance</p>
            <span id="balance-holder">{isBalanceVisible ? `PHP ${formatBalance(user.balance)}` : 'PHP ***********'}</span>
            <span id="hide" onClick={handleEye}>
                <img src={isBalanceVisible ? visibility : visibilityOff} alt="toggle visibility" />
            </span>

            <div id="depo-with">
                <span id="deposit" onClick={() => handleActionClick('deposit')}>
                    <img src={depositImg} 
                         alt="deposit"/> Deposit
                </span>
                <span id="withdraw" onClick={() => handleActionClick('withdraw')}>
                    <img src={depositImg} 
                         alt="withdraw"/> Withdraw
                </span>
                <span id="transfer" onClick={() => handleActionClick('transfer')}>
                    <img src={depositImg} 
                         alt="transfer"/> Transfer
                </span>
            </div>

            {/* Input for deposit, withdraw, or transfer */}
            {showInput && (
                <div id="input-container">
                    <label id="input-label">{actionType.charAt(0).toUpperCase() + actionType.slice(1)} Amount</label>
                    <input
                        id='amount-input'
                        type='number'
                        placeholder={`PHP ${actionType} amount`}
                        min={1}
                        value={inputAmount}
                        onChange={handleInputChange}
                    />
                    {actionType === 'transfer' && (
                        <div>
                            <label htmlFor="transfer-user">Transfer to: </label>
                            <select 
                                id="transfer-user" 
                                onChange={handleTransferUserChange} 
                                value={selectedTransferUser ? selectedTransferUser.email : ''}
                            >   
                                {/* <option value="" disabled selected>-- Select account --</option> */}
                                {users.map((user) => (
                                    <option 
                                        key={user.email} 
                                        value={user.email}
                                    > {`${user["First Name"]} ${user["Last Name"]}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <img
                        id='submit-img'
                        src={depositImg}
                        onClick={handleSubmit}
                    />
                    <img
                        id='close-button'
                        src={closeImg}
                        onClick={handleClose}
                    />
                </div>
            )}
        </div>
    );
}

export default Details;