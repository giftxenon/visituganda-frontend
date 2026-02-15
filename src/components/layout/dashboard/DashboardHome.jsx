// src/components/dashboard/DashboardHome.jsx

import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DashboardHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username saved after login
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mt={5} mb={2} gutterBottom>
        Welcome {username || "Guest"}! 👋
      </Typography>

      <Typography variant="h6" fontWeight={300} color="text.secondary" mb={5}>
        What would you like to do today?
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <DashboardCard
          title="Car Rental"
          onClick={() => navigate("/customer/dashboard/services/car-rentals")}
        />

        <DashboardCard
          title="Accommodation"
          onClick={() => navigate("/customer/dashboard/services/accommodation")}
        />

        <DashboardCard
          title="Airport Taxi"
          onClick={() => navigate("/customer/dashboard/services/airport-taxi")}
        />

        <DashboardCard
          title="Attractions"
          onClick={() => navigate("/customer/dashboard/services/attractions")}
        />

        <DashboardCard
          title="Travel Partner"
          onClick={() => navigate("/customer/dashboard/services/travel-partner")}
        />
      </Box>
    </Box>
  );
}

/* Card component */
function DashboardCard({ title, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 240,
        height: 120,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      {title}
    </Box>
  );
}

export default DashboardHome;
