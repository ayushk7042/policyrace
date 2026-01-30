






import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./n.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setMobileOpen(false);
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Scroll effect (optional)
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
            alt="Logo"
            className="logo-icon"
          />
          <span className="logo-text">Policy<span>Race</span></span>
        </div>

        {/* Hamburger */}
        <div className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${mobileOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li><Link to="/policies" onClick={() => setMobileOpen(false)}>Policies</Link></li>
          <li><Link to="/calculator" onClick={() => setMobileOpen(false)}>Calculator</Link></li>
          <li><Link to="/partners" onClick={() => setMobileOpen(false)}>Partners</Link></li>
          {user ? (
            <>
              <li><span className="user-name">👤 {user.name}</span></li>
              <li>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn-login" onClick={() => setMobileOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="btn-register" onClick={() => setMobileOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
