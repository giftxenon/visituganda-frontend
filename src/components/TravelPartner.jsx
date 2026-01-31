import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import MUI location icon
import './CarRental.css'; // Import a CSS file for styling

// Sample data for travel partners with placeholder URLs and locations
const carRentalCompanies = [
  {
    name: 'Joan Lisa',
    rating: 2.2,
    image: '../imagesFolderO/girl7.jpg',
    location: 'Kampala', // Added location
  },
  {
    name: 'Jimmy Joe',
    rating: 4.2,
    image: '../imagesFolderO/bossman3.jpg',
    location: 'Entebbe', // Added location
  },
  {
    name: 'Mutesi Zoe',
    rating: 3.2,
    image: '../imagesFolderO/girl1.jpg',
    location: 'Jinja', // Added location
  },
  {
    name: 'Stuart Ntumwa',
    rating: 4.5,
    image: '../imagesFolderO/bossman1.jpg',
    location: 'Mbarara', // Added location
  },
  {
    name: 'Asaba Spenah',
    rating: 3.5,
    image: '../imagesFolderO/girl4.jpg',
    location: 'Gulu', // Added location
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

function TravelPartner() {
  const [showCompanies, setShowCompanies] = useState(false);

  const handleCarRentalClick = () => {
    setShowCompanies((prev) => !prev);
  };

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        <h1>Travel Partners</h1>
        <button onClick={handleCarRentalClick}>
          {showCompanies ? 'Hide' : 'Show'} Travel Partners
        </button>
      </div>

      {/* Travel Partners */}
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

export default TravelPartner;
