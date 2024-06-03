import React from 'react';
import '../styles/userPage.scss';

const UserPage = () => {
  return (
    <div className="user-page">
        <div className="user-info">
          <div className="weather">
            <div className="weather-icon">☀️</div>
            <div className="weather-details">
              <h2>서울</h2>
              <p>25°C</p>
              <p>미세먼지 맑음</p>
            </div>
          </div>
          <div className="user-details">
            <div className="user-photo"></div>
            <div className="user-info-text">
              <p>김유저 님</p>
              <p>abcd12345</p>
              <button>수정</button>
              <button>로그아웃</button>
            </div>
          </div>
        </div>
        <div className="address">
          <p>서울 강남구 테헤란로4길 38-5 혜정빌딩 4층</p>
        </div>
        <div className="bookmarks">
          <h3>북마크 목록</h3>
          <div className="bookmark-item">
            <span>장소 1</span>
            <span>➡</span>
            <span>장소 1</span>
          </div>
        </div>
    </div>
  );
};

export default UserPage;
