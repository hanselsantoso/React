import React, { useState } from "react";
import "../assets/ChatApp.css";

function MessageInput({ onSend }) {
    const [input, setInput] = useState("");
  
    const handleSend = () => {
      if (input.trim() !== "") {
        onSend(input);
        setInput("");
      }
    };
  
    return (
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    );
  }
  
  export default MessageInput;