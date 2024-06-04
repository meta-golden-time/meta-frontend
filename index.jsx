import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Main from './pages/main'
import Map from './pages/map';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={ <Main/> } />
          <Route path="/map" element={ <Map/> } />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);