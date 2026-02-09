
import LoginPage from "./RegisterORLogin/LoginPage.jsx";
import RegisterCustomer from "./RegisterORLogin/RegisterPage.jsx";
import { Route, Routes } from "react-router-dom";
import VisitUganda from "./pages/FirstPage.jsx";
import Dashboard from "./components/Dashboard1.jsx";

import SigningAgent from "./AboutClient/SigningAgent.jsx";
import SigningTPartner from "./AboutClient/SigningPartner.jsx";
import PostingAgentPage from "./AboutClient/BusinessPost.jsx";
import DisplayOptions from "./AboutClient/Displays/ChooseCategory.jsx";
import DisplayCompany from "./AboutClient/Displays/DisplayCompany.jsx"; 

import CarRental from "./components/CarRental.jsx"; //routing problem

function App() {
  return (
    <div>
    
      <Routes>

        <Route path="/" element={<VisitUganda />} />
        <Route path="/firstpage" element={<VisitUganda />} />
        <Route path="/RegisterCustomer" element={<RegisterCustomer />} />
        <Route path="/LoginPage" element={<LoginPage />} />

        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/signingAgent" element={<SigningAgent />} />
        <Route path="/signingTPartner" element={<SigningTPartner />} />
        <Route path="/postingAgent" element={<PostingAgentPage />} />
        <Route path="/AboutClient/Displays/DisplayOptions" element={<DisplayOptions />} /> 

        {/* UPDATED ROUTE */}
        <Route path="/company/:companyName" element={<DisplayCompany />} />

        <Route path="/carRentals" element={<CarRental />} />

      </Routes>
  
    </div>
  );
}

export default App;




// import LoginPage from "./RegisterORLogin/LoginPage.jsx";
// import RegisterCustomer from "./RegisterORLogin/RegisterPage.jsx";
// import Login from "./RegisterORLogin/RegisterPage.jsx";
// import { Route, Routes } from "react-router-dom";
// import VisitUganda from "./pages/FirstPage.jsx";
// import Dashboard from "./components/Dashboard1.jsx";

// import SigningAgent from "./AboutClient/SigningAgent.jsx";
// import SigningTPartner from "./AboutClient/SigningPartner.jsx";
// import PostingAgentPage from "./AboutClient/BusinessPost.jsx";
// import DisplayOptions from "./AboutClient/Displays/ChooseCategory.jsx";
// import DisplayCompany from "../src/AboutClient/Displays/DisplayCompany.jsx";
// // DisplayCompany import has been completely removed
// // import './assets/styles/global.css';  (uncomment when needed)

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<VisitUganda />} />
//         <Route path="/firstpage" element={<VisitUganda />} /> 
//         <Route path="/RegisterCustomer" element={<RegisterCustomer />} />
//         <Route path="/LoginPage" element={<LoginPage />} />
        
//           {/* <Route path="/login" element={<Login />} /> */}
//    {/*  path="/" element={<SignUp />} /> ----original*/}
      
//         <Route path="/customer/dashboard" element={<Dashboard />} />
//         <Route path="/signingAgent" element={<SigningAgent />} />
//         <Route path="/signingTPartner" element={<SigningTPartner />} />
//         <Route path="/postingAgent" element={<PostingAgentPage />} />
//         <Route path="/AboutClient/Displays/DisplayOptions" element={<DisplayOptions />} />
//         {/* Uncomment when you're ready to add this page back */}
//           <Route path="/AboutClient/Displays/DisplayCompany" element={<DisplayCompany />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;






















