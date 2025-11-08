import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);

  // If admin is not logged in, redirect to login
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
