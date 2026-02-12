
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";


function BreadcrumbsNav() {
  const location = useLocation();

  // Split path: /airport-taxi/book → ["airport-taxi", "book"]
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {/* Home */}
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to="/"
      >
        Home
      </Link>

      {/* Dynamic paths */}
      {pathnames.map((value, index) => {
        const to = ">" + pathnames.slice(0, index + 1).join(">");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography color="text.primary" key={to}>
            {value.replace("-", " ").toUpperCase()}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {value.replace("-", " ").toUpperCase()}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
