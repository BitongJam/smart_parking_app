import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

interface ParkingLocation {
  id: number;
  name: string;
  address: string;
  total_slots: string;
  available_slots: string;
  reserved_slots:number;
}

function ParkingLocationList() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<ParkingLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //   Request the list of parking-location on the Api Backend
  const token = localStorage.getItem("token")
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/parking/parking-location/`,{
        headers:{Authorization:`Bearer  ${token}`}
      })
      .then((respone) => {
        setLocations(respone.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to Load Park Locations");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>Parking Location</h2>

      <table className="table mt-2 table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Total Slots</th>
            <th>Available Slots</th>
            <th>Reserved Slots</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.name}</td>
              <td>{loc.address}</td>
              <td>{loc.total_slots}</td>
              <td>{loc.available_slots}</td>
              <td>{loc.reserved_slots}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/parking-location/${loc.id}`)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ParkingLocationList;
