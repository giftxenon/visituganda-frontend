import React from "react";
import { Stack, Avatar, Typography, Divider, TextField, Button } from "@mui/material";

export default function CompanySidebar({ company }) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", pt: { xs: 0, sm: 2 }, display: "flex" }}
    >
      {/* Company info */}
      <Avatar src={company?.image || "/imagesFolderO/backRover.jpg"} sx={{ width: 110, height: 110 }} />
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        {company?.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {company?.location}
      </Typography>
      <Typography variant="body2" fontStyle="italic" textAlign="center" color="text.secondary">
        "{company?.motto || "Your journey, our drive!"}"
      </Typography>

      <Divider sx={{ width: "100%" }} />

      {/* Chat Section */}
      <Typography variant="subtitle1" fontWeight={600}>
        Chat about this car
      </Typography>
      <TextField label="Write your inquiry..." multiline rows={4} fullWidth />
      <Button variant="contained" color="success" fullWidth>
        Send Message
      </Button>
    </Stack>
  );
}
