import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "../Style/Showtransaction.css";
import contractABI from "../abi/SeedTrackerABI.json";

const contractAddress = "0xFa366483967ead1C0C10F99362B5CB6E996e4F22";

function TransferAndHistory() {
  const [batchId, setBatchId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const transferProduct = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.transferSeedBatch(parseInt(batchId), newOwner);
      await tx.wait();
      alert("✅ Transfer successful!");
    } catch (error) {
      console.error("❌ Transfer error:", error);
      alert("Error: " + error.message);
    }
  };

  const showHistory = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const ownershipRecords = await contract.getOwnershipHistory(
        parseInt(batchId)
      );
      setHistory(ownershipRecords);
    } catch (error) {
      console.error("❌ History fetch error:", error);
      alert("Error fetching history: " + error.message);
    }
  };

  return (
    <div className="container">
      <header className="headerfile">
        <div className="home-header-content">
          <div className="home-logo">🌱Seed Tracker Using Blockchain</div>
          <nav className="home-nav">
            <ul>
              <li>
                <button className="home-nav-link" onClick={() => navigate("/")}>
                  HOME
                </button>
              </li>
              <li>
                <button
                  className="home-nav-link"
                  onClick={() => navigate("/add-product")}
                >
                  ADD PRODUCT
                </button>
              </li>
              <li>
                <button
                  className="home-nav-link"
                  onClick={() => navigate("/view-products")}
                >
                  SHOW PRODUCTS
                </button>
              </li>
              <li>
                <button
                  className="home-nav-link"
                  onClick={() => navigate("/show-transaction")}
                >
                  SHOW TRANSACTION
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hero-image">
          <img src="../public/image/seed.webp" alt="Seeds Background" />{" "}
          {/* Adjust path */}
        </div>
      </header>
      <h2 className="title">⚧️Transfer Product Ownership</h2>

      <input
        type="number"
        placeholder="Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        className="input"
      />

      <button onClick={transferProduct} className="button transfer">
        Transfer
      </button>

      <button onClick={showHistory} className="button history">
        Show Transaction History
      </button>

      {history.length > 0 && (
        <div className="history-section">
          <h3 className="history-title">Ownership History</h3>
          <ul className="history-list">
            {history.map((record, index) => (
              <li key={index} className="history-item">
                <strong>Owner:</strong> {record.owner}
                <br />
                <strong>Timestamp:</strong>{" "}
                {new Date(Number(record.timestamp) * 1000).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TransferAndHistory;
