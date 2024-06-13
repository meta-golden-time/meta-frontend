// 적용한 AOS 애니메이션
// data-aos="zoom-out-right" -> 오른쪽으로 줌아웃 하는 모션 설정
// data-aos="fade-up" -> 아래에서 위로 올라오는 모션

import { useEffect } from 'react';

// 스크롤 애니메이션 AOS 라이브러리 불러오기
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일시트
import '@styles/main.scss' // 커스텀 스타일시트
import image from '@img/main/map_page_img.png'; // 이미지 파일 가져오기

function Main() {
  useEffect(() => {
    Aos.init({ duration: 1100 }); // AOS 애니메이션 초기화 및 지속시간 설정
  }, []);

  return (
    <div className="app">
      <header className="headerBack">
        <div className="headerTitle" data-aos="fade-down">
          <h1>당신의 바쁜 아침 출근 길을 <p>도와줄 첫 번째 비서</p></h1>
        </div>
      </header>

      <div className='contentBunch'>
        <section className="content" data-aos="fade-up" data-aos-delay="100">
          <div className='divWeather'>
            <h2>맞춤형 오늘의 날씨 정보</h2>
            <p>당신이 설정한 위치나, 현재 장소의 날씨 정보를 제공해요.</p>
          </div>
          <div className='divWeaterImg'>
            <img src={image} alt="" className="mainImage" data-aos="zoom-out-right" />
          </div>
          <div className='divWeaterBut'>
            <button className="mainButton" data-aos="fade-up">
              클릭하세요
            </button>
          </div>
        </section>

        <section className='content' data-aos="fade-up" data-aos-delay="100">
          <div>
            <h2>편리한 길 찾기 서비스</h2>
            <p>
              출발 위치와 도착 위치를 입력하면 이용할 지하철이나 버스 또는 자가용,
              교통편에 따라 최적의 경로를 제공해요.
            </p>
          </div>
          <div>
            <img src={image} alt="" className="mainImage" data-aos="zoom-out-right" />
          </div>
          <div>
            <button className="mainButton" data-aos="fade-up">
              클릭하세요
            </button>
          </div>
        </section>

        <section className='content' data-aos="fade-up" data-aos-delay="100">
          <div>
            <h2>경로 즐겨찾기</h2>
            <p>자주 이용하는 경로를 빠르게 확인해보세요.</p>
          </div>
          <div>
            <img src={image} alt="" className="mainImage" data-aos="zoom-out-right" />
          </div>
          <div>
            <button className="mainButton" data-aos="fade-up">
              클릭하세요
            </button>
            </div>
        </section>

        <section className='content' data-aos="fade-up" data-aos-delay="100">
          <div>
            <h2>알림 설정</h2>
            <p>
              이제는 졸아도 안심하세요. 원하는 교통 수단으로 경로를 선택하면 도착 10분 전 알림 받을
              수 있어요.
            </p>
          </div>
          <div>
            <img src={image} alt="" className="mainImage" data-aos="zoom-out-right" />
          </div>
          <div>
            <button className="mainButton" data-aos="fade-up">
              클릭하세요
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Main;
