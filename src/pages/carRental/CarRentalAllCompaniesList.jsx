import { useNavigate } from "react-router-dom";
import UsecaseTemplate from "../../components/common/UsecaseTemplate";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hardcoded car rental companies (fallback / initial display)
const carRentalCompanies = [
  {
    id: null, // no ID for hardcoded fallback
    name: "Roadtrip Africa",
    rating: 4.5,
    image: "/imagesFolderO/backRover.jpg",
    location: "Kampala, Uganda",
  },
  {
    id: null,
    name: "4X4 Car Hire Kampala",
    rating: 3.2,
    image: "/imagesFolderO/twoLRback.jpg",
    location: "Kampala, Uganda",
  },
  {
    id: null,
    name: "Self Drive Uganda",
    rating: 4.8,
    image: "/imagesFolderO/twolandFront.jpg",
    location: "Entebbe, Uganda",
  },
  {
    id: null,
    name: "Jungle Uganda Car Rental",
    rating: 4.3,
    image: "/imagesFolderO/landrover1.jpg",
    location: "Jinja, Uganda",
  },
  {
    id: null,
    name: "Your Drive Uganda",
    rating: 3.5,
    image: "/imagesFolderO/landRover2.jpg",
    location: "Mbarara, Uganda",
  },
];

function CarRental() {
  const navigate = useNavigate();
  const [newBusinesses, setNewBusinesses] = useState([]);

  useEffect(() => {
    async function fetchNewBusinesses() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/businesses/all`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // ✅ FILTER BY BACKEND ENUM: CAR_RENTAL
        const formatted = data
          .filter((b) => b.category === "CAR_RENTAL")
          .map((b) => ({
            id: b.id, // important: include company ID
            name: b.companyName,
            rating: b.rating ?? 4.5,
            image: b.id
              ? `${API_BASE_URL}/api/v1/businesses/logo/${b.id}`
              : "/imagesFolderO/defaultCar.jpg",
            location: b.location || "Uganda",
          }));

        setNewBusinesses(formatted);
      } catch (err) {
        console.error("Failed to fetch car rental businesses:", err);
        setNewBusinesses([]); // fail safely
      }
    }

    fetchNewBusinesses();
  }, []);

  const handleCompanyClick = (company) => {
    if (!company.id) {
      console.warn(
        `Company "${company.name}" has no ID, fallback data cannot fetch cars.`
      );
      return;
    }

    // Navigate using company ID, so backend API works
    navigate(`/customer/dashboard/services/car-rentals/${company.id}`, {
      state: { company },
    });
  };

  // ✅ Combine backend data first, fallback only if empty
  const allCompanies =
    newBusinesses.length > 0 ? newBusinesses : carRentalCompanies;

  return (
    <UsecaseTemplate
      title="Car Rentals"
      items={allCompanies}
      onItemClick={handleCompanyClick}
    />
  );
}

export default CarRental;