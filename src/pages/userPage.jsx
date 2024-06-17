import React from 'react';
import '@styles/userPage.scss';

import { postLogout } from '../apis/userApi/user'; //로그인체크 진행

const UserPage = ({ bookmarks }) => {
  const userLogout = async() =>{
    const result = await postLogout();
    console.log("🚀 ~ userLogout ~ result:", result)
  }
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
              <button onClick={userLogout} >로그아웃</button>
            </div>
          </div>

        </div>

        <div className="address">
          <p>서울 강남구 테헤란로4길 38-5 혜정빌딩 4층</p>
        </div>

        <div className="bookmarks">
          <h3>북마크 목록</h3>
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bookmark-item">
              <span>{bookmark.from}</span>
              <span>➡</span>
              <span>{bookmark.to}</span>
            </div>
          ))}
        </div>
        
    </div>
  );
};

export default UserPage;
