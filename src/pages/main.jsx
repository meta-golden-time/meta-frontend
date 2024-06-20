// 적용한 AOS 애니메이션
// data-aos="zoom-out-right" -> 오른쪽으로 줌아웃 하는 모션 설정
// data-aos="fade-up" -> 아래에서 위로 올라오는 모션


import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// 스크롤 애니메이션 AOS 라이브러리 불러오기
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일시트
// full page 라이브러리
import { Fullpage, FullPageSections, FullpageSection, FullpageNavigation } from '@ap.cx/react-fullpage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일시트
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JavaScript
import Content from '@components/content.jsx';
import image from '@img/main/map_page_img.png';
import '@styles/main/main.scss';

const Main = () => {

  useEffect(() => {
    Aos.init({ duration: 1200 }); // AOS 애니메이션 초기화 및 지속시간 설정
  }, []);

  return (
    <>
      <Fullpage>

        {/* 네비게이션 도트 추가 */}
        <FullpageNavigation/>

        <FullPageSections>
          
          {/* 제목 섹션 */}
          <FullpageSection style={{ height: '100vh' }}>
            <div className="section titleBackground">
              <div className="titleDiv" data-aos="fade-down">
                <h1 className="mainTitle" style={{ color: 'white' }}>
                  당신의 바쁜 아침 출근 길을 <p className='mainTitleP'>도와줄 <span style={{ color: '#007bff' }}>첫 번째 비서</span></p>
                </h1>
                {/* 버튼과 제목 사이의 간격을 위한 스타일 */}
                <div className='mainBtn'>
                  <button type="button">weather</button>
                  <button type="button">map</button>
                </div>
              </div>
            </div>
          </FullpageSection>
          
          {/* 첫 번째 페이지 */}
          <FullpageSection style={{ height: '100vh' }}>
            <div className="section container" data-aos="fade-up" data-aos-delay="450">
              <div className="row">
                <div className="col-md-6">
                  {/* 텍스트 콘텐츠 */}
                  <Content className="display-4" title="맞춤형 오늘의 날씨 정보" description="당신이 설정한 위치나, 현재 장소의 날씨 정보를 제공해요." />
                  {/* 링크 추가 */}
                  <div className="link-container">
                    <Link to='/weather' className="custom-link">weader →</Link>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* 이미지 콘텐츠 */}
                  <img src={image} className="img-fluid" alt="Example" />
                </div>
              </div>
            </div>
          </FullpageSection>

          {/* 두 번째 페이지 */}
          <FullpageSection style={{ height: '100vh' }}>
            <div className="section" data-aos="fade-up" data-aos-delay="450">
              <Content title="편리한 길 찾기 서비스" description="출발 위치와 도착 위치를 입력하면 이용할 지하철이나 버스 또는 자가용, 교통편에 따라 최적의 경로를 제공해요." />
            </div>
          </FullpageSection>

          {/* 세 번째 페이지 */}
          <FullpageSection style={{ height: '100vh' }}>
            <div className="section" data-aos="fade-up" data-aos-delay="450">
              <Content title="경로 즐겨찾기" description="자주 이용하는 경로를 빠르게 확인해보세요." />
            </div>
            {/* 링크 추가 */}
            <div className="link-container">
              <a href='/maps' className="custom-link">map →</a>
            </div>
          </FullpageSection>

          {/* 네 번째 페이지 */}
          <FullpageSection style={{ height: '100vh' }} >
            <div className="section d-flex justify-content-center align-items-center">
              {/* 캐러셀 추가 */}
              <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div className="carousel-inner" data-aos="fade-up" data-aos-delay="450">
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
          </FullpageSection>

          {/* 두 번째 페이지 */}
          <FullpageSection style={{ height: '100vh' }}>
            <div className="section" data-aos="fade-up" data-aos-delay="450">
              <Content title="오늘의 교통정보 공유" description="채팅을 통해 오늘의 교통 및 날씨 상황을 공유할 수 있어요." />
            </div>
          </FullpageSection>

        </FullPageSections>
      </Fullpage>
    </>
  );
}

export default Main;
