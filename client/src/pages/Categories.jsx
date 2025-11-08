import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Categories.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const data = Array.isArray(res.data) ? res.data : res.data.categories || [];
        setCategories(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!search) return setFiltered(categories);
    const filteredData = categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, categories]);

  return (
    <div className="catpage-container">
      <header className="catpage-header">
        <h1 className="catpage-title">Explore Insurance Categories</h1>
        <p className="catpage-subtitle">
          Find the right insurance plan for your needs. Browse all categories below.
        </p>
      </header>

      <div className="catpage-search-section">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="catpage-search-input"
        />
      </div>

      {loading ? (
        <p className="catpage-loading">Loading categories...</p>
      ) : filtered.length === 0 ? (
        <p className="catpage-no-results">No categories found.</p>
      ) : (
        <div className="catpage-grid">
          {filtered.map((cat) => (
            <Link
              to={`/category/${cat._id}`}
              key={cat._id}
              className="catpage-card"
            >
              <div className="catpage-card-image">
                <img
                  src={cat.iconUrl || cat.icon || "https://via.placeholder.com/100"}
                  alt={cat.name}
                />
              </div>
              <div className="catpage-card-body">
                <h3 className="catpage-card-title">{cat.name}</h3>
                {cat.isPopular && <span className="catpage-badge">🔥 Popular</span>}
                {cat.isNew && <span className="catpage-badge new">✨ New</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      <section className="catpage-featured">
        <h2 className="catpage-featured-title">Top Categories</h2>
        <div className="catpage-featured-scroll">
          {categories.slice(0, 10).map((cat) => (
            <Link
              to={`/category/${cat._id}`}
              key={cat._id}
              className="catpage-featured-card"
            >
              <img src={cat.iconUrl || cat.icon} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
