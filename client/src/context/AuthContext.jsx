




// import React, { createContext, useState, useEffect } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Auto load logged-in user/admin on refresh
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Try user first
//   //       const resUser = await api.get("/auth/me");
//   //       if (resUser.data?.user) setUser(resUser.data.user);
//   //     } catch {}

//   //     try {
//   //       // Try admin
//   //       const resAdmin = await api.get("/admin/me");
//   //       if (resAdmin.data?.admin) setAdmin(resAdmin.data.admin);
//   //     } catch {}

//   //     setLoading(false);
//   //   };
//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//   const token = localStorage.getItem("token");
//   const adminToken = localStorage.getItem("adminToken");

//   const fetchData = async () => {
//     try {
//       if (token) {
//         const resUser = await api.get("/auth/me");
//         if (resUser.data?.user) setUser(resUser.data.user);
//       } else if (adminToken) {
//         const resAdmin = await api.get("/admin/me");
//         if (resAdmin.data?.admin) setAdmin(resAdmin.data.admin);
//       }
//     } catch (err) {
//       console.error("Auto-login failed:", err);
//       setUser(null);
//       setAdmin(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);


//   // ✅ User signup
//   const register = async (name, email, password) => {
//     const res = await api.post("/auth/signup", { name, email, password });
//     setUser(res.data.user);
//     localStorage.setItem("token", res.data.token);
//     return res.data;
//   };

//   // ✅ User login
//   const loginUser = async (email, password) => {
//     const res = await api.post("/auth/login", { email, password });
//     setUser(res.data.user);
//     localStorage.setItem("token", res.data.token);
//     return res.data;
//   };

//   // ✅ Forgot password (send OTP)
//   const sendOtp = async (email) => {
//     const res = await api.post("/auth/forgot-password", { email });
//     return res.data.message;
//   };

//   // ✅ Reset password
//   const resetPassword = async (email, otp, newPassword) => {
//     const res = await api.post("/auth/reset-password", { email, otp, newPassword });
//     return res.data.message;
//   };

//   // ✅ Logout user
//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   // ✅ Admin login/logout remain same
//   const loginAdmin = async (email, password) => {
//     const res = await api.post("/admin/login", { email, password });
//     setAdmin(res.data.admin);
//     return res.data;
//   };

//   const logoutAdmin = async () => {
//     await api.post("/admin/logout");
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         admin,
//         user,
//         loading,
//         register,
//         loginUser,
//         sendOtp,
//         resetPassword,
//         logoutUser,
//         loginAdmin,
//         logoutAdmin,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Initialize state from localStorage if available
  const [admin, setAdmin] = useState(
    localStorage.getItem("adminData")
      ? JSON.parse(localStorage.getItem("adminData"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const [loading, setLoading] = useState(true);

  // ✅ Auto load logged-in user/admin on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    const fetchData = async () => {
      try {
        // Load user from API if token exists but user state is empty
        if (!user && token) {
          const resUser = await api.get("/auth/me");
          if (resUser.data?.user) {
            setUser(resUser.data.user);
            localStorage.setItem("userData", JSON.stringify(resUser.data.user));
          } else {
            setUser(null);
          }
        }

        // Load admin from API if token exists but admin state is empty
        if (!admin && adminToken) {
          const resAdmin = await api.get("/admin/me");
          if (resAdmin.data?.admin) {
            setAdmin(resAdmin.data.admin);
            localStorage.setItem("adminData", JSON.stringify(resAdmin.data.admin));
          } else {
            setAdmin(null);
          }
        }
      } catch (err) {
        console.error("Auto-login failed:", err);
        setUser(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ User signup
  const register = async (name, email, password) => {
    const res = await api.post("/auth/signup", { name, email, password });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userData", JSON.stringify(res.data.user));
    return res.data;
  };

  // ✅ User login
  const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userData", JSON.stringify(res.data.user));
    return res.data;
  };

  // ✅ User logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  // ✅ Forgot password
  const sendOtp = async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data.message;
  };

  // ✅ Reset password
  const resetPassword = async (email, otp, newPassword) => {
    const res = await api.post("/auth/reset-password", { email, otp, newPassword });
    return res.data.message;
  };

  // ✅ Admin login
  const loginAdmin = async (email, password) => {
    const res = await api.post("/admin/login", { email, password });
    setAdmin(res.data.admin);
    localStorage.setItem("adminToken", res.data.token);
    localStorage.setItem("adminData", JSON.stringify(res.data.admin));
    return res.data;
  };

  // ✅ Admin logout
  const logoutAdmin = async () => {
    await api.post("/admin/logout");
    setAdmin(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        user,
        loading,
        register,
        loginUser,
        logoutUser,
        sendOtp,
        resetPassword,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
