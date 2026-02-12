// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import BreadcrumbsNav from "../common/BreadcrumbsNav";

// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Tooltip,
//   Divider,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import HotelIcon from "@mui/icons-material/Hotel";
// import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
// import AttractionsIcon from "@mui/icons-material/Attractions";
// import GroupIcon from "@mui/icons-material/Group";
// import LogoutIcon from "@mui/icons-material/Logout";

// const drawerWidth = 260;

// function AppLayout() {
//   const [activePage, setActivePage] = useState("Dashboard");
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) setUsername(storedUsername);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("username");
//     window.location.href = "/LoginPage";
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Top AppBar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: 1201,
//           backgroundColor: "#4caf50",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <img
//               src="../imagesFolderO/ugMap.png"
//               alt="Visit Uganda Logo"
//               style={{
//                 width: "clamp(40px, 8vw, 90px)",
//                 height: "auto",
//                 flexShrink: 0,
//               }}
//             />
//             <Typography
//               variant="h4"
//               sx={{
//                 fontFamily: "'Montserrat', sans-serif",
//                 fontWeight: 500,
//                 color: "white",
//                 fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Visit the Pearl
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography>Hi, {username || "User"}</Typography>
//             <Tooltip title="Account">
//               <Avatar />
//             </Tooltip>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             top: 64, // pushes drawer below AppBar
//             height: "calc(100% - 64px)",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//           <SidebarItem
//             icon={<DashboardIcon />}
//             text="Dashboard"
//             active={activePage === "Dashboard"}
//             onClick={() => setActivePage("Dashboard")}
//           />

//           <Divider sx={{ my: 1 }} />

//           <SidebarItem
//             icon={<DirectionsCarIcon />}
//             text="Car Rental"
//             active={activePage === "Car Rental"}
//             onClick={() => setActivePage("Car Rental")}
//           />

//           <SidebarItem
//             icon={<HotelIcon />}
//             text="Accommodation"
//             active={activePage === "Accommodation"}
//             onClick={() => setActivePage("Accommodation")}
//           />

//           <SidebarItem
//             icon={<LocalTaxiIcon />}
//             text="Airport Taxi"
//             active={activePage === "Airport Taxi"}
//             onClick={() => setActivePage("Airport Taxi")}
//           />

//           <Divider sx={{ my: 1 }} />

//           <SidebarItem
//             icon={<AttractionsIcon />}
//             text="Attractions"
//             active={activePage === "Attractions"}
//             onClick={() => setActivePage("Attractions")}
//           />

//           <SidebarItem
//             icon={<GroupIcon />}
//             text="Travel Partner"
//             active={activePage === "Travel Partner"}
//             onClick={() => setActivePage("Travel Partner")}
//           />

//           <Divider sx={{ my: 1 }} />

//           <SidebarItem icon={<LogoutIcon />} text="Logout" onClick={handleLogout} />
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: 8,
//           backgroundColor: "#f5f7fa",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Breadcrumbs */}
//         <BreadcrumbsNav />

//         {/* Render page content (UsecaseTemplate or Detail pages) */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

// /* ------------------ Reusable Components ------------------ */
// function SidebarItem({ icon, text, active, onClick }) {
//   return (
//     <ListItemButton
//       onClick={onClick}
//       sx={{
//         backgroundColor: active ? "rgba(76, 175, 80, 0.15)" : "transparent",
//         borderLeft: active ? "4px solid #4caf50" : "4px solid transparent",
//       }}
//     >
//       <ListItemIcon sx={{ color: "#4caf50" }}>{icon}</ListItemIcon>
//       <ListItemText primary={text} />
//     </ListItemButton>
//   );
// }

// export default AppLayout;
