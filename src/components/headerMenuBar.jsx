import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI의 컴포넌트 불러오기
import AppBar from '@mui/material/AppBar'; // AppBar를 import해야 다른 라이브러리들이 동작함
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// "디바이스" 자체의 화면폭을 확인해서 true/false를 반환해주는 리액트 전용 훅
import useMediaQuery from '@mui/material/useMediaQuery';

// 테마 객체를 가져옴 : 어플리케이션의 색상, 폰트 크기, 브레이크포인트 등 다양한 스타일 속성을 포함하고 있음
import { useTheme } from '@mui/material/styles';

// 이미지 가져오기
import myLogo from '@img/main/golden_time_logo.svg';

// css 디자인 가져오기
import '@styles/headerMenuBar/headerMenuBar.scss'

// 로그인체크와 로그아웃 진행
import { postLoginCheck, postLogout } from '../apis/userApi/user';


// 페이지 메뉴 항목을 정의
const pages = { 날씨: 'weather', 지도: 'maps',  
  커뮤니티채팅: 'chatting',  고객센터: 'board' };
const logoutPages = { 로그인: 'login', 회원가입: 'register' };

// 사용자 설정 메뉴 항목을 정의
const settingsLogin = { 'User Page': 'user/userPage', 'Log out': 'logout' }; // 로그인 후
const settingsLogout = { 'Log in': 'login', 'Sign up': 'signup' }; // 로그인 전

function HeaderMenuBar() {
  
   const [loginCheck, setLoginCheck] = React.useState(false); // 로그인 체크 상태
  //const [loginCheck, setLoginCheck] = React.useState(true); // 로그인 체크 상태
  const checkLoginStatus  = async() =>{
    try{
      const result = await postLoginCheck();// 로그인 체크 상태
      console.log("🚀 ~ checkLoginStatus ~ result:", result)
      setLoginCheck(result.success);
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      await postLogout(); // 로그아웃 API 호출
      setLoginCheck(false); // 로그인 상태 업데이트
      navigate('/'); // 홈으로 이동 또는 필요한 페이지로 이동
    } catch (err) {
      console.log(err);
    }
  }

  const [isScrolled, setIsScrolled] = React.useState(true); // 스크롤 여부를 나타내는 state
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true); // 스크롤 되면 true로 변경
      } else {
        setIsScrolled(true); // 스크롤이 맨 위로 올라가면 false로 변경
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    // 내비게이션 메뉴의 열림 상태를 관리하는 상태 훅을 정의
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    // 사용자 메뉴의 열림 상태를 관리하는 상태 훅을 정의
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      // 내비게이션 메뉴를 여는 함수
      setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
      // 사용자 메뉴를 여는 함수
      setAnchorElUser(event.currentTarget);
    };

    const navigate = useNavigate();
    const handleMovePage = (page) => {
      // 페이지 이동 함수
      navigate(`/${page}`)
    };

    const handleCloseNavMenu = () => {
      // 내비게이션 메뉴를 닫는 함수
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      // 사용자 메뉴를 닫는 함수
      setAnchorElUser(null);
    };

    const theme = useTheme();
    // 화면 크기가 'md' (기본적으로 960px) 이하일 때를 의미하는 미디어 쿼리 조건을 생성
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일 화면 여부 확인
    const isPc = useMediaQuery(theme.breakpoints.up('md')); // pc 화면 여부 확인

    const settings = loginCheck ? settingsLogin : settingsLogout;
    console.log("🚀 ~ HeaderMenuBar ~ loginCheck:", loginCheck)
    console.log("🚀 ~ HeaderMenuBar ~ settings:", settings)

  return (
    <section>
      <div className='headerMenu' style={{ width: '100%', backgroundColor: isScrolled ? '#ffffff' : 'transparent' }}>

        <Container maxWidth="xl"> {/* 최대 폭이 'xl'인 Container 컴포넌트를 사용 */}
          {/* Toolbar 컴포넌트를 사용하여 도구 모음을 생성, disableGutters는 패딩을 제거 */}
          <Toolbar disableGutters >

            {/* pc 화면 메뉴 바 설정 */}
            <div style={{marginRight: "6%"}}>
            <Typography component="a" href="/">
            {!isMobile && (
              <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { sm: 50 }, height: { sm: 50 } }} />
            )}
            </Typography>
            </div>

            {/* 모바일 화면에서는 내비게이션 메뉴를 위한 아이콘 버튼을 표시 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon /> {/* 메뉴 아이콘을 표시 */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                { loginCheck ? Object.keys(pages).map((page) => (
                  <MenuItem key={page} 
                  onClick={() => handleMovePage(pages[page])}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )):  Object.keys(logoutPages).map((page) => (
                  <MenuItem key={page} 
                  onClick={() => handleMovePage(logoutPages[page])}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )) }
              </Menu>
            </Box>

          {/* 모바일 화면 메뉴 바 설정 */}
            <Typography component="a" href="/">
              {!isPc && (
                <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { sm: 50 }, height: { sm: 50 }, ml: 35, mr: 35 }} />
              )}
            </Typography>

            {/* pc 화면 메뉴 버튼 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              { loginCheck ? Object.keys(pages).map((page) => (
                <Button
                  key={page}
                  onClick={() => handleMovePage(pages[page])}
                  sx={{ my: 1, color: 'black', display: 'block', p: 1.5}}
                >
                  {page}
                </Button>
              )) : Object.keys(logoutPages).map((page) => (
                <Button
                  key={page}
                  onClick={() => handleMovePage(logoutPages[page])}
                  sx={{ my: 1, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* 사용자 메뉴를 위한 아이콘 버튼을 표시 */}
            <Box sx={{ flexGrow: 0, ml: 10 }}> {/* 사용자 아이콘은 오른쪽에 유지 */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                  <Avatar alt="User Nick Name" src="/static/images/avatar/2.jpg" /> {/* ***** 아바타 이미지를 표시 --> 로그인시 설정된 아이콘으로 이미지 표시할 것 ***** */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* 아이콘 버튼 클릭 후 나오는 네비게이션 바 리스트에 대한 페이지 이동 버튼 */}
                {Object.keys(settings).map((setting) => (
                  <MenuItem 
                    key={setting} 
                    onClick={() => {
                      if (setting === 'Logout') {
                        handleLogout(); // 로그아웃 처리
                      } else {
                        handleMovePage(settings[setting]);
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </div>
    </section>
  );
}

export default HeaderMenuBar;
