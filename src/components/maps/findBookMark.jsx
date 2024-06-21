import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-modal'; // react-modal 임포트
import Card from '@mui/material/Card'; // Card 임포트
import CardActions from '@mui/material/CardActions'; // CardActions 임포트
import CardContent from '@mui/material/CardContent'; // CardContent 임포트
import Typography from '@mui/material/Typography'; // Typography 임포트
import Swal from 'sweetalert2';
import '../../styles/maps/findMap.css'; // 추가: CSS 파일 임포트

const { kakao } = window;
import { postBookMark, getBookMark } from '../../apis/userApi/bookMark'; // 북마크 API 임포트

Modal.setAppElement('#root'); // Modal 사용을 위한 설정

const PathFinder = () => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null); // 라인을 저장할 상태 추가
  const [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null, placeName: '' },
    endPoint: { marker: null, lat: null, lng: null, placeName: '' },
  });

  const [searchAddress, setSearchAddress] = useState({
    start: '',
    end: '',
  });
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트를 저장할 상태 변수
  const [bookMarkList, setBookMarkList] = useState([]); // 북마크 리스트 받아오기
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 변수
  const [selectedUrl, setSelectedUrl] = useState(''); // 선택된 URL 상태 변수

  const [pointsSet, setPointsSet] = useState(false); // 포인트가 설정되었는지 여부를 확인하는 상태 변수

  useEffect(() => {
    // 북마크 데이터 가져오기
    const fetchBookMarks = async () => {
      try {
        const result = await getBookMark();
        if (Array.isArray(result)) {
          setBookMarkList(result);
        } else if (result !== null && typeof result === 'object') {
          setBookMarkList([result]);
        } else {
          console.error('Bookmark data is not an array:', result);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    fetchBookMarks();

    const initializeMap = (lat, lng) => {
      const mapContainer = document.getElementById('maps');
      const mapOptions = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
      setMap(kakaoMap);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new kakao.maps.MapTypeControl();
      kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
      const zoomControl = new kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          initializeMap(lat, lng);
        },
        () => {
          // 위치를 가져올 수 없을 때 기본 위치 설정
          initializeMap(33.452613, 126.570888);
        }
      );
    } else {
      // Geolocation API를 지원하지 않는 브라우저의 경우 기본 위치 설정
      initializeMap(33.452613, 126.570888);
    }
  }, []);

  useEffect(() => {
    if (map) {
      for (const point in pointObj) {
        if (pointObj[point].marker) {
          pointObj[point].marker.setMap(map);
        }
      }
    }
  }, [map, pointObj]);

  useEffect(() => {
    if (pointsSet) {
      getCarDirection();
    }
  }, [pointsSet]);

  function setPoint({ lat, lng, placeName }, pointType) {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.setCenter(moveLatLon);
    let marker = new kakao.maps.Marker({ position: moveLatLon });
    setPointObj((prev) => {
      if (prev[pointType].marker !== null) {
        prev[pointType].marker.setMap(null);
      }
      return { ...prev, [pointType]: { marker, lat, lng, placeName } };
    });
  }

  const handleResultClick = (result) => {
    const lat = result.y;
    const lng = result.x;
    setPoint({ lat, lng, placeName: result.place_name }, searchType);
    setSearchResults([]);
  }

  const openModal = (url) => {
    setSelectedUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUrl('');
    setModalIsOpen(false);
  };

  const handleBookMarkClick = (bookmark) => {
    console.log("🚀 ~ handleBookMarkClick ~ bookmark:", bookmark);
    setPointsSet(false);
    setPoint({ lat: bookmark.lat_S, lng: bookmark.lag_S, placeName: bookmark.location_S }, 'startPoint');
    setPoint({ lat: bookmark.lat_E, lng: bookmark.lag_E, placeName: bookmark.location_E }, 'endPoint');
    setPointsSet(true); // 포인트가 설정되었음을 표시
  }

  async function getCarDirection() {
    if (pointObj.startPoint.placeName === '' || pointObj.endPoint.placeName === '') {
      Swal.fire({
        icon: 'warning',
        title: '입력없음',
        text: '출발지 또는 도착지 정보가 없습니다. ',
      });
      setPointsSet(false); // 설정 상태 초기화
      return;
    }

    const REST_API_KEY = '105cb5cb6a281f8ff2fc11625b323b92';
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';
    const origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
    const destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;
    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const queryParams = new URLSearchParams({ origin, destination });
    const requestUrl = `${url}?${queryParams}`;

    try {
      const response = await fetch(requestUrl, { method: 'GET', headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const linePath = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        });
      });

      // 기존의 라인이 있다면 삭제
      if (polyline) {
        polyline.setMap(null);
      }

      const newPolyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 10,
        strokeColor: '#2d00f3',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });
      newPolyline.setMap(map);

      // 새로 생성된 라인을 상태로 저장
      setPolyline(newPolyline);

      // 기존의 마커는 그대로 유지하고, 새로운 마커로 설정하지 않습니다.
      // 검색 결과 초기화
      setSearchResults([]);

      // 검색 주소 초기화
      setSearchAddress({
        start: '',
        end: '',
      });

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setPointsSet(false); // 설정 상태 초기화
    }
  }

  return (
    <div className="path-finder">
      <div className="left-panel">
        <h3>북마크 리스트</h3>
        <div className="bookmark-list">
          {Array.isArray(bookMarkList) && bookMarkList.length > 0 ? (
            bookMarkList.map((bookmark, index) => (
              <Card key={index} sx={{ maxWidth: 345, marginBottom: 2, textAlign: 'center' }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    <div>
                      {`${bookmark.location_S} -> ${bookmark.location_E}`}
                    </div>
                  </Typography>                      
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" onClick={() => handleBookMarkClick(bookmark)}>길찾기</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <div>북마크가 없습니다.</div>
          )}
        </div>
      </div>
      <div id="maps" className="maps" />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Place URL"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h1>장소 정보보기</h1>
        <button onClick={closeModal} className="modal-close-button">Close</button>
        <iframe src={selectedUrl} className="modal-iframe" />
      </Modal>
    </div>
  );
};

export default PathFinder;
