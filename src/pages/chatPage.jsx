import React, { useState, useEffect, useRef } from 'react';
import Chat from '../components/chat/chat';
import '../styles/chat/chatPage.css';
import { postLoginCheck } from '../apis/userApi/user';

const chatPage = () => {
  const [messages, setMessages] = useState([]);
  //const [loginUser, setLoginUser] = useState(false); // 로그인 체크 상태
  const ws = useRef(null);


  const LoginCheck = async() =>{
    try{
      const result = await postLoginCheck();// 로그인 체크 상태
      //setLoginUser(result.user.userID);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    LoginCheck()
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
     // userID를 텍스트에 추가
      //let messageText = ` ${loginUser}:  `;
    if (ws.current.readyState === WebSocket.OPEN) {
      console.log('Message sent:', message); // 메시지 전송 로그
      //messageText += message
      ws.current.send(message);
    }
  };

  return <Chat messages={messages} sendMessage={sendMessage} />;
};

export default chatPage;
