import './Menu.css';
import addAccountImg from '../../assets/add-account.svg'
import manageAccountImg from '../../assets/manage-accounts.svg'
import budgetImg from '../../assets/budget.svg'
import buyLoadImg from '../../assets/buy-load.svg'
import payBillsImg from '../../assets/pay-bills.svg'


function Menu({ onAddUser, onManageAccounts }) {
        
    const handleAddUserClick = () => {
        onAddUser(); // Call the function to show Users component
    };

    const handleManageAccountsClick = () => {
        onManageAccounts(); // Call the function to show Accounts component
    };

    return (
        <div id="menu">
            <div id="add-user" onClick={ handleAddUserClick }>
                <img src={addAccountImg} alt="add account"/>
                <p>Add</p> 
            </div>
            <div id="manage-accounts" onClick={handleManageAccountsClick}>
                <img src={manageAccountImg} alt="manage account"/>
                <p>Manage</p> 
            </div>
            <div id="budget">
                <img src={budgetImg} alt="budget"/>
                <p>Budget</p> 
            </div>
            <div id="buy-load">
                <img src={buyLoadImg} alt="buy load"/>
                <p>Buy Load</p> 
            </div>
            <div id="pay-bills">
                <img src={payBillsImg} alt="pay-bills"/>
                <p>Pay Bills</p> 
            </div>
        </div>
    )
}

export default Menu;