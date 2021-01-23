import React from "react";
import "./message.css";

const Message = ({ danger, text }) => {
  return (
    <div className="messageContainer">
      <div
        className="messageWrapper"
        style={{
          background: `${danger ? "rgba(250, 79, 79, 0.5)" : "rgba(22, 229, 154, 0.2)"}`,
        }}
      >
        <h2 className="messageText">{text}</h2>
      </div>
    </div>
  );
};

export default Message;
