// // // src/admin/AdminLogin.jsx
// // import React, { useState, useContext } from "react";
// // import { AdminAuthContext } from "../../context/AdminAuthContext";

// // //import { AdminAuthContext } from "..AdminAuthContext/../context/AdminAuthContext";
// // import { useNavigate } from "react-router-dom";

// // const AdminLogin = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { login } = useContext(AdminAuthContext);
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await login(email, password);
// //       navigate("/admin/dashboard");
// //     } catch {
// //       alert("Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="admin-login">
// //       <h2>Admin Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <input
// //           type="email"
// //           placeholder="Admin Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Admin Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AdminLogin;
// // src/pages/admin/AdminLogin.jsx
// import React, { useState, useContext } from "react";
// import { AdminAuthContext } from "../../context/AdminAuthContext";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css"; // optional if you want custom styling

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AdminAuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error("Admin login failed:", err);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-card">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Admin Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Admin Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
