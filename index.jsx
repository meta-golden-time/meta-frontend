import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/header';
import Main from '@pages/main';
import LoginPage from '@pages/loginPage';
import RegisterPage from '@pages/register';
import LoginRyuPage from '@pages/signInPage';
import RegisterRyuPage from '@pages/signUpPage';
import UserPage from '@pages/userPage';
import MapPage from '@pages/map.jsx';
import WeatherPage from '@pages/weatherPage';
import ChatPage from '@pages/chatPage';
import BoardPage from '@pages/boardPage';

import BoardList from '@components/board/BoardList';
import BoardForm from '@components/board/BoardForm';
import BoardView from '@components/board/BoardView';
import MyPosts from '@components/board/MyPosts';

// userPage에 들어가는 리스트 데이터
function App() {
  const bookmarks = [
    { id: 1, from: '장소 1', to: '장소 2' },
    { id: 2, from: '장소 3', to: '장소 4' },
    { id: 3, from: '장소 5', to: '장소 6' },
  ];

  const location = useLocation();
  const noHeaderPaths = ['/login', '/register', '/login_ryu', '/register_ryu'];

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login_ryu' element={<LoginRyuPage />} />
        <Route path='/register_ryu' element={<RegisterRyuPage />} />
        <Route path='/user/userPage' element={<UserPage bookmarks={bookmarks} />} />
        <Route path='/maps' element={<MapPage />} />
        <Route path='/weather' element={<WeatherPage />} />
        <Route path='/chatting' element={<ChatPage />} />

        {/*board 게시판 */}
        
        <Route path="/" element={<BoardPage />} />
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
