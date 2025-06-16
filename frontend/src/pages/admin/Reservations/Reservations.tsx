import React from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import SideNavbar from "../../../components/SideNavbar/SideNavbar";
import NavItem from "../../../components/NavItem/NavItem";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import type { TableColumn } from "../../../components/Table/Table";

interface Product {
  name: string;
  color: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { name: "MacBook", color: "Silver", category: "Laptop", price: 2000 },
  { name: "iPhone", color: "Black", category: "Phone", price: 1200 },
];

const columns: TableColumn<Product>[] = [
  { header: "Product Name", accessor: "name" },
  { header: "Color", accessor: "color" },
  { header: "Category", accessor: "category" },
  {
    header: "Price",
    accessor: "price",
    render: (item) => <span className="text-green-600">${item.price}</span>,
  },
];

const Reservations = () => {
  const navigate = useNavigate();
  return (
    <>
      <strong>Reservations</strong>
      <div>
      </div>
    </>
  );
};

export default Reservations;
