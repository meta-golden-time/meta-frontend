import React from 'react';
import '../../styles/chat/message.scss';

const Message = ({ message, loginUser }) => {
  const { user, text } = message;
  const isOwnMessage = user === loginUser;

  return (
    <div className={`message ${isOwnMessage ? 'own' : ''}`}>
      <div className="message-content">
        <div className="message-user">{user}</div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
};

export default Message;
