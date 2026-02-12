import React, { useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./DisplayCompany.css";

const CreatePostForm = ({ setAllPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [poster, setPoster] = useState(null);

  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) setPoster(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !startDate || !poster) {
      return alert("Please fill in all fields and upload a poster.");
    }
    const imageUrl = URL.createObjectURL(poster);
    setAllPosts((prev) => [
      {
        id: Date.now(),
        title,
        date: startDate,
        description,
        imageUrl,
      },
      ...prev,
    ]);
    setTitle("");
    setDescription("");
    setStartDate("");
    setPoster(null);
    alert("Post submitted successfully!");
  };

  return (
    <Box sx={{ width: "95%", p: 2, borderLeft: "2px solid #ddd" }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
              Upload Poster
              <input type="file" hidden accept="image/*" onChange={handlePosterChange} />
            </Button>
            {poster && <Typography sx={{ mt: 1 }}>Selected: {poster.name}</Typography>}
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreatePostForm;
