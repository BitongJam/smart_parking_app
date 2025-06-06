import axios from "axios";
import React, {useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAdmin,setIsAdmin] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/user/token/`, {
        username,
        password,
      });

      const token = response.data.access;
      localStorage.setItem("token", token);

      const checkUser = await axios.get(`${BASE_URL}/api/user/me`,{
        headers:{Authorization:`Bearer ${token}`}
      })

      setLoading(false);
      setLoginSuccess(true);
      setError("");
      setIsAdmin(checkUser.data.is_admin)
    } catch (err: any) {
      setLoginSuccess(false);
      setLoading(false);
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
      // return <Navigate to="/dashboard" replace />;
    }
  };

  if (loginSuccess) {
    if (isAdmin === true){
      return <Navigate to="/dashboard" replace />;
    }else{
      return <Navigate to="/client/dashboard" replace/>
    }
  
    
  }
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary col-md-6 col-12 w-sm-100" style={{width:'400px'}}>
          <div className="card-body">
            <h2>Login</h2>
            {error != "" && (
              <div className="alert alert-danger" role="alert">
                Login Failed
              </div>
            )}

            {loginSuccess && (
              <div className="alert alert-success" role="alert">
                Login Successfuly
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="login-example" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="login-example"
                  aria-describedby="emailHelp"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=""><a href="/register-user" >Create Account</a></div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
