// Contact.jsx
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Left - Contact Info */}
        <div className="contact-left">
          <h1>Get in Touch with Affalliances</h1>
          <p>
            We’re here to help you with all your insurance needs. Reach out to
            us and our experts will guide you every step of the way.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <h3>🏢 Office</h3>
              <p>Urban Tower A, Sector 62, Gurugram, Haryana, India</p>
            </div>
            <div className="info-item">
              <h3>📞 Phone</h3>
              <p>+91 12345 67890</p>
            </div>
            <div className="info-item">
              <h3>✉️ Email</h3>
              <p>support@affalliances.com</p>
            </div>
            <div className="info-item">
              <h3>🌐 Website</h3>
              <p>www.affalliances.com</p>
            </div>
          </div>
        </div>

        {/* Right - Map */}
        <div className="contact-right">
          <iframe
            title="Affalliances Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6781097895616!2d77.06899307502584!3d28.46442118245303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b7c23b5d23%3A0xabcdef1234567890!2sUrban%20Tower%20A%2C%20Sector%2062%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
