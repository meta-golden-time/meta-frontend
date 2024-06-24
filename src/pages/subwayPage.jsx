import React, { useState } from 'react';
import Header from '../components/subway/Header';
import SubwayMap from '../components/subway/SubwayMap';
import StationInfo from '../components/subway/StationInfo';
import '../styles/subway/subwayPage.css';

function SubwayPage() { // 컴포넌트 이름 변경
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setSelectedStation(searchTerm);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="sidebar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="역 이름을 입력하세요"
          />
          <button onClick={handleSearch}>검색</button>
          {selectedStation && <StationInfo station={{ id: selectedStation, name: selectedStation }} onClose={() => setSelectedStation(null)} />}
        </div>
        <div className="map">
          <SubwayMap onSelectStation={setSelectedStation} focusStation={selectedStation} />
        </div>
      </div>
    </div>
  );
}

export default SubwayPage;
