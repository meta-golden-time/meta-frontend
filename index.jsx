import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <>
      <BrowserRouter>

      </BrowserRouter>
      
    </>
  );
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);