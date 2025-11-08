// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./Auth.css";

// const ForgotPassword = () => {
//   const { sendOtp } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const message = await sendOtp(email);
//       setMsg(message);
//       setError("");
//     } catch (err) {
//       setError(err || "Failed to send OTP");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Forgot Password</h2>
//       {msg && <p className="success">{msg}</p>}
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Send OTP</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const ForgotPassword = () => {
  const { sendOtp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await sendOtp(email);
      setMsg(message);
      setError("");

      // ✅ Redirect to reset-password page after OTP sent
      navigate("/reset-password", { state: { email } }); 
      // passing email via state so you can prefill it on ResetPassword page
    } catch (err) {
      setError(err || "Failed to send OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
