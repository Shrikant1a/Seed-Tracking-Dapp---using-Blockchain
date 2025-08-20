
// src/components/AuthHeader.jsx
import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';
import '../Style/AuthHeader.css';

function AuthHeader({ onShowLogin, onShowRegister, activeForm, onWalletConnected }) {
  return (
    <header className="auth-header">
      <div className="header-left">
        <h2 className="site-title">🌱GreenLedger🌱</h2>
          
      </div>

      <div className="header-right">
        <div className="form-toggle-buttons">
          <button
            className={activeForm === 'login' ? 'active' : ''}
            onClick={onShowLogin}
          >
            Login
          </button>
          <button
            className={activeForm === 'register' ? 'active' : ''}
            onClick={onShowRegister}
          >
            Register
          </button>
        </div>

        <ConnectWalletButton onWalletConnected={onWalletConnected} />
      </div>

    </header>
    
  );
}

export default AuthHeader;
