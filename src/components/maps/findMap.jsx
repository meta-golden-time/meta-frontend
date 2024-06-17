import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // react-modal 임포트
import Swal from 'sweetalert2';
import '../../styles/maps/findMap.css'; // 추가: CSS 파일 임포트

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



const { kakao } = window;
import { postBookMark } from '../../apis/userApi/bookMark';

Modal.setAppElement('#root'); // Modal 사용을 위한 설정

const PathFinder = () => {
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null); // 라인을 저장할 상태 추가
  const [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null, placeName:'' },
    endPoint: { marker: null, lat: null, lng: null, placeName:'' },
  });

  const [searchAddress, setSearchAddress] = useState({
    start: '',
    end: '',
  });
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트를 저장할 상태 변수
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 변수
  const [selectedUrl, setSelectedUrl] = useState(''); // 선택된 URL 상태 변수

  const [bookMarkStart, setBookMarkStart] = useState({
    startPoint: {name:null, lat: null, lng: null },
    endPoint: {name:null, lat: null, lng: null },
  });


  const [searchType, setSearchType] = useState();

  const handleKeyDown = (e, type, value) => {
    if (e.key === 'Enter') {
      searchMap(type, value);
    }
  };
  

  async function getCarDirection() {

    if(pointObj.startPoint.placeName == '' || pointObj.endPoint.placeName == '')
      {
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



      // 출발지와 도착지 초기화
      setPointObj({
        startPoint: { marker: null, lat: null, lng: null, placeName:'' },
        endPoint: { marker: null, lat: null, lng: null, placeName:'' },


      });

      // 검색 결과 초기화
      setSearchResults([]);

      // 검색 주소 초기화
      setSearchAddress({
        start: '',
        end: '',
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const mapContainer = document.getElementById('maps');
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
    if(searchType == 'startPoint'){
      searchAddress.start = name;
    }
    else{
      searchAddress.end = name;
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

    if(searchAddress[addressType] == '')
    {
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





  const handleBookMarkClick = () => {
    console.log(pointObj)

    if(pointObj.startPoint.name == '' || pointObj.endPoint.name == '')


    {
      Swal.fire({
        icon: 'warning',
        title: '정보 체크',
        text: '출발지 또는 도착지 정보가 없습니다.',


      });
    return;
    }
    setBookMarkStart({
      startPoint: {name:pointObj.startPoint.placeName , lat: pointObj.startPoint.lat, lng: pointObj.startPoint.lng },
      endPoint: {name:pointObj.endPoint.placeName, lat: pointObj.endPoint.lat, lng: pointObj.endPoint.lng },


    });
    console.log("BookMarkStartBookMarkStart",bookMarkStart)

    bookMarkPost();
  }

  const data = {
    location_S: bookMarkStart.startPoint.name,
    lat_S: bookMarkStart.startPoint.lat,
    lag_S:bookMarkStart.startPoint.lng,
    location_E: bookMarkStart.endPoint.name,
    lat_E: bookMarkStart.endPoint.lat,
    lag_E: bookMarkStart.endPoint.lng,
  };
  const bookMarkPost = async () =>{
    console.log("북마크 전송")
    const data = {
      location_S: bookMarkStart.startPoint.name,
      lat_S: bookMarkStart.startPoint.lat,
      lag_S:bookMarkStart.startPoint.lng,
      location_E: bookMarkStart.endPoint.name,
      lat_E: bookMarkStart.endPoint.lat,
      lag_E: bookMarkStart.endPoint.lng,
    };


    console.log("🚀 ~ bookMarkPost ~ data:", data)


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

  return (
    <div className="path-finder">
      <div className="left-panel">
        <Box className="input-group">
          <TextField
            label="출발지"
            variant="outlined"
            fullWidth
            name="start"
            value={searchAddress.start} // value 추가
            onChange={handleSearchAddressChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id="searchBtn"
                  >
                    <SearchIcon className="search-icon" onClick={() => searchMap('end', searchAddress.end)}
                    />
                  </IconButton>
                </InputAdornment>
              ),              
              style: {
                height: '50px',
                width: '300px',
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
            value={searchAddress.end} // value 추가
            onChange={handleSearchAddressChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id="searchBtn"
                  >
                    <SearchIcon className="search-icon" onClick={() => searchMap('end', searchAddress.end)}
                    />
                  </IconButton>
                </InputAdornment>
              ),              

              style: {
                height: '50px',
                width: '300px',
                display: 'flex',
                alignItems: 'center'
              }
            }}
          />
        </div>

        <div className="button-group">
          <Button variant="contained" onClick={getCarDirection} fullWidth>
            길찾기
          </Button>
          <Button variant="contained" color="secondary" onClick={handleBookMarkClick} fullWidth>
            즐겨찾기
          </Button>
        </div>
        
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
        <iframe src={selectedUrl} className="modal-iframe" />
      </Modal>
    </div>
  );
};

export default PathFinder;
