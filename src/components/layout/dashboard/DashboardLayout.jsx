import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AttractionsIcon from '@mui/icons-material/Attractions';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 260;

function DashBoard() {
  const [username, setUsername] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/LoginPage');
    if (isMobile) setMobileOpen(false); // close drawer on logout
  };

  const getActive = (path) => location.pathname.includes(path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* ------------------ Sidebar Content ------------------ */
  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        <SidebarItem
          icon={<DashboardIcon />}
          text="Dashboard"
          active={getActive('/dashboard')}
          onClick={() => {
            navigate('/customer/dashboard');
            if (isMobile) setMobileOpen(false); // close drawer after selection
          }}
        />
        <Divider sx={{ my: 1 }} />
        <SidebarItem
          icon={<DirectionsCarIcon />}
          text="Car Rental"
          active={getActive('/services/car-rentals')}
          onClick={() => {
            navigate('/customer/dashboard/services/car-rentals');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<HotelIcon />}
          text="Accommodation"
          active={getActive('/services/accommodation')}
          onClick={() => {
            navigate('/customer/dashboard/services/accommodation');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<LocalTaxiIcon />}
          text="Airport Taxi"
          active={getActive('/services/airport-taxi')}
          onClick={() => {
            navigate('/customer/dashboard/services/airport-taxi');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <Divider sx={{ my: 1 }} />
        <SidebarItem
          icon={<AttractionsIcon />}
          text="Attractions"
          active={getActive('/services/attractions')}
          onClick={() => {
            navigate('/customer/dashboard/services/attractions');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<GroupIcon />}
          text="Travel Partner"
          active={getActive('/services/travel-partner')}
          onClick={() => {
            navigate('/customer/dashboard/services/travel-partner');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <Divider sx={{ my: 1 }} />
        <SidebarItem
          icon={<LogoutIcon />}
          text="Logout"
          onClick={handleLogout}
        />
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, backgroundColor: '#4caf50' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src="/imagesFolderO/ugMap.png"
              alt="Visit Uganda Logo"
              style={{
                width: 'clamp(40px, 8vw, 90px)',
                height: 'auto',
                flexShrink: 0,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                color: 'white',
                fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
                whiteSpace: 'nowrap',
              }}
            >
              Visit the Pearl
            </Typography>
          </Box>

          {/* Hide "Hi, User" on mobile */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography>Hi, {username || 'User'}</Typography>
            <Tooltip title="Account">
              <Avatar />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        backgroundColor: active ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
        borderLeft: active ? '4px solid #4caf50' : '4px solid transparent',
      }}
    >
      <ListItemIcon sx={{ color: '#4caf50' }}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default DashBoard;
