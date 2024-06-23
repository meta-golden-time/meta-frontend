import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import '../../styles/maps/findMap.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import { postBookMark } from '../../apis/userApi/bookMark';
const { kakao } = window;

Modal.setAppElement('#root');

const PathFinder = () => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null, placeName: '' },
    endPoint: { marker: null, lat: null, lng: null, placeName: '' },
  });

  const [searchAddress, setSearchAddress] = useState({
    start: '',
    end: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [showRouteOptions, setShowRouteOptions] = useState(false);

  const [bookMarkStart, setBookMarkStart] = useState({
    startPoint: { name: null, lat: null, lng: null },
    endPoint: { name: null, lat: null, lng: null },
  });

  const [searchType, setSearchType] = useState();

  const handleKeyDown = (e, type, value) => {
    if (e.key === 'Enter') {
      setSearchAddress((prev) => ({ ...prev, [type]: value }));
      if (type === 'start') {
        searchMap('start', 'startPoint');
      } else {
        searchMap('end', 'endPoint');
      }
    }
  };

  async function getCarDirection(routeType) {
    if (pointObj.startPoint.placeName === '' || pointObj.endPoint.placeName === '') {
      Swal.fire({
        icon: 'warning',
        title: '입력없음',
        text: '출발지 또는 도착지 정보가 없습니다. ',
      });
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
    const queryParams = new URLSearchParams({ origin, destination, priority: routeType });
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

      setPolyline(newPolyline);

      setPointObj({
        startPoint: { marker: null, lat: null, lng: null, placeName: '' },
        endPoint: { marker: null, lat: null, lng: null, placeName: '' },
      });

      setSearchResults([]);
      setSearchAddress({
        start: '',
        end: '',
      });

      setShowRouteOptions(false);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapContainer = document.getElementById('maps');
        const mapOptions = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
        setMap(kakaoMap);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Geolocation Error',
        text: 'Geolocation is not supported by this browser.',
      });
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

  function setPoint({ lat, lng }, pointType, placeName) {
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

  const handleSearchAddressChange = (e) => {
    const { name, value } = e.target;
    setSearchAddress((prev) => ({ ...prev, [name]: value }));
  }

  const handleResultClick = (result) => {
    const lat = result.y;
    const lng = result.x;
    const name = result.place_name;
    if (searchType === 'startPoint') {
      setSearchAddress((prev) => ({ ...prev, start: name }));
    } else {
      setSearchAddress((prev) => ({ ...prev, end: name }));
    }

    setPoint({ lat, lng }, searchType, name);
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

  const searchMap = (addressType, searchType) => {
    if (searchAddress[addressType] === '') {
      Swal.fire({
        icon: 'warning',
        title: '검색오류',
        text: '검색어가 없습니다. 다시 확인 해 주세요.',
      });
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchAddress[addressType], (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchType(searchType);
        setSearchResults(data);
      }
    });
  }

  const handleBookMarkClick = async () => {
    if (pointObj.startPoint.placeName === '' || pointObj.endPoint.placeName === '') {
      Swal.fire({
        icon: 'warning',
        title: '정보 체크',
        text: '출발지 또는 도착지 정보가 없습니다.',
      });
      return;
    }

    setBookMarkStart({
      startPoint: { name: pointObj.startPoint.placeName, lat: pointObj.startPoint.lat, lng: pointObj.startPoint.lng },
      endPoint: { name: pointObj.endPoint.placeName, lat: pointObj.endPoint.lat, lng: pointObj.endPoint.lng },
    });
  }

  useEffect(() => {
    if (bookMarkStart.startPoint.name && bookMarkStart.endPoint.name) {
      bookMarkPost();
    }
  }, [bookMarkStart]);

  const bookMarkPost = async () => {
    const data = {
      location_S: bookMarkStart.startPoint.name,
      lat_S: bookMarkStart.startPoint.lat,
      lag_S: bookMarkStart.startPoint.lng,
      location_E: bookMarkStart.endPoint.name,
      lat_E: bookMarkStart.endPoint.lat,
      lag_E: bookMarkStart.endPoint.lng,
    };

    try {
      const result = await postBookMark(data);
      Swal.fire({
        title: '즐겨찾기',
        text: '즐겨찾기가 되었습니다.',
        icon: 'success'
      }).then(() => {
      });
    } catch (error) {
      Swal.fire('Error', '즐겨찾기에 실패하였습니다.', 'error');
    }
  }

  const handleGetCarDirectionClick = () => {
    setShowRouteOptions(true);
  }

  return (
    <>
      <div className="path-finder">
        <div className="left-panel">
          <Box className="input-group">
            <TextField
              label="출발지"
              variant="outlined"
              fullWidth
              name="start"
              value={searchAddress.start}
              onChange={handleSearchAddressChange}
              onKeyDown={(e) => handleKeyDown(e, 'start', searchAddress.start)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="searchBtn"
                      onClick={() => searchMap('start', 'startPoint')}
                    >
                      <SearchIcon className="search-icon"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            />
          </Box>
          <div className="input-group">
            <TextField
              label="도착지"
              variant="outlined"
              fullWidth
              name="end"
              value={searchAddress.end}
              onChange={handleSearchAddressChange}
              onKeyDown={(e) => handleKeyDown(e, 'end', searchAddress.end)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="searchBtn"
                      onClick={() => searchMap('end', 'endPoint')}
                    >
                      <SearchIcon className="search-icon"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            />
          </div>
          <div className="button-group">
            <Button variant="contained" onClick={handleGetCarDirectionClick} fullWidth>
              길찾기
            </Button>
            <Button variant="contained" color="secondary" onClick={handleBookMarkClick} fullWidth>
              즐겨찾기
            </Button>
          </div>
          {showRouteOptions && (
            <div className="route-options">
              <Button variant="contained" onClick={() => getCarDirection('RECOMMEND')} fullWidth>
                추천 경로
              </Button>
              <Button variant="contained" onClick={() => getCarDirection('TIME')} fullWidth>
                최단 시간
              </Button>
              <Button variant="contained" onClick={() => getCarDirection('DISTANCE')} fullWidth>
                최단 경로
              </Button>
            </div>
          )}
          <div>출발지: {pointObj.startPoint.placeName}</div>
          <div>도착지: {pointObj.endPoint.placeName}</div>
          <div className="scrollable-results search-results-container">
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                          {result.place_name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => openModal(result.place_url)}>정보보기</Button>
                        <Button size="small" onClick={() => handleResultClick(result)}>장소선택</Button>
                      </CardActions>
                    </Card>
                  </li>
                ))}
              </ul>
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
          <iframe src={selectedUrl} className="modal-iframe" title="Place Information" />
        </Modal>
      </div>
    </>
  );
};

export default PathFinder;
