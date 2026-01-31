import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import MUI location icon
import './CarRental.css'; // Import a CSS file for styling

// Sample data for tourist attractions with placeholder URLs and locations
const carRentalCompanies = [
  {
    name: 'Namugongo Shrine',
    rating: 3.5,
    image: '../imagesFolderO/Namugongo.jpg',
    location: 'Namugongo, Uganda', // Added location
  },
  {
    name: 'Mt. Rwenzori Peak',
    rating: 4.5,
    image: '../imagesFolderO/magherita.jpg',
    location: 'Rwenzori Mountains, Uganda', // Added location
  },
  {
    name: 'Queen Elizabeth Park',
    rating: 4.5,
    image: '../imagesFolderO/ElizabethPark.jpg',
    location: 'Queen Elizabeth National Park, Uganda', // Added location
  },
  {
    name: 'Sipi Falls ',
    rating: 2.5,
    image: '../imagesFolderO/sipiFalls.jpg',
    location: 'Sipi, Uganda', // Added location
  },
  {
    name: 'Source of the Nile',
    rating: 1.5,
    image: '../imagesFolderO/nileSOS.jpg',
    location: 'Jinja, Uganda', // Added location
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

function Attractions() {
  const [showCompanies, setShowCompanies] = useState(false);

  const handleCarRentalClick = () => {
    setShowCompanies((prev) => !prev);
  };

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        <h1>Tourist attractions</h1>
        <button onClick={handleCarRentalClick}>
          {showCompanies ? 'Hide' : 'Show'} Attractions
        </button>
      </div>

      {/* Tourist Attractions */}
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

export default Attractions;
