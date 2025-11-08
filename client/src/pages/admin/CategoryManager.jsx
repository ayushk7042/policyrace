
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "./CategoryManager.css";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", iconUrl: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  // Add / Edit category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/categories/${editId}`, form);
      } else {
        await api.post("/categories", form);
      }
      setForm({ name: "", iconUrl: "" });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category", err);
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setForm({ name: cat.name, iconUrl: cat.iconUrl });
    setEditId(cat._id);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category", err);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-manager-container">
      <header className="category-manager-header">
        <h1>🗂️ Category Management</h1>
        <div className="header-buttons">
          <button onClick={() => navigate("/admin/dashboard")}>⬅️ Back to Dashboard</button>
          <Link to="/">🌐 Go to Homepage</Link>
        </div>
      </header>

      <section className="category-form-section">
        <h2>{editId ? "✏️ Edit Category" : "➕ Add New Category"}</h2>
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={form.iconUrl}
            onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"} Category</button>
          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setForm({ name: "", iconUrl: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="category-list-section">
        <h2>📋 All Categories</h2>
        {loading ? (
          <p className="loading-text">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="no-category">No categories available.</p>
        ) : (
          <div className="category-grid">
            {categories.map((cat) => (
              <div key={cat._id} className="category-card">
                <img src={cat.iconUrl} alt={cat.name} className="category-icon" />
                <h3>{cat.name}</h3>
                <div className="category-actions">
                  <button onClick={() => handleEdit(cat)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryManager;
