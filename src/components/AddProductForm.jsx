// AddProductForm.jsx

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import contractABI from '../abi/SeedTrackerABI.json';
import '../Style/AddProduct.css';

const contractAddress = '0xFa366483967ead1C0C10F99362B5CB6E996e4F22';

function AddProductForm() {
  const [formData, setFormData] = useState({
    batchId: '',
    name: '',
    quantity: '',
    origin: '',
    price: '',
    mfgDate: '',
    expDate: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const randomId = Math.floor(Date.now() + Math.random() * 1000);
    setFormData(prev => ({ ...prev, batchId: randomId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.addProduct(
        Number(formData.batchId),
        formData.name,
        Number(formData.quantity),
        formData.origin,
        Number(formData.price),
        formData.mfgDate,
        formData.expDate
      );

      await tx.wait();
      alert("✅ Product added successfully!");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Error: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <div className="add-product-container">
      <header className="headerfile">
        <div className="home-header-content">
          <div className="home-logo">🌱 Seed Tracker Using Blockchain</div>
          <nav className="home-nav">
            <ul>
              <li><button className="home-nav-link" onClick={() => navigate('/')}>HOME</button></li>
              <li><button className="home-nav-link" onClick={() => navigate('/add-product')}>ADD PRODUCT</button></li>
              <li><button className="home-nav-link" onClick={() => navigate('/view-products')}>SHOW PRODUCTS</button></li>
              <li><button className="home-nav-link" onClick={() => navigate('/show-transaction')}>SHOW TRANSACTION</button></li>
            </ul>
          </nav>
        </div>
        <div className="hero-image">
          <img src="/image/seed.webp" alt="Seeds Background" />
        </div>
      </header>

      <div className="form-card">
        <h2>Add Product</h2>
        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
        <input name="origin" placeholder="Origin" onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        <input name="mfgDate" type="date" placeholder="Manufacturing Date" onChange={handleChange} />
        <input name="expDate" type="date" placeholder="Expiry Date" onChange={handleChange} />
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default AddProductForm;
