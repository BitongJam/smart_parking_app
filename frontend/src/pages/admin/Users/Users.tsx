import React from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import SideNavbar from "../../../components/SideNavbar/SideNavbar";
import NavItem from "../../../components/NavItem/NavItem";
import { useNavigate } from "react-router-dom";
import type { TableColumn } from "../../../components/Table/Table";
import Table from "../../../components/Table/Table";
import UsersList from "./UsersList";


const Users = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-2xl mb-6">Users</h1>
      <button className="bg-primary text-white text-lg font-bold px-5 py-1 rounded-lg my-4">Create Users</button>
      <UsersList/>
    </>
  );
};

export default Users;
