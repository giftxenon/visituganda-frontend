import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  CardMedia,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Divider,
  Modal,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import MainContentDetailPageLayout from "../../components/layout/dashboard/MainContentDetailPageLayout";
import PaymentModal from "../../components/payments/PaymentModal";
import CompanySidebar from "../../components/layout/dashboard/CompanySidebar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const currencyFlagMap = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  UGX: "🇺🇬",
  KES: "🇰🇪",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
};

export default function SingleCarDetail() {
  const { carId } = useParams();
  const location = useLocation();

  const [car, setCar] = useState(location.state?.car || null);
  const company = location.state?.company || null;

  useEffect(() => {
    if (car) return;
    const fetchCar = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/cars/${carId}`);
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
    if (carId) fetchCar();
  }, [carId, car]);

  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const id = carId || car?.id;
      if (!id) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/cars/${id}/images`);
        const imageIds = await res.json();

        if (imageIds && imageIds.length > 0) {
          setCarImages(imageIds.map((imgId) => `${API_BASE_URL}/api/v1/cars/images/${imgId}`));
        } else {
          setCarImages([
            "/imagesFolderO/SingelCarPics/SingleCruiserBack.jpeg",
            "/imagesFolderO/SingelCarPics/SingleCruiserSteering.jpeg",
            "/imagesFolderO/SingelCarPics/SingleCruiserInside.jpeg",
            "/imagesFolderO/SingelCarPics/SingleCrusierFront.jpeg",
          ]);
        }
      } catch (error) {
        console.error("Error fetching car images:", error);
        setCarImages([
          "/imagesFolderO/SingelCarPics/SingleCruiserBack.jpeg",
          "/imagesFolderO/SingelCarPics/SingleCruiserSteering.jpeg",
          "/imagesFolderO/SingelCarPics/SingleCruiserInside.jpeg",
          "/imagesFolderO/SingelCarPics/SingleCrusierFront.jpeg",
        ]);
      }
    };

    fetchImages();
  }, [carId, car]);

  const [currentImage, setCurrentImage] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);

  // ✅ NEW: lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxNext = () => setLightboxIndex((prev) => (prev + 1) % carImages.length);
  const lightboxPrev = () => setLightboxIndex((prev) => (prev - 1 + carImages.length) % carImages.length);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % carImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + carImages.length) % carImages.length);

  if (!car) return <Typography sx={{ p: 3 }}>Loading car details...</Typography>;

  const rightContent = <CompanySidebar company={company} />;

  return (
    <MainContentDetailPageLayout
      leftContent={
        <Stack spacing={3} sx={{ width: "100%" }}>

          {/* Hero Carousel */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 250, sm: 500 },
              overflow: "hidden",
              borderRadius: 2,
              "&:hover img": { transform: "scale(1.05)", transition: "transform 0.5s ease" },
            }}
          >
            {/* ✅ clicking main image opens lightbox */}
            <CardMedia
              component="img"
              src={carImages[currentImage]}
              alt={car.title}
              onClick={() => openLightbox(currentImage)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                cursor: "zoom-in",
              }}
            />

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                pointerEvents: "none",
              }}
            />

            {/* Car Title */}
            <Stack
              sx={{
                position: "absolute",
                bottom: { xs: 60, sm: 48 },
                left: 24,
                color: "#fff",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {car.title}
              </Typography>
            </Stack>

            {/* Arrows */}
            {carImages.length > 1 && (
              <>
                <IconButton
                  onClick={prevImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 16,
                    transform: "translateY(-50%)",
                    color: "#fff",
                    bgcolor: "rgba(0,0,0,0.3)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={nextImage}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 16,
                    transform: "translateY(-50%)",
                    color: "#fff",
                    bgcolor: "rgba(0,0,0,0.3)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}

            {/* Thumbnails — ✅ clicking thumbnail opens lightbox for that image */}
            {carImages.length > 1 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  overflowX: "auto",
                  px: 1,
                }}
              >
                {carImages.map((img, i) => (
                  <Box
                    key={i}
                    onClick={() => {
                      setCurrentImage(i);
                      openLightbox(i);
                    }}
                    sx={{
                      width: 60,
                      height: 40,
                      minWidth: 60,
                      borderRadius: 1,
                      border: i === currentImage ? "2px solid #4caf50" : "1px solid #fff",
                      cursor: "pointer",
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* ✅ LIGHTBOX MODAL */}
          <Modal open={lightboxOpen} onClose={closeLightbox}>
            <Box
              sx={{
                position: "fixed",
                top: 0, left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0,0,0,0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1300,
              }}
              onClick={closeLightbox}
            >
              {/* Close button */}
              <IconButton
                onClick={closeLightbox}
                sx={{
                  position: "absolute",
                  top: 16, right: 16,
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Prev arrow */}
              {carImages.length > 1 && (
                <IconButton
                  onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                  sx={{
                    position: "absolute",
                    left: 16,
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}

              {/* Full image — stopPropagation prevents closing when clicking image */}
              <Box
                component="img"
                src={carImages[lightboxIndex]}
                alt={`car-full-${lightboxIndex}`}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                }}
              />

              {/* Next arrow */}
              {carImages.length > 1 && (
                <IconButton
                  onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                  sx={{
                    position: "absolute",
                    right: 16,
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}

              {/* Image counter */}
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 16,
                  color: "#fff",
                  fontSize: 14,
                  opacity: 0.7,
                }}
              >
                {lightboxIndex + 1} / {carImages.length}
              </Typography>
            </Box>
          </Modal>

          {/* Cost */}
          <Typography variant="h6" fontWeight="bold">
            Cost per day: ${car.costPerDay}
          </Typography>

          <Divider />

          {/* Specs and About */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ width: "100%" }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Specifications
              </Typography>
              <Stack spacing={1}>
                <Typography><strong>Manufacturer:</strong> {car.manufacturer || "N/A"}</Typography>
                <Typography><strong>Year:</strong> {car.year || "N/A"}</Typography>
                <Typography><strong>Transmission:</strong> {car.transmission || "N/A"}</Typography>
                <Typography><strong>Drivetrain:</strong> {car.drivetrain || "N/A"}</Typography>
                <Typography><strong>Seating Capacity:</strong> {car.seating || "N/A"}</Typography>
                <Typography><strong>Fuel Consumption:</strong> {car.fuelConsumption || "N/A"}</Typography>
                <Typography><strong>Vehicle Number:</strong> {car.vechicleNumber || "N/A"}</Typography>
              </Stack>
            </Box>

            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                About this Car
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 16, color: "text.secondary" }}>
                {car.about || car.description || "No description available."}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          <RentalCalculator dailyCost={car.costPerDay} />

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => setOpenPayment(true)}
          >
            Book this Car
          </Button>

          <PaymentModal open={openPayment} onClose={() => setOpenPayment(false)} />

        </Stack>
      }
      rightContent={rightContent}
    />
  );
}

/* ----------------- Rental Calculator Component ----------------- */
function RentalCalculator({ dailyCost }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [days, setDays] = useState(1);
  const [totalCost, setTotalCost] = useState(dailyCost);
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState({ USD: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://cdn.moneyconvert.net/api/latest.json");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Error fetching currency rates:", err);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const diffDays = Math.max(endDate.diff(startDate, "day"), 1);
    setDays(diffDays);
    setTotalCost(diffDays * dailyCost);
  }, [startDate, endDate, dailyCost]);

  const convertedTotal = (totalCost * (rates[currency] || 1)).toFixed(2);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Rental Calculator
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newVal) => setStartDate(newVal || dayjs())}
          sx={{ flex: 1 }}
        />
        <DatePicker
          label="Return Date"
          value={endDate}
          onChange={(newVal) => setEndDate(newVal || dayjs().add(1, "day"))}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Days"
          value={days}
          InputProps={{ readOnly: true }}
          sx={{ flex: 0.5 }}
        />
        <TextField
          label="Currency"
          select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ flex: 0.5 }}
        >
          {Object.keys(rates).map((cur) => (
            <MenuItem key={cur} value={cur}>
              {currencyFlagMap[cur] || "🏳️"} {cur}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Total Cost"
          value={`${convertedTotal} ${currency}`}
          InputProps={{ readOnly: true }}
          sx={{ flex: 1 }}
        />
      </Stack>
    </LocalizationProvider>
  );
}