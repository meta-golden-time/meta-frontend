import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/board/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/board">문의사항</Link></li>
        <li><Link to="/board/my-posts">나의 문의사항</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
