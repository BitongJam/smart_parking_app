import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { Navigate, replace } from "react-router-dom";
import Login from "../Login";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}
function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [valid, setValid] = useState<boolean | null>(null);
  // get stored token
  const token = localStorage.getItem("token");
  const [isNotAdmin, setIsNotAdmin] = useState<boolean | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // check the token if it is valid
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsNotAdmin(!response.data.is_admin);
        setValid(true);
      } catch {
        setValid(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setValid(false);
    }
  }, [token]);

  if (valid === false) {
    return <Navigate to="/login" replace />;
  }

  if (isNotAdmin === true) {
    //erase token if it will try to access admin portal with none admin portal
    // localStorage.removeItem("token")
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AdminProtectedRoute;
