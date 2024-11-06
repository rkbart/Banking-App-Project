import './App.css';
import { useState } from 'react';
import Users from './components/Users/Users.jsx';
import Accounts from './components/Accounts/Accounts.jsx';
import Details from './components/Details/Details.jsx';
import Menu from '../src/components/Menu/Menu.jsx';
import PayBills from './components/PayBills/PayBills.jsx';
import History from './components/History/History.jsx';
import Login from './components/Login/Login.jsx';
import BuyLoad from './components/BuyLoad/BuyLoad.jsx'
import Budget from './components/Budget/Budget.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);  // staete whether user is logged in or not

  const handleLogin = () => {
    setLoggedIn(true);  // set user as logged in when called
  };

  const handleLogout = () => { // handle for logging out
    alert("Logged out successfully!");
    setLoggedIn(false); 
    window.location.reload(); // refresh page para ma reset
  }
  
  const [users, setUsers] = useState([ // initialize array users[]
    {
      "First Name": "Ryan",
      "Last Name": "Bartolome",
      "email": "rk_bart@yahoo.com",
      "balance": 100000
    },
    {
      "First Name": "Vahnessa",
      "Last Name": "Gonzales",
      "email": "nessa.gonzales07@yahoo.com",
      "balance": 150000
    },
    {
      "First Name": "Pepper",
      "Last Name": "Bartolome",
      "email": "pepperthed@gmail.com",
      "balance": 200000
    }
  ]);

  const [selectedUser, setSelectedUser] = useState({ // default user displayed in Details component
    "First Name": "Welcome to",
    "Last Name": "Kamote Bank",
    email: "Where everyone is a kamote.",
    balance: 0
  });

  const [transactionHistory, setTransactionHistory] = useState([]); // satte for history (array).
  // sets display components
  const [showMenu, setShowMenu] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showPayBills, setPayBills] = useState(false);
  const [showBuyLoad, setBuyLoad] = useState(false);
  const [showBudget, setBudget] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // set the selected user
    setIsUserSelected(true); // mark as selected
  };

  const handleDeposit = (amount) => { // deposit function
    setUsers((prevUsers) => { // updates users array prevUsers = previous state of array (before deposit)
      return prevUsers.map((user) => { // goes through every objects in users array creating copy of array
        if (user.email === selectedUser.email) { //user = every object in users array / checks if email of users is === to selected user
          const updatedUser = { ...user, balance: user.balance + amount }; // copy everything but add amount to balance
          setSelectedUser(updatedUser); // update selectedUser state with the new value

          setTransactionHistory((prevHistory) => [ // create entry to transactionHistory array
            ...prevHistory, // 
            {
              user: `${user["First Name"]} ${user["Last Name"]}`,
              activity: "Deposit",
              amount,
              date: new Date().toLocaleString(), // current date and time when deposit occurred converted to string
            },
          ]);
          return updatedUser; // returns updatedUser object  so it can replace the old user with new array created by .map()
        }
        return user; // if user is not the selectedUser, return unchanged 
      });
    });
  };

  const handleWithdrawal = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          const updatedUser = { ...user, balance: user.balance - amount };
          setSelectedUser(updatedUser);

          setTransactionHistory((prevHistory) => [
            ...prevHistory,
            {
              user: `${user["First Name"]} ${user["Last Name"]}`,
              activity: "Withdrawal",
              amount,
              date: new Date().toLocaleString(),
            },
          ]);
          return updatedUser;
        }
        return user;
      });
    });
  };

  const handleBillsPayment = (amount, billType) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          const updatedUser = { ...user, balance: user.balance - amount };
          setSelectedUser(updatedUser);
  
          setTransactionHistory((prevHistory) => [
            ...prevHistory,
            {
              user: `${user["First Name"]} ${user["Last Name"]}`,
              activity: `Pay Bills (${billType})`, 
              amount,
              date: new Date().toLocaleString(),
            },
          ]);
          return updatedUser;
        }
        return user;
      });
    });
  };

  const handleTransfer = (amount, selectedTransferUser) => {
    
    setUsers((prevUsers) => {
      let updatedSender = null;
      let updatedRecipient = null;
  
      // withdraw muna
      const newUsers = prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          updatedSender = { ...user, balance: user.balance - amount };   // withdraw
          return updatedSender;  // update sender
        }
        if (user.email === selectedTransferUser.email) {
          updatedRecipient = { ...user, balance: user.balance + amount };  // depo
          return updatedRecipient;  // update recipient
        }
        return user;  // return other users unmodified
      });
  
      // after both balances are updated, we log the transfer transaction
      setTransactionHistory((prevHistory) => [
        ...prevHistory,
        {
          activity: "Transfer",  
          amount,
          user: `${selectedUser["First Name"]} ${selectedUser["Last Name"]} → ${selectedTransferUser["First Name"]} ${selectedTransferUser["Last Name"]}`,  // Sender → Recipient
          date: new Date().toLocaleString(),
        },
      ]);
  
      return newUsers;  // return updated users array with both sender and recipient updated
    });
  
    handleMenuShow();
  };
  
  const handleAutoLoad = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          const updatedUser = { ...user, balance: user.balance - amount };
          setSelectedUser(updatedUser);

          // Log the Buy Load activity in the transaction history
          setTransactionHistory((prevHistory) => [
            ...prevHistory,
            {
              user: `${user["First Name"]} ${user["Last Name"]}`,
              activity: "Buy Load",
              amount,
              date: new Date().toLocaleString(),
            },
          ]);
          return updatedUser;
        }
        return user;
      });
    });
};

  // const onDepositToUser = (email, amount) => {
  //   setUsers((prevUsers) => {
  //     return prevUsers.map((user) => {
  //       if (user.email === email) {
  //         const updatedUser = { ...user, balance: user.balance + amount };
  //         return updatedUser;
  //       }
  //       return user;
  //     });
  //   });
  // };

  // visibiility toggle of components
  const handleMenuShow = () => {
    setShowUsers(false);
    setShowAccounts(false);
    setPayBills(false);
    setBuyLoad(false);
    setBudget(false);
  };

  const handleAddUser = () => {
    setShowUsers(true);
    setShowAccounts(false);
    setPayBills(false);
    setBuyLoad(false);
    setBudget(false);
  };

  const handleManageAccounts = () => {
    setShowAccounts(true);
    setShowUsers(false);
    setPayBills(false);
    setBuyLoad(false);
    setBudget(false);
  };

  const handlePayBills = () => {
    setPayBills(true);
    setShowAccounts(false);
    setShowUsers(false);
    setBuyLoad(false);
    setBudget(false);
  };
  const handleBuyLoad = () => {
    setPayBills(false);
    setShowAccounts(false);
    setShowUsers(false);
    setBuyLoad(true);
    setBudget(false);
  };
  const handleBudget = () => {
    setPayBills(false);
    setShowAccounts(false);
    setShowUsers(false);
    setBuyLoad(false);
    setBudget(true);
  };

  
return (
    <div className="App">
      {!loggedIn ? (
        <div className="login-overlay">
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <>
        {console.log('Selected User:', selectedUser)}
          <div id="upper-wrapper">
            {selectedUser && (
              <Details
                user={selectedUser}
                onDeposit={handleDeposit}
                onWithdrawal={handleWithdrawal}
                onDepositToUser={onDepositToUser}
                users={users}
                isUserSelected={isUserSelected}
                onLogout={handleLogout}
                onClose={handleMenuShow}
                onSubmitTransfer={handleTransfer}
              />
            )}

            {showMenu && (
              <Menu
                onAddUser={handleAddUser}
                onManageAccounts={handleManageAccounts}
                onPayBills={handlePayBills}
                onBuyLoad={handleBuyLoad}
                onBudget={handleBudget}
              />
            )}
            {console.log('Transaction History:', transactionHistory)}
            <History transactionHistory={transactionHistory} />
          </div>

              {/* modals starts here */}

              {showBudget && (
                <Budget onClose={handleMenuShow} onBudget={handleBudget}  />
              )} 
        </>
      )}
    
    </div>
  );
}

export default App;
