import { Route, Routes } from "react-router-dom";

/* ---------------- Public Pages ---------------- */
import VisitUganda from "./pages/FirstPage.jsx";
import LoginPage from "./RegisterORLogin/LoginPage.jsx";
import RegisterCustomer from "./RegisterORLogin/RegisterPage.jsx";

/* ---------------- Client Pages ---------------- */
import SigningAgent from "./AboutClient/SigningAgent.jsx";
import SigningTPartner from "./AboutClient/SigningPartner.jsx";
import PostingAgentPage from "./AboutClient/BusinessPost.jsx";

/* ---------------- Display Pages ---------------- */
import DisplayOptions from "./AboutClient/Displays/ChooseCategory.jsx";
import DisplayCompany from "./AboutClient/Displays/DisplayCompany.jsx";

/* ---------------- Car Rentals ---------------- */
import CarRental from "./pages/carRental/CarRentalAllCompaniesList.jsx";
import CarRentalDetail from "./pages/carRental/CarRentalSingleCompanyCarsList.jsx";
import SingleCarDetail from "./pages/carRental/SingleCarDetail.jsx";

/* ---------------- Customer Dashboard ---------------- */
import Dashboard from "./components/layout/dashboard/DashboardLayout.jsx";
import DashboardHome from "./components/layout/dashboard/DashboardHome.jsx";

/* ---------------- Business Dashboard ---------------- */
import BusinessDashboard from "./components/layout/dashboard/businessSection/BusinessDashboard.jsx";
import BusinessHome from "./components/layout/dashboard/businessSection/BusinessHome.jsx";
 import BusinessDetails from "./components/layout/dashboard/businessSection/BusinessDetails.jsx";
//import BusinessCarManagement from "../../components/layout/dashboard/businessSection/BusinessCarSpecificlists.jsx";
import BusinessCarManagement from "./components/layout/dashboard/businessSection/BusinessCarSpecificlists.jsx";


function App() {
  return (
    <Routes>
      {/* ---------------- Public Routes ---------------- */}
      <Route path="/" element={<VisitUganda />} />
      <Route path="/firstpage" element={<VisitUganda />} />
      <Route path="/RegisterCustomer" element={<RegisterCustomer />} />
      <Route path="/LoginPage" element={<LoginPage />} />

      {/* ---------------- Customer Dashboard ---------------- */}
      <Route path="/customer/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />

        {/* Car Rentals */}
        <Route path="services/car-rentals" element={<CarRental />} />
        <Route path="services/car-rentals/:companyName" element={<CarRentalDetail />} />
        <Route path="services/car-rentals/:companyName/:carTitle" element={<SingleCarDetail />} />

        {/* Other Services */}
        <Route path="services/categories" element={<DisplayOptions />} />
        <Route path="services/company/:companyName" element={<DisplayCompany />} />
        <Route path="services/accommodation" element={<div>Accommodation Page</div>} />
        <Route path="services/airport-taxi" element={<div>Airport Taxi Page</div>} />
        <Route path="services/attractions" element={<div>Attractions Page</div>} />
        <Route path="services/travel-partner" element={<div>Travel Partner Page</div>} />
      </Route>

      {/* ---------------- Business Dashboard ---------------- */}
      <Route path="/business/dashboard" element={<BusinessDashboard />}>
         <Route index element={<BusinessHome />} />
        <Route path="createbusiness" element={<BusinessDetails />} /> 
        <Route path="viewprofile" element={<BusinessCarManagement />} /> 
        <Route path="moreprofile" element={<div>Your Profile Page</div>} />
        <Route path="wallet" element={<div>Wallet Page</div>} />
        <Route path="posts" element={<div>Your Posts Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="messages" element={<div>Messages Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} /> 
      </Route>

      {/* ---------------- Other Client Pages ---------------- */}
      <Route path="/signingAgent" element={<SigningAgent />} />
      <Route path="/signingTPartner" element={<SigningTPartner />} />
      <Route path="/postingAgent" element={<PostingAgentPage />} />

      {/* ---------------- Fallback Route ---------------- */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;