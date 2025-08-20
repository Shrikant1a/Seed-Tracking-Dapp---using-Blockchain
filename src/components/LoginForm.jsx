import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess, showMessageBox }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role && username && password) {
      showMessageBox("Login successful! Redirecting to Home Page.");
      onLoginSuccess();
      // Reset form
      setRole("");
      setUsername("");
      setPassword("");
    } else {
      showMessageBox("Please enter your role, username, and password.");
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">LOGIN US</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field-row">
          <label htmlFor="loginRole" className="form-label">
            Select Role:
          </label>
          <div className="form-input-wrapper">
            <select
              id="loginRole"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer Info</option>
              <option value="admin">Admin Info</option>
              <option value="distributor">Distributors Info</option>
              <option value="customer">Customer Info</option>
            </select>
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="loginUsername" className="form-label">
            User Name:
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="loginUsername"
              className="form-input"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-field-row">
          <label htmlFor="loginPassword" className="form-label">
            Password:
          </label>
          <div className="form-input-wrapper">
            <input
              type="password"
              id="loginPassword"
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
