import React, { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './SubwayMap.css';

function SubwayMap({ onSelectStation, focusStation }) {
  const svgRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleSVGLoad = () => {
      const embed = svgRef.current;
      const svgDoc = embed.contentDocument || embed.getSVGDocument();
      if (svgDoc) {
        const stationElements = svgDoc.querySelectorAll('.st53');
        const stationData = Array.from(stationElements).map(station => ({
          element: station,
          name: station.textContent.trim(),
          bbox: station.getBBox()
        }));
        setStations(stationData);
        setIsLoaded(true);
      } else {
        console.error('SVG document not loaded correctly');
      }
    };

    const svgElement = svgRef.current;
    if (svgElement && !isLoaded) {
      svgElement.addEventListener('load', handleSVGLoad);
    }

    return () => {
      if (svgElement && !isLoaded) {
        svgElement.removeEventListener('load', handleSVGLoad);
      }
    };
  }, [isLoaded]);

  const imgClick = (event) => {
    console.log("🚀 ~ imgClick ~ event:", event)
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedStation = stations.find(station => {
      const { x, y, width, height } = station.bbox;
      return offsetX >= x && offsetX <= x + width && offsetY >= y && offsetY <= y + height;
    });

    if (clickedStation) {
      const { name } = clickedStation;
      onSelectStation({ id: name, name });
    }
  };

  return (
    <div className="subway-map-container">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        wheel={{ step: 0.2 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform, setTransform }) => {
          useEffect(() => {
            if (focusStation && isLoaded) {
              const stationData = stations.find(station => station.name === focusStation);
              if (stationData) {
                const { bbox } = stationData;
                const x = bbox.x + bbox.width / 2;
                const y = bbox.y + bbox.height / 2;
                const scale = 2; // 확대 비율 설정
                setTransform(x, y, scale);
              } else {
                console.error('Station not found:', focusStation);
              }
            }
          }, [focusStation, isLoaded, setTransform]);

          return (
            <>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent>
                <embed
                  ref={svgRef}
                  src="../../img/subway/Seoul_subway_linemap_ko.svg?react"
                  type="image/svg+xml"
                  className="subway-map"
                  onClick={imgClick}
                />
              </TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
    </div>
  );
}

export default SubwayMap;
