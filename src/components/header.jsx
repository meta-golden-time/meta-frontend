import {Nav} from '@components/nav';
import MenuBarHeader from './menuBarHeader';

export default function Header() {
  return(
    <>
    <div>
      <MenuBarHeader/>
    </div>
    <hr />
    {/* <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', height: '50px', verticalAlign: 'bottom'}}>
      <p>유저 페이지</p>
    </div> */}
    </>
  )
} 