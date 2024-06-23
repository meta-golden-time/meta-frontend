import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/headerMenuBar';
import Main from '@pages/main';
import LoginPage from '@pages/loginPage';
import RegisterPage from '@pages/register';
import UserPage from '@pages/userPage';
import MapPage from '@pages/map.jsx';
import WeatherPage from '@pages/weatherPage';
import ChatPage from '@pages/chatPage';

import BoardList from '@components/board/BoardList';
import BoardForm from '@components/board/BoardForm';
import BoardView from '@components/board/BoardView';
import MyPosts from '@components/board/MyPosts';

function App() {
  // userPage에 들어가는 리스트 데이터
  const bookmarks = [
    { id: 1, from: '장소 1', to: '장소 2' },
    { id: 2, from: '장소 3', to: '장소 4' },
    { id: 3, from: '장소 5', to: '장소 6' },
  ];

  // 로그인 체크 상태 임시 테스트 코드
  //const [checkLoginStatus, setLoginCheck] = useState(false); // 로그인 전
  const [checkLoginStatus, setLoginCheck] = useState(true); // 로그인 후

  // 스크롤을 통해 다른 화면 이동 감지
  const [currentPage, setCurrentPage] = useState(1);

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
      } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
        setCurrentPage(4);
      } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
        setCurrentPage(5);
      } else {
        setCurrentPage(6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // noHeaderPaths에 해당하는 페이지 메뉴바 숨기기
  const location = useLocation();
  const noHeaderPaths = ['/login', '/register'];

  console.log("언제언제 들어오나요?") // 여기에다가 로그인 체크 넣어서 각 route에다가  넣어주기 


  // WeatherPage와 Main을 제외한 페이지에서 메뉴 글자 색을 검정색으로 설정
  const isWeatherOrMainPage = location.pathname === '/' || location.pathname === '/weather';

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && (
        <Header
          currentPage={currentPage}
          isWeatherOrMainPage={isWeatherOrMainPage}
          checkLoginStatus={checkLoginStatus}
        />
      )}
      <Routes>
        <Route path='/' element={<Main currentPage={currentPage} setCurrentPage={setCurrentPage} checkLoginStatus={checkLoginStatus} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/user/userPage' element={<UserPage bookmarks={bookmarks} />} />
        <Route path='/maps' element={<MapPage />} />
        <Route path='/weather' element={<WeatherPage />} />
        <Route path='/chatting' element={<ChatPage />} />

        {/*board 게시판 */}
        {/* <Route path="/" element={<BoardPage />} /> */}
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/create" element={<BoardForm />} />
        <Route path="/board/edit/:id" element={<BoardForm isEdit={true} />} />
        <Route path="/board/view/:id" element={<BoardView />} />
        <Route path="/board/my-posts" element={<MyPosts />} />

      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<AppWrapper />);
