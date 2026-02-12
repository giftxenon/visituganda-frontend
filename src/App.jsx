import { Route, Routes } from "react-router-dom";

import VisitUganda from "./pages/FirstPage.jsx";
import LoginPage from "./RegisterORLogin/LoginPage.jsx";
import RegisterCustomer from "./RegisterORLogin/RegisterPage.jsx";

import SigningAgent from "./AboutClient/SigningAgent.jsx";
import SigningTPartner from "./AboutClient/SigningPartner.jsx";
import PostingAgentPage from "./AboutClient/BusinessPost.jsx";

import DisplayOptions from "./AboutClient/Displays/ChooseCategory.jsx";
import DisplayCompany from "./AboutClient/Displays/DisplayCompany.jsx";

import CarRental from "./pages/carRental/CarRental.jsx"; // list page
import CarRentalDetail from "./pages/carRental/CarRentalDetail.jsx"; // company detail page
import SingleCarDetail from "./pages/carRental/SingleCarDetail.jsx"; // single car detail page

import Dashboard from "./components/layout/dashboard/DashboardLayout.jsx"; // acts as layout
import DashboardHome from "./components/layout/dashboard/DashboardHome.jsx";

function App() {
  return (
    <Routes>
      {/* ---------------- Public Pages ---------------- */}
      <Route path="/" element={<VisitUganda />} />
      <Route path="/firstpage" element={<VisitUganda />} />
      <Route path="/RegisterCustomer" element={<RegisterCustomer />} />
      <Route path="/LoginPage" element={<LoginPage />} />

      {/* ---------------- Dashboard Layout ---------------- */}
      <Route path="/customer/dashboard" element={<Dashboard />}>
        {/* Default dashboard content */}
        <Route index element={<DashboardHome />} />

        {/* Car Rentals */}
        <Route path="services/car-rentals" element={<CarRental />} />
        <Route path="services/car-rentals/:companyName" element={<CarRentalDetail />} />
        <Route path="services/car-rentals/:companyName/:carTitle" element={<SingleCarDetail />} />

       {/** <Route path="services/car/:companyName/:carTitle" element={<SingleCarDetail />} /> */} 

        {/* Other Services */}
        <Route path="services/categories" element={<DisplayOptions />} />
        <Route path="services/company/:companyName" element={<DisplayCompany />} />
        <Route path="services/accommodation" element={<div>Accommodation</div>} />
        <Route path="services/airport-taxi" element={<div>Airport Taxi</div>} />
        <Route path="services/attractions" element={<div>Attractions</div>} />
        <Route path="services/travel-partner" element={<div>Travel Partner</div>} />
      </Route>

      {/* ---------------- Other Pages ---------------- */}
      <Route path="/signingAgent" element={<SigningAgent />} />
      <Route path="/signingTPartner" element={<SigningTPartner />} />
      <Route path="/postingAgent" element={<PostingAgentPage />} />
    </Routes>
  );
}

export default App;
