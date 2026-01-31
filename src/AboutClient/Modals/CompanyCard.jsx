// CompanyCard.jsx
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CompanyCard({ company, onClick }) {
  return (
    <Card sx={{ width: 300, borderRadius: 3, boxShadow: 4, margin: 1 }}>
      <CardActionArea onClick={() => onClick(company)}>
        <CardMedia
          component="img"
          height="160"
          image={company.image}
          alt={company.name}
        />

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {company.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <LocationOnIcon sx={{ color: "grey", fontSize: 16 }} /> {company.location}
          </Typography>

          {/* Rating */}
          <Box sx={{ mt: 1 }}>
            {"★".repeat(Math.floor(company.rating))}
            {"☆".repeat(5 - Math.floor(company.rating))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
