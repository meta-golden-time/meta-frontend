import React from 'react';
import '@styles/main/dots.scss';

const Dots = ({ currentPage, handleDotClick }) => {
  return (
    <div className="dots-container">
      {[1, 2, 3, 4, 5, 6].map((page) => (
        <div
          key={page}
          className={`dot ${currentPage === page ? 'active' : ''}`}
          onClick={() => handleDotClick(page)}
        />
      ))}
    </div>
  );
}

export default Dots;
