import React from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import SideNavbar from "../../../components/SideNavbar/SideNavbar";
import NavItem from "../../../components/NavItem/NavItem";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
  return (
    <>     
        <strong>Home</strong>
    </>
  );
};

export default Home;
