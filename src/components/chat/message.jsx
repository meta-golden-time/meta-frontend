import React from 'react';
import '../../styles/chat/message.css';

const Message = ({ message }) => {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};

export default Message;
