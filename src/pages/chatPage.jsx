import React, { useState, useEffect, useRef } from 'react';
import Chat from '../components/chat/chat';
import '../styles/chat/chatPage.scss';
import { postLoginCheck } from '../apis/userApi/user';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loginUser, setLoginUser] = useState(''); // 로그인 체크 상태
  const ws = useRef(null);

  const LoginCheck = async () => {
    try {
      const result = await postLoginCheck(); // 로그인 체크 상태
      setLoginUser(result.user.userID);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LoginCheck();
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onclose = () => console.log('WebSocket disconnected');
    ws.current.onerror = (error) => console.error('WebSocket error:', error);

    ws.current.onmessage = async (event) => {
      let message = event.data;
      if (message instanceof Blob) {
        message = await message.text(); // Blob을 텍스트로 변환
      }
      const parsedMessage = JSON.parse(message); // JSON 형식으로 메시지 파싱
      console.log('Message received:', parsedMessage); // 메시지 수신 로그
      setMessages((prev) => [...prev, parsedMessage]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      const messageObject = {
        user: loginUser,
        text: message,
      };
      ws.current.send(JSON.stringify(messageObject));
      console.log('Message sent:', messageObject); // 메시지 전송 로그
    }
  };

  return <Chat messages={messages} sendMessage={sendMessage} loginUser={loginUser} />;
};

export default ChatPage;
