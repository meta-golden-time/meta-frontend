import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const initial = {center: {lat: 37.394912, lng: 127.111202}};

const Map = () => {
  const [map, setMap] = useState(null);
  const [pointObj, setPointObj] = useState({
    origin: {marker: null, lat: null, lng: null},
    destination: {marker: null, lat: null, lng: null}
  });

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const kakao = window.kakao;
      const mapContainer = document.getElementById('map');
      const mapOptions = {
        center: new kakao.maps.LatLng(initial.center.lat, initial.center.lng), // 지도의 중심좌표
        level: 3 // 지도의 레벨(확대, 축소 정도)
      };

      const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
      setMap(kakaoMap);

      const geocoder = new kakao.maps.services.Geocoder();
      const marker = new kakao.maps.Marker();
      const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 현재 지도 중심좌표로 주소를 검색
      searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(kakaoMap, 'click', function(mouseEvent) {
          searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                  let detailAddr = result[0].road_address ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>` : '';
                  detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

                  const content = `<div class="bAddr"><span class="title">법정동 주소정보</span>${detailAddr}</div>`;

                  // 마커를 클릭한 위치에 표시합니다 
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(kakaoMap);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(kakaoMap, marker);
              }
          });
      });

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(kakaoMap, 'idle', function() {
          searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);
      });

      function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
      }

      function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            const infoDiv = document.getElementById('centerAddr');

            for (let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    infoDiv.innerHTML = result[i].address_name;
                    break;
                }
            }
        }    
      }

      // pointObj의 변경이 있을 때마다 출발지와 목적지의 marker를 map에 표시
      useEffect(() => {
        for (const point in pointObj) {
          if (pointObj[point].marker) {
            pointObj[point].marker.setMap(kakaoMap);
          }
        }
      }, [pointObj]);

      // 부드럽게 중심점을 이동시키는 메서드
      const setCenter = ({lat, lng}) => {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        kakaoMap.panTo(moveLatLon);
      }

      const setPoint = ({lat, lng}, pointType) => {
        setCenter({lat, lng});
        const marker = new kakao.maps.Marker({position: new kakao.maps.LatLng(lat, lng)});
        setPointObj(prev => {
            if (prev[pointType].marker !== null) {
              // 주소가 변경되었을 때 기존 marker를 제거
              prev[pointType].marker.setMap(null);
            }
            return {...prev, [pointType]: {marker, lat, lng}};
        });
      }

      async function getCarDirection() {
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

          var polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#000000',
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
          });

          polyline.setMap(kakaoMap);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      const setOrigin = () => {
      }
    } else {
      console.error("Kakao maps API is not available.");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPointObj(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="map" style={{ width: "450px", height: "450px" }} />
      <div id="centerAddr" style={{ margin: "10px 0" }} />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setPoint({ lat: initial.center.lat, lng: initial.center.lng }, 'origin')}>출발지1 지정</button>
        <button onClick={() => setPoint({ lat: 33.45058, lng: 126.574942 }, 'destination')}>목적지1 설정</button>
        <button onClick={() => getCarDirection()}>경로 구하기</button>
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="출발" variant="outlined" name="origin" autoFocus onChange={handleChange} />
          <TextField id="outlined-basic" label="도착" variant="outlined" name="destination" onChange={handleChange} />
        </Box>
      </div>
    </>
  );
}

export default Map;
