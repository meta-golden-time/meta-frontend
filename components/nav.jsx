import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/sign">Sign</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>
    </nav>
  )
}