import './App.css';
import { useState } from 'react';
// import Login from './components/Login/Login.jsx'
// import Modal from './components/Modal/Modal.jsx'
import Users from './components/Users/Users.jsx'
import Accounts from './components/Accounts/Accounts.jsx'
import Details from './components/Details/Details.jsx'
import Menu from '../src/components/Menu/Menu.jsx'
import PayBills from './components/PayBills/PayBills.jsx'
import History from './components/History/History.jsx'
import BuyLoad from './components/BuyLoad/BuyLoad.jsx'

function App() {
  // const [isModalOpen, setModalOpen] = useState(false);  
  // const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   setModalOpen(true);
  // }, []);
 
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
  
  const [showMenu, setShowMenu] = useState(true); // Track if Menu is shown
  const [showUsers, setShowUsers] = useState(false); // Track if Users is shown
  const [showAccounts, setShowAccounts] = useState(false); // Track if Accounts is shown
  const [showPayBills, setPayBills] = useState(false); // Track if PayBills is shown

  
  const handleSelectUser = (user) => {
      setSelectedUser(user);
  };

  const handleDeposit = (amount) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.email === selectedUser.email) {
          // Update the selected user with the new balance
          const updatedUser = { ...user, balance: user.balance + amount };
          setSelectedUser(updatedUser); // Update the selected user state
          return updatedUser; // Return the updated user
        }
        return user; // Return the other users unmodified
      });
    });
  };

  // const handleMenuHide = () => {
  //   setShowUsers(false);
  //   setShowAccounts(false);
  // };

  const handleMenuShow = () => {
    setShowUsers(false);
    setShowAccounts(false);
    setPayBills(false);
  };

  const handleAddUser = () => {
    setShowUsers(true); // Show Users component
    setShowAccounts(false); // Ensure Accounts is hidden
    setPayBills(false);
  };

  const handleManageAccounts = () => {
    setShowAccounts(true); // Show Accounts component
    setShowUsers(false); // Ensure Users is hidden
    setPayBills(false);
  };
  
  const handlePayBills = () => {
    setPayBills(true); // Show PayBills component
    setShowAccounts(false); // Hide Accounts component
    setShowUsers(false); // Ensure Users is hidden
  };

  return (
    <div className="App">
      <div id='upper-wrapper'>
        {selectedUser && <Details user={selectedUser} onDeposit={handleDeposit} />}
        
        {showMenu && (
          <Menu 
            onAddUser={handleAddUser} 
            onManageAccounts={handleManageAccounts} 
            onPayBills={handlePayBills} 
          />
        )}
        <History />
      </div>
      
      <div id='lower-wrapper'>
        {showUsers && (
          <Users users={users} setUsers={setUsers}  onClose={handleMenuShow}/> // onClose={() => setShowMenu(true)}
        )}
        {showAccounts && (
          <Accounts users={users} onSelectUser={handleSelectUser} onClose={handleMenuShow}/>
        )} 
        {showPayBills && (
          <PayBills onClose={handleMenuShow} /> 
        )}
      </div>
    </div>
  );
}

export default App;
