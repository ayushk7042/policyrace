



import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import "./AdminHero.css";

const AdminHero = () => {
  const [sliders, setSliders] = useState([]);
  const [newSlider, setNewSlider] = useState({
    title: "",
    imageUrl: "",
    viewPlansLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load all existing hero sliders
  const fetchSliders = async () => {
    try {
      const { data } = await api.get("/hero/sliders");
      setSliders(data);
    } catch (err) {
      console.error("Error fetching sliders:", err);
      setError("Failed to fetch sliders");
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // ✅ Add new hero slider
  const handleAddSlider = async (e) => {
    e.preventDefault();
    if (!newSlider.title || !newSlider.imageUrl || !newSlider.viewPlansLink) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/hero/sliders", newSlider);
      setSliders([data.slider, ...sliders]);
      setNewSlider({ title: "", imageUrl: "", viewPlansLink: "" });
      setError("");
    } catch (err) {
      console.error("Error adding slider:", err);
      setError(err.response?.data?.message || "Failed to add slider");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a slider
  const handleDeleteSlider = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;
    try {
      await api.delete(`/hero/sliders/${id}`);
      setSliders(sliders.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting slider:", err);
      setError("Failed to delete slider");
    }
  };

  // ✅ Handle fallback image
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60";
  };

  return (
    <div className="admin-hero p-6">
      <h2 className="text-2xl font-bold mb-4">🎞 Manage Hero Sliders</h2>

      {/* Add New Slider Form */}
      <form onSubmit={handleAddSlider} className="hero-form mb-6">
        {error && <p className="error">{error}</p>}
        <div className="form-row">
          <input
            type="text"
            placeholder="Title"
            value={newSlider.title}
            onChange={(e) =>
              setNewSlider({ ...newSlider, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newSlider.imageUrl}
            onChange={(e) =>
              setNewSlider({ ...newSlider, imageUrl: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="View Plans Link"
            value={newSlider.viewPlansLink}
            onChange={(e) =>
              setNewSlider({ ...newSlider, viewPlansLink: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Slider"}
          </button>
        </div>
      </form>

      {/* Display Existing Sliders */}
      <div className="sliders-grid">
        {sliders.length === 0 ? (
          <p className="text-gray-500">No sliders available yet.</p>
        ) : (
          sliders.map((slider) => (
            <div key={slider._id} className="slider-card">
              <img
                src={slider.imageUrl}
                alt={slider.title}
                onError={handleImageError}
              />
              <div className="slider-info">
                <h4>{slider.title}</h4>
                {slider.viewPlansLink && (
                  <a
                    href={slider.viewPlansLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Link
                  </a>
                )}
                <button onClick={() => handleDeleteSlider(slider._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminHero;
