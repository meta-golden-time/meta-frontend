import React from 'react';
import ChatInput from './chatInput';
import Message from './message';


const Chat = ({ messages, sendMessage }) => {
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
