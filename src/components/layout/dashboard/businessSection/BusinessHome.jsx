// src/pages/business/BusinessHome.jsx

import { Box, Typography, TextField, InputAdornment, Fab, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BusinessHome() {
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
        <TextField
          placeholder="Search your company posts or services..."
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
              "&.Mui-focused fieldset": { borderColor: "#1b5e20" },
            },
          }}
        />

        <Typography variant="h4" fontWeight={600} sx={{ order: { xs: 1, md: -1 } }}>
          Welcome {username || "Business Owner"}! 👋
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight={300} color="text.secondary" mb={3}>
        What category of company would you like to register?
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
        <BusinessCard
          title="Car rental"
          onClick={() => navigate("/business/dashboard/createbusiness")}
        />
        <BusinessCard
          title="Airport Taxi"
          onClick={() => navigate("/business/dashboard/createbusiness")}
        />
        <BusinessCard
          title="Accommodation"
          onClick={() => navigate("/business/dashboard/createbusiness")}
        />
        <BusinessCard
          title="Tourist Attraction"
          onClick={() => navigate("/business/dashboard/createbusiness")}
        />
       <BusinessCard
          title="Travel Partner"
          onClick={() => navigate("/business/dashboard/createbusiness")}
        />
      
      </Box>

      {/* Mobile Contact Support */}
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
          placeholder="Search your company posts or services..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1b5e20" }} />
              </InputAdornment>
            ),
          }}
          sx={{ display: { xs: "none", md: "flex" }, width: { xs: "100%", md: 300 } }}
        />

        <Tooltip title="Contact Support Team" placement="right">
          <Fab
            size="medium"
            sx={{
              backgroundColor: "#1b5e20",
              color: "white",
              "&:hover": { backgroundColor: "#145a18" },
            }}
          >
            <ChatIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Fixed Support Button for Desktop */}
      <Tooltip title="Contact Support Team" placement="left">
        <Fab
          sx={{
            display: { xs: "none", md: "flex" },
            position: "fixed",
            bottom: 32,
            right: 295.5,
            backgroundColor: "#1b5e20",
            color: "white",
            "&:hover": { backgroundColor: "#145a18" },
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

/* ===================== Card Component ===================== */
function BusinessCard({ title, onClick }) {
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
        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
      }}
    >
      {title}
    </Box>
  );
}

export default BusinessHome;