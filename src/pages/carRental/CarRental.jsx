import { useNavigate } from "react-router-dom";
import UsecaseTemplate from "../../components/common/UsecaseTemplate";

const carRentalCompanies = [
  {
    name: "Roadtrip Africa",
    rating: 4.5,
    image: "/imagesFolderO/backRover.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "4X4 Car Hire Kampala",
    rating: 3.2,
    image: "/imagesFolderO/twoLRback.jpg",
    location: "Kampala, Uganda",
  },
  {
    name: "Self Drive Uganda",
    rating: 4.8,
    image: "/imagesFolderO/twolandFront.jpg",
    location: "Entebbe, Uganda",
  },
  {
    name: "Jungle Uganda Car Rental",
    rating: 4.3,
    image: "/imagesFolderO/landrover1.jpg",
    location: "Jinja, Uganda",
  },
  {
    name: "Your Drive Uganda",
    rating: 3.5,
    image: "/imagesFolderO/landRover2.jpg",
    location: "Mbarara, Uganda",
  },
];

function CarRental() {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    const slug = company.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    navigate(
      `/customer/dashboard/services/car-rentals/${slug}`,
      {
        state: { company },
      }
    );
  };

  return (
    <UsecaseTemplate
      title="Car Rentals"
      items={carRentalCompanies}
      onItemClick={handleCompanyClick}
    />
  );
}

export default CarRental;
