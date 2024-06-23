
import React, { useState, useEffect } from "react";


// 이미지 가져오기
import myLogo from '@img/main/golden_time_logo.svg';
import arrowDownIcon from '@img/headerMenuBar/arrow_down.svg'; // 화살표 이미지 import

// css 디자인 가져오기
import '@styles/headerMenuBar/headerMenuBar.scss'


const HeaderMenuBar = ({ currentPage, isWeatherOrMainPage, checkLoginStatus }) => {
  // 프로필 버튼을 눌렀을 때 드롭다운 버튼 동작

  
  useEffect(() => {
    // 페이지에 따라 헤더 스타일 변경
    const headerElement = document.querySelector('.header');
    if (currentPage === 1) {
      // 첫 번째 페이지에서는 헤더를 투명하게 설정
      headerElement.classList.add('transparent');
      headerElement.classList.remove('solid');
    } else {
      // 다른 페이지에서는 헤더를 흰색으로 설정
      headerElement.classList.add('solid');
      headerElement.classList.remove('transparent');
    }

  }, [currentPage]);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <header className={`header ${currentPage === 1 ? 'transparent' : 'solid'}`}>
      <div className="logo">
        {/* 로고 이미지 */}
        <div>
          <a href="/"> <img src={myLogo} alt="Logo" /> </a>
        </div>
      </div>
      {/* 로그인이 되어 있을 때만 내비게이션 메뉴 보여주기 */}
      {checkLoginStatus && (
        <nav className={`nav ${isWeatherOrMainPage ? '' : 'black-text'}`}>
          <a href="/weather">날씨</a>
          <a href="/maps">지도</a>
          <a href="/chatting">커뮤니티</a>
        </nav>
      )}
      {/* 프로필 이미지 및 드롭다운 토글 */}
      <div className="profile">
        <div className="dropdown">
          <div className="profile-btn" onClick={toggleDropdown}>
            {/* 프로필 버튼 */}
            <h6 className={`profile-btn-style ${isWeatherOrMainPage ? '' : 'black-text'}`}>프로필</h6>
            {/* 드롭다운 화살표 아이콘 */}
            <img src={arrowDownIcon} alt="Dropdown Arrow" className={`arrow-icon ${isWeatherOrMainPage ? currentPage === 1 ? 'white' : 'black' : ''} `} />
          </div>
          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            // <div className="dropdown-menu">
            <div>
              {checkLoginStatus ? (
                <>
                  <a href="/user/userPage">마이페이지</a>
                  <a href="/board">고객센터</a>
                  <a href="#logout">로그아웃</a>
                </>
              ) : (
                <>
                  <a href="/login">로그인</a>
                  <a href="/register">회원가입</a>
                </>
              )}

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default HeaderMenuBar;
