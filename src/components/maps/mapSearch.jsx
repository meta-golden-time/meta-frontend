import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from 'react-modal'; // react-modal 임포트
import '../../styles/maps/mapSearch.css'; // 추가: CSS 파일 임포트

const { kakao } = window;

Modal.setAppElement('#root'); // Modal 사용을 위한 설정

const MapSearch = () => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  let markers = []; // markers 배열을 컴포넌트 범위에서 정의

  useEffect(() => {
    const initializeMap = (lat, lng) => {
      const mapContainer = document.getElementById('map'); // 지도 div
      const mapOptions = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
      setMap(kakaoMap);

      // 지도 타입 컨트롤을 생성하고 지도에 추가합니다.
      const mapTypeControl = new kakao.maps.MapTypeControl();
      kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 줌 컨트롤을 생성하고 지도에 추가합니다.
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
          initializeMap(37.566826, 126.9786567);
        }
      );
    } else {
      // Geolocation API를 지원하지 않는 브라우저의 경우 기본 위치 설정
      initializeMap(37.566826, 126.9786567);
    }
  }, []);

  useEffect(() => {
    if (map) {
      const ps = new kakao.maps.services.Places();
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      const searchPlaces = () => {
        if (!keyword.trim()) {
          alert('키워드를 입력해주세요!');
          return;
        }
        ps.keywordSearch(keyword, placesSearchCB);
      };

      const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data);
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
        }
      };

      const displayPlaces = (places) => {
        const listEl = document.getElementById('placesList');
        const bounds = new kakao.maps.LatLngBounds();

        removeAllChildNodes(listEl);
        removeMarker();

        const fragment = document.createDocumentFragment();
        places.forEach((place, index) => {
          const placePosition = new kakao.maps.LatLng(place.y, place.x);
          const marker = addMarker(placePosition, index, place.place_url); // 마커 인덱스를 0부터 시작
          const itemEl = getListItem(index, place);

          bounds.extend(placePosition);

          (function (marker, title, url) {
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.close();
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              openModal(url); // 마커 클릭 시 모달 열기
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, place.place_name, place.place_url);

          fragment.appendChild(itemEl);
        });

        listEl.appendChild(fragment);
        map.setBounds(bounds);
      };

      const getListItem = (index, place) => {
        const el = document.createElement('li');
        let itemStr = `<span class="markerbg marker_${index + 1}"></span>
                        <div class="info">
                          <h5>${place.place_name}</h5>`;
        if (place.road_address_name) {
          itemStr += `<span>${place.road_address_name}</span>
                      <span class="jibun gray">${place.address_name}</span>`;
        } else {
          itemStr += `<span>${place.address_name}</span>`;
        }
        itemStr += `<span class="tel">${place.phone}</span>
                    <button class="detail-button" data-url="${place.place_url}">상세보기</button>
                    </div>`;
        el.innerHTML = itemStr;
        el.className = 'item';
        el.querySelector('.detail-button').addEventListener('click', () => openModal(place.place_url));
        return el;
      };

      const addMarker = (position, idx, url) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, idx * 46), // 마커 인덱스를 0부터 시작하여 설정
          offset: new kakao.maps.Point(13, 37),
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new kakao.maps.Marker({
          position,
          image: markerImage,
        });

        marker.setMap(map);
        markers.push(marker);

        kakao.maps.event.addListener(marker, 'click', function () {
          openModal(url); // 마커 클릭 시 모달 열기
        });

        return marker;
      };

      const removeMarker = () => {
        markers.forEach((marker) => marker.setMap(null));
        markers = [];
      };

      const displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };

      const removeAllChildNodes = (el) => {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      };

      const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();

        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination.last; i++) {
          const el = document.createElement('a');
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = 'on';
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          searchPlaces();
        }
      };

      document.getElementById('searchBtn').onclick = searchPlaces;
    }
  }, [map, keyword]);

  const openModal = (url) => {
    setSelectedUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUrl('');
    setModalIsOpen(false);
  };

  return (
    <div className="map_wrap">
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <TextField
            label="검색어를 입력하세요"
            variant="outlined"
            fullWidth
            margin="normal"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && document.getElementById('searchBtn').click()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton id="searchBtn">
                    <SearchIcon className="search-icon" />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                height: '50px',
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />
        </div>
        <hr />
        <ul id="placesList" className="places-list"></ul>
        <div id="pagination"></div>
      </div>
      <div id="map" className="map"></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Place URL"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h1>장소 정보보기</h1>
        <button onClick={closeModal} className="modal-close-button">Close</button>
        <iframe src={selectedUrl} className="modal-iframe" title="Place Information" />
      </Modal>
    </div>
  );
};

export default MapSearch;
