import React, { createContext, useContext, useState, useEffect } from 'react';
import { postLoginCheck } from '../apis/userApi/user'; // 로그인 체크 API를 불러옵니다.

const AuthContext = createContext(); // AuthContext 생성

export const useAuth = () => useContext(AuthContext); // AuthContext를 쉽게 사용할 수 있도록 하는 훅

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const result = await postLoginCheck();
        setIsLogin(result.success);
      } catch (err) {
        console.error(err);
      } finally {
        setLoginChecked(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, loginChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
