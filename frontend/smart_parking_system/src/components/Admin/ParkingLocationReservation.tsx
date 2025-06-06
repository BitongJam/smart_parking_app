import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ParkingLocationReservation {
  id: number;
  name: string;
  parking_lot_id: number;
  user_id: number;
  start_datetime: string;
  end_datetime: string;
  state: "draft" | "cancel" | "active";
}

interface ParkingLocation {
  id: number;
  name: string;
  address: string;
  total_slots: number;
  available_slots: number;
  reserved_slots: number;
  reservations: ParkingLocationReservation[];
}

function ParkingLocationLotForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [location, setLocation] = useState<ParkingLocation | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [total_slots, setTotalSlots] = useState<number>(0);
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    // Handle Update after saving the changes
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/parking/parking-location/${id}/`,
        {
          name,
          address,
          total_slots,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLocation(response.data);
      setEditMode(false);
    } catch (error) {
      alert("Failed to update Location: " + error);
      console.error("Failed to update location: " + error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/parking/parking-location/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.info("Record Successfull Deleted");
      // When Successfully Delete auto navigate to the parking location list
      navigate("/parking-location");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error); // show backend error message
      } else {
        alert("Unexpected error occurred");
      }
    }
  };

  const cancelReservation = async (reservation_id: number) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/parking/reservation/${reservation_id}/`,
        {
          state: "cancel",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.info("Reservation Cancel");
      // When Successfully Delete auto navigate to the parking location list
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error);
        alert(error); // show backend error message
      } else {
        alert("Unexpected error occurred");
      }
    }
  };

  const approveReservation = async (reservation_id: number) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/parking/reservation/${reservation_id}/`,
        {
          state: "active",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.info("Reservation Cancel");
      // When Successfully Delete auto navigate to the parking location list
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error);
        alert(error); // show backend error message
      } else {
        alert("Unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    // This use effect handle the change of screen size to smaller on like phone
    // To change the bottom to dropdown action
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/parking/parking-location/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLocation(res.data);
        setName(res.data.name);
        setAddress(res.data.address);
        setTotalSlots(res.data.total_slots);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!location) return <div>Loading...</div>;

  return (
    <form className="row g-3">
      {/* TODO: make this a usesable component later */}
      {isMobile ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Action
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="btn btn-outline-info btn-sm px-5 w-100">
                Edit
              </button>
            </li>
            <li>
              <button className="btn btn-outline-danger btn-sm  px-5 w-100">
                Delete
              </button>
            </li>
            <li>
              <button className="btn btn-outline-success btn-sm  px-5 w-100">
                Save
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="col-12 d-flex justify-content-left gap-2">
          <button
            className="btn btn-outline-info btn-sm px-5"
            type="button"
            hidden={editMode}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm  px-5"
            id="btn-delete"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-success btn-sm  px-5"
            type="button"
            id="btn-save"
            hidden={!editMode}
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            Save
          </button>
        </div>
      )}
      {/* END - TODO: make this a usesable component later */}
      <div className="col-12">
        <h2>{name}</h2>
      </div>
      <div className="col-md-6 col-sm-12">
        <strong>Address: </strong>
        <input
          type="text"
          className="form-control w-50"
          value={address}
          hidden={!editMode}
          onChange={(e) => setAddress(e.target.value)}
        />
        <span hidden={editMode}>{location.address}</span>
      </div>
      <div className="col-md-6 col-sm-12">
        <strong>Total Slots: </strong>
        <input
          type="integer"
          className="form-control w-25"
          value={total_slots}
          hidden={!editMode}
          onChange={(e) => setTotalSlots(Number(e.target.value))}
        />
        <span hidden={editMode}>{location.total_slots}</span>
      </div>

      <div className="col-md-6 col-sm-12"></div>
      <div className="col-md-6 col-sm-12">
        <strong>Availabe Slots: </strong>
        <span>{location.available_slots}</span>
      </div>
      <div className="col-md-6 col-sm-12"></div>
      <div className="col-md-6 col-sm-12">
        <strong>Reserved Slots: </strong>
        <span>{location.reserved_slots}</span>
      </div>
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {location.reservations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.name}</td>
                <td>{loc.start_datetime}</td>
                <td>{loc.end_datetime}</td>
                <td>
                      {loc.state == "active" ? (
                        <span className="badge rounded-pill bg-success">
                          {loc.state}
                        </span>
                      ) : loc.state == "cancel" ? (
                        <span className="badge rounded-pill bg-danger">
                          {loc.state}
                        </span>
                      ) : loc.state == "draft" ? (
                        <span className="badge rounded-pill bg-info">
                          {loc.state}
                        </span>
                      ) : (
                        <span className="badge rounded-pill bg-secondary">
                          {loc.state}
                        </span>
                      )}
                    </td>
                <td>
                  {loc.state === "draft" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => approveReservation(loc.id)}
                    >
                      Approve
                    </button>
                  )}

                  {(loc.state === "draft" || loc.state === "active") && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancelReservation(loc.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Create Parking Location"}
        </button> */}
    </form>
  );
}

export default ParkingLocationLotForm;
