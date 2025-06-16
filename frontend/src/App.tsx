import React from "react";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import Home from "./pages/admin/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from "./pages/admin/Reservations/Reservations";
import ParkingLocations from "./pages/admin/ParkingLocations/ParkingLocations";
import Users from "./pages/admin/Users/Users";
import AdminLayout from "./pages/admin/AdminLayout";
import RegistrationForm from "./pages/RegistrationForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="parking-location" element={<ParkingLocations />} />
            <Route path="users" element={<Users />} />
          </Route>


          <Route path="/registration-form" element={<RegistrationForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
