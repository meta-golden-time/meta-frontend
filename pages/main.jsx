import React, { useEffect } from 'react';

// 스크롤 애니메이션 라이브러리 불러오기
import Aos from 'aos'
import "aos/dist/aos.css";

import '../styles/home.scss'; // SCSS 파일 임포트
import imagetest from '../testImage/right.png' // 이미지 파일 임포트


const Main = () => {
  {/* AOS 스크립트 시작 */}
  useEffect(() => {
    {/* 자바스크립트로 init()을 해야 동작한다.*/}
    Aos.init({
      duration: 1200,
      easing: 'ease-in-out-back'
    });
  },[])

  return (
  <div>
    <h1>홈 페이지</h1>

    {/* data-aos-* 속성을 태그에다가 써주면 알아서 동작됨 */}
    <img src={imagetest} alt="" className="homeImage" data-aos="zoom-out-right"/> {/* 오른쪽으로 줌아웃 하는 모션 설정 */}
    <button className="homeButton" data-aos="fade-up">클릭하세요</button> {/* 아래에서 위로 올라오는 모션 */}

  </div>
  );
};

export default Main;