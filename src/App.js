import { useState } from 'react';
import './App.css';
// import Login from './components/Login/Login.jsx'
// import Modal from './components/Modal/Modal.jsx'
import Users from './components/Users/Users.jsx'
import Accounts from './components/Accounts/Accounts.jsx'
import Details from './components/Details/Details.jsx'
import data from '../src/data/data.json';
// import { useState, useEffect } from 'react';

function App() {
  // const [isModalOpen, setModalOpen] = useState(false);  
  // const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   setModalOpen(true);
  // }, []);
 
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
      setSelectedUser(user);
  };

  return (
    <div className="App">
      <Users users={users} setUsers={setUsers} />
      <Accounts users={users} data={data} onSelectUser={handleSelectUser}/>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Login onLoginSuccess={closeModal}/> 
      </Modal> */}
      <Details user={selectedUser} />
    </div>
  );
}

export default App;
