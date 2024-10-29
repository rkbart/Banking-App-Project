import './App.css';
// import Login from './components/Login/Login.jsx'
// import Modal from './components/Modal/Modal.jsx'
import Users from './components/Users/Users.jsx'
// import { useState, useEffect } from 'react';

function App() {
  // const [isModalOpen, setModalOpen] = useState(false);  
  // const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   setModalOpen(true);
  // }, []);

  return (
    <div className="App">
      <Users />
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Login onLoginSuccess={closeModal}/> 
      </Modal> */}
    </div>
  );
}

export default App;
