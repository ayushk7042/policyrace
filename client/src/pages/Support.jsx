import React from "react";
import { Link } from "react-router-dom";
import "./Support.css";

const Support = () => {
  return (
    <div className="support-page">
      {/* Header */}
      <header className="support-header">
        <h1>Need Help? We're Here for You!</h1>
        <p>
          Reach out to our support team for any assistance regarding your insurance plans, claims, or policies.
        </p>
      </header>

      {/* Support Info */}
      <section className="support-info">
        <div className="info-card">
          <h3>📞 Call Us</h3>
          <p>+91 12345 67890</p>
        </div>
        <div className="info-card">
          <h3>✉️ Email</h3>
          <p>support@affalliances.com</p>
        </div>
        <div className="info-card">
          <h3>🕒 Support Hours</h3>
          <p>Mon - Fri: 9AM - 6PM</p>
        </div>
        <div className="info-card">
          <h3>🌐 Live Chat</h3>
          <p>Coming Soon</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="support-form-section">
        <h2>Send Us a Message</h2>
        <form className="support-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Quick Links */}
      <section className="support-links">
        <h2>Helpful Links</h2>
        <div className="links-grid">
          <Link to="/faq">📋 FAQ</Link>
          <Link to="/contact">🏢 Contact Us</Link>
          <Link to="/policies">💰 Policies</Link>
          <Link to="/">🏠 Homepage</Link>
        </div>
      </section>
    </div>
  );
};

export default Support;
