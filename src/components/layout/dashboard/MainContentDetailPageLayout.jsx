import React, { useState } from "react";
import { Box, Drawer, Fab } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MainContentDetailPageLayout({ leftContent, rightContent, hideRightOnMobile = true, appBarHeight = 80 }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1280px",        // ✅ cap max width on large screens
        mx: "auto",                // ✅ center the whole page
        px: { xs: 2, sm: 3, md: 4 }, // ✅ professional edge spacing: 16px phone, 24px tablet, 32px desktop
        pb: 4,
      }}
    >
      {/* Floating toggle button for mobile */}
      {hideRightOnMobile && (
        <Fab
          color="success"
          size="small"
          onClick={toggleDrawer}
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            top: appBarHeight + 16,
            right: 16,
            zIndex: 1300,
          }}
        >
          <ArrowForwardIosIcon />
        </Fab>
      )}

      {/* Main layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // ✅ column on both phone AND tablet, row only on desktop
          gap: { xs: 2, sm: 3 },
          mt: 2,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: main content */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: 3 },
            width: "100%",             // ✅ always full width in column mode
            minWidth: 0,               // ✅ prevents flex children from overflowing
            overflowY: { xs: "visible", md: "auto" },
            maxHeight: { xs: "none", md: `calc(100vh - ${appBarHeight + 40}px)` }, // ✅ no height cap on mobile/tablet
            pr: { xs: 0, md: 1 },
          }}
        >
          {leftContent}
        </Box>

        {/* RIGHT: sidebar — hidden on mobile/tablet, shown on desktop */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: 1 },
            width: "100%",
            minWidth: 0,
            position: { xs: "relative", md: "sticky" },
            top: { xs: "auto", md: appBarHeight },
            alignSelf: "flex-start",
            display: hideRightOnMobile ? { xs: "none", md: "block" } : "block", // ✅ hide on phone AND tablet
          }}
        >
          {rightContent}
        </Box>
      </Box>

      {/* Drawer for small screens and tablets */}
      {hideRightOnMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", md: "none" }, // ✅ available on phone AND tablet
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: "400px" }, // ✅ full width on phone, 400px panel on tablet
              mt: `${appBarHeight}px`,
              height: `calc(100% - ${appBarHeight}px)`,
            },
          }}
        >
          <Box sx={{ p: 2 }}>{rightContent}</Box>
        </Drawer>
      )}
    </Box>
  );
}

export default MainContentDetailPageLayout;