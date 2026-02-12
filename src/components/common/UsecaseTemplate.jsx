import LocationOnIcon from "@mui/icons-material/LocationOn";
import BreadcrumbsNav from "../common/BreadcrumbsNav";
import "./UsecaseTemplate.css";

// ⭐ Rating stars helper
const renderStars = (rating = 0) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {Array(fullStars).fill().map((_, i) => (
        <span key={`full-${i}`} className="star">★</span>
      ))}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={`empty-${i}`} className="star empty">★</span>
      ))}
    </>
  );
};

function UsecaseTemplate({
  title,
  items = [],
  onItemClick,
  children,
}) {
  return (
    <div className="usecase-wrapper" style={{ padding: "20px" }}>
      {/* Section title */}
      <h1>{title}</h1>

      {/* Breadcrumbs */}
      <BreadcrumbsNav />

      {/* Cards */}
      <div className="card-container">
        {items.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => onItemClick?.(item)}
            style={{ cursor: onItemClick ? "pointer" : "default" }}
          >
            {item.image && <img src={item.image} alt={item.name} className="card-image" />}
            <h2>{item.name}</h2>

            {item.location && (
              <p className="location">
                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                {item.location}
              </p>
            )}

            {item.rating && (
              <div className="rating">
                {renderStars(item.rating)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals / extra UI */}
      {children}
    </div>
  );
}

export default UsecaseTemplate;
