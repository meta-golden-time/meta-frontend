import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/header';
import Main from '@pages/main'
import LoginPage from '@pages/loginPage'
import RegisterPage from '@pages/register'
import UserPage from '@pages/userPage';
import MapPage from '@pages/map.jsx'
// import WeatherPage from '@pages/weatherPage'


// userPage에 들어가는 리스트 데이터
function App() {
  const bookmarks = [
    { id: 1, from: '장소 1', to: '장소 2' },
    { id: 2, from: '장소 3', to: '장소 4' },
    { id: 3, from: '장소 5', to: '장소 6' },
  ];

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/user/userPage' element={<UserPage bookmarks={bookmarks} />}/>
        <Route path='/map' element={<MapPage/>}/>
        {/* <Route path='/weather' element={<WeatherPage/>}/> */}

      </Routes>
    </BrowserRouter>
    </>
  );
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);