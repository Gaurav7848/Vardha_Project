import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState("loading"); // "loading" | "admin" | "unauthorized"

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAuthState("unauthorized");
        return;
      }

      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const role = res.data?.admin?.role;

        if (res.data.success && (role === "admin" || role === "superadmin")) {
          setAuthState("admin");
        } else {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          setAuthState("unauthorized");
        }
      } catch (err) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        setAuthState("unauthorized");
      }
    };

    checkAdmin();
  }, []);

  if (authState === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Verifying access...</p>
      </div>
    );
  }

  if (authState === "unauthorized") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
