



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "./CategoryPageStyles.css";
import CompareModal from "../components/CompareModal";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", minCover: "" });
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get(`/categories/${id}`);
        setCategory(catRes.data);
        const policyRes = await api.get(`/policies?category=${id}`);
        setPolicies(policyRes.data.policies || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const filteredPolicies = policies
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => (filters.minPrice ? p.priceOptions?.[0]?.price >= filters.minPrice : true))
    .filter(p => (filters.maxPrice ? p.priceOptions?.[0]?.price <= filters.maxPrice : true))
    .filter(p => (filters.minCover ? p.lifeCover >= filters.minCover : true))
    .sort((a, b) => {
      if (sortType === "price") return (a.priceOptions?.[0]?.price || 0) - (b.priceOptions?.[0]?.price || 0);
      if (sortType === "lifeCover") return (b.lifeCover || 0) - (a.lifeCover || 0);
      if (sortType === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  const paginatedPolicies = filteredPolicies.slice(0, page * perPage);

  const toggleCompare = (policy) => {
    if (compareList.some(p => p._id === policy._id)) {
      setCompareList(compareList.filter(p => p._id !== policy._id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, policy]);
    }
  };

  const resetFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", minCover: "" });
    setSearchTerm("");
    setSortType("default");
  };

  return (
    <div className="cpage-container">
      {loading ? (
        <p className="cpage-loading-text">Loading...</p>
      ) : (
        <>
          {/* Breadcrumb */}
          <div className="cpage-breadcrumb">
            <Link to="/">Home</Link> / <span>{category?.name}</span>
          </div>

          {/* Header */}
          <header className="cpage-header">
            <h1>{category?.name}</h1>
            {category?.description && <p>{category.description}</p>}
            {category?.bannerUrl && <img src={category.bannerUrl} alt={category.name} />}
          </header>

          {/* Filters */}
          <div className="cpage-controls">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="default">Sort by Default</option>
              <option value="price">Price (Low → High)</option>
              <option value="lifeCover">Life Cover (High → Low)</option>
              <option value="popular">Most Popular</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Min Life Cover"
              value={filters.minCover}
              onChange={(e) => setFilters({ ...filters, minCover: e.target.value })}
            />
            <button className="cpage-reset-btn" onClick={resetFilters}>Reset Filters</button>
          </div>

          {/* Policy Cards */}
          <section className="cpage-policy-grid">
            {paginatedPolicies.length === 0 ? (
              <p className="cpage-no-policy">No policies found.</p>
            ) : (
              paginatedPolicies.map(p => (
                <div key={p._id} className="cpage-policy-card">
                  {p.popular && <span className="cpage-badge popular">Popular</span>}
                  {p.bestValue && <span className="cpage-badge best">Best Value</span>}
                  <img src={p.imageUrl || p.image} alt={p.title} />
                  <div className="cpage-policy-info">
                    <h3>{p.title}</h3>
                    <p>{p.shortDescription}</p>
                    <div className="cpage-policy-meta">
                      <span className={`life-cover ${p.lifeCover >= 1000000 ? "high" : "low"}`}>
                        Life Cover: {p.lifeCover || "N/A"}
                      </span>
                      <span className={`claim-percent ${p.claimSettlement >= 90 ? "high" : "low"}`}>
                        Claim: {p.claimSettlement || "N/A"}%
                      </span>
                    </div>
                  </div>
                  <div className="cpage-policy-actions">
                    <Link to={`/policy/${p._id}`} className="cpage-details-btn">Details</Link>
                    <button className="cpage-apply-btn">Apply Now</button>
                    <button className={`cpage-compare-btn ${compareList.some(cp => cp._id === p._id) ? "active" : ""}`} 
                            onClick={() => toggleCompare(p)}>
                      {compareList.some(cp => cp._id === p._id) ? "Remove" : "Compare"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>

          {paginatedPolicies.length < filteredPolicies.length && (
            <div className="cpage-load-more">
              <button onClick={() => setPage(page + 1)}>Load More</button>
            </div>
          )}

          {/* Compare Fixed Button */}
          {compareList.length > 1 && (
            <div className="cpage-compare-fixed-btn" onClick={() => setIsCompareOpen(true)}>
              Compare ({compareList.length})
            </div>
          )}

          {/* Compare Modal */}
          {isCompareOpen && (
            <CompareModal compareList={compareList} onClose={() => setIsCompareOpen(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
