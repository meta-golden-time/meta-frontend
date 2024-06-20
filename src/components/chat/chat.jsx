import React from 'react';
import ChatInput from './chatInput';
import Message from './message';
import '../../styles/chat/chatPage.scss';

const Chat = ({ messages, sendMessage, loginUser }) => {
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.length === 0 ? (
          <div className="message-box-placeholder">
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg} loginUser={loginUser} />
          ))
        )}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
