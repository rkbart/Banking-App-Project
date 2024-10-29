import React from 'react';
// import './Modal.css'; 

const Modal = ({ isOpen, children }) => { // declared inside App.js
  if (!isOpen) return null; // hides modal when not open (closed)

  return (
    <div>
      <div>
        {children} {/* Login.jsx inside App.js*/}
      </div>
    </div>
  );
};

export default Modal;