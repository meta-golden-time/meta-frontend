import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const initial = { center: { lat: 37.394912, lng: 127.111202 } };

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];

const Map = () => {
  const [map, setMap] = useState(null);
  const [pointObj, setPointObj] = useState({
    origin: { marker: null, lat: null, lng: null },
    destination: { marker: null, lat: null, lng: null }
  });


  useEffect(() => {
    {const mapContainer = document.getElementById('map');
    const mapOptions = {
      center: new kakao.maps.LatLng(initial.center.lat, initial.center.lng), // 지도의 중심좌표
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };

    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
    }

    const geocoder = new kakao.maps.services.Geocoder();
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // // 마커를 생성하고 지도위에 표시하는 함수입니다
    const addMarker = (position) => {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: position
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      markers.push(marker)
    }

    //   // 생성된 마커를 배열에 추가합니다
    //   markers.push(marker);
    // };


    // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'click', function (mouseEvent) {
      markers.push(mouseEvent.latLng)
      // 클릭한 위치에 마커를 표시합니다
      // addMarker(mouseEvent.latLng);
    });
    console.log(kakao.maps.event)
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'click', function(mouseEvent) {
      var marker = new kakao.maps.Marker({
        position: mouseEvent.latLng
      });
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });

    
    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    function setMarkers(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    
    // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
    function showMarkers() {
      setMarkers(map)    
    }

    // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
    function hideMarkers() {
      setMarkers(null);    
    }


    // 현재 지도 중심좌표로 주소를 검색
    searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'click', function (mouseEvent) {
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
          marker.setMap(kakaoMap);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(kakaoMap, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'idle', function () {
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
  }, []);

    useEffect(() => {
        try {



        } catch (error) {
          console.error('Error loading Kakao Maps script:', error);
        }

    }, [markers]);
        

    // 부드럽게 중심점을 이동시키는 메서드
    const setCenter = ({ lat, lng }) => {
      const kakao = window.kakao;
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      if (map) {
        map.panTo(moveLatLon);
      }
    };

    const setPoint = ({ lat, lng }, pointType) => {
      const kakao = window.kakao;
      setCenter({ lat, lng });
      const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });
      setPointObj(prev => {
        if (prev[pointType].marker !== null) {
          // 주소가 변경되었을 때 기존 marker를 제거
          prev[pointType].marker.setMap(null);
        }
        return { ...prev, [pointType]: { marker, lat, lng } };
      });
      marker.setMap(map);
    };


    async function getCarDirection() {    //카카오 모빌리티 길찾기 api로 길찾기
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

        const linePath = [];  //api에서 받아온 데이터 중 경로 확인하기
        data.routes[0].sections[0].roads.forEach(router => {
          router.vertexes.forEach((vertex, index) => {
            if (index % 2 === 0) {
              linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
            }
          });
        });

        var polyline = new kakao.maps.Polyline({    //확인한 경로를 지도에 어떻게 표시할지 설정
          path: linePath,
          strokeWeight: 5,
          strokeColor: '#000000',
          strokeOpacity: 0.7,
          strokeStyle: 'solid'
        });

        polyline.setMap(map);   //경로를 지도에 나타내기

        // const guides = [];
        // data.routes[0].sections[0].guides.forEach(router => {
        //   router.vertexes.forEach((vertex, index) => {
        //     if (index % 2 === 0) {
        //       guides.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
        //     }
        //   });
        // });
        // console.log(guides)

      } catch (error) {
        console.error('Error:', error);
      }
    }

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
          {/* <Button onClick={showMarkers}>마커 보기</Button>
          <Button onClick={hideMarkers}>마커 안 보기</Button> */}
      </Box>
    </>
  );
};

export default Map;
