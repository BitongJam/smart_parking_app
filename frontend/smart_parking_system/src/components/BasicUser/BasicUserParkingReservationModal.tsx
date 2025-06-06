import axios from "axios";
import { useState } from "react";

interface BasicUserParkingReservationModalProps {
  base_url: string;
  auth_header: { Authorization: string };
  park_loc_id: number | boolean;
  start_datetime: string;
  end_datetime: string;
}

function BasicUserParkingReservationModal({
  base_url,
  park_loc_id,
  auth_header,
}: BasicUserParkingReservationModalProps) {
  const [start_datetime, setStartDateTime] = useState<string>("");
  const [end_datetime, setEndDateTime] = useState<string>("");
  const handleReserve = async () => {
    try {
      if (start_datetime == '' || end_datetime === ''){
        alert("Start Date and End Date is required")
        return
      }
      await axios.post(
        `${base_url}/api/parking/reservation/`,
        {
          parking_location_id: park_loc_id,
          start_datetime: new Date(start_datetime).toISOString(),
          end_datetime: new Date(end_datetime).toISOString(),
          name: "reserve"
        },
        { headers: auth_header }
      );
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Backend Error Response:", err.response.data);
        alert("Error: " + JSON.stringify(err.response.data, null, 2));
      } else {
        alert("Unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="reservationModal"
        tabIndex={-1}
        aria-labelledby="reservationExampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="reservationExampleModalLabel"
              >
                Reserve Park
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <label
                    htmlFor="park-reserve-start-date"
                    className="form-label"
                  >
                    Start
                  </label>
                  <input
                    type="datetime-local"
                    id="park-reserve-start-date"
                    className="form-control" required={true}
                    value={start_datetime}
                    onChange={(e) => {
                      setStartDateTime(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="park-reserve-start-date"
                    className="form-label"
                  >
                    End
                  </label>
                  <input
                    type="datetime-local"
                    id="park-reserve-start-date"
                    className="form-control"
                    value={end_datetime}
                    required={true}
                    onChange={(e) => {
                      setEndDateTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleReserve()}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicUserParkingReservationModal;
