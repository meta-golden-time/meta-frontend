import * as React from 'react';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import myLogo from '../../img/main/goldenTimeLogo.png';
// import AdbIcon from '@mui/icons-material/Adb';

// 페이지 메뉴 항목을 정의
const pages = ['weather', 'map'];
// 사용자 설정 메뉴 항목을 정의
const settings = ['Profile', 'Account', 'Logout'];

// 네비게이션 메뉴와 사용자 설정 메뉴의 항목들을 정의
function MenuAppBar() {
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

  const handleCloseNavMenu = () => {
    // 내비게이션 메뉴를 닫는 함수
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    // 사용자 메뉴를 닫는 함수
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일 화면 여부 확인
  const isPc = useMediaQuery(theme.breakpoints.up('md')); // pc 화면 여부 확인

  return (
    <AppBar class=".MuiAppBar-colorTransparent" position="static" style={{ width: '100%' }}> {/* AppBar 컴포넌트를 사용하여 상단 바를 생성합니다. */}
      <Container maxWidth="xl"> {/* 최대 폭이 'xl'인 Container 컴포넌트를 사용합니다. */}
        <Toolbar disableGutters> {/* Toolbar 컴포넌트를 사용하여 도구 모음을 생성합니다. disableGutters는 패딩을 제거합니다. */}

          {/* Adb 아이콘을 표시합니다. xs 크기에서는 숨기고 md 크기 이상에서는 표시합니다. */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />  */}
          {/* 큰 화면(pc 화면)이 작은 화면(모바일 화면)으로 전환 될 때 아이콘 표시 여부를 나타내주는 AdbIcon 태그 코드를
          아래 Box 태그 코드로 수정함 */}
          {!isMobile && (
            <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { xs: 25, sm: 30, md: 33 }, height: { xs: 25, sm: 30, md: 33 }, mr: 2 }} />
          )}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.1rem', // 문자 간격
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Golden Time
          </Typography> {/* 'LOGO' 텍스트를 표시합니다. xs 크기에서는 숨기고 md 크기 이상에서는 표시합니다. */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* 작은 화면에서는 내비게이션 메뉴를 위한 아이콘 버튼을 표시합니다. */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon /> {/* 메뉴 아이콘을 표시합니다. */}
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 작은 화면에서는 Adb 아이콘을 표시합니다. */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* 작은 화면(모바일 화면)이 큰 화면(pc 화면)으로 전환 될 때 아이콘 표시 여부를 나타내주는 AdbIcon 태그 코드를
          아래 Box 태그 코드로 수정함 */}
          {!isPc && (
            <Box component="img" src={myLogo} alt="My Logo" sx={{ width: { xs: 25, sm: 30, md: 33 }, height: { xs: 25, sm: 30, md: 33 }, mr: 2 }} />
          )}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.1rem', // 문자간격
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Golden Time
          </Typography> {/* 작은 화면에서는 'LOGO' 텍스트를 표시합니다. */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* 큰 화면에서는 내비게이션 메뉴 버튼을 표시합니다. */}
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* 사용자 메뉴를 위한 아이콘 버튼을 표시합니다. */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> {/* 아바타 이미지를 표시합니다. */}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
export default MenuAppBar;