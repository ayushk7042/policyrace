
import React, { createContext, useState } from "react";
import api from "../api/axios";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    localStorage.getItem("adminData")
      ? JSON.parse(localStorage.getItem("adminData"))
      : null
  );

  const login = async (email, password) => {
    const res = await api.post("/admin/login", { email, password });
    const { admin, token } = res.data;

    // Save data in localStorage
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(admin));

    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
