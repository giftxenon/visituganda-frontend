// src/components/dashboard/DashboardHome.jsx

import { Box, Typography, TextField, InputAdornment, Fab, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DashboardHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Box>
      {/* Welcome + Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mt: 5,
          mb: 2,
          gap: 2,
        }}
      >
        {/* On small screens search bar appears above welcome text */}
        <TextField
          placeholder="Search services..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1b5e20" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            order: { xs: -1, md: 1 },
            width: { xs: "100%", md: 300 },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1b5e20",
              },
            },
          }}
        />

        <Typography variant="h4" fontWeight={600} sx={{ order: { xs: 1, md: -1 } }}>
          Welcome {username || "Guest"}! 👋
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight={300} color="text.secondary" mb={3}>
        What would you like to do today?
      </Typography>

      {/* Cards Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          flexWrap: "wrap",
          alignItems: { xs: "stretch", sm: "flex-start" },
        }}
      >
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

      {/* Contact Support - fixed on desktop, inline vertical on mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          mt: 3,
        }}
      >
        <TextField
  placeholder="Search services..."
  size="small"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: "#1b5e20" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    display: { xs: "none", md: "flex" },
    width: { xs: "100%", md: 300 },
    ml: { md: "60%", lg: "90%", xl: "75%" },
  }}
/>
        <Tooltip title="Contact Support Team" placement="right">
          <Fab
            size="medium"
            sx={{
              backgroundColor: "#1b5e20",
              color: "white",
              "&:hover": {
                backgroundColor: "#145a18",
              },
            }}
          >
            <ChatIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Fixed floating button on desktop */}
      <Tooltip title="Contact Support Team" placement="left">
        <Fab
          sx={{
            display: { xs: "none", md: "flex" },
            position: "fixed",
                bottom: 32,   // distance from the BOTTOM of the screen (increase = moves up)
                right: 295.5,    // distance from the RIGHT of the screen (increase = moves left)
                                     // other options you can swap in:
               //top: 5,      // distance from the TOP of the screen
           //    left: 3,     // distance from the LEFT of the screen
 
            backgroundColor: "#1b5e20",
            color: "white",
            "&:hover": {
              backgroundColor: "#145a18",
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

/* Card component */
function DashboardCard({ title, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: { xs: "100%", sm: 180, md: 240 },
        height: { xs: 80, sm: 100, md: 120 },
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: { xs: 14, sm: 15, md: 16 },
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