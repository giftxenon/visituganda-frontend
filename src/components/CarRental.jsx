import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./CarRental.css";

// import Self Drive Uganda modal
import SelfDriveUganda from "../AboutClient/Modals/SelfDriveUgandaModel";

// All companies (Self Drive Uganda clickable, others not clickable)
const carRentalCompanies = [
  {
    name: "Roadtrip Africa",
    rating: 4.5,
    image: "../imagesFolderO/backRover.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "4X4 Car Hire Kampala",
    rating: 3.2,
    image: "../imagesFolderO/twoLRback.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "Self Drive Uganda",
    rating: 4.8,
    image: "../imagesFolderO/twolandFront.jpg",
    location: "Entebbe, Uganda",
  },
  {
    name: "Jungle Uganda Car Rental",
    rating: 4.3,
    image: "../imagesFolderO/landrover1.jpg",
    location: "Jinja, Uganda",
  },
  {
    name: "Your Drive Uganda",
    rating: 3.5,
    image: "../imagesFolderO/landRover2.jpg",
    location: "Mbarara, Uganda",
  },
];

// Render stars
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      {halfStar && <span className="star">★</span>}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={i + fullStars} className="star empty">★</span>
        ))}
    </>
  );
};

function CarRental() {

  const [showCompanies, setShowCompanies] = useState(false);

  // modal open/close state
  const [openSelfDrive, setOpenSelfDrive] = useState(false);

  // Click logic → only Self Drive Uganda triggers modal
  const handleCompanyClick = (companyName) => {
    if (companyName === "Self Drive Uganda") {
      setOpenSelfDrive(true);
    }
  };

  const handleCarRentalClick = () => {
    setShowCompanies((prev) => !prev);
  };

  return (
    <div>

      {/* AppBar */}
      <div className="app-bar">
        <h1>Car Rental Companies</h1>
        <button onClick={handleCarRentalClick}>
          {showCompanies ? "Hide" : "Show"} Car rentals
        </button>
      </div>

      {/* Company cards */}
      {showCompanies && (
        <div className="card-container">

          {carRentalCompanies.map((company, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCompanyClick(company.name)}
              style={{
                cursor: company.name === "Self Drive Uganda" ? "pointer" : "default",
              }}
            >
              <img
                className="card-image"
                src={company.image}
                alt={company.name}
              />

              <h2>{company.name}</h2>

              <p className="location">
                <LocationOnIcon
                  style={{
                    marginRight: "5px",
                    verticalAlign: "middle",
                    color: "grey",
                  }}
                />
                {company.location}
              </p>

              <div className="rating">{renderStars(company.rating)}</div>

            </div>
          ))}

        </div>
      )}

      {/* Modal for Self Drive Uganda posts */}
      <SelfDriveUganda
        open={openSelfDrive}
        handleClose={() => setOpenSelfDrive(false)}
      />

    </div>
  );
}

export default CarRental;
