import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ParkingLocationFormProps {
  onSuccess?: () => void;
}

function ParkingLocationForm({ onSuccess }: ParkingLocationFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [total_slots, setTotalSlots] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = {
      name,
      address,
      total_slots,
    };

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/parking/parking-location/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        setError("Failed to create record " + JSON.stringify(errData));
      } else {
        setName("");
        setAddress("");
        setError(null);
        if (onSuccess) onSuccess();
        alert("Parking location created successfully!");

        navigate("/parking-location");
      }
    } catch (err) {
      setError("Error: " + err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          id="parking-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-12">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          id="parking-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="col-12">
        <label>Total Slots</label>
        <input
          type="integer"
          className="form-control"
          id="parking-slots"
          value={total_slots}
          onChange={(e) => setTotalSlots(Number(e.target.value))}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Create Parking Location"}
      </button>
    </form>
  );
}

export default ParkingLocationForm;
