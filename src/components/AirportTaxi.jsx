import { useState } from "react";
import CompanyCard from "../AboutClient/Modals/CompanyCard"; // <-- IMPORT REUSABLE COMPONENT

// Sample data for taxi companies
const carRentalCompanies = [
  {
    id: 1,
    name: "Miles Transfer Uganda",
    rating: 2.5,
    image: "../imagesFolderO/airportCab.jpg",
    location: "Entebbe International Airport",
  },
  {
    id: 2,
    name: "Go Taxi Uganda",
    rating: 3.5,
    image: "../imagesFolderO/airportTax2.jpg",
    location: "Kampala",
  },
  {
    id: 3,
    name: "Spe Taxi Cab",
    rating: 4.7,
    image: "../imagesFolderO/AirportTaxUG.jpg",
    location: "Kampala",
  },
  {
    id: 4,
    name: "Uber Uganda",
    rating: 3.4,
    image: "../imagesFolderO/budapestAirport.jpg",
    location: "Kampala",
  },
  {
    id: 5,
    name: "Blu Cruise Ltd",
    rating: 5.0,
    image: "../imagesFolderO/carTax.jpg",
    location: "Kampala",
  },
];

function AirportTaxi() {
  const [showCompanies, setShowCompanies] = useState(false);

  const handleCarRentalClick = () => {
    setShowCompanies((prev) => !prev);
  };

  // When a company is clicked → will connect to backend later
  const handleCompanyClick = (company) => {
    console.log("Clicked company:", company);
    // Later:
    // fetch(`http://localhost:8080/api/company/${company.id}/posts`)
  };

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        <h1>Airport Taxi</h1>
        <button onClick={handleCarRentalClick}>
          {showCompanies ? "Hide" : "Show"} Airport Taxis
        </button>
      </div>

      {/* Taxi Companies */}
      {showCompanies && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {carRentalCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={handleCompanyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AirportTaxi;
