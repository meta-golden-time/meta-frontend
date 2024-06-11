import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../styles/maps/findMap.css'; // 추가: CSS 파일 임포트

const { kakao } = window;

const PathFinder = () => {
  const [map, setMap] = useState(null);
  const [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null },
    endPoint: { marker: null, lat: null, lng: null },
  });

  async function getCarDirection() {
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

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#2d00f3',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });
      polyline.setMap(map);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center: new kakao.maps.LatLng(33.452613, 126.570888),
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

  function setPoint({ lat, lng }, pointType) {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.setCenter(moveLatLon);
    let marker = new kakao.maps.Marker({ position: moveLatLon });
    setPointObj((prev) => {
      if (prev[pointType].marker !== null) {
        prev[pointType].marker.setMap(null);
      }
      return { ...prev, [pointType]: { marker, lat, lng } };
    });
  }

  return (
    <div className="path-finder">
      <div className="left-panel">
        <div className="input-group">
          <TextField label="출발지" variant="outlined" fullWidth margin="normal" />
          <Button variant="contained" className="search-button">검색</Button>
        </div>
        <div className="input-group">
          <TextField label="목적지" variant="outlined" fullWidth margin="normal" />
          <Button variant="contained" className="search-button">검색</Button>
        </div>
        <Button variant="contained" onClick={() => getCarDirection()} fullWidth>
          길찾기
        </Button>
        <Button variant="contained" color="secondary" fullWidth>
          즐겨찾기
        </Button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <button onClick={() => setPoint({ lat: 33.452613, lng: 126.570888 }, 'startPoint')}>
            출발지1 지정
          </button>
          <button onClick={() => setPoint({ lat: 33.45058, lng: 126.574942 }, 'endPoint')}>
            목적지1 설정
          </button>
          <button onClick={() => getCarDirection()}>경로찾기</button>
        </div>
      </div>
      <div id="map" className="map" />
    </div>
  );
};

export default PathFinder;
