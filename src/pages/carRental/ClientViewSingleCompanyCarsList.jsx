import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MainContentDetailPageLayout from "../../components/layout/dashboard/MainContentDetailPageLayout";
import CompanySidebar from "../../components/layout/dashboard/CompanySidebar";

import {
  Stack,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ NEW: small hook that fetches the first image URL for a car
function useCarFirstImage(carId) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/cars/${carId}/images`);
        const ids = await res.json();
        if (ids && ids.length > 0) {
          setImageUrl(`${API_BASE_URL}/api/v1/cars/images/${ids[0]}`);
        }
      } catch (e) {
        console.error("Error fetching car image:", e);
      }
    };
    if (carId) fetch_();
  }, [carId]);

  return imageUrl;
}

// ✅ NEW: wrapper card component so each car can call the hook independently
function CarCard({ car, companyId, company, navigate, renderStars }) {
  const firstImage = useCarFirstImage(car.id);

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(
          `/customer/dashboard/services/car-rentals/${companyId}/${car.id}`,
          { state: { car, company } }
        )
      }
    >
      <CardMedia
        component="img"
        height={250}
        image={firstImage || "/imagesFolderO/defaultCar.jpg"}
        alt={car.title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {car.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.description}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Rating: {renderStars(car.rating)}
        </Typography>
        <Typography>Cost per day: ${car.costPerDay}</Typography>
      </CardContent>
    </Card>
  );
}

export default function CarRentalDetail() {
  const { companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const company = location.state?.company;
  const rightContent = <CompanySidebar company={company} />;

  const heroImages = [
    "/imagesFolderO/twoLRback.jpg",
    "/imagesFolderO/CarGTROrange.jpg",
    "/imagesFolderO/LRback.jpg",
    "/imagesFolderO/twolandFront.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/cars/company/${companyId}`
        );
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching company cars:", error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchCars();
  }, [companyId]);

  const renderStars = (rating) => {
    const safeRating = Math.min(Math.max(Number(rating) || 0, 0), 5);
    const fullStars = Math.floor(safeRating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars).fill(null).map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {Array(emptyStars).fill(null).map((_, i) => (
          <span key={`empty-${i}`} style={{ opacity: 0.3 }}>★</span>
        ))}
      </>
    );
  };

  const leftContent = (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Box sx={{ position: "relative", height: { xs: 250, sm: 450 } }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImages[currentHero]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85))",
          }}
        />
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 24,
            left: 24,
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {company?.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon fontSize="small" />
            <Typography>{company?.location || "Entebbe, Uganda"}</Typography>
          </Stack>
        </Stack>
      </Box>

      {loading ? (
        <Typography>Loading cars...</Typography>
      ) : cars.length === 0 ? (
        <Typography>No cars posted under this company yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {/* ✅ replaced inline Card with CarCard component */}
          {cars.map((car) => (
            <Grid item xs={12} sm={6} key={car.id}>
              <CarCard
                car={car}
                companyId={companyId}
                company={company}
                navigate={navigate}
                renderStars={renderStars}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );

  return (
    <MainContentDetailPageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      hideRightOnMobile={true}
    />
  );
}