// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./Auth.css";

// const ResetPassword = () => {
//   const { resetPassword } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const message = await resetPassword(form.email, form.otp, form.newPassword);
//       setMsg(message);
//       setError("");
//     } catch (err) {
//       setError(err || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Reset Password</h2>
//       {msg && <p className="success">{msg}</p>}
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="OTP"
//           value={form.otp}
//           onChange={(e) => setForm({ ...form, otp: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={form.newPassword}
//           onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Prefill email from navigation state if available
  const prefilledEmail = location.state?.email || "";

  const [form, setForm] = useState({
    email: prefilledEmail,
    otp: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await resetPassword(form.email, form.otp, form.newPassword);
      setMsg(message);
      setError("");

      // ✅ Redirect to login after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err || "Failed to reset password");
    }
  };

  // ✅ Update email if state changes (optional)
  useEffect(() => {
    if (prefilledEmail) setForm((prev) => ({ ...prev, email: prefilledEmail }));
  }, [prefilledEmail]);

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="OTP"
          value={form.otp}
          onChange={(e) => setForm({ ...form, otp: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
