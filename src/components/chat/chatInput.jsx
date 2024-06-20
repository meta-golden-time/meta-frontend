import React, { useState } from 'react';
import '../../styles/chat/chatInput.scss';

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
