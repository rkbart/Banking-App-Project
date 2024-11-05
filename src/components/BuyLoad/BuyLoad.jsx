import './BuyLoad.css'
import { useState } from 'react'
import closeIcon from '../../assets/close.svg'
import payImg from '../../assets/pay-white.svg'
function BuyLoad({onClose, onBuyLoad, user}) {
    const [mobileNumber, setMobileNumber] = useState(''); // State for mobile number
    const [loadAmount, setLoadAmount] = useState(''); // State for load amount

    const handlePayLoad = () => {
        const amount = parseFloat(loadAmount);
        if (isNaN(amount) || amount <= 0) {
          alert('Please enter a valid payment amount.');
          return;
        }
        
        if (amount > user.balance) {
          alert('Insufficient balance for this payment.');
          return;
        }
    
        onBuyLoad(amount); // Deduct the amount from the user’s balance
        onClose();
        console.log(user)
      };

  return(
    <div className='buyLoad-container'>
        <img className='closeIcon' src ={closeIcon} onClick={onClose}/> {/* Close button */}
        
        <h2 className='buyLoad-header'>Buy Mobile Load</h2>
    
        <div className = "network-dropdown">
            
            <p className ="selectTelcoText">Select Telco</p>
            <select className="telco-option-css">
                <option value = "Globe">Globe</option>
                <option value = "Smart">Smart</option>
                <option value = "TNT">TNT</option>
            </select>
            <p className ="buyLoadForText">Buy load for</p>
                <input 
                type = "number" 
                value = {mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)} // Update state on change
                className="input-css-load" 
                id = "buyLoadFor" 
                placeholder="(input mobile number)"
                required></input>

            <div className = "payLoad">
                <p>Amount</p>
                    <input 
                    type = "number" 
                    value = {loadAmount}
                    onChange={(e) => setLoadAmount(e.target.value)} // Update state on change
                    className="input-css-load" 
                    id = "amountLoad" 
                    required></input>
                <div className="payImg">
                    <img src = {payImg} onClick={handlePayLoad}/>
                </div>
            </div>
        </div>
        
    
    </div>
  )
    
}

export default BuyLoad;