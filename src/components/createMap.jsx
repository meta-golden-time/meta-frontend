

import React, { useEffect, useState } from 'react';
const { kakao } = window;

const Map = () => {
  const [map, setMap] = useState(null);
  const [pointObj, setPointObj] = useState({
    startPoint: {marker: null, lat: null, lng: null},
    endPoint: {marker: null, lat: null, lng: null}
  });
  
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);
  
  // pointObj의 변경이 있을 때마다 출발지와 목적지의 marker를 map에 표시
  useEffect(() => {
    for (const point in pointObj) {
      if (pointObj[point].marker) {
        pointObj[point].marker.setMap(map);
      }
    }
  }, [pointObj]);

   // 부드럽게 중심점을 이동시키는 메서드
  function setCenter({lat, lng}) {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
  }
  
  function setPoint({lat, lng}, pointType) {
    setCenter({lat, lng});
    let marker = new kakao.maps.Marker({position: new kakao.maps.LatLng(lat, lng)});
    setPointObj(prev => {
        if (pointObj[pointType].marker !== null) {
          // 주소가 변경되었을 때 기존 marker를 제거
          prev[pointType].marker.setMap(null);
        }
        return {...prev, [pointType]: {marker, lat, lng}};
    });
  }

  return (
    <>
      <div id="map" style={{width: "450px", height: "450px"}}/>
      <div style={{display: "flex", gap: "10px"}}>
        <button onClick={() => setPoint({lat: 33.452613, lng: 126.570888}, 'startPoint')}>
          출발지1 지정
        </button>
        <button onClick={() => setPoint({lat: 33.45058, lng: 126.574942}, 'endPoint')}>
          목적지1 설정
        </button>
        <button>
          경로 구하기
        </button>
      </div>
    </>
  )
}

export default Map;