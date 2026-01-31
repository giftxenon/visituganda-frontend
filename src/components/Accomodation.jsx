import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import MUI location icon
import './CarRental.css'; // Import a CSS file for styling

// Sample data for accommodation with placeholder URLs and locations
const carRentalCompanies = [
  {
    name: 'Ngorongoro Lodge',
    rating: 4.3,
    image: '../imagesFolderO/NgorongoroLo.jpg',
    location: 'Ngorongoro Crater, Tanzania', // Added location
  },
  {
    name: 'Mestil Hotel Kampala',
    rating: 4.7,
    image: '../imagesFolderO/mestilHotel.jpg',
    location: 'Kampala, Uganda', // Added location
  },
  {
    name: 'Yellow Safari Lodge',
    rating: 3.7,
    image: '../imagesFolderO/yellowLodge.jpg', 
    location: 'Kampala, Uganda', // Added location
  },
  {
    name: 'Hotel Pearl of Africa',
    rating: 4.1,
    image: '../imagesFolderO/pearlAFRICA.jpg', 
    location: 'Kampala, Uganda', // Added location
  },
  {
    name: 'Best Safari Lodge',
    rating: 4.9,
    image: '../imagesFolderO/bestSafari.jpg', 
    location: 'Queen Elizabeth National Park, Uganda', // Added location
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Full star count
  const halfStar = rating % 1 >= 0.5;   // If rating has a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  return (
    <>
      {/* Render full stars */}
      {Array(fullStars).fill().map((_, i) => (
        <span key={i} className="star">&#9733;</span> // Filled star Unicode
      ))}
      {/* Render half star if applicable */}
      {halfStar && <span className="star">&#9733;</span>} 
      {/* Render empty stars */}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={i + fullStars} className="star empty">&#9733;</span> // Empty star Unicode
      ))}
    </>
  );
};

function Accomodation() {
  const [showCompanies, setShowCompanies] = useState(false);

  const handleCarRentalClick = () => {
    setShowCompanies((prev) => !prev);
  };

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        <h1>Accomodation</h1>
        <button onClick={handleCarRentalClick}>
          {showCompanies ? 'Hide' : 'Show'} Accomodation 
        </button>
      </div>

      {/* Accommodation Companies */}
      {showCompanies && (
        <div className="card-container">
          {carRentalCompanies.map((company, index) => (
            <div className="card" key={index}>
              <img
                className="card-image"
                src={company.image || 'https://via.placeholder.com/300x150'} // Default placeholder
                alt={company.name}
              />
              <h2>{company.name}</h2>
              <p className="location">
                <LocationOnIcon style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {/* MUI location icon */}
                {company.location}
              </p>
              <div className="rating">
                {renderStars(company.rating)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accomodation;
