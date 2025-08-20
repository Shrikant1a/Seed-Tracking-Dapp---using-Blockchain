import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ConnectWalletButton({ onWalletConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress(); // ✅ plain address string
        setWalletAddress(address);
        onWalletConnected(address); // ✅ send only the string
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <button className="connect-wallet-button" onClick={connectWallet}>
      {walletAddress
        ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
