
// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import AddProductFrom from './AddProductForm';

const HomePage = ({ onLogout , walletAddress }) => {
  const navigate = useNavigate(); // ✅ Hook for routing

  return (
    <div className="main-home-page">
      <header>
        <div className="home-header-content">
          <div className="home-logo">Seed Tracker Using Blockchain</div>
          {/* <p>Wallet: {walletAddress}</p> */}
           <nav className="home-nav">
      <ul>
        <li>
          <button className="home-nav-link" onClick={() => navigate('/')}>
            HOME
          </button>
        </li>
        <li>
          <button className="home-nav-link" onClick={() => navigate('/add-product')}>
            ADD PRODUCT
          </button>
        </li>
        <li>
          <button className="home-nav-link" onClick={() => navigate('/view-products')}>
            SHOW PRODUCTS
          </button>
        </li>
        <li>
          <button className="home-nav-link" onClick={() => navigate('/show-transaction')}>
            SHOW TRANSACTION
          </button>
        </li>
        <li>
          <button className="home-nav-link" onClick={onLogout}>
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
            
        </div>
        <div className="hero-image">
          <img src="../public/image/seed.webp" alt="Seeds Background" /> {/* Adjust path */}
        </div>
      </header>

      <main>
        <section className="quote-section">
          <p>Agriculture is Best, Enterprise is Acceptable, But Avoid Being On A <span className="fixed-wage">Fixed Wage</span></p>
        </section>

        <section className="categories">
          <div className="category-grid">
            <div className="category-item">
              <img src="/image/cattle farm.jpg" alt="Cattle Farm" /> {/* Adjust path */}
              <div className="category-name">CATTLE FARM</div>
            </div>
            <div className="category-item">
              <img src="/image/farming.jpg" alt="Farming" /> {/* Adjust path */}
              <div className="category-name">FARMING</div>
            </div>
            <div className="category-item">
              <img src="/image/poultry.jpg" alt="Poultry" /> {/* Adjust path */}
              <div className="category-name">POULTRY</div>
            </div>
            <div className="category-item">
              <img src="/image/gardening.jpg" alt="Gardening" /> {/* Adjust path */}
              <div className="category-name">GARDENING</div>
            </div>
          </div>
        </section>
      </main>

      <footer className='footer'>
  <div className="footer-container">
        <p>🌱 Seed Tracker DApp © {new Date().getFullYear()} — Built on Blockchain</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
          <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer">Ethereum</a>
        </div>
      </div>
      </footer>
    </div>
  );
};

export default HomePage;

