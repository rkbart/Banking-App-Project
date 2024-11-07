import './Menu.css';
import addAccountImg from '../../assets/add-account.svg'
import manageAccountImg from '../../assets/manage-accounts.svg'
import budgetImg from '../../assets/budget.svg'
import buyLoadImg from '../../assets/buy-load.svg'
import payBillsImg from '../../assets/pay-bills.svg'
import depositImg from "../../assets/deposit.svg";

function Menu({ onAddUser, onManageAccounts, onPayBills, onBudget, onBuyLoad, onLogout, hideComponents}) {
        
    const handleAddUserClick = () => {
        if (hideComponents) {
            hideComponents();  // Hide components correctly
        }
        onAddUser(); // Call the function to show Users component
    };

    const handleManageAccountsClick = () => {
        onManageAccounts(); // Call the function to show Accounts component
    };

    const handlePayBillsClick = () => {
        onPayBills(); // Call the function to show Accounts component
    };
    const handleBudgetClick = () => {
        onBudget(); // Call the function to show Accounts component
    };
    const handleBuyLoadClick = () => {
        onBuyLoad(); // Call the function to show Accounts component
    };
    const handleLogOut = () => {
        onLogout();
    }
   
    return (
        <div id="menu">
            <div id="add-user" onClick={handleAddUserClick }>
                <img src={addAccountImg} alt="add account"/>
                <p>Add</p> 
            </div>
            {/* <div id="manage-accounts" onClick={handleManageAccountsClick}>
                <img src={manageAccountImg} alt="manage account"/>
                <p>Manage</p> 
            </div> */}
            <div id="budget" onClick={handleBudgetClick}>
                <img src={budgetImg} alt="budget" />
                <p>Budget</p> 
            </div>
            <div id="buy-load" onClick={handleBuyLoadClick}>
                <img src={buyLoadImg} alt="buy load" />
                <p>Buy Load</p> 
            </div>
            <div id = "logout" onClick={onLogout}> 
                <img src={depositImg} alt="logout" /> 
                <p>Log out</p>
            </div>
            {/* <div id="pay-bills" onClick={handlePayBillsClick}>
                <img src={payBillsImg} alt="pay-bills"/>
                <p>Pay Bills</p> 
            </div> */}
            <div>
                
                
            </div>
        </div>
    )
}

export default Menu;