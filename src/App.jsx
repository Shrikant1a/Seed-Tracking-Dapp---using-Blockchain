

// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import MessageBox from './components/MessageBox';
import './App.css'
import AddProductForm from './components/AddProductForm.jsx';
import ViewProducts from './components/ViewProductsPage.jsx';
import ShowTransaction from './components/ShowTransaction.jsx';
import TransferAndHistory from './components/ShowTransaction.jsx';


function App() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('loading...');
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const mockAuthInit = async () => {
      const currentUserId = 'mock-user-id-' + Math.random().toString(36).substring(2, 10);
      setUserId(currentUserId);
    };
    mockAuthInit();
  }, []);

  const showMessageBox = (msg) => {
    console.log("Showing message:", msg);
    setMessage(msg);
  };

  const closeMessageBox = () => {
    setMessage('');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showMessageBox("You have been logged out.");
    setShowLoginPage(true);
  };

  const handleWalletConnected = (address) => {
    // console.log("Received address from ConnectWalletButton:", address);
    setWalletAddress(address);
    showMessageBox(`Wallet connected: ${address}`); // ✅ only string should come here
  };

  useEffect(() => {
    console.log(isLoggedIn);
    
  },[isLoggedIn])

  return (
 
    <Router>
  <div className="app-container">
    <div className="background-container"></div>

    {/* ✅ ONLY show MessageBox globally, not login UI */}
    <Routes>
      {/* Root route handles login/register and homepage */}
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <>
              <AuthHeader
                onShowLogin={() => setShowLoginPage(true)}
                onShowRegister={() => setShowLoginPage(false)}
                activeForm={showLoginPage ? 'login' : 'register'}
                onWalletConnected={handleWalletConnected}
              />
              <main className="form-container">
                <p className="user-id-display">User ID: {userId}</p>
                {showLoginPage ? (
                  <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    showMessageBox={showMessageBox}
                  />
                ) : (
                  <RegisterForm userId={userId} showMessageBox={showMessageBox} />
                )}
              </main>
            </>
          ) : (
            <HomePage onLogout={handleLogout} walletAddress={walletAddress} />
          )
        }
      />

      {/* Protected routes */}
      {isLoggedIn && (
        <>
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/view-products" element={<ViewProducts />} />
          <Route path="/show-transaction" element={<TransferAndHistory />} />

          {/* Add more protected routes here */}
        </>
      )}
    </Routes>

    <MessageBox message={message} onClose={closeMessageBox} />
  </div>
</Router>

  );
}

export default App;




