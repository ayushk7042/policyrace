import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section about">
          <h3>PolicyRace</h3>
          <p>
            Compare, choose, and save on top insurance plans.
            Trusted by millions across India.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/policies">Policies</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="footer-section">
          <h4>Connect With Us</h4>

          <div className="social-icons">
            <a href="https://affalliances.com/"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" /></a>
            <a href="https://affalliances.com/"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" /></a>
            <a href="https://affalliances.com/"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" /></a>
            <a href="https://affalliances.com/"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" /></a>
          </div>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 PolicyRace. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
