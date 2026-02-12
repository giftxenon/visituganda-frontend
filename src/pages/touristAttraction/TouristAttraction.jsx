import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import MUI location icon
// import './CarRental.css'; // Import a CSS file for styling

import UsecaseTemplate from "../../components/common/UsecaseTemplate"
// Sample data for tourist attractions with placeholder URLs and locations
const attractionsCompanies = [
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

    const handleCompanyClick = (company) => {
    // Example: if a modal exists for a company
    // if (company.name === "Ngorongoro Lodge") setOpenCompany(company);
  };


  return (
      <>
         <UsecaseTemplate
           title="Tourist Attractions"
           items={attractionsCompanies}
           onItemClick={handleCompanyClick}
         />
   
         {/* Example modal could go here */}
         {/* <AccommodationModal open={!!openCompany} handleClose={() => setOpenCompany(null)} /> */}
       </>
  )
}

export default Attractions;
