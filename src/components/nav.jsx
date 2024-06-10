import { Link } from 'react-router-dom';

export function Nav() {
  const userInfo = true;

  return (
    <nav style={{display: 'flex' }}>
      {/* <Link to="/">Home</Link> <br/>
      <Link to="/weather">weather</Link> <br/>
      <Link to="/map">map</Link> <br/>
      {userInfo ? <><Link to="/login">login</Link><br/></> : null} */}
      
      {/* 로그인일 경우 링크 숨김, 로그인이 되었을 경우 링크 보여짐 */}
      {userInfo ? ( <Link to="/user/userPage" >유저페이지로 이동</Link> ) : null }
    </nav>
  )
}