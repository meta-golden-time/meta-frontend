import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import loadKakaoMapScript from './initKakao';

const initial = { center: { lat: 37.394912, lng: 127.111202 } };

const Map = () => {
  const [pointObj, setPointObj] = useState({
    origin: { marker: null, lat: null, lng: null },
    destination: { marker: null, lat: null, lng: null }
  });

  const kakaoMapRef = useRef(null); // kakaoMap을 useRef로 관리
  const markersRef = useRef([]); // 마커들을 useRef로 관리

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const kakao = await loadKakaoMapScript();
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(initial.center.lat, initial.center.lng),
          level: 3
        };

        const kakaoMapRef = new kakao.maps.Map(mapContainer, mapOptions);
        kakaoMapRef.current = kakaoMap;

        // 지도 클릭 이벤트 등록
        kakao.maps.event.addListener(kakaoMap, 'click', function (mouseEvent) {
          addMarker(mouseEvent.latLng);
        });

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시
        kakao.maps.event.addListener(kakaoMap, 'idle', function () {
          searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);
        });

      } catch (error) {
        console.error('Error loading Kakao Maps script:', error);
      }
    };
    initializeMap();
  }, []);

  const addMarker = (position) => {
    const kakao = window.kakao;
    const marker = new kakao.maps.Marker({
      position: position
    });

    marker.setMap(kakaoMapRef.current);
    markersRef.current.push(marker);
  };

  const setMarkers = (map) => {
    markersRef.current.forEach(marker => marker.setMap(map));
  };

  const showMarkers = () => {
    setMarkers(kakaoMapRef.current);
  };

  const hideMarkers = () => {
    setMarkers(null);
  };

  const setCenter = ({ lat, lng }) => {
    const kakao = window.kakao;
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    if (kakaoMapRef.current) {
      kakaoMapRef.current.panTo(moveLatLon);
    }
  };

  const setPoint = ({ lat, lng }, pointType) => {
    const kakao = window.kakao;
    setCenter({ lat, lng });
    const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });
    setPointObj(prev => {
      if (prev[pointType].marker !== null) {
        prev[pointType].marker.setMap(null);
      }
      return { ...prev, [pointType]: { marker, lat, lng } };
    });
    marker.setMap(kakaoMapRef.current);
  };

  const getCarDirection = async () => {
    const REST_API_KEY = '5f5f311bee7e2ebe56b7fbafb3bb04e1';
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';
    const origin = `${pointObj.origin.lng},${pointObj.origin.lat}`;
    const destination = `${pointObj.destination.lng},${pointObj.destination.lat}`;

    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json'
    };

    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination
    });

    const requestUrl = `${url}?${queryParams}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const linePath = [];
      data.routes[0].sections[0].roads.forEach(router => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        });
      });

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#000000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polyline.setMap(kakaoMapRef.current);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const kakao = window.kakao;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(value, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const { y: lat, x: lng } = result[0];
        setPoint({ lat: parseFloat(lat), lng: parseFloat(lng) }, name);
      }
    });
  };

  const searchAddrFromCoords = (coords, callback) => {
    const kakao = window.kakao;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }


  // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(kakaoMapRef, 'click', function (mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let detailAddr = result[0].road_address
          ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
          : '';
        detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

        const content = `<div class="bAddr"><span class="title">법정동 주소정보</span>${detailAddr}</div>`;

        // 마커를 클릭한 위치에 표시합니다
        var marker = new kakao.maps.Marker({
          position: mouseEvent.latLng
        });
        marker.setMap(kakaoMapRef);

        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        infowindow.setContent(content);
        infowindow.open(kakaoMapRef, marker);
      }
    });
  });


  const displayCenterInfo = (result, status) => {
    const kakao = window.kakao;
    if (status === kakao.maps.services.Status.OK) {
      const infoDiv = document.getElementById('centerAddr');
      if (infoDiv) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  };

  return (
    <>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
      <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div>
      <Box>
        <TextField label="출발지" name="origin" onChange={handleChange} />
        <TextField label="도착지" name="destination" onChange={handleChange} />
        <Button onClick={getCarDirection}>경로 찾기</Button>
        <Button onClick={showMarkers}>마커 보기</Button>
        <Button onClick={hideMarkers}>마커 안 보기</Button>
      </Box>
    </>
  );
};

export default Map;
