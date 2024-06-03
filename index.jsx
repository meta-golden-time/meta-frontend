import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from '@components/header';
import Home from '@pages/home'

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Home/>
      </BrowserRouter>
    </>
  );
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);