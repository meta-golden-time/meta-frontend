import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
      <div>
      <h1>홈 페이지</h1>
      <p>이 페이지는 홈입니다.</p>
      <Link to="/about">소개 페이지로 이동</Link>
    </div>
    </div>
  );
};

export default Home;