import { useState } from "react";
import CompanyCard from "../../AboutClient/Modals/CompanyCard"; // <-- IMPORT REUSABLE COMPONENT
// import UsecaseTemplate from "../../common/UsecaseTemplate";
import UsecaseTemplate from "../common/UsecaseTemplate";



// Sample data for taxi companies
const AirportTaxiCompanies = [
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
    <>
         <UsecaseTemplate
           title="Airport Taxis"
           items={AirportTaxiCompanies}
           onItemClick={handleCompanyClick}
         />
   
         {/* Example modal could go here */}
         {/* <AccommodationModal open={!!openCompany} handleClose={() => setOpenCompany(null)} /> */}
       </>
       )
}

export default AirportTaxi;
