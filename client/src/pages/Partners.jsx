import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Partners.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch all partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get("/partners");
        const partnerData = Array.isArray(res.data)
          ? res.data
          : res.data.partners || [];
        setPartners(partnerData);
        setFiltered(partnerData);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Failed to load partners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // 🔹 Filter partners by name
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredList = partners.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    setFiltered(filteredList);
  };

  return (
    <motion.div
      className="partners-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="partners-title">🤝 Our Trusted Partners</h1>
      <p className="partners-subtitle">
        Collaborating with top insurers and financial institutions to bring you
        the best coverage options.
      </p>

      {/* 🔹 Search Bar */}
      <div className="partners-search">
        <input
          type="text"
          placeholder="🔍 Search Partners..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* 🔹 Loading / Error */}
      {loading && <p className="loading-text">Loading partners...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* 🔹 Partners Grid */}
      <div className="partners-grid">
        {filtered.map((partner, index) => (
          <motion.div
            key={partner._id || index}
            className="partner-card-glass"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="partner-image-wrapper">
              <img
                src={partner.iconUrl || partner.image}
                alt={partner.title}
                className="partner-logo"
              />
            </div>
            <h3>{partner.title}</h3>
            <p>{partner.description || "Leading Insurance Partner"}</p>
            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-btn"
              >
                Visit Website 🌐
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="no-results">No partners found for “{search}”</p>
      )}

      {/* 🔹 Back Button */}
      <div className="back-home">
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default Partners;
