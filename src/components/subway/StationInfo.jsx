import React, { useEffect, useState } from 'react';
import { fetchStationInfo } from '../../apis/subway/subwayAPI';
import './StationInfo.css';

function StationInfo({ station, onClose }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetchStationInfo(station.name).then(data => setInfo(data.realtimeArrivalList));
  }, [station]);

  return (
    <div className="station-info-popup">
      <div className="station-info-header">
        <h2>{station.name}</h2>
        <button onClick={onClose} className="close-btn">닫기</button>
      </div>
      {info ? (
        <div className="station-info-content">
          <ul>
            {info.map((arrival, index) => (
              <li key={index} className={`arrival ${arrival.trainLineNm.includes('급행') ? 'express' : ''}`}>
                <span className="line-name">{arrival.trainLineNm}</span>
                <span className="arrival-time">{arrival.arvlMsg2}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StationInfo;
