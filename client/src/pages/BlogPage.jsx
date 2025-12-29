import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./BlogPage.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts"); // Replace with backend blog/video API
        const data = Array.isArray(res.data) ? res.data : res.data.posts || [];
        setPosts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search) return setFiltered(posts);
    const filteredData = posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, posts]);

  return (
    <div className="blogpage-container">
      <header className="blogpage-header">
        <h1 className="blogpage-title">PolicyRace Insights</h1>
        <p className="blogpage-subtitle">
          Stay updated with insurance tips, news, and featured videos.
        </p>
      </header>

      <div className="blogpage-search-wrapper">
        <input
          type="text"
          placeholder="Search blogs or videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="blogpage-search"
        />
      </div>

      {loading ? (
        <p className="blogpage-loading">Loading content...</p>
      ) : filtered.length === 0 ? (
        <p className="blogpage-no-results">No content found.</p>
      ) : (
        <div className="blogpage-grid">
          {filtered.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="blogpage-card"
            >
              <div className="blogpage-card-media">
                {post.type === "video" ? (
                  <video
                    src={post.videoUrl}
                    controls
                    className="blogpage-video"
                  />
                ) : (
                  <img
                    src={post.imageUrl || "https://via.placeholder.com/300x200"}
                    alt={post.title}
                  />
                )}
              </div>
              <div className="blogpage-card-body">
                <h3 className="blogpage-card-title">{post.title}</h3>
                <p className="blogpage-card-desc">{post.description}</p>
                {post.isTrending && <span className="blogpage-badge trending">🔥 Trending</span>}
                {post.isFeatured && <span className="blogpage-badge featured">⭐ Featured</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Featured Carousel */}
      {posts.length > 0 && (
        <section className="blogpage-featured-section">
          <h2 className="blogpage-featured-title">Featured Videos & Blogs</h2>
          <div className="blogpage-featured-carousel">
            {posts.slice(0, 8).map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="blogpage-featured-card"
              >
                {post.type === "video" ? (
                  <video src={post.videoUrl} className="blogpage-featured-video" />
                ) : (
                  <img src={post.imageUrl} alt={post.title} />
                )}
                <p>{post.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPage;
