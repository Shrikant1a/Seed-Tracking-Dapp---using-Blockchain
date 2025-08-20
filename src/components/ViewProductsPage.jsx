import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../Style/Viewproduct.css";
import { useNavigate } from "react-router-dom";
import contractABI from "../abi/SeedTrackerABI.json";
const contractAddress = "0xFa366483967ead1C0C10F99362B5CB6E996e4F22";

function ViewProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Wallet connection check
  const checkWalletConnection = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return null;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    return accounts[0];
  };

  // ✅ Fetch product list
  const fetchProducts = async () => {
    try {
      const account = await checkWalletConnection();
      if (!account) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const allBatchIds = await contract.getAllBatchIds();

      const productData = await Promise.all(
        allBatchIds.map(async (id) => {
          const data = await contract.viewSeedBatch(id);

          return {
            batchId: data.batchId.toString(),
            name: data.name,
            quantity: data.quantity.toString(),
            origin: data.origin,
            price: data.price.toString(),
            mfgDate: data.mfgDate,
            expDate: data.expDate,
            owner: data.currentOwner,
          };
        })
      );

      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
      <h2 className="text-2xl font-bold mb-4 text-center">
        🌱 Seed Batch Details 🌱
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <p>
                <strong>Batch ID:</strong> {p.batchId}
              </p>
              <p>
                <strong>Quantity:</strong> {p.quantity}
              </p>
              <p>
                <strong>Origin:</strong> {p.origin}
              </p>
              <p>
                <strong>Price:</strong> ₹{p.price}
              </p>
              <p>
                <strong>MFG Date:</strong> {p.mfgDate}
              </p>
              <p>
                <strong>EXP Date:</strong> {p.expDate}
              </p>
              <p>
                <strong>Owner:</strong> {p.owner}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProductsPage;
