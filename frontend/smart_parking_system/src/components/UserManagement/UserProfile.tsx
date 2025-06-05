import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile() {
  const [userId, setUserId] = useState<number | boolean>(false);
  const [userFullName, setUserFullName] = useState("");
  const [userBirthdate, setUserBirthDate] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //get token
  const token = localStorage.getItem("token");

  const handleUpdate = async (id: number | boolean) => {
    try {
      axios.patch(
        `${BASE_URL}/api/user/update_current_user_details/${id}`,
        {
          name: userFullName,
          birthdate: userBirthdate,
          username: userUsername,
          email: userEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Update User Profile Succesfully");
    } catch (err) {
      console.error("ERROR: " + err);
    }
  };

  const handlePasswordUpdate = async (id: number | boolean) => {
    try {
      if (userPassword == "") {
        alert("Empty Password is not Allowed.");
        return;
      }
      axios.patch(
        `${BASE_URL}/api/user/update_user_password/${id}`,
        {
          password: userPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Password Updated Succesfully");
    } catch (err) {
      console.error("ERROR: " + err);
    }
  };
  //Load User Profile Details
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/user/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserId(response.data.id);
        setUserFullName(response.data.name ?? ""); // Ensure fallback
        setUserBirthDate(response.data.birthdate ?? ""); // Ensure fallback
        setUserUsername(response.data.username ?? ""); // Ensure fallback
        setUserEmail(response.data.email ?? ""); // Ensure fallback
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // ← Fix: add this

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h3>User Profile</h3>
        </div>
        <div className="card-body">
          <form className="px-5">
            <div className="row mx-5">
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user-fullname"
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="user-birthdate"
                  value={userBirthdate}
                  onChange={(e) => setUserBirthDate(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user-username"
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="user-name" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="user-email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label htmlFor="user-name" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handlePasswordUpdate(userId)}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => {
              handleUpdate(userId);
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
