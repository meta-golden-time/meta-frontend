import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">User page로 이동</Link></li>
        <li><Link to="/sign">Sign page로 이동</Link></li>
      </ul>
    </nav>
  )
}