// src/pages/business/BusinessDetails.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = [
  { label: "Car Rental", value: "CAR_RENTAL" },
  { label: "Tourist Attraction", value: "TOURIST_ATTRACTION" },
  { label: "Airport", value: "AIRPORT" },
  { label: "Accommodation", value: "ACCOMODATION" },
  { label: "Travel Partner", value: "TRAVEL_PARTNER" },
];

function BusinessDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    operatingHours: "",
    description: "",
    logo: null,
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // If no token on mount, redirect to login immediately
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/LoginPage");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/LoginPage");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("companyName", formData.companyName);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("phone", formData.phone);
      if (formData.email) data.append("email", formData.email);
      if (formData.operatingHours) data.append("operatingHours", formData.operatingHours);
      if (formData.description) data.append("description", formData.description);
      if (formData.logo) data.append("logo", formData.logo);

      const response = await fetch(`${API_BASE_URL}/api/v1/businesses/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Business registration failed");
      }

      setSuccessOpen(true);
      setFormData({
        companyName: "",
        category: "",
        location: "",
        phone: "",
        email: "",
        operatingHours: "",
        description: "",
        logo: null,
      });

      setTimeout(() => navigate("/business/dashboard/viewprofile"), 1500);

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Create Your Business Profile
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Operating Hours"
              name="operatingHours"
              value={formData.operatingHours}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              minRows={3}
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" startIcon={<UploadFile />}>
              Upload Logo
              <input
                type="file"
                hidden
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save Business"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessOpen(false)}>
          Business registered successfully! Redirecting…
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={5000}
        onClose={() => setErrorMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BusinessDetails;