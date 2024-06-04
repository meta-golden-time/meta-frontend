// import React, { useEffect, useRef } from 'react';

// export default function CreateMap() {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   // useRef를 사용하여 함수 레퍼런스를 저장
//   const setCenterRef = useRef(null);
//   const panToRef = useRef(null);
//   const addMarkerRef = useRef(null);
//   const removeMarkerRef = useRef(null);

//   useEffect(() => {
//     if (window.kakao && window.kakao.maps) {
//       const { kakao } = window;
//       const mapContainer = document.getElementById('map');
//       const mapOption = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3,
//       };

//       const map = new kakao.maps.Map(mapContainer, mapOption);
//       mapRef.current = map;

//       // 마커를 생성하는 함수
//       const addMarker = () => {
//         if (markerRef.current) {
//           markerRef.current.setMap(null); // 기존 마커가 있으면 제거
//         }

//         const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
//         const marker = new kakao.maps.Marker({
//           position: markerPosition,
//         });

//         marker.setMap(map);
//         markerRef.current = marker; // 마커 객체 저장
//       };

//       // 마커를 제거하는 함수
//       const removeMarker = () => {
//         if (markerRef.current) {
//           markerRef.current.setMap(null);
//           markerRef.current = null; // 마커 객체 초기화
//         }
//       };

//       const setCenter = () => {
//         const moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
//         map.setCenter(moveLatLon);
//       };

//       const panTo = () => {
//         const moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
//         map.panTo(moveLatLon);
//       };

//       // 함수 레퍼런스 초기화
//       setCenterRef.current = setCenter;
//       panToRef.current = panTo;
//       addMarkerRef.current = addMarker;
//       removeMarkerRef.current = removeMarker;
//     } else {
//       console.error('Kakao Maps API is not loaded.');
//     }
//   }, []);

//   return (
//     <>
//       <div id="map" style={{ width: '500px', height: '400px' }}></div>
//       <button onClick={() => setCenterRef.current()}>지도 중심좌표 이동시키기</button>
//       <button onClick={() => panToRef.current()}>지도 중심좌표 부드럽게 이동시키기</button>
//       <button onClick={() => addMarkerRef.current()}>마커 추가하기</button>
//       <button onClick={() => removeMarkerRef.current()}>마커 제거하기</button>
//     </>
//   );
// }
