import { useState } from "react";
//import UsecaseTemplate from "./components/common/UsecaseTemplate";
import UsecaseTemplate from "../../components/common/UsecaseTemplate";
// Modal imports can go here if needed later

// Sample data for accommodation companies
const accommodationCompanies = [
  {
    name: "Ngorongoro Lodge",
    rating: 4.3,
    image: "../imagesFolderO/NgorongoroLo.jpg",
    location: "Ngorongoro Crater, Tanzania",
  },
  {
    name: "Mestil Hotel Kampala",
    rating: 4.7,
    image: "../imagesFolderO/mestilHotel.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "Yellow Safari Lodge",
    rating: 3.7,
    image: "../imagesFolderO/yellowLodge.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "Hotel Pearl of Africa",
    rating: 4.1,
    image: "../imagesFolderO/pearlAFRICA.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "Best Safari Lodge",
    rating: 4.9,
    image: "../imagesFolderO/bestSafari.jpg",
    location: "Queen Elizabeth National Park, Uganda",
  },
];

// Optional click handler (if some accommodation opens a modal)
function Accomodation() {
  const [openCompany, setOpenCompany] = useState(null);

  const handleCompanyClick = (company) => {
    // Example: if a modal exists for a company
    // if (company.name === "Ngorongoro Lodge") setOpenCompany(company);
  };

  return (
    <>
      <UsecaseTemplate
        title="Accommodation"
        items={accommodationCompanies}
        onItemClick={handleCompanyClick}
      />

      {/* Example modal could go here */}
      {/* <AccommodationModal open={!!openCompany} handleClose={() => setOpenCompany(null)} /> */}
    </>
  );
}

export default Accomodation;
