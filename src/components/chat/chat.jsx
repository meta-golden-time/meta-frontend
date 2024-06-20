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
            <Message message={{ user: '', text: '여기에 메시지가 표시됩니다.' }} loginUser={loginUser} />
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
