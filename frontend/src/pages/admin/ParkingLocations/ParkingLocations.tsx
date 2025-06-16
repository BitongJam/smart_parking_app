import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavItem from "../../../components/NavItem/NavItem";
import AppLayout from "../../../components/AppLayout/AppLayout";
import SideNavbar from "../../../components/SideNavbar/SideNavbar";



const ParkingLocations = () => {
  const navigate = useNavigate();
  return (

      <div className="w-full">
        <div>Parking Location</div>
      </div>
  );
};

export default ParkingLocations;
