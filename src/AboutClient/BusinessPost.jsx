// src/CreatePostPage.js
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
import { styled } from '@mui/system';

//------------------------------business ---post
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#90caf9', // Light Blue
    },
  },
});

// Styled component for the upload button
const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PostingAgentPage = () => {
  // State management for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [poster, setPoster] = useState(null);

  // Handle poster upload
  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPoster(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !description || !startDate || !poster) {
      alert('Please fill in all fields and upload a poster.');
      return;
    }

    // Create a form data object (if needed for backend)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('poster', poster);

    // For demonstration, we'll log the data to the console
    console.log('Post Submitted:');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Start Date:', startDate);
    console.log('Poster:', poster);

    // Reset form fields
    setTitle('');
    setDescription('');
    setStartDate('');
    setPoster(null);

    // Optionally, navigate to another page or show a success message
    alert('Post submitted successfully!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
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
            Create a New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Title Field */}
              <Grid item xs={12}>
                <TextField
                  label="Enter the Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  color="primary"
                />
              </Grid>

              {/* Description Field */}
              <Grid item xs={12}>
                <TextField
                  label="Enter the Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  color="primary"
                />
              </Grid>

              {/* Start Date Field */}
              <Grid item xs={12}>
                <TextField
                  label="Enter the Start Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  color="primary"
                />
              </Grid>

              {/* Poster Upload Field */}
              <Grid item xs={12}>
                <UploadButton
                  variant="contained"
                  component="label"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Poster
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePosterChange}
                  />
                </UploadButton>
                {poster && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected Poster: {poster.name}
                  </Typography>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostingAgentPage;
