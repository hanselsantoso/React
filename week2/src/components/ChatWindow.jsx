import "../assets/ChatApp.css";
function ChatWindow({ messages }) {
    return (
      <div className="chat-window">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">{msg}</p>
        ))}
      </div>
    );
  }
  
  export default ChatWindow;
  
