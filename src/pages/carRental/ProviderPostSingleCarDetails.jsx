import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  MenuItem,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProviderPostSingleCarDetails() {
  const initialCarState = {
    title: "",
    description: "",
    rating: "",
    costPerDay: "",
    manufacturer: "",
    year: "",
    transmission: "",
    drivetrain: "",
    seating: "",
    fuelConsumption: "",
    vechicleNumber: "",
    about: "",
  };

  const [car, setCar] = useState(initialCarState);
  const [imageFiles, setImageFiles] = useState([]);        // ✅ was: imageFile
  const [imagePreviews, setImagePreviews] = useState([]);  // ✅ was: imagePreview
  const [activePreview, setActivePreview] = useState(0);   // ✅ new: which thumbnail is shown
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // ✅ replaced handleImageChange — now handles multiple files up to 4
  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const combined = [...imageFiles, ...selected];

    if (combined.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }

    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setImageFiles(combined);
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setActivePreview(0);
  };

  // ✅ new: remove a specific image by index
  const handleRemoveImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setActivePreview(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("jwtToken");

    try {
      const formData = new FormData();
      formData.append("title", car.title);
      formData.append("description", car.description || "");
      formData.append("rating", car.rating || "0");
      formData.append("costPerDay", car.costPerDay);
      formData.append("manufacturer", car.manufacturer || "");
      formData.append("year", car.year || "");
      formData.append("transmission", car.transmission || "");
      formData.append("drivetrain", car.drivetrain || "");
      formData.append("seating", car.seating || "");
      formData.append("fuelConsumption", car.fuelConsumption || "");
      formData.append("vechicleNumber", car.vechicleNumber || "");
      formData.append("about", car.about || "");

      // ✅ was: formData.append("image", imageFile)
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/cars`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to post car");
      }

      const data = await response.json();
      console.log("Car Posted:", data);

      alert("Car successfully posted!");
      setCar(initialCarState);
      setImageFiles([]);
      setImagePreviews([]);
      setActivePreview(0);
    } catch (err) {
      console.error(err);
      alert("Failed to post car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 4 } }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight={700}>
          Post New Car
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Fill in the car information below. This data will appear on the client
          listing page and the car details page.
        </Typography>

        <Divider />

        <Grid container spacing={4}>
          {/* LEFT SIDE: FORM */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3} component="form" onSubmit={handleSubmit}>

              <Typography variant="h6" fontWeight={600}>
                Basic Information
              </Typography>

              <TextField
                label="Car Title"
                name="title"
                value={car.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Short Description"
                name="description"
                value={car.description}
                onChange={handleChange}
                fullWidth
              />

              {/* ✅ UPDATED: multi-image upload with thumbnails */}
              <Box>
                <Typography variant="body2" fontWeight={600} mb={1}>
                  Car Images ({imageFiles.length}/4)
                </Typography>

                {imageFiles.length < 4 && (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ py: 2, border: "2px dashed #ccc", mb: 2 }}
                  >
                    Click to add images ({4 - imageFiles.length} remaining)
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      onChange={handleImageChange}
                    />
                  </Button>
                )}

                {imagePreviews.length > 0 && (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {imagePreviews.map((src, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          width: 80, height: 80,
                          border: activePreview === index ? "2px solid #2e7d32" : "2px solid transparent",
                          borderRadius: 1,
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                        onClick={() => setActivePreview(index)}
                      >
                        <img
                          src={src}
                          alt={`preview-${index}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                          sx={{
                            position: "absolute", top: 0, right: 0,
                            background: "rgba(0,0,0,0.5)", color: "white", p: "2px",
                            "&:hover": { background: "rgba(200,0,0,0.8)" },
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Rating (0-5)"
                    name="rating"
                    type="number"
                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                    value={car.rating}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Cost Per Day ($)"
                    name="costPerDay"
                    type="number"
                    value={car.costPerDay}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="h6" fontWeight={600}>
                Specifications
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Manufacturer"
                    name="manufacturer"
                    value={car.manufacturer}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Year"
                    name="year"
                    type="number"
                    value={car.year}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Transmission"
                    name="transmission"
                    select
                    value={car.transmission}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Automatic">Automatic</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Drivetrain"
                    name="drivetrain"
                    value={car.drivetrain}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Seating Capacity"
                    name="seating"
                    type="number"
                    value={car.seating}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Fuel Consumption"
                    name="fuelConsumption"
                    value={car.fuelConsumption}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Vehicle Number"
                    name="vechicleNumber"
                    value={car.vechicleNumber}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="h6" fontWeight={600}>
                About this Car
              </Typography>

              <TextField
                label="Car Description"
                name="about"
                multiline
                rows={4}
                value={car.about}
                onChange={handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2 }}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? "Posting..." : "Post Car"}
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT SIDE: LIVE PREVIEW */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Live Preview
            </Typography>

            <Card>
              {/* ✅ shows whichever thumbnail is active */}
              <CardMedia
                component="img"
                height="220"
                image={imagePreviews[activePreview] || "/imagesFolderO/CarGTROrange.jpg"}
                alt="Car preview"
              />

              {/* ✅ dot navigation — only shows when more than 1 image */}
              {imagePreviews.length > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, pt: 1 }}>
                  {imagePreviews.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setActivePreview(i)}
                      sx={{
                        width: 10, height: 10, borderRadius: "50%", cursor: "pointer",
                        background: activePreview === i ? "#2e7d32" : "#ccc",
                      }}
                    />
                  ))}
                </Box>
              )}

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {car.title || "Car Title"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {car.description || "Short description will appear here"}
                </Typography>

                <Typography mt={1}>Rating: {car.rating || "0"}</Typography>

                <Typography fontWeight={600}>
                  Cost per day: ${car.costPerDay || "0"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}