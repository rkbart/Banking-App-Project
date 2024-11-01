import './App.css';
import { useState } from 'react';
import data from '../src/data/data.json';
// import Login from './components/Login/Login.jsx'
// import Modal from './components/Modal/Modal.jsx'
import Users from './components/Users/Users.jsx'
import Accounts from './components/Accounts/Accounts.jsx'
import Details from './components/Details/Details.jsx'
import Menu from '../src/components/Menu/Menu.jsx'

function App() {
  // const [isModalOpen, setModalOpen] = useState(false);  
  // const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   setModalOpen(true);
  // }, []);
 
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  
  const [showMenu, setShowMenu] = useState(true); // Track if Menu is shown
  const [showUsers, setShowUsers] = useState(false); // Track if Users is shown
  const [showAccounts, setShowAccounts] = useState(false); // Track if Accounts is shown

  
  const handleSelectUser = (user) => {
      setSelectedUser(user);
  };

  const handleMenuHide = () => {
    setShowMenu(false); // Hide the Menu
    setShowUsers(false);
    setShowAccounts(false);
  };

  const handleMenuShow = () => {
    setShowMenu(true); // Show the Menu again
    setShowUsers(false);
    setShowAccounts(false);
  };

  const handleAddUser = () => {
    setShowUsers(true); // Show Users component
    setShowMenu(false); // Hide Menu
    setShowAccounts(false); // Ensure Accounts is hidden
  };

  const handleManageAccounts = () => {
    setShowAccounts(true); // Show Accounts component
    setShowMenu(false); // Hide Menu
    setShowUsers(false); // Ensure Users is hidden
  };

  return (
    <div className="App">
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Login onLoginSuccess={closeModal}/> 
      </Modal> */}
      {/* <Accounts users={users} data={data} onSelectUser={handleSelectUser}/> */}
      <Details user={selectedUser} />

      {showMenu ? (
        <Menu 
          setMenuVisibility={handleMenuHide} 
          onAddUser={handleAddUser} // Pass handler for add user
          onManageAccounts={handleManageAccounts} // Pass handler for manage accounts
        />
      ) : showUsers ? (
        <Users users={users} setUsers={setUsers} onClose={handleMenuShow} /> // Show Users component
      ) : (
        <Accounts users={users} data={data} onSelectUser={handleSelectUser} onClose={handleMenuShow} /> // Show Accounts component
      )}
    </div>
  );
}

export default App;
