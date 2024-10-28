import './App.css';
import React, { useState } from 'react';
import Login from './components/Login/Login.jsx'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
  <h1>Welcome to Kamote Banking App</h1>
     <Login /> {/* Render the Login component directly */}
    </div>
  );
}

export default App;
