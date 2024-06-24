import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>관리자 메뉴</h3>
      <ul>
        <li><Link to="/admin/userInfo">회원정보보기</Link></li>
        <li>서비스 준비중
          <ul>
            <li><Link to="/admin/naverNews">네이버뉴스</Link></li>
            <li><Link to="/admin/realtimeSubway">실시간지하철</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
