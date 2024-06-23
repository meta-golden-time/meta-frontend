import { useEffect, useRef } from "react";

// 스크롤 애니메이션 AOS 라이브러리 불러오기
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일시트

// 캐러셀 적용을 위한 Bootstrap 스타일시트
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Dots from "@components/main/dots";
import Content from '@components/main/content.jsx';
import image from '@img/main/map_page_img.png'; // 임시 이미지

import '@styles/main/main.scss';

function Main({ currentPage, setCurrentPage, checkLoginStatus }) {
  const DIVIDER_HEIGHT = 5; // 화면와 화면 사이의 빈 공간 오차 허용범위
  const outerDivRef = useRef();

  useEffect(() => {
    Aos.init({ duration: 1000 }); // AOS 애니메이션 초기화 및 지속시간 설정

    // 스크롤
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같음

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1화면
          console.log("현재 1화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2화면
          console.log("현재 2화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          //현재 3화면
          console.log("현재 3화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          //현재 4화면
          console.log("현재 4화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
          //현재 5화면
          console.log("현재 5화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 5 + DIVIDER_HEIGHT * 5,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(6);
        } else {
          // 현재 6화면
          console.log("현재 6화면, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 6 + DIVIDER_HEIGHT * 6,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1화면
          console.log("현재 1화면, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2화면
          console.log("현재 2화면, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          //현재 3화면
          console.log("현재 3화면, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          //현재 4화면
          console.log("현재 4화면, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
          //현재 5화면
          console.log("현재 5화면, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(4);
        } else {
          // 현재 3페이지
          console.log("현재 6페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(5);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, [setCurrentPage]);

  const handleDotClick = (pageNum) => {
    const pageHeight = window.innerHeight;
    outerDivRef.current.scrollTo({
      top: (pageNum - 1) * (pageHeight + DIVIDER_HEIGHT),
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(pageNum);
  };

  const handleWeatherClick = () => {
    // 두 번째 화면으로 스크롤
    const pageHeight = window.innerHeight;
    outerDivRef.current.scrollTo({
      top: pageHeight + DIVIDER_HEIGHT,
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(2);
  };

  const handleMapClick = () => {
    // 다섯 번째 화면으로 스크롤
    const pageHeight = window.innerHeight;
    outerDivRef.current.scrollTo({
      top: 4 * (pageHeight + DIVIDER_HEIGHT),
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(4);
  };

  return (
    <div ref={outerDivRef} className="outer">
      <Dots currentPage={currentPage} handleDotClick={handleDotClick} />

      {/* 제목 섹션 == 첫 번째 화면 */}
      <div className="inner main-title-background">
        <div className="main-title-div" data-aos="fade-down">
          <h1 className="main-title-h" style={{ color: 'white' }}>
            당신의 바쁜 아침 출근 길을 <p className='main-title-p'>도와줄 <span style={{ color: '#007bff' }}>첫 번째 비서</span></p>
          </h1>
          {/* 제목 섹션의 날씨, 지도 위치 버튼 */}
          <div className='main-title-btn'>
          <button type="button" onClick={handleWeatherClick}>날씨</button>
          <button type="button" onClick={handleMapClick}>지도</button>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>

      {/* 두 번째 화면 */}
      <div className='inner two-screen'>
        <div className="weader-row">
          <div className="weader-col">
            {/* 텍스트 콘텐츠 */}
            <div>
              <Content title="맞춤형 오늘의 날씨 정보" description="당신이 설정한 위치나, 현재 장소의 날씨 정보를 제공해요." />
            </div>
            {/* 링크 추가 */}
            <div className="weader-link">
              <a href={ checkLoginStatus? '/weather' : '/login' } className="custom-link">날씨 보러가기 →</a>
            </div>
          </div>
          {/* 이미지 콘텐츠 */}
          <div className="weader-col">
            <img src={image} className="img-fluid" alt="Example" />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* 세 번째 화면 */}
      <div className="inner three-screen">
        <Content title="편리한 길 찾기 서비스" description="출발 위치와 도착 위치를 입력하면 이용할 지하철이나 버스 또는 자가용, 교통편에 따라 최적의 경로를 제공해요." />
      </div>

      <div className="divider"></div>

      {/* 네 번째 화면 */}
      <div className="inner four-screen">
        <Content title="경로 즐겨찾기" description="자주 이용하는 경로를 빠르게 확인해보세요." />
      </div>

      <div className="divider"></div>

      {/* 다섯 번째 화면 */}
      <div className="inner five-screen">
      <div className="section d-flex justify-content-center align-items-center">
          {/* 캐러셀 추가 */}
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            {/* <div className="carousel-inner" data-aos="fade-up" data-aos-delay="450"> */}
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="4500">
                <Content title="편리한 길 찾기" image={image} />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <Content title="경로 즐겨찾기" image={image} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* 링크 추가 */}
        <div className="map-link">
          <a href={ checkLoginStatus? '/maps' : '/login' } className="custom-link">지도 보러가기 →</a>
        </div>
      </div>

      <div className="divider"></div>

      {/* 여섯 번째 화면 */}
      <div className='inner six-screen'>
        <div className="section">
          <div className="six-screen-div">
            <Content title="오늘의 교통정보 공유" description="채팅을 통해 오늘의 교통 및 날씨 상황을 공유할 수 있어요." />
          </div>
          {/* 링크 추가 */}
          <div className="chatting-link">
            <a href={ checkLoginStatus? '/chatting' : '/login' } className="custom-link">커뮤니티 보러가기 →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
