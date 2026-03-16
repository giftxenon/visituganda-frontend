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
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 260;

function BusinessDashboard() {
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
    if (isMobile) setMobileOpen(false);
  };

  const getActive = (path) => location.pathname.includes(path);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        <SidebarItem
          icon={<PersonIcon />}
          text="Your Profile"
          active={getActive('/business/dashboard/profile')}
          onClick={() => {
            navigate('/business/dashboard/profile');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<AccountBalanceWalletIcon />}
          text="Wallet"
          active={getActive('/business/dashboard/wallet')}
          onClick={() => {
            navigate('/business/dashboard/wallet');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<PostAddIcon />}
          text="Your Posts"
          active={getActive('/business/dashboard/posts')}
          onClick={() => {
            navigate('/business/dashboard/posts');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<AnalyticsIcon />}
          text="Analytics"
          active={getActive('/business/dashboard/analytics')}
          onClick={() => {
            navigate('/business/dashboard/analytics');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<MessageIcon />}
          text="Messages"
          active={getActive('/business/dashboard/messages')}
          onClick={() => {
            navigate('/business/dashboard/messages');
            if (isMobile) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<SettingsIcon />}
          text="Settings"
          active={getActive('/business/dashboard/settings')}
          onClick={() => {
            navigate('/business/dashboard/settings');
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
      <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#4caf50' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <img
              src="/imagesFolderO/ugMap.png"
              alt="Visit Uganda Logo"
              style={{ width: 'clamp(40px, 8vw, 90px)', height: 'auto', flexShrink: 0 }}
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
          BOOK & TRAVEL
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Typography>Hi, {username || 'there'}</Typography>
            <Tooltip title="Account">
              <Avatar />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', top: 64, height: 'calc(100% - 64px)' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 9,
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ maxWidth: 1500, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        backgroundColor: active ? 'rgba(25, 118, 210, 0.15)' : 'transparent',
        borderLeft: active ? '4px solid #4caf50' : '4px solid transparent',
      }}
    >
      <ListItemIcon sx={{ color: '#4caf50' }}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default BusinessDashboard;