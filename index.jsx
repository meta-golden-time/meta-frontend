import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/header';
import Main from '@pages/main'
import UserPage from './pages/userPage';


function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/user/userPage' element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);