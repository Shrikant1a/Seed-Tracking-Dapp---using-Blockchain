import React from "react";

const MessageBox = ({ message, onClose }) => {
  if (!message) return null; // Don't render if no message

  return (
    <div
      className="message-box"
      style={{ display: message ? "block" : "none" }}
    >
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default MessageBox;
