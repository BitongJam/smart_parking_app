import axios from "axios";
import { useEffect, useState } from "react";
import BasicUserParkingReservationModal from "./BasicUserParkingReservationModal";

interface ActiverUserReservationProps {
  id: number;
  start_datetime: string;
  end_datetime: string;
  parking_location_name: string;
  state: string;
}

function BasicUserParkingReservation() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  interface BasicUserParkingReservationProps {
    id: number;
    address: string;
    name: string;
    total_slots: number;
    reserved_slots: number;
    available_slots: number;
    state: string;
  }

  interface BasicUserReservationHistoryProps {
    id: number;
    start_datetime: string;
    end_datetime: string;
    parking_location_name: string;
    state: string;
  }

  const [parkingLocation, setParkingLocation] = useState<
    BasicUserParkingReservationProps[]
  >([]);

  const [reservationHist, setReservationHist] = useState<
    BasicUserReservationHistoryProps[]
  >([]);

  const [reserveParkingId, setReserverParkingId] = useState<number | boolean>(
    false
  );

  const [activeUserReservation, setActiveUserReservation] = useState<
    ActiverUserReservationProps[]
  >([]);

  const auth_header = { Authorization: `Bearer ${token}` };
  //Get the All Parking Location Available for Reservation
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${BASE_URL}/api/parking/parking-location/`, {
          headers: auth_header,
        })
        .then((response) => {
          setParkingLocation(response.data);
        })
        .catch((err) => {
          console.error(err);
        });

      //GEt The Active Reservations by the users
      axios
        .get(`${BASE_URL}/api/parking/reservation/user_active_reservations`, {
          headers: auth_header,
        })
        .then((response) => {
          setActiveUserReservation(response.data);
        });

      //Get the  Reservation History of the User
      axios
        .get(`${BASE_URL}/api/parking/reservation/user_reservation_history`, {
          headers: auth_header,
        })
        .then((response) => {
          setReservationHist(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        <BasicUserParkingReservationModal
          base_url={BASE_URL}
          auth_header={auth_header}
          park_loc_id={reserveParkingId}
          start_datetime={""}
          end_datetime={""}
        />
        <div className="row">
          <div className="col-12" id="available_location_section">
            {/* PARKING LOCATION FOR RESERVATION */}
            <h3>Parking Location</h3>

            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Total Slots</th>
                  <th>Reserved Slots</th>
                  <th>Available Slots</th>
                  <th>Reserve</th>
                </tr>
              </thead>
              <tbody>
                {parkingLocation.map((parking) => (
                  <tr key={parking.id}>
                    <td>{parking.name}</td>
                    <td>{parking.address}</td>
                    <td>{parking.total_slots}</td>
                    <td>{parking.reserved_slots}</td>
                    <td>{parking.available_slots}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info"
                        data-bs-toggle="modal"
                        data-bs-target="#reservationModal"
                        onClick={() => setReserverParkingId(parking.id)}
                      >
                        Reserve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTIVE RESERVATION */}
          <div className="col-12">
            <h3>ACTIVE RESERVATION</h3>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Start DateTime</th>
                  <th>End DateTime</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {activeUserReservation.map((history) => (
                  <tr key={history.id}>
                    <td>{history.parking_location_name}</td>
                    <td>{history.start_datetime}</td>
                    <td>{history.end_datetime}</td>
                    <td>
                      {history.state == "active" ? (
                        <span className="badge rounded-pill bg-success">
                          {history.state}
                        </span>
                      ) : history.state == "cancel" ? (
                        <span className="badge rounded-pill bg-danger">
                          {history.state}
                        </span>
                      ) : history.state == "draft" ? (
                        <span className="badge rounded-pill bg-info">
                          {history.state}
                        </span>
                      ) : (
                        <span className="badge rounded-pill bg-secondary">
                          {history.state}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RESEREVATION HISTORY */}
          <div className="col-12" id="reservation_history">
            <h3>Reservation History</h3>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Start DateTime</th>
                  <th>End DateTime</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {reservationHist.map((history) => (
                  <tr key={history.id}>
                    <td>{history.parking_location_name}</td>
                    <td>{history.start_datetime}</td>
                    <td>{history.end_datetime}</td>
                    <td>
                      {history.state == "active" ? (
                        <span className="badge rounded-pill bg-success">
                          {history.state}
                        </span>
                      ) : history.state == "cancel" ? (
                        <span className="badge rounded-pill bg-danger">
                          {history.state}
                        </span>
                      ) : history.state == "draft" ? (
                        <span className="badge rounded-pill bg-info">
                          {history.state}
                        </span>
                      ) : (
                        <span className="badge rounded-pill bg-secondary">
                          {history.state}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicUserParkingReservation;
