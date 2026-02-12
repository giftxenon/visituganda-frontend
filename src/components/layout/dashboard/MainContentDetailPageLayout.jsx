import React, { useState } from "react";
import { Box, Drawer, Fab } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 * Responsive 2-column detail page layout
 *
 * leftContent  → main scrollable content (~75%)
 * rightContent → sticky sidebar (~25%) on sm+, hidden on xs
 */
function MainContentDetailPageLayout({ leftContent, rightContent, hideRightOnMobile = true, appBarHeight = 80 }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Floating toggle button for mobile */}
      {hideRightOnMobile && (
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
            mb: 2,
            px: 2,
          }}
        >
          <Fab
      color="success"  
            size="small"
            onClick={toggleDrawer}
            sx={{ position: "fixed", top: appBarHeight + 16, right: 16, zIndex: 1300 }} // make it fixed below appbar
          >
            <ArrowForwardIosIcon 
     
             />
          </Fab>
        </Box>
      )}

      {/* Main layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          mt: 2,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Scrollable main content */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", sm: 3 },
            maxHeight: { xs: "auto", sm: `calc(100vh - ${appBarHeight + 40}px)` }, // subtract appbar + margins
            overflowY: { xs: "visible", sm: "auto" },
            pr: 1,
          }}
        >
          {leftContent}
        </Box>

        {/* RIGHT: Sticky sidebar for sm+ */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", sm: 1 },
            position: { xs: "relative", sm: "sticky" },
            top: { xs: "auto", sm: appBarHeight },
            alignSelf: "flex-start",
            overflow: "visible",
            display: hideRightOnMobile ? { xs: "none", sm: "block" } : "block",
          }}
        >
          {rightContent}
        </Box>
      </Box>

      {/* Drawer for small screens */}
      {hideRightOnMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: "100%",
              mt: `${appBarHeight}px`, // start below appbar
              height: `calc(80% - ${appBarHeight}px)`,
            },
          }}
        >
          <Box sx={{ p: 1 }}>{rightContent}</Box>
        </Drawer>
      )}
    </>
  );
}

export default MainContentDetailPageLayout;
