import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const today = new Date().toISOString().split("T")[0];
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const name = `${lname}, ${fname} ${mname}`;
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const data = {
    name,
    email,
    // address,
    username,
    password,
    birthdate,
  };

  const handleSubmt = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/create/`, data);
      console.log(data);
      if (!response) {
        setError("Failed to Register User: " + response);
      } else {
        alert("Sign Up Successfully");
        navigate("/login");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<any>;
      let message = "ERROR " + axiosError;
      if (axiosError.response && axiosError.response.data) {
        if (axiosError.response.status == 400){
          const errData = axiosError.response.data;
          console.log(errData);

          const firstKey = Object.keys(errData)[0];
          const firstERr = errData[firstKey]?.[0];
          message = firstERr || "An unknown server error occurred.";
        }
      }

      setError(message);
      console.error(message);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card">
          <div className="text-center my-3">
            <h2>User Registration</h2>
          </div>

          <form className="px-5 py-2">
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  className="form-control"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required={true}
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="mname">Last Name</label>
                <input
                  type="text"
                  id="mname"
                  className="form-control"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required={true}
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="lname">Middle Name</label>
                <input
                  type="text"
                  id="lname"
                  className="form-control"
                  value={mname}
                  onChange={(e) => setMname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
            </div>
            <div className="col-12">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="col-12">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="date"
                id="birthdate"
                className="form-control"
                required={true}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger my-2">{error}</div>}
            <div className="d-grid my-3">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmt();
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;
