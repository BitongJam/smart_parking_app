import axios from "axios";
import { useEffect, useState } from "react";

interface DraftReservationsProps {
  id: number;
  parking_location_id: number;
  parking_location_name: string;
  user_id: number;
  start_datetime: string;
  end_datetime: string;
  state: string;
  user_name: string;
}

function AdminParkingReservation() {
  const [draftReservations, setDraftReservations] = useState<
    DraftReservationsProps[]
  >([]);
  const token = localStorage.getItem("token");
  const auth_header = { Authorization: `Bearer ${token}` };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/parking/reservation/user_draft_reservations/`, {
        headers: auth_header,
      })
      .then((res) => {
        setDraftReservations(res.data);
      })
      .catch((err) => {
        console.error("ERROR: " + err);
      });
  }, []);

  const cancelReservation = async (reservation_id: number, user_id: number) => {
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

      // Create Notification for cancelation
      await axios.post(
        `${BASE_URL}/api/notification/notification/`,
        {
          message: "Reservation Cancel",
          user_id: user_id,
          alert_type: "danger",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.info("Reservation Cancel");
      window.location.reload();
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

  const approveReservation = async (reservation_id: number, user_id: number) => {
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

      // Create Notification for cancelation
      await axios.post(
        `${BASE_URL}/api/notification/notification/`,
        {
          message: "Reservation Approve",
          user_id: user_id,
          alert_type: "success",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      console.info("Reservation Approve");
      window.location.reload();
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

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Location</th>
              <th>User</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {draftReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.parking_location_name}</td>
                <td>{reservation.user_name}</td>
                <td>{reservation.start_datetime}</td>
                <td>{reservation.end_datetime}</td>
                <td>
                  {reservation.state === "draft" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => approveReservation(reservation.id,reservation.user_id)}
                    >
                      Approve
                    </button>
                  )}

                  {(reservation.state === "draft" ||
                    reservation.state === "active") && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        cancelReservation(reservation.id, reservation.user_id)
                      }
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
    </>
  );
}

export default AdminParkingReservation;
