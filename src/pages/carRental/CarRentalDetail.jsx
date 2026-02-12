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
  Button,
  Avatar,
  TextField,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // <-- import location icon

export default function CarRentalDetail() {
  const { companyName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;
  const rightContent = <CompanySidebar company={company} />;

  /* ---------------- Hero Images for Auto Carousel ---------------- */
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
    }, 2000); // auto-change every 2s
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Cars Data ---------------- */
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const allCars = {
      "self-drive-uganda": [
        {
          title: "Toyota Land Cruiser",
          desc: "3 days self drive package in Murchison Falls.",
          img: "/imagesFolderO/landrover1.jpg",
          rating: 4.8,
          costPerDay: 350,
        },
        {
          title: "BMW Safari",
          desc: "Weekend safari offer in Entebbe.",
          img: "/imagesFolderO/CarBMW.jpg",
          rating: 4.5,
          costPerDay: 250,
        },
        {
          title: "GTR Orange Tour",
          desc: "Drive the GTR Orange through Kampala streets.",
          img: "/imagesFolderO/CarGTROrange.jpg",
          rating: 4.7,
          costPerDay: 300,
        },
        {
          title: "Volkswagen RoadTrip",
          desc: "Scenic drive with Volkswagen across Uganda.",
          img: "/imagesFolderO/CarVolskwagen.jpg",
          rating: 4.2,
          costPerDay: 180,
        },
      ],
      "roadtrip-africa": [
        {
          title: "Safari Cruiser",
          desc: "3 days tour in Lake Mburo.",
          img: "/imagesFolderO/backRover.jpg",
          rating: 4.5,
          costPerDay: 300,
        },
      ],
    };

    setCars(allCars[companyName] || []);
  }, [companyName]);

  /* ---------------- Rating Stars ---------------- */
  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <span key={`full-${i}`}>★</span>
          ))}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <span key={`empty-${i}`} style={{ opacity: 0.3 }}>
              ★
            </span>
          ))}
      </>
    );
  };

  /* ---------------- LEFT CONTENT ---------------- */
  const leftContent = (
    <Stack spacing={3} sx={{ width: "100%" }}>
      {/* Hero Carousel */}
      <Box sx={{ position: "relative", height: { xs: 250, sm: 450 }, cursor: "pointer" }}>
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
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85))",
          }}
        />
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            bottom: { xs: "60px", sm: 24 },
            left: 24,
            color: "#fff",
          }}
        >
          <Typography variant={{ xs: "h5", sm: "h3" }} fontWeight={700}>
            {company?.name}
          </Typography>

          {/* Location with Icon */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon fontSize="small" />
            <Typography variant={{ xs: "body2", sm: "subtitle1" }}>
              {company?.location || "Entebbe, Uganda"}
            </Typography>
          </Stack>
        </Stack>

        {/* Thumbnails */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            overflowX: "auto",
            px: 1,
          }}
        >
          {heroImages.map((img, i) => (
            <Box
              key={i}
              sx={{
                width: 60,
                height: 40,
                minWidth: 60,
                border: i === currentHero ? "2px solid #4caf50" : "1px solid #fff",
                cursor: "pointer",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => setCurrentHero(i)}
            />
          ))}
        </Stack>
      </Box>

      {/* Cars Grid */}
      <Box>
        <Grid container spacing={2}>
          {cars.map((car, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/customer/dashboard/services/car-rentals/${companyName}/${encodeURIComponent(
                      car.title
                    )}`,
                    { state: { car, company } }
                  )
                }
              >
                <CardMedia component="img" height={250} image={car.img} alt={car.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {car.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {car.desc}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>Rating: {renderStars(car.rating)}</Typography>
                  <Typography>Cost per day: ${car.costPerDay}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );

  /* ---------------- RIGHT CONTENT ---------------- */
  return (
    <MainContentDetailPageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      hideRightOnMobile={true} // hide sidebar on xs
    />
  );
}
