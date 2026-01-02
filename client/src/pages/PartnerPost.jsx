import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "./PartnerPost.css";

const PartnerPost = () => {
  const { slug } = useParams();

  const [partner, setPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch current partner by slug
  const fetchPartner = async () => {
    try {
      const res = await api.get(`/partners/${slug}`);
      setPartner(res.data.partner);
    } catch (err) {
      console.error("Partner fetch error", err);
    }
  };

  // 🔹 Fetch all partners (sidebar / bottom)
  const fetchPartners = async () => {
    const res = await api.get("/partners");
    setPartners(res.data.partners || []);
  };

  useEffect(() => {
    setLoading(true);
    fetchPartner();
    fetchPartners();
    setLoading(false);
  }, [slug]);

  if (loading) return <h2>Loading...</h2>;
  if (!partner) return <h2>Partner not found</h2>;

  return (
    <div className="partner-post-page">
      {/* 🔹 HEADER */}
      <div className="partner-header">
        <img src={partner.iconUrl} alt={partner.title} />
        <h1>{partner.title}</h1>
      </div>

      <div className="partner-layout">
        {/* 🔹 MAIN ARTICLES */}
        <div className="partner-articles">
          {partner.articles?.length > 0 ? (
            partner.articles.map((a) => (
              <div key={a._id} className="article-box">
                <img src={a.imageUrl} alt={a.title} />
                <h2>{a.title}</h2>
                <h4>{a.subTitle}</h4>
                <p>{a.description}</p>

                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    className="read-more"
                  >
                    Read Official Source →
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No articles published yet.</p>
          )}
        </div>

        {/* 🔹 SIDEBAR */}
        <aside className="partner-sidebar">
          <h3>Other Partners</h3>

          {partners.map((p) => (
            <Link
              key={p._id}
              to={`/post/${p.slug}`}
              className="sidebar-partner"
            >
              <img src={p.iconUrl} alt={p.title} />
              <span>{p.title}</span>
            </Link>
          ))}
        </aside>
      </div>

      {/* 🔹 BOTTOM SECTION – LATEST */}
      <div className="latest-section">
        <h2>Latest From Partners</h2>

        <div className="latest-grid">
          {partners.flatMap(p => p.articles || []).slice(0, 6).map((a) => (
            <div key={a._id} className="latest-card">
              <img src={a.imageUrl} alt={a.title} />
              <h4>{a.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPost;





