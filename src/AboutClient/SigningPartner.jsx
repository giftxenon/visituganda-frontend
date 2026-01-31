// Import necessary modules and components
import { useState } from 'react';
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

// Create a custom theme with light green colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Light green
    },
    secondary: {
      main: '#81c784', // Lighter green
    },
  },
});

const SigningTPartner = () => {
  // State management for form fields
  const [companyInfo, setCompanyInfo] = useState('');
  const [whyChooseUs, setWhyChooseUs] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photos, setPhotos] = useState([]);

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box
          sx={{
            padding: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Create Your Business Acc Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                  color="primary"
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
                  color="primary"
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
                  color="primary"
                />
              </Grid>

              {/* Photo Upload */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload your Photos
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </Button>
                {photos.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {photos.length} photo(s) selected
                  </Typography>
                )}
              </Grid>

              {/* Finish Button */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
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

export default SigningTPartner;
