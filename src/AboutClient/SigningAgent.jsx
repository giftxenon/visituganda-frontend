// Import necessary modules and components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Create a custom theme with preferred colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Changed from '#1976d2' (Blue) to '#4caf50' (Green)
    },
    secondary: {
      main: '#4caf50', // Changed from '#90caf9' (Light Blue) to '#4caf50' (Green)
    },
  },
});

const SigningAgent = () => {
  // State management for form fields
  const [companyInfo, setCompanyInfo] = useState('');
  const [whyChooseUs, setWhyChooseUs] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  // Handle photo uploads
  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log({
      companyInfo,
      whyChooseUs,
      photoDescription,
      photos,
    });
    // Reset form or navigate as needed
  };

  // Handle navigation to the next page
  const handleClick = () => {
    navigate('/DisplayCompany'); // Replace '/next-page' with the actual route of the next page
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box
          sx={{
            padding: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#f5f5f5', // Optional: You can change this if needed
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Create Your Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Button
                variant="contained"
                component="label"
                color="secondary" // Uses theme's secondary color
                startIcon={<CloudUploadIcon />}
                sx={{
                  ml: "340px",
                  my: "25px",
                  textTransform: 'none',
                  backgroundColor: '#4caf50', // Ensures background color matches theme
                  '&:hover': {
                    backgroundColor: '#43a047', // Darker shade on hover
                    border: '1px solid #ffffff', // Add border on hover
                  },
                  '&:active': {
                    backgroundColor: '#388e3c', // Even darker on click
                    border: '1px solid #ffffff', // Keep border on click
                  },
                }}
              >
                Add Profile Picture
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>

              {/* Tell us about your company */}
              <Grid item xs={12}>
                <TextField
                  label="Tell us about your company"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={companyInfo}
                  onChange={(e) => setCompanyInfo(e.target.value)}
                  required
                  color="primary" // Uses theme's primary color
                />
              </Grid>

              {/* Tell your clients why they can choose you over others */}
              <Grid item xs={12}>
                <TextField
                  label="Tell your clients why they can choose you over others"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={whyChooseUs}
                  onChange={(e) => setWhyChooseUs(e.target.value)}
                  required
                  color="primary" // Uses theme's primary color
                />
              </Grid>

              {/* Add a description to your photos */}
              <Grid item xs={12}>
                <TextField
                  label="Add a description to your photos"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={photoDescription}
                  onChange={(e) => setPhotoDescription(e.target.value)}
                  required
                  color="primary" // Uses theme's primary color
                />
              </Grid>

              {/* Photo Upload */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="secondary" // Uses theme's secondary color
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: '#4caf50', // Ensures background color matches theme
                    '&:hover': {
                      backgroundColor: '#43a047', // Darker shade on hover
                      border: '1px solid #ffffff', // Add border on hover
                    },
                    '&:active': {
                      backgroundColor: '#388e3c', // Even darker on click
                      border: '1px solid #ffffff', // Keep border on click
                    },
                  }}
                >
                  Upload Photos
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </Button>
                {photos.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {photos.length} photo(s) selected
                  </Typography>
                )}
              </Grid>

              {/* Finish Button */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary" // Uses theme's primary color
                  size="large"
                  onClick={handleClick} // Navigates to the next page
                  sx={{
                    backgroundColor: '#4caf50', // Ensures background color matches theme
                    '&:hover': {
                      backgroundColor: '#43a047', // Darker shade on hover
                    },
                    '&:active': {
                      backgroundColor: '#388e3c', // Even darker on click
                    },
                  }}
                >
                  Finish
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SigningAgent;
