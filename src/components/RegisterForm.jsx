// src/components/RegisterForm.js
import React, { useState } from "react";
// If using Firebase, uncomment and import db
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Import db from your config

const RegisterForm = ({ userId, showMessageBox }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Mock DB logic for pure CSS example
    // In a real Firebase app, you'd have:
    // if (!db || !userId) { showMessageBox("App not ready."); return; }

    if (
      !role ||
      !username ||
      !address ||
      !gender ||
      !email ||
      !contactNo ||
      !password
    ) {
      showMessageBox("Please fill in all required fields.");
      return;
    }

    try {
      // Mock data saving. In real Firebase:
      /*
      const appId = "default-app-id"; // Get actual app ID from config or context
      const collectionPath = `artifacts/${appId}/public/data/registrations`;
      await addDoc(collection(db, collectionPath), {
        userId: userId,
        role: role,
        username: username,
        address: address,
        gender: gender,
        email: email,
        contactNo: contactNo,
        password: password, // Hash this on backend!
        timestamp: new Date()
      });
      */
      console.log("Mock Registration Data:", {
        userId,
        role,
        username,
        address,
        gender,
        email,
        contactNo,
        password,
      });

      showMessageBox("Registration successful!");
      // Clear the form after successful registration
      setRole("");
      setUsername("");
      setAddress("");
      setGender("");
      setEmail("");
      setContactNo("");
      setPassword("");
    } catch (e) {
      console.error("Error during mock registration: ", e);
      showMessageBox("Error during registration. Please try again.");
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">REGISTER INFO</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field-row">
          <label htmlFor="registerRole" className="form-label">
            Select Role:
          </label>
          <div className="form-input-wrapper">
            <select
              id="registerRole"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer Info</option>
              <option value="distributor">Distributors Info</option>
              <option value="customer">Customer Info</option>
            </select>
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="registerUsername" className="form-label">
            User Name:
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="registerUsername"
              className="form-input"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="registerAddress" className="form-label">
            Address:
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="registerAddress"
              className="form-input"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-field-row">
          <label className="form-label">Gender:</label>
          <div className="gender-options">
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-radio"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <span className="form-radio-label">Male</span>
            </label>
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-radio"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span className="form-radio-label">Female</span>
            </label>
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="registerEmail" className="form-label">
            Email:
          </label>
          <div className="form-input-wrapper">
            <input
              type="email"
              id="registerEmail"
              className="form-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="registerContact" className="form-label">
            Contact No:
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="registerContact"
              className="form-input"
              placeholder="Enter Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="registerPassword" className="form-label">
            Password:
          </label>
          <div className="form-input-wrapper">
            <input
              type="password"
              id="registerPassword"
              className="form-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="text-center-wrapper">
          <button type="submit" className="btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
