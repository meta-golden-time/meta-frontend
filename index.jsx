import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate  } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/headerMenuBar';
import Main from '@pages/main';
import LoginPage from '@pages/loginPage';
import RegisterPage from '@pages/register';
import RegisterPageG from '@pages/registerGoogle';
import UserPage from '@pages/userPage';
import MapPage from '@pages/map.jsx';
import WeatherPage from '@pages/weatherPage';
import ChatPage from '@pages/chatPage';
import BoardList from '@components/board/BoardList';
import BoardForm from '@components/board/BoardForm';
import BoardView from '@components/board/BoardView';
import MyPosts from '@components/board/MyPosts';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import './index.css';
import '@font/font.scss';

function App() {
  const { isLogin, loginChecked } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const noHeaderPaths = ['/login', '/register'];
  const isWeatherOrMainPage = location.pathname === '/' || location.pathname === '/weather';

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement;
      const pageHeight = window.innerHeight;

      if (scrollTop >= 0 && scrollTop < pageHeight) {
        setCurrentPage(1);
      } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        setCurrentPage(2);
      } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
        setCurrentPage(3);
      } else {
        setCurrentPage(4);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const ProtectedRoute = ({ element, ...rest }) => {
    if (!isLogin) {
      return <Navigate to="/login" />;
    }
    return element;
  };


  if (!loginChecked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && (
        <Header
          currentPage={currentPage}
          isWeatherOrMainPage={isWeatherOrMainPage}
          checkLoginStatus={isLogin}
        />
      )}
      <Routes>
        <Route path='/' element={<Main currentPage={currentPage} setCurrentPage={setCurrentPage} checkLoginStatus={isLogin} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/registerG' element={<RegisterPageG />} />
        <Route path='/user/userPage' element={<ProtectedRoute element={<UserPage/>} />} />
        <Route path='/maps' element={<MapPage />} />
        <Route path='/weather' element={<WeatherPage />} />
        <Route path='/chatting' element={<ProtectedRoute element={<ChatPage />} />} />
         {/*board 게시판 */}
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/create" element={<ProtectedRoute element={<BoardForm />} />} />
        <Route path="/board/edit/:id" element={<ProtectedRoute element={<BoardForm isEdit={true} />} />} />
        <Route path="/board/view/:id" element={<ProtectedRoute element={<BoardView />} />} />
        <Route path="/board/my-posts" element={<ProtectedRoute element={<MyPosts />} />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<AppWrapper />);
