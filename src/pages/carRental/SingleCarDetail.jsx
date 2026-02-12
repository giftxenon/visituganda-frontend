import React, { useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  CardMedia,
  Button,
  TextField,
  Avatar,
  IconButton,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import MainContentDetailPageLayout from "../../components/layout/dashboard/MainContentDetailPageLayout";
import PaymentModal from "../../components/payments/PaymentModal";
import CompanySidebar from "../../components/layout/dashboard/CompanySidebar";

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
  const location = useLocation();
  const { companyName, carTitle } = useParams();

  const stateCar = location.state?.car;
  const stateCompany = location.state?.company;

  const { car, company } = useMemo(() => {
    if (stateCar && stateCompany) return { car: stateCar, company: stateCompany };
    return { car: stateCar, company: stateCompany }; // fallback
  }, [stateCar, stateCompany, companyName, carTitle]);

  if (!car)
    return <Typography sx={{ p: 3 }}>Loading car details...</Typography>;

  const carImages = [
    "/imagesFolderO/SingelCarPics/SingleCruiserBack.jpeg",
    "/imagesFolderO/SingelCarPics/SingleCruiserSteering.jpeg",
    "/imagesFolderO/SingelCarPics/SingleCruiserInside.jpeg",
    "/imagesFolderO/SingelCarPics/SingleCrusierFront.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % carImages.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + carImages.length) % carImages.length);

  const [openPayment, setOpenPayment] = useState(false);
  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);

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
            {/* Main Image */}
            <CardMedia
              component="img"
              src={carImages[currentImage]}
              alt={car.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
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
              }}
            />

            {/* Car Title & Info */}
            <Stack
              sx={{
                position: "absolute",
                bottom: { xs: 60, sm: 48 }, // push up on small screens to avoid thumbnails
                left: 24,
                color: "#fff",
              }}
            >
              <Typography variant={{ xs: "h6", sm: "h4" }} fontWeight={700}>
                {car.title}
              </Typography>
            </Stack>

            {/* Carousel Arrows */}
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

            {/* Thumbnail Images */}
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
                  onClick={() => setCurrentImage(i)}
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
          </Box>

          {/* Cost */}
          <Typography variant="h6" fontWeight="bold">
            Cost per day: ${car.costPerDay}
          </Typography>

          {/* Specifications and About this Car */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ width: "100%" }}
          >
            {/* Specifications */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Specifications
              </Typography>
              <Stack spacing={1}>
                <Typography>
                  <strong>Manufacturer:</strong> {car.manufacturer || "Toyota"}
                </Typography>
                <Typography>
                  <strong>Year:</strong> {car.year || "2023"}
                </Typography>
                <Typography>
                  <strong>Transmission:</strong> {car.transmission || "Manual"}
                </Typography>
                <Typography>
                  <strong>Drivetrain:</strong> {car.drivetrain || "4 Wheel Drive"}
                </Typography>
                <Typography>
                  <strong>Seating Capacity:</strong> {car.seating || "5"}
                </Typography>
                <Typography>
                  <strong>Fuel Consumption:</strong> {car.fuelConsumption || "12L/100km"}
                </Typography>
                <Typography>
                  <strong>Vehicle Number:</strong> {car.vechicleNumber || "UBE 836M"}
                </Typography>
              </Stack>
            </Box>

            {/* About this Car */}
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                About this Car
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: 16, color: "text.secondary" }}
              >
                {car.about ||
                  `Safe Drive Car Uganda hands you the keys to this legendary Land Cruiser—at a discount that feels like stealing.
Enjoy your trip with the confidence of steel, the soul of Africa, and savings you didn't see coming.
While others overpay for less, you cruise in comfort, power, and unbeatable reliability.
Don't just travel. Travel smart. Book with Safe Drive Car Uganda today and conquer more for less.
Your adventure awaits—without the premium price tag.`}
              </Typography>
            </Box>
          </Stack>

          {/* Rental Calculator */}
          <RentalCalculator dailyCost={car.costPerDay} />

          {/* Book Button */}
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleOpenPayment}
          >
            Book this Car
          </Button>

          <PaymentModal open={openPayment} onClose={handleClosePayment} />
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    const diffDays = Math.max(endDate.diff(startDate, "day"), 1);
    setDays(diffDays);
    setTotalCost(diffDays * dailyCost);
  }, [startDate, endDate, dailyCost]);

  const convertedTotal = (totalCost * (rates[currency] || 1)).toFixed(2);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={2}
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
