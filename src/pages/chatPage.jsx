import React, { useState, useEffect, useRef } from 'react';
import Chat from '../components/chat/chat';
import '../styles/chat/chatPage.css';

const chatPage = () => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onclose = () => console.log('WebSocket disconnected');
    ws.current.onerror = (error) => console.error('WebSocket error:', error);

    ws.current.onmessage = async (event) => {
      let message = event.data;
      if (message instanceof Blob) {
        message = await message.text(); // Blob을 텍스트로 변환
      }
      console.log('Message received:', message); // 메시지 수신 로그
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      console.log('Message sent:', message); // 메시지 전송 로그
      ws.current.send(message);
    }
  };

  return <Chat messages={messages} sendMessage={sendMessage} />;
};

export default chatPage;
