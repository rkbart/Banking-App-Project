import './BuyLoad.css'
import { useState } from 'react'
import closeIcon from '../../assets/close.svg'
import payImg from '../../assets/pay-white.svg'
import { MdSend } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

function BuyLoad({ onClose, onBuyLoad, user }) {
    const [mobileNumber, setMobileNumber] = useState(''); 
    const [loadAmount, setLoadAmount] = useState(''); 
    const [selectedTelco, setSelectedTelco] = useState(''); 
    const [errorVisible, setErrorVisible] = useState(false);
    const telcoNumbers = {
        Globe: '+63 917 666 0232',
        Smart: '+63 919 233 0499',
        TNT: '+63 918 785 2433'
    };

    const handleLoadAmountChange = (e) => {
        const loadValue = e.target.value;
        setLoadAmount(loadValue);
    }

    const handleKeyDown = (e) => {
        if (['-', 'e', '+'].includes(e.key)) {
          e.preventDefault();
        }
      };
   
    const handleTelcoChange = (e) => {
        const selected = e.target.value;
        setSelectedTelco(selected); 
        setMobileNumber(telcoNumbers[selected] || ''); 
    };

    const handleBuyLoad = () => {
        const amount = parseFloat(loadAmount);
        if (isNaN(amount) || amount <= 0) {
            setErrorVisible(true);
            return;
        }

        if (amount > user.balance) {
            alert('Insufficient balance for this payment.');
            return;
        }

        if (!selectedTelco) {
            alert('Please select a Telco provider.');
            return;
        }

        onBuyLoad(amount); 
        onClose(); 
        alert('Buy load has been successful.')
    };

    return (
        <div className="buyLoad-container fade-in">
            {/* <img className="closeIcon" src={closeIcon} onClick={onClose} /> Close button */}
            <IoCloseOutline className="closeIcon" alt="cancel" onClick={onClose}/>

            <h2 className="buyLoad-header">Buy Mobile Load</h2>

            <div className="network-dropdown">
                <p className="selectTelcoText">Select Telco</p>
                <select
                    className="telco-option-css"
                    value={selectedTelco} // Bind the select input to the selectedTelco state
                    onChange={handleTelcoChange}
                >
                    <option value="">-- Select --</option> {/* Optional default option */}
                    <option value="Globe">Globe</option>
                    <option value="Smart">Smart</option>
                    <option value="TNT">TNT</option>
                </select>

                <p className="buyLoadForText">Buy load for</p>
                <input
                    type="text" // Changed to "text" since it's a phone number format
                    value={mobileNumber} // Bind the mobile number input to the mobileNumber state
                    onChange={(e) => setMobileNumber(e.target.value)} // Update state on change
                    className="input-css-load"
                    id="buyLoadFor"
                    placeholder="(input mobile number)"
                    required
                />
                {errorVisible &&(<div className="errorMessageBuyLoad fade-in">Please fill in all fields.</div>)}
                <div className="payLoad">
                    <p>Amount</p>
                    <input
                        type="number"
                        value={loadAmount}
                        onChange={handleLoadAmountChange} // Update state on change
                        onKeyDown={handleKeyDown}
                        className="input-css-load"
                        id="amountLoad"
                        required
                    />
                    <div className="payImg">
                        <MdSend id='pay-img' alt='pay' onClick={handleBuyLoad}/>
                    {/* <img src={payImg} onClick={handleBuyLoad} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyLoad;
