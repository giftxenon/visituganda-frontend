import React, { useState } from "react";
// import MainContentDetailPageLayout from "../../components/layout/dashboard/MainContentDetailPageLayout";
import MainContentDetailPageLayout from "../MainContentDetailPageLayout";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function BusinessCarManagement() {
  // Normally fetched from backend (logged-in business)
  const business = {
    name: "Self Drive Uganda",
    location: "Entebbe, Uganda",
    category: "Car Rental",
    description:
      "We offer premium self-drive and chauffeured car rental services across Uganda.",
    logo: "/imagesFolderO/defaultCar.jpg",
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    costPerDay: "",
    rating: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔜 API call will go here
    console.log("Car data submitted:", formData);

    alert("Car posted successfully!");
    setFormData({
      title: "",
      description: "",
      costPerDay: "",
      rating: "",
      image: null,
    });
  };

  /* ---------------- LEFT: BUSINESS PROFILE ---------------- */
  const leftContent = (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Avatar
          src={business.logo}
          sx={{ width: 120, height: 120 }}
        />

        <Typography variant="h5" fontWeight={700}>
          {business.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">{business.location}</Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary">
          {business.category}
        </Typography>

        <Typography variant="body2" textAlign="center">
          {business.description}
        </Typography>
      </Stack>
    </Card>
  );

  /* ---------------- RIGHT: CREATE CAR FORM ---------------- */
  const rightContent = (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Add a New Car
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Car Title"
              name="title"
              required
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              minRows={3}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Cost per Day ($)"
              name="costPerDay"
              type="number"
              required
              fullWidth
              value={formData.costPerDay}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating (optional)"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              fullWidth
              value={formData.rating}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Car Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Post Car
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );

  return (
    <MainContentDetailPageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      hideRightOnMobile={false}
    />
  );
}