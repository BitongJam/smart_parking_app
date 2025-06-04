import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface BasicUserProtectedRouteProps {
  children: React.ReactNode;
}

function BasicUserProtectedRoute({ children }: BasicUserProtectedRouteProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");
  const [valid, setValid] = useState<boolean | null>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Check token if is valid or still valid
        const response = await axios.get(`${BASE_URL}/api/user/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAdmin(response.data.is_admin);
        setValid(true);
        console.log("set valid:" + valid);
      } catch (error) {
        setValid(false);
        console.error(error);
      }
    };

    if (token) {
      console.log("if trigger");
      verifyToken();
    } else {
      console.log("else trigger");
      setValid(false);
    }

    console.log(valid);
  }, [token]);

    // if (!token) {
    //   return <Navigate to="/login" replace />;
    // }

    // if (valid === null || isAdmin === null) {
    //   return <div>Loading...</div>;
    // }

    // if (valid === false) {
    //   return <Navigate to="/login" replace />;
    // }

    // if (isAdmin === true) {
    //   return <Navigate to="/dashboard" replace />;
    // }

  return <>{children}</>;
}

export default BasicUserProtectedRoute;
