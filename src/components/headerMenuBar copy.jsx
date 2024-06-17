import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Material UI의 컴포넌트 불러오기
import AppBar from '@mui/material/AppBar';
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
import myLogo from '../img/main/goldenTimeLogo.png';

import { postLoginCheck } from '../apis/userApi/user'; //로그인체크 진행

// 페이지 메뉴 항목을 정의
const pages = { Weather: 'weather', Map: 'maps', Login: 'login', register: 'register' /*login, register page test를 위해서 넣어두었어요.*/,
  Login_Ryu: 'login_ryu', registe_Ryu: 'register_ryu', chat: 'chatting', 고객센터: 'board' };

// 사용자 설정 메뉴 항목을 정의
const settingsLogin = { 'User Page': 'user/userPage', 'Log out': 'logout' }; // 로그인 후
const settingsLogout = { 'Log in': 'login', 'Sign up': 'signup' }; // 로그인 전

function HeaderMenuBar() {
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부를 나타내는 state
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 체크 상태

  const checkLoginStatus = async () => {
    try {
      const result = await postLoginCheck();
      console.log("🚀 ~ checkLoginStatus ~ result:", result);
      console.log("🚀 ~ checkLoginStatus ~ result.success:", result.success);
      setLoginCheck(result.success);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true); // 스크롤 되면 true로 변경
      } else {
        setIsScrolled(false); // 스크롤이 맨 위로 올라가면 false로 변경
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 내비게이션 메뉴의 열림 상태를 관리하는 상태 훅을 정의
  const [anchorElNav, setAnchorElNav] = useState(null);
  // 사용자 메뉴의 열림 상태를 관리하는 상태 훅을 정의
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    navigate(`/${page}`);
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

  return (
    <AppBar className=".MuiAppBar-colorTransparent" position="static" style={{ width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isMobile && (
            <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { xs: 25, sm: 30, md: 33 }, height: { xs: 25, sm: 30, md: 33 }, mr: 0.5 }} />
          )}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Golden Time
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {Object.keys(pages).map((page) => (
                <MenuItem key={page} onClick={() => handleMovePage(pages[page])}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {!isPc && (
            <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { xs: 25, sm: 30, md: 33 }, height: { xs: 25, sm: 30, md: 33 }, mr: 1 }} />
          )}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Golden Time
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {Object.keys(pages).map((page) => (
              <Button
                key={page}
                onClick={() => handleMovePage(pages[page])}
                sx={{ my: 1, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, pl: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Nick Name" src="/static/images/avatar/2.jpg" />
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
              {Object.keys(settings).map((setting) => (
                <MenuItem key={setting} onClick={() => handleMovePage(settings[setting])}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderMenuBar;
