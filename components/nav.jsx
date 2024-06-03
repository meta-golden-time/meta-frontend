import { Link } from 'react-router-dom';

export function Nav() {
  const userInfo = true;

  return (
    <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/user">weather</Link>
      <Link to="/sign">map</Link>
    </nav>
    <nav>
      {userInfo ? ( <Link to="/user/userPage" >유저페이지로 이동</Link> ) : null }
    </nav>
    </div>
  )
}