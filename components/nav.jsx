import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">User page로 이동</Link></li>
        <li><Link to="/sign">Sign page로 이동</Link></li>
        <li><a href="/">Home</a></li>
        <li><a href="/user">User page로 이동</a></li>
        <li><a href="/sign">Sign page로 이동</a></li>
        <li><a href="https://www.naver.com/" target="_blank">네이버 새창으로 이동</a></li>
      </ul>
    </nav>
  )
}