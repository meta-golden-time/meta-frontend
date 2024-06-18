import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
//import Map from "../components/map";
import PathFinder from "../components/maps/findMap";
import MapSearch from "../components/maps/mapSearch";
import MapBookMark from "../components/maps/findBookMark";
import '../styles/maps/map.css'; // 추가: CSS 파일 임포트
// import MoveMap from "../components/moveMap";

export default function setMap() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
    <div style={{ padding: '10px' }}>     
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs">
          <Tab className='tabs' label="길찾기" />
          <Tab className='tabs' label="지도검색" />
          <Tab className='tabs' label="즐겨찾기" />
        </Tabs>
      </Box>
      {tabIndex === 0 && <PathFinder />}
      {tabIndex === 1 && <MapSearch />}
      {tabIndex === 2 && <MapBookMark />}
    </div>
    
    </>
  );
}

