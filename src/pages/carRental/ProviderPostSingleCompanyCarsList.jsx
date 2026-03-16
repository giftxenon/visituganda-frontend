import React from "react";
import { useNavigate } from "react-router-dom";
import MainContentDetailPageLayout from "../../components/layout/dashboard/MainContentDetailPageLayout";
import {
  Box,
  Stack,
  Card,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function BusinessCarManagement() {
  const navigate = useNavigate();

  // Normally fetched from backend (logged-in business)
  const business = {
    name: "Self Drive Uganda",
    location: "Entebbe, Uganda",
    category: "Car Rental",
    description:
      "We offer premium self-drive and chauffeured car rental services across Uganda.",
    logo: "/imagesFolderO/defaultCar.jpg",
  };

  // ---------------- LEFT: BUSINESS PROFILE ----------------
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

  // ---------------- RIGHT: BUTTON TO ADD NEW CAR ----------------
  const rightContent = (
    <Card sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Manage Your Cars
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => navigate("/business/dashboard/SingleCarDetails")} // route to ProviderPostSingleCarDetails
      >
        Add New Car
      </Button>

      <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
        Click the button above to add a new car to your company listings.
      </Typography>
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