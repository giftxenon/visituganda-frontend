import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BackgroundSlideshow from '../pages/BackgroundSlideshow'; // Ensure correct path
import { Link } from 'react-router-dom';

// Define drawer width for mobile navigation
const drawerWidth = 250;

// Styled Components
const HeaderBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const MobileNavLinks = styled(List)(({ theme }) => ({
  width: drawerWidth,
}));

// Define navigation links
const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'OUR SERVICES', href: '#sites-main' },
  { label: 'OUR TEAM', href: '#devs' },
  { label: 'OUR SPONSORS', href: '#sponsor-main' },
  { label: 'CONTACT', href: '#contact-main' },
  { label: 'CAREERS', href: '#careers' }, // Ensure corresponding section exists
];

const VisitUganda = () => { // ---------------------------------------------------------VU

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // Initialize with 'home'

  // Refs for each section
  const sectionsRef = useRef({});

  // Initialize refs for each section
  navLinks.forEach(({ href }) => {
    const sectionId = href.replace('#', '');
    sectionsRef.current[sectionId] = sectionsRef.current[sectionId] || React.createRef();
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate offset considering the fixed AppBar height
      const yOffset = -64; // Adjust this value if your AppBar height differs
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Preload background images
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.6, // 60% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    navLinks.forEach(({ href }) => {
      const sectionId = href.replace('#', '');
      const currentSection = sectionsRef.current[sectionId].current;
      if (currentSection) {
        observer.observe(currentSection);
      }
    });

    // Cleanup on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [navLinks]);

  // Background images array
  const backgroundImages = [
    '/imagesFolderO/banner.png',
    '/imagesFolderO/zebras1.jpg',
    '/imagesFolderO/nssf.jpg',
    '/imagesFolderO/bahai.jpg',
    '/imagesFolderO/giraffe1.jpg',
  ];

  // Drawer content for mobile navigation
  const drawer = (
    <MobileNavLinks>
      <Box sx={{ textAlign: 'right', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navLinks.map(({ label, href }) => {
          const sectionId = href.replace('#', '');
          const isActive = activeSection === sectionId;

          return (
            <ListItem
              button
              component="a"
              href={href}
              key={label}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(sectionId);
                setActiveSection(sectionId);
                setMobileOpen(false); // Close the drawer after navigation
              }}
              sx={{
                backgroundColor: isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent', // Changed to #4caf50 with opacity
                borderRadius: '4px',
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.2)', // Changed to #4caf50 with higher opacity
                },
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  color: isActive ? '#4caf50' : 'inherit', // Changed to #4caf50
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </MobileNavLinks>
  );

  return (
    <Box sx={{ padding: 0, margin: 0 }}>
      <CssBaseline />

      {/* AppBar for Navigation */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="../imagesFolderO/ugMap.png" alt="Visit Uganda Logo" style={{ width: '100px' }} />
            <Typography variant="h4" color="white">
              Visit Uganda
            </Typography>
          </Box>

          {/* Navigation Links for Desktop */}
          <NavLinks>
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <Button
                  key={label}
                  color="inherit"
                  component="a"
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                    setActiveSection(sectionId);
                  }}
                  sx={{
                    position: 'relative',
                    borderRadius: '4px',
                    border: isActive ? '2px solid #4caf50' : '2px solid transparent', // Added full border
                    color: isActive ? '#4caf50' : 'inherit', // Changed to #4caf50
                    fontWeight: isActive ? 'bold' : 'normal',
                    backgroundColor: isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.2)', // Changed to #4caf50
                      border: '2px solid #4caf50', // Maintain border on hover
                      color: '#4caf50', // Change text color on hover
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </NavLinks>

          {/* Menu Icon for Mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Spacer to Offset Fixed AppBar */}
      <Toolbar />

      {/* Header Section */}
      <HeaderBox id="home" ref={sectionsRef.current['home']}>
        <BackgroundSlideshow images={backgroundImages} interval={5000} />

        {/* Main Header Content */}
        <Box sx={{ textAlign: 'center', color: 'white', px: 2 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Explore the Pearl of Africa
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.3rem' }}>
            Experience the beauty and diversity of Uganda through our platform. Explore breathtaking landscapes,<br />
            book thrilling safaris, and discover cultural treasures. 
            We provide seamless access to tours, accommodations,  <br /> and local experiences, 
            making your journey unforgettable.<br />Join us for an adventure of a lifetime!
          </Typography>

          <Box>
            <Button
              variant="outlined"
              component={Link}
              to="/RegisterCustomer"
              target="_blank"
              sx={{
                mr: 2,
                color: 'white', // Default text color
                backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                border: 'none', // No outline initially
                '&:hover': {
                  backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                  color: '#ffffff', // Text color on hover
                  border: '1px solid #ffffff', // Add border on hover
                },
                '&:active': {
                  backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                  color: '#ffffff', // Text color on click
                  border: '1px solid #ffffff', // Keep border on click
                },
              }}
            >
              REGISTER
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/LoginPage"
              target="_blank"
              sx={{
                mr: 2,
                color: 'white', // Default text color
                backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                border: 'none', // No outline initially
                '&:hover': {
                  backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                  color: '#ffffff', // Text color on hover
                  border: '1px solid #ffffff', // Add border on hover
                },
                '&:active': {
                  backgroundColor: '#4caf50', // Changed from #53c4f7 to #4caf50
                  color: '#ffffff', // Text color on click
                  border: '1px solid #ffffff', // Keep border on click
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </HeaderBox>

      {/* Our Services Section */}
      <Box
        id="sites-main"
        ref={sectionsRef.current['sites-main']}
        sx={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#4caf50' }} // Changed to #4caf50
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Our Services
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }} color="white">
          We prioritize safety, reliability, and quality in our services, allowing
          tourists to rate our associates,
          <br />
          which helps us track performance and ensure you receive the best experience possible.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#4caf50', borderRadius: '8px', p: 3, height: '100%' }}> {/* Changed to #4caf50 */}
              <Typography variant="h6" gutterBottom>
                Travel Destinations
              </Typography>
              <Typography variant="body2">
                Our website offers hassle-free bookings for tours, accommodations,
                and transport, ensuring a seamless travel experience. Enjoy top
                destinations with our reliable and convenient service.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#4caf50', borderRadius: '8px', p: 3, height: '100%' }}> {/* Changed to #4caf50 */}
              <Typography variant="h6" gutterBottom>
                Accommodation
              </Typography>
              <Typography variant="body2">
                Visit Uganda and enjoy the convenience and affordability of our 
                site, <br /> partnering with top national tour companies to offer diverse,
                budget-friendly travel options.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#4caf50', borderRadius: '8px', p: 3, height: '100%' }}> {/* Changed to #4caf50 */}
              <Typography variant="h6" gutterBottom>
                Car Rental
              </Typography>
              <Typography variant="body2">
                Partnering with various car rental companies, we ensure tourists
                have convenient and affordable transportation options to explore
                Uganda's stunning landscapes and attractions effortlessly.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Our Sponsors Section */}
      <Box
        id="sponsor-main"
        ref={sectionsRef.current['sponsor-main']}
        sx={{ textAlign: 'center', padding: '60px 20px' }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          OUR SPONSORS
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          repudiandae.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              MESTIL HOTEL
            </Typography>
            <img
              src="/imagesFolder/london.png"
              alt="Mestil Hotel"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              AFRICANA HOTEL
            </Typography>
            <img
              src="/imagesFolder/newyork.png"
              alt="Africana Hotel"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              SAFARI RESORT
            </Typography>
            <img
              src="/imagesFolder/washington.png"
              alt="Safari Resort"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Visit Uganda Team Section */}
      <Box
        id="devs"
        ref={sectionsRef.current['devs']}
        sx={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#4caf50' }} // Changed to #4caf50
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Visit Uganda Team
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }} color="white">
          <p>
            {`Our dedicated "Visit Uganda" team passionately promotes Uganda's rich culture, 
             wildlife, and natural beauty, delivering exceptional experiences that inspire 
             global travelers to explore the Pearl of Africa.`}
          </p>
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Repeat this Grid item for each team member */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ borderRadius: '10px', p: 3, backgroundColor: '#4caf50' }}> {/* Changed to #4caf50 */}
                <Typography variant="h6" gutterBottom>
                  CEO {index + 1}
                </Typography>
                <img
                  src="/imagesFolderO/Ben10.jpg"
                  alt={`Team Member ${index + 1}`}
                  style={{ width: '200px', borderRadius: '50%' }}
                />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Discover Uganda with our top-rated travel website! Book tours,
                  accommodations, and transport effortlessly. Explore breathtaking
                  destinations.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Careers Section */}
      <Box
        id="careers"
        ref={sectionsRef.current['careers']}
        sx={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f5f5f5' }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Careers
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }} color="grey">
          Join our dynamic team and help us make travel in Uganda unforgettable!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: '8px', p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Software Engineer
              </Typography>
              <Typography variant="body2">
                Develop and maintain our web applications, ensuring a seamless user experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: '8px', p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Marketing Specialist
              </Typography>
              <Typography variant="body2">
                Drive our marketing campaigns and expand our reach to potential customers.
              </Typography>
            </Box>
          </Grid>
          {/* Add more career positions as needed */}
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box
        id="contact-main"
        ref={sectionsRef.current['contact-main']}
        sx={{
          textAlign: 'center',
          padding: '60px 20px',
          border: '5px solid #4caf50', // Changed to #4caf50
          borderRadius: '10px',
          margin: '40px auto',
          maxWidth: '600px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact US
        </Typography>
        <Typography variant="h6" gutterBottom>
          support@visituganda.com
        </Typography>
        <Typography variant="h6">+256(0)701477874</Typography>
      </Box>

      {/* Footer Section */}
      <Box
        id="footer"
        ref={sectionsRef.current['footer']}
        sx={{ textAlign: 'center', backgroundColor: '#4caf50', padding: '40px 20px', color: 'white' }} // Changed to #4caf50
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2">
              Kampala Office, Wandegeya Market South Wing, Wandegeya, Kampala, Uganda.
              <br />
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                Google Maps
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow US
            </Typography>
            <Typography variant="body2">Facebook</Typography>
            <Typography variant="body2">Twitter</Typography>
            <Typography variant="body2">Instagram</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About US
            </Typography>
            <Typography variant="body2">
              Welcome to our site! We offer seamless travel experiences in Uganda with top-rated tours,
              guides, and trusted travel partners. Explore with us today!
              <br />
              <a href="/PartnerPage/partner.html" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                Become a partner
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} Visit Uganda Site. All rights reserved.
        </Typography>
      </Box>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default VisitUganda;
