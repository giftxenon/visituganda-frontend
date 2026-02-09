import { useState, useRef, useEffect } from 'react'; 
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
import CarRental from './CarRental';
import Attractions from './Attractions';
import AirportTaxi from './AirportTaxi';
import Accomodation from './Accomodation';
import TravelPartner from './TravelPartner';

const pages = ['Car rental', 'Attractions', 'Accommodation', 'Airport Taxi', 'Travel Partner'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function DashBoard() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePage, setActivePage] = useState('Car rental');

  // 🔹 New state to store username
  const [username, setUsername] = useState('');

  // Create refs for each section
  const carRentalRef = useRef(null);
  const attractionsRef = useRef(null);
  const accommodationRef = useRef(null);
  const airportTaxiRef = useRef(null);
  const travelPartnerRef = useRef(null);

  // 🔹 Load username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // set during login/register
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    window.location.href = '/LoginPage'; // redirect to login page
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    handleCloseNavMenu();

    switch(page) {
      case 'Car rental':
        carRentalRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Attractions':
        attractionsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Accommodation':
        accommodationRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Airport Taxi':
        airportTaxiRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Travel Partner':
        travelPartnerRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ mb: 2, backgroundColor: "#4caf50" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src="../imagesFolderO/ugMap.png" alt="Visit Uganda Logo" style={{ width: '100px' }} />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Visit Uganda256
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="navigation menu"
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#4caf50',
                textDecoration: 'none',
              }}
            >
              Visit Uganda
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    borderBottom: activePage === page ? '2px solid white' : 'none',
                    borderRadius: '4px',
                    backgroundColor: activePage === page ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Avatar & Menu */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: 'white', fontWeight: 500 }}>
                Welcome, {username || 'User'} {/* 🔹 Display username */}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if(setting === 'Logout') handleLogout(); // 🔹 Logout action
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div ref={carRentalRef}><CarRental /></div>
      <div ref={attractionsRef}><Attractions /></div>
      <div ref={accommodationRef}><Accomodation /></div>
      <div ref={airportTaxiRef}><AirportTaxi /></div>
      <div ref={travelPartnerRef}><TravelPartner /></div>
    </div>
  );
}

export default DashBoard;
