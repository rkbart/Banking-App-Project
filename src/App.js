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
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleLogin = () => {
    setLoggedIn(true); //
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    setLoggedIn(false); 
    window.location.reload();
   
  }

  const [users, setUsers] = useState([
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

  const [selectedUser, setSelectedUser] = useState({
    "First Name": "Welcome,",
    "Last Name": "Kamote!",
    email: "admin@kamotebanking.ph",
    balance: 0
  });

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
  const [showPayBills, setPayBills] = useState(true);
  const [showBuyLoad, setBuyLoad] = useState(false);
  const [showBudget, setBudget] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsUserSelected(true);
  };

  const handleDeposit = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          const updatedUser = { ...user, balance: user.balance + amount };
          setSelectedUser(updatedUser);

          setTransactionHistory((prevHistory) => [
            ...prevHistory,
            {
              user: `${user["First Name"]} ${user["Last Name"]}`,
              activity: "Deposit",
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
          return updatedSender;  
        }
        if (user.email === selectedTransferUser.email) {
          updatedRecipient = { ...user, balance: user.balance + amount };  // depo
          return updatedRecipient;  
        }
        return user;  // return other users unmodified
      });
  
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
    
    const updatedSelectedUser = { ...selectedUser, balance: selectedUser.balance - amount };
    setSelectedUser(updatedSelectedUser);
    
    handleMenuShow();
  };
  
  
  const handleAutoLoad = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          const updatedUser = { ...user, balance: user.balance - amount };
          setSelectedUser(updatedUser);

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

  const handleMenuShow = () => {
    setShowUsers(false);
    setShowAccounts(true);
    setShowHistory(true)
    setPayBills(true);
    setShowDetails(true);
    setBuyLoad(false);
    setBudget(false);
  };

  const [showHistory, setShowHistory] = useState(true);

  const handleAddUser = () => {
    setShowUsers(true);
    setShowHistory(false);
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
    setShowHistory(false);
    setShowDetails(false)
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

          <div id="menu-wrapper">
            {showMenu && (
                <Menu
                  onAddUser={handleAddUser}
                  onManageAccounts={handleManageAccounts}
                  onPayBills={handlePayBills}
                  onBuyLoad={handleBuyLoad}
                  onBudget={handleBudget}
                  onLogout={handleLogout}
                  onClose={handleMenuShow}
                  
                />
              )}
          </div>

           <div id = "history-wrapper">
              {showUsers && (
                        <Users users={users} 
                               setUsers={setUsers} 
                               onClose={handleMenuShow}
                        />
                      )}   
              {showHistory && (
                <History transactionHistory={transactionHistory}
                />
              )} 
              {showBuyLoad && (
                <BuyLoad onClose={handleMenuShow} 
                         onBuyLoad={handleAutoLoad} 
                         user={selectedUser}  
                />
              )}
              {showAccounts && (
                <Accounts users={users} 
                          onSelectUser={handleSelectUser} 
                          onClose={handleMenuShow}
                />
              )}
           </div>

          <div id = "user-card-wrapper">
              {showDetails && selectedUser && (
                  <Details
                    user={selectedUser}
                    onDeposit={handleDeposit}
                    onWithdrawal={handleWithdrawal}
                    // onDepositToUser={onDepositToUser}
                    users={users}
                    isUserSelected={isUserSelected}
                    onClose={handleMenuShow}
                    onSubmitTransfer={handleTransfer}
                  />
                )}
                {showPayBills && (
                <PayBills onClose={handleMenuShow} 
                          onPayBill={handleBillsPayment} 
                          user={selectedUser} 
                          isUserSelected={isUserSelected} />
                )}
               
           </div>   
              {showBudget && (
                <Budget onClose={handleMenuShow} 
                        onBudget={handleBudget}  />
              )} 
        </>
      )}
    
    </div>
  );
}

export default App;