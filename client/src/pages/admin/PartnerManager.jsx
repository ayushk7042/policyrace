// src/pages/admin/PartnerManager.jsx
import React, { useState, useEffect, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import api from "../../api/axios";
import "./PartnerManager.css";

const PartnerManager = () => {
  const { admin } = useContext(AdminAuthContext);

  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState({ title: "", iconUrl: "" });
  const [loading, setLoading] = useState(true);

  // Fetch all partners
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/partners");
      setPartners(res.data.partners || []);
    } catch (err) {
      console.error("Error fetching partners", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await api.post("/partners", form, { headers });
      setPartners([res.data.partner, ...partners]);
      setForm({ title: "", iconUrl: "" });
    } catch (err) {
      console.error("Error adding partner", err);
      alert("Failed to add partner. Check console.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/partners/${id}`, { headers });
      setPartners(partners.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting partner", err);
    }
  };

  if (!admin) {
    return (
      <div className="no-access">
        <p>⛔ Access Denied. Please log in as Admin.</p>
      </div>
    );
  }

  return (
    <div className="partner-manager-container">
      <h1>🤝 Partner Management</h1>

      <section className="partner-form-section">
        <h2>➕ Add New Partner</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={form.iconUrl}
            onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
            required
          />
          <button type="submit">Add Partner</button>
        </form>
      </section>

      <section className="partner-list">
        <h2>📋 All Partners</h2>
        {loading ? (
          <p>Loading partners...</p>
        ) : partners.length === 0 ? (
          <p>No partners found.</p>
        ) : (
          <div className="partner-grid">
            {partners.map((p) => (
              <div key={p._id} className="partner-card">
                <img src={p.iconUrl} alt={p.title} />
                <h3>{p.title}</h3>
                <p className="slug">/{p.slug}</p>
                <div className="actions">
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PartnerManager;
