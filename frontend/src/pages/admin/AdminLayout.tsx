import React from "react";
import AppLayout from "../../components/AppLayout/AppLayout";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import NavItem from "../../components/NavItem/NavItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // this will be the base to check if the current path is the active one so it will set the NavItem is active or not
  const currentPath = location.pathname;
  return (
    <AppLayout
      navbar={
        <SideNavbar>
          <NavItem label="Home" onClick={() => navigate("/home")} active={ currentPath === '/home'}/>
          <NavItem
            label="Reservation"
            onClick={() => navigate("/reservations")}  active={ currentPath === '/reservations'}
          />
          <NavItem
            label="Parking Location"
            onClick={() => navigate("/parking-location")}  active={ currentPath === '/parking-location'}
          />
          <NavItem label="Users" onClick={() => navigate("/users")}  active={ currentPath === '/users'} />
          <NavItem label="Logout" />
        </SideNavbar>
      }
    >
      <Outlet />
    </AppLayout>
  );
};

export default AdminLayout;
