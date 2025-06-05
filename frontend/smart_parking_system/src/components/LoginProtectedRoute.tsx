import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface LoginProtectedRouteProps {
  children: React.ReactNode;
}

function LoginProtectedRoute({ children }: LoginProtectedRouteProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");
  const [valid, setValid] = useState<boolean | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },});

        setIsAdmin(response.data.is_admin);
        setValid(true)
      } catch (error) {
        setValid(false);
      }
    };

    if (token){
        verifyToken()
    }else{
        setValid(false)
    }
  },[token]);

//   if (valid){
//     if (isAdmin){
//         alert("go to admin")
//         return <Navigate to="/dashboard" replace/>
//     }else if (isAdmin === false){
//         return <Navigate to="/client" replace/>
//     }else{
//         return <Navigate to="/login" replace/>
//     }
//   }


  return <>{children}</>
}

export default LoginProtectedRoute;
