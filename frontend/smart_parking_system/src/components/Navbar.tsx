import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard">
            Smart Parking
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="/parking-location"
                >
                  Parking
                </a>
              </li>
              <li className="nav-item">
                <a href="/user-management" className="nav-link">
                  User Management
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropstart">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              User
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={()=> navigate("/user-profile")}>User Profile </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={()=>{
                  // remove active token to logout then navligate to login 
                  alert("User Logging Out");
                  localStorage.removeItem("token")
                  navigate("/login")
                }}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
