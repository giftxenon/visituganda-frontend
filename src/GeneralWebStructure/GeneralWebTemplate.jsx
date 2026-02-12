import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AttractionsIcon from '@mui/icons-material/Attractions';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

import './GeneralWebTemplate.css';

const drawerWidth = 260;

export default function GeneralWebTemplate({ children, username }) {
  const [activePage, setActivePage] = useState('Dashboard');

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    window.location.href = '/LoginPage';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ================= APP BAR ================= */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#4caf50',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src="../imagesFolderO/ugMap.png"
              alt="Visit Uganda Logo"
              className="ugmap-logo"
            />
            <Typography className="appbar-title">
              Visit the Pearl
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Hi, {username || 'User'}</Typography>
            <Tooltip title="Account">
              <Avatar />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Spacer to align below AppBar */}
        <Toolbar />

        <List>
          <SidebarItem
            icon={<DashboardIcon />}
            text="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => setActivePage('Dashboard')}
          />

          <Divider sx={{ my: 1 }} />

          <SidebarItem
            icon={<DirectionsCarIcon />}
            text="Car Rental"
            active={activePage === 'Car Rental'}
            onClick={() => setActivePage('Car Rental')}
          />

          <SidebarItem
            icon={<HotelIcon />}
            text="Accommodation"
            active={activePage === 'Accommodation'}
            onClick={() => setActivePage('Accommodation')}
          />

          <SidebarItem
            icon={<LocalTaxiIcon />}
            text="Airport Taxi"
            active={activePage === 'Airport Taxi'}
            onClick={() => setActivePage('Airport Taxi')}
          />

          <Divider sx={{ my: 1 }} />

          <SidebarItem
            icon={<AttractionsIcon />}
            text="Attractions"
            active={activePage === 'Attractions'}
            onClick={() => setActivePage('Attractions')}
          />

          <SidebarItem
            icon={<GroupIcon />}
            text="Travel Partner"
            active={activePage === 'Travel Partner'}
            onClick={() => setActivePage('Travel Partner')}
          />

          <Divider sx={{ my: 1 }} />

          <SidebarItem
            icon={<LogoutIcon />}
            text="Logout"
            onClick={handleLogout}
          />
        </List>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
        }}
      >
        {/* Spacer for AppBar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

/* ================= SIDEBAR ITEM ================= */
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        backgroundColor: active ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
        borderLeft: active ? '4px solid #4caf50' : '4px solid transparent',
      }}
    >
      <ListItemIcon sx={{ color: '#4caf50' }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}
