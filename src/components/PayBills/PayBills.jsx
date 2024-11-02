import './PayBills.css'
import { useState } from 'react'
import electricityImg from '../../assets/electricity.svg'
import waterImg from '../../assets/water.svg'
import internetImg from '../../assets/internet.svg'
import telecomsImg from '../../assets/telecoms.svg'
import cardsImg from '../../assets/credit-cards.svg'
import othersImg from '../../assets/others.svg'
import payImg from '../../assets/pay-white.svg'
import closeImg from '../../assets/close-white.svg'
import closeGrayImg from '../../assets/close.svg'

function PayBills({onClose}) {

    const [selectedBill, setSelectedBill] = useState('');

    const handleBillClick = (billType) => {
        setSelectedBill(billType);
    }
    
    const handleClose = () => {
        setSelectedBill('');
    };
    
    function handleCloseClick() {
        onClose();    
     }

    return (
        <div id="paybills-container">
            <img id='paybills-close' src={closeGrayImg} onClick={handleCloseClick} />
            <h2 id="title">Pay Bills</h2>
            
            <div id="menu-container">
                <div id="electricity" onClick={() => handleBillClick('electricity')}>
                    <img src={electricityImg} alt="electric utilities"/>
                    <p>Electric Utilities</p> 
                </div>
                <div id="water" onClick={() => handleBillClick('water')}>
                    <img src={waterImg} alt="water utilities"/>
                    <p>Water Utilities</p> 
                </div>
                <div id="internet" onClick={() => handleBillClick('internet')}>
                    <img src={internetImg} alt="internet"/>
                    <p>Cable/Internet</p> 
                </div>
                <div id="telecoms" onClick={() => handleBillClick('telecoms')}>
                    <img src={telecomsImg} alt="telecoms"/>
                    <p>Telecoms</p> 
                </div>
                <div id="cards" onClick={() => handleBillClick('cards')}>
                    <img src={cardsImg} alt="credit cards"/>
                    <p>Credit Cards</p> 
                </div>
                <div id="others" onClick={() => handleBillClick('others')}>
                    <img src={othersImg} alt="others"/>
                    <p>Others</p> 
                </div>
            </div>
            
        {selectedBill && (
            <div id="pay-bill">
            <label>{selectedBill.charAt(0).toUpperCase() + selectedBill.slice(1).replace(/-/g, ' ')}</label>
            <input
                id={`${selectedBill}-input`}
                type='number'
                maxLength={7}
                placeholder='input payment'
                min={1}
            />
            
            <div id="pay-close">
                <img id='pay-img' src={payImg} />
                <img id='closeImg' src={closeImg} onClick={handleClose} />
            </div>
        </div>
    )}
        </div>
    
)

    
}

export default PayBills;