// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import "./Policies.css";

// const Policies = () => {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const res = await api.get("/policies");
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.policies || [];
//         setPolicies(data);
//       } catch (err) {
//         console.error("Error fetching policies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicies();
//   }, []);

//   const filteredPolicies = policies.filter((p) =>
//     p.title?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="policies-page">
//       <h1 className="policies-heading">All Insurance Policies</h1>
//       <p className="policies-subtext">
//         Explore all available Life, Health, Vehicle, and Investment policies at one place.
//       </p>

//       {/* 🔍 Search Box */}
//       <div className="policy-search">
//         <input
//           type="text"
//           placeholder="Search policy name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading policies...</p>
//       ) : filteredPolicies.length === 0 ? (
//         <p className="no-policies">No matching policies found.</p>
//       ) : (
//         <div className="policies-grid">
//           {filteredPolicies.map((p) => (
//             <div
//               className="policy-card"
//               key={p._id}
//               onClick={() => navigate(`/policy/${p._id}`)}
//             >
//               <div className="policy-image">
//                 <img
//                   src={p.imageUrl || p.image || "https://via.placeholder.com/150"}
//                   alt={p.title}
//                 />
//               </div>
//               <div className="policy-details">
//                 <h3>{p.title}</h3>
//                 <p className="policy-category">
//                   {p.category?.name || "General Insurance"}
//                 </p>
//                 <div className="policy-stats">
//                   <span>💰 Life Cover: {p.lifeCover || "N/A"}</span>
//                   <span>⚡ Claim: {p.claimSettlement || "N/A"}%</span>
//                 </div>
//                 <button className="view-btn">View Details</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Policies;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Policies.css";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await api.get("/policies");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.policies || [];
        setPolicies(data);
      } catch (err) {
        console.error("Error fetching policies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  // 🔍 Search + Filter + Sort logic
  const filteredPolicies = policies
    .filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      selectedCategory === "All"
        ? true
        : p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
    )
    .sort((a, b) => {
      if (sortOption === "claim") return b.claimSettlement - a.claimSettlement;
      if (sortOption === "lifeCover") return b.lifeCover - a.lifeCover;
      if (sortOption === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="policies-page">
      <h1 className="policies-heading">All Insurance Policies</h1>
      <p className="policies-subtext">
        Compare and explore all life, health, motor, and investment plans at one place.
      </p>

      <div className="filters-container">
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search policy name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-search"
        />

        {/* 🧩 Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          <option value="Life Insurance">Life Insurance</option>
          <option value="Health Insurance">Health Insurance</option>
          <option value="Motor Insurance">Motor Insurance</option>
          <option value="Investment Plans">Investment Plans</option>
        </select>

        {/* 🔽 Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
        >
          <option value="none">Sort by</option>
          <option value="claim">Claim % (High to Low)</option>
          <option value="lifeCover">Life Cover (High to Low)</option>
          <option value="az">A-Z Order</option>
        </select>
      </div>

      {/* 🧾 Policy Count */}
      <p className="policy-count">
        Showing {filteredPolicies.length} of {policies.length} policies
      </p>

      {loading ? (
        <p className="loading-text">Loading policies...</p>
      ) : filteredPolicies.length === 0 ? (
        <p className="no-policies">No matching policies found.</p>
      ) : (
        <div className="policies-grid">
          {filteredPolicies.map((p) => (
            <div
              className="policy-card"
              key={p._id}
              onClick={() => navigate(`/policy/${p._id}`)}
            >
              <div className="policy-image">
                <img
                  src={p.imageUrl || p.image || "https://via.placeholder.com/150"}
                  alt={p.title}
                />
              </div>

              <div className="policy-details">
                <h3>{p.title}</h3>
                <p className="policy-category">
                  {p.category?.name || "General Insurance"}
                </p>

                <div className="policy-stats">
                  <span>💰 Life Cover: {p.lifeCover || "N/A"}</span>
                  <span>⚡ Claim: {p.claimSettlement || "N/A"}%</span>
                </div>

                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Policies;
