import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/sidebar';
import '../styles/admin/adminPage.scss';

const AdminPage = () => {
  return (
    <div className="admin-page">
      {/* <div className="header">관리자 페이지</div> */}
      <div className="content-wrapper">
        <Sidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
