import { useState } from "react";
import "./assets/ChatApp.css";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (newMessage) => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Simple Chat</h1>
      <ChatWindow messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default ChatApp;
