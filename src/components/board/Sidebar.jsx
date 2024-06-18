import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/board/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/board/my-posts">내가 쓴 글 보기</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
