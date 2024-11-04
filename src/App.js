import './App.css';
import { useState } from 'react';
import Users from './components/Users/Users.jsx'
import Accounts from './components/Accounts/Accounts.jsx'
import Details from './components/Details/Details.jsx'
import Menu from '../src/components/Menu/Menu.jsx'
import PayBills from './components/PayBills/PayBills.jsx'
import History from './components/History/History.jsx'
import BuyLoad from './components/BuyLoad/BuyLoad.jsx'
import Login from './components/Login/Login.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  
  const handleLogin = () => {
    setLoggedIn(true); // login
  };

  const handleLogout = () => {
    setLoggedIn(false); // log out
    alert("Logged out successfull!")
  };

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
]
);
  const [selectedUser, setSelectedUser] = useState({
    "First Name": "Welcome,",
    "Last Name": "Kamote!",
    email: "admin@kamotebanking.ph",
    balance: 0
  });
  
  const [showMenu, setShowMenu] = useState(true); // show menu
  const [showUsers, setShowUsers] = useState(false); // Users
  const [showAccounts, setShowAccounts] = useState(false); // Accounts
  const [showPayBills, setPayBills] = useState(false); // PayBills
  const [isUserSelected, setIsUserSelected] = useState(false); // Details selected user
  
  const handleSelectUser = (user) => {
      setSelectedUser(user);
      setIsUserSelected(true); // user has been selected
  };

  const handleDeposit = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          // Update the selected user with the new balance
          const updatedUser = { ...user, balance: user.balance + amount };
          setSelectedUser(updatedUser); 
          return updatedUser; // return the updated user
        }
        return user; // return the other users unmodified
      });
    });
  };

  const handleWithdrawal = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          // Update the selected user with the new balance
          const updatedUser = { ...user, balance: user.balance - amount };
          setSelectedUser(updatedUser); // Update the selected user state
          return updatedUser; // Return the updated user
        }
        return user; // Return the other users unmodified
      });
    });
  };

  const onDepositToUser = (email, amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === email) {
          const updatedUser = { ...user, balance: user.balance + amount };
          return updatedUser; // Return the updated user
        }
        return user; // Return the other users unmodified
      });
    });
  };

  const handleMenuShow = () => {
    setShowUsers(false);
    setShowAccounts(false);
    setPayBills(false);
  };

  const handleAddUser = () => {
    setShowUsers(true); // Show Users component
    setShowAccounts(false); 
    setPayBills(false);
  };

  const handleManageAccounts = () => {
    setShowAccounts(true); // Show Accounts component
    setShowUsers(false); 
    setPayBills(false);
  };
  
  const handlePayBills = () => {
    setPayBills(true); // Show PayBills component
    setShowAccounts(false); 
    setShowUsers(false); 
  };


return (
  <div className="App">
    {!loggedIn ? (
      <div className="login-overlay">
        <Login onLogin={handleLogin} />
      </div>
    ) : (
      <>
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
            />
          )}
        
          {showMenu && (
            <Menu
              onAddUser={handleAddUser}
              onManageAccounts={handleManageAccounts}
              onPayBills={handlePayBills}
            />
          )}
          <History />
        </div>
      
        <div id="lower-wrapper">
          {showUsers && (
            <Users users={users} setUsers={setUsers} onClose={handleMenuShow} />
          )}
          {showAccounts && (
            <Accounts users={users} onSelectUser={handleSelectUser} onClose={handleMenuShow} />
          )}
          {showPayBills && (
            <PayBills onClose={handleMenuShow} onPayBill={handleWithdrawal} user={selectedUser} />
          )}
        </div>
      </>
    )}
  </div>
);
}
export default App;
