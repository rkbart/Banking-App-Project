import { useState, useEffect } from 'react';
import './Details.css';
import visibility from "../../assets/visibility.svg";
import visibilityOff from "../../assets/visibility-off.svg";
import { MdSend } from "react-icons/md";
import { PiHandDeposit } from "react-icons/pi";
import { PiHandWithdraw } from "react-icons/pi";
import { BiTransfer } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";


function Details({user, users, onDeposit, onWithdrawal, isUserSelected, onSubmitTransfer}) {
    
    const [showInput, setShowInput] = useState(false);
    const [inputAmount, setInputAmount] = useState('');
    const [actionType, setActionType] = useState(''); // deposit, withdraw, transfer
    const [isBalanceVisible, setIsBalanceVisible] = useState(true); // the eye
    const [selectedTransferUser, setSelectedTransferUser] = useState(null); // select for user transfer

    const handleEye = () => {
        setIsBalanceVisible((prev) => !prev); // toggle true or false
    };
    
    const handleActionClick = (type) => {
        if (!isUserSelected) { // check if user is selected
            alert("Please select a user before performing any actions.");
            return; // Prevent further actions if no user is selected
        }
        if (type === 'withdraw' && user.balance <= 0) {
            alert("You cannot withdraw with a zero balance.");
            return;
        }
        setActionType(type);  // 'withdraw', 'deposit', 'transfer'
        setShowInput(true); 
    
        if (type === 'transfer') {
            setSelectedTransferUser(users[0]); // set a default user to transfer to (first object)
        }
    };

    const handleClose = () => {
        setShowInput(false);
        setInputAmount(''); // reset the input field
        setSelectedTransferUser(null); // reset selected transfer user
    };
    
    const handleInputChange = (event) => {
        setInputAmount(event.target.value);
    };

    const handleTransferUserChange = (event) => { // select a user to transfer to
        const selectedUserEmail = event.target.value; // dropdown value
        const selectedUser = users.find(
            user => user.email === selectedUserEmail); // search for user object with same email as dropdown
        setSelectedTransferUser(selectedUser); // update state with selected user
    };
    
    const formatBalance = (amount) => {
        return amount.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
    };
    
    useEffect(() => {
        setSelectedTransferUser(users.find(u => u.email === user.email));
    }, [user, users]); // when user or users change, update selectedTransferUser

const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(inputAmount);
    
    if (!user) { // check to ensure a user is selected
        alert("Please select a user before performing any action.");
        return;
    }
        //not NotaNumber = valid number
    if (!isNaN(amount) && amount > 0) {
        
        if (actionType === 'deposit') {
            onDeposit(amount); // call the deposit function from props
        } else if (actionType === 'withdraw') {
            
            if (amount > user.balance) { // check if withdrawal exceeds balance
                alert("Withdrawal amount exceeds the available balance.");
                return; // exit the function if the alert is shown
            }
            onWithdrawal(amount); // call the withdrawal function from props
        } else if (actionType === 'transfer') {
            
            if (!selectedTransferUser) { // ensures a user is selected
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
            
            onSubmitTransfer(amount, selectedTransferUser); // withdraw then transfer
        }
        handleClose(); 
    } else {
        alert("Please enter a valid amount.");
    }
};

    return (
        <div id="user-info" className='fade-in'>
            <h2 id="user">{`${user["First Name"]} ${user["Last Name"]}`}</h2>
            <span id="email-holder">{user.email}</span>
            <p>Available Balance</p>
            <span id="balance-holder">{isBalanceVisible ? 'PHP ***********' : `PHP ${formatBalance(user.balance)}`}</span>
            <span id="hide" onClick={handleEye}>
                <img src={isBalanceVisible ? visibility : visibilityOff} alt="toggle visibility" />
            </span>

            <div id="depo-with">
                <span id="deposit" onClick={() => handleActionClick('deposit')}>
                    <PiHandDeposit alt="deposit"/> Deposit
                </span>
                <span id="withdraw" onClick={() => handleActionClick('withdraw')}>
                    <PiHandWithdraw alt="withdraw"/> Withdraw
                </span>
                <span id="transfer" onClick={() => handleActionClick('transfer')}>
                    <BiTransfer alt="transfer"/> Transfer
                </span>
            </div>

            {/* Input for deposit and withdraw*/}
            {showInput && (
                <div id="input-container"  className='fade-in' >
                    <label id="input-label"  className='fade-in' >{actionType.charAt(0).toUpperCase() + actionType.slice(1)} Amount</label>
                    <input
                        className='fade-in' 
                        id='amount-input'
                        type='number'
                        placeholder={`PHP ${actionType} amount`}
                        min={1}
                        value={inputAmount}
                        onChange={handleInputChange}
                    />
                    {actionType === 'transfer' && (
                        <div className='fade-in' >
                            <label htmlFor="transfer-user">Transfer to: </label>
                            <select 
                                id="transfer-user" 
                                onChange={handleTransferUserChange} 
                                value={selectedTransferUser ? selectedTransferUser.email : ''}
                                >   
                               {users.map((user) => ( // gets objects in array but display first and last name only
                                    <option 
                                        key={user.email} 
                                        value={user.email}
                                        > {`${user["First Name"]} ${user["Last Name"]}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <MdSend id='submit-img' onClick={handleSubmit}/>
                    <IoCloseOutline id='close-button' onClick={handleClose}/>
                </div>
            )}
        </div>
    );
}

export default Details;