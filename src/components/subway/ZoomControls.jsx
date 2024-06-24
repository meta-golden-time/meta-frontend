import React from 'react';

function ZoomControls({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="zoom-controls">
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={resetTransform}>Reset</button>
    </div>
  );
}

export default ZoomControls;
