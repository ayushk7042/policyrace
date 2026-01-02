// // // src/pages/admin/PartnerManager.jsx
// // import React, { useState, useEffect, useContext } from "react";
// // import { AdminAuthContext } from "../../context/AdminAuthContext";
// // import api from "../../api/axios";
// // import "./PartnerManager.css";

// // const PartnerManager = () => {
// //   const { admin } = useContext(AdminAuthContext);

// //   const [partners, setPartners] = useState([]);
// //   const [form, setForm] = useState({ title: "", iconUrl: "" });
// //   const [loading, setLoading] = useState(true);

// //   // Fetch all partners
// //   const fetchPartners = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/partners");
// //       setPartners(res.data.partners || []);
// //     } catch (err) {
// //       console.error("Error fetching partners", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPartners();
// //   }, []);

// //   // Handle form submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       const headers = { Authorization: `Bearer ${token}` };
// //       const res = await api.post("/partners", form, { headers });
// //       setPartners([res.data.partner, ...partners]);
// //       setForm({ title: "", iconUrl: "" });
// //     } catch (err) {
// //       console.error("Error adding partner", err);
// //       alert("Failed to add partner. Check console.");
// //     }
// //   };

// //   // Handle delete
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this partner?")) return;
// //     try {
// //       const token = localStorage.getItem("adminToken");
// //       const headers = { Authorization: `Bearer ${token}` };
// //       await api.delete(`/partners/${id}`, { headers });
// //       setPartners(partners.filter((p) => p._id !== id));
// //     } catch (err) {
// //       console.error("Error deleting partner", err);
// //     }
// //   };

// //   if (!admin) {
// //     return (
// //       <div className="no-access">
// //         <p>⛔ Access Denied. Please log in as Admin.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="partner-manager-container">
// //       <h1>🤝 Partner Management</h1>

// //       <section className="partner-form-section">
// //         <h2>➕ Add New Partner</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             placeholder="Title"
// //             value={form.title}
// //             onChange={(e) => setForm({ ...form, title: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="text"
// //             placeholder="Icon URL"
// //             value={form.iconUrl}
// //             onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
// //             required
// //           />
// //           <button type="submit">Add Partner</button>
// //         </form>
// //       </section>

// //       <section className="partner-list">
// //         <h2>📋 All Partners</h2>
// //         {loading ? (
// //           <p>Loading partners...</p>
// //         ) : partners.length === 0 ? (
// //           <p>No partners found.</p>
// //         ) : (
// //           <div className="partner-grid">
// //             {partners.map((p) => (
// //               <div key={p._id} className="partner-card">
// //                 <img src={p.iconUrl} alt={p.title} />
// //                 <h3>{p.title}</h3>
// //                 <p className="slug">/{p.slug}</p>
// //                 <div className="actions">
// //                   <button onClick={() => handleDelete(p._id)}>Delete</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // };

// // export default PartnerManager;







// // src/pages/admin/PartnerManager.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import api from "../../api/axios";
// import "./PartnerManager.css";

// const PartnerManager = () => {
//   const { admin } = useContext(AuthContext);

//   const [partners, setPartners] = useState([]);
//   const [selectedPartner, setSelectedPartner] = useState(null);

//   const [partnerForm, setPartnerForm] = useState({
//     title: "",
//     iconUrl: ""
//   });

//   const [articleForm, setArticleForm] = useState({
//     title: "",
//     subTitle: "",
//     description: "",
//     imageUrl: "",
//     link: ""
//   });

//   const token = localStorage.getItem("adminToken");
//   const headers = { Authorization: `Bearer ${token}` };

//   // ---------------- FETCH PARTNERS ----------------
//   const fetchPartners = async () => {
//     const res = await api.get("/partners");
//     setPartners(res.data.partners || []);
//   };

//   useEffect(() => {
//     fetchPartners();
//   }, []);

//   // ---------------- ADD PARTNER ----------------
//   const addPartner = async (e) => {
//     e.preventDefault();
//     const res = await api.post("/partners", partnerForm, { headers });
//     setPartners([res.data.partner, ...partners]);
//     setPartnerForm({ title: "", iconUrl: "" });
//   };

//   // ---------------- DELETE PARTNER ----------------
//   const deletePartner = async (id) => {
//     if (!window.confirm("Delete partner?")) return;
//     await api.delete(`/partners/${id}`, { headers });
//     setPartners(partners.filter(p => p._id !== id));
//   };

//   // ---------------- ADD ARTICLE ----------------
//   const addArticle = async () => {
//     const res = await api.post(
//       `/partners/${selectedPartner._id}/articles`,
//       articleForm,
//       { headers }
//     );

//     setPartners(
//       partners.map(p =>
//         p._id === selectedPartner._id ? res.data.partner : p
//       )
//     );

//     setArticleForm({
//       title: "",
//       subTitle: "",
//       description: "",
//       imageUrl: "",
//       link: ""
//     });
//   };

//   // ---------------- DELETE ARTICLE ----------------
//   const deleteArticle = async (articleId) => {
//     await api.delete(
//       `/partners/${selectedPartner._id}/articles/${articleId}`,
//       { headers }
//     );

//     fetchPartners();
//   };

//   if (!admin) {
//     return <h2>⛔ Admin Login Required</h2>;
//   }

//   return (
//     <div className="partner-manager-container">
//       <h1>🤝 Partner Management</h1>

//       {/* ADD PARTNER */}
//       <form className="partner-form" onSubmit={addPartner}>
//         <input
//           placeholder="Partner Title"
//           value={partnerForm.title}
//           onChange={e =>
//             setPartnerForm({ ...partnerForm, title: e.target.value })
//           }
//           required
//         />
//         <input
//           placeholder="Icon URL"
//           value={partnerForm.iconUrl}
//           onChange={e =>
//             setPartnerForm({ ...partnerForm, iconUrl: e.target.value })
//           }
//           required
//         />
//         <button>Add Partner</button>
//       </form>

//       {/* PARTNER LIST */}
//       <div className="partner-grid">
//         {partners.map(p => (
//           <div key={p._id} className="partner-card">
//             <img src={p.iconUrl} alt={p.title} />
//             <h3>{p.title}</h3>
//             <p>/{p.slug}</p>

//             <button onClick={() => setSelectedPartner(p)}>
//               📰 Manage Articles
//             </button>
//             <button className="danger" onClick={() => deletePartner(p._id)}>
//               ❌ Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ARTICLE MANAGER */}
//       {selectedPartner && (
//         <div className="article-panel">
//           <h2>📰 Articles – {selectedPartner.title}</h2>

//           {/* ADD ARTICLE */}
//           <div className="article-form">
//             <input
//               placeholder="Title"
//               value={articleForm.title}
//               onChange={e =>
//                 setArticleForm({ ...articleForm, title: e.target.value })
//               }
//             />
//             <input
//               placeholder="Sub Title"
//               value={articleForm.subTitle}
//               onChange={e =>
//                 setArticleForm({ ...articleForm, subTitle: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               value={articleForm.description}
//               onChange={e =>
//                 setArticleForm({ ...articleForm, description: e.target.value })
//               }
//             />
//             <input
//               placeholder="Image URL"
//               value={articleForm.imageUrl}
//               onChange={e =>
//                 setArticleForm({ ...articleForm, imageUrl: e.target.value })
//               }
//             />
//             <input
//               placeholder="External Link"
//               value={articleForm.link}
//               onChange={e =>
//                 setArticleForm({ ...articleForm, link: e.target.value })
//               }
//             />
//             <button onClick={addArticle}>➕ Add Article</button>
//           </div>

//           {/* ARTICLE LIST */}
//           <div className="article-list">
//             {selectedPartner.articles?.map(a => (
//               <div key={a._id} className="article-card">
//                 <img src={a.imageUrl} alt={a.title} />
//                 <h4>{a.title}</h4>
//                 <p>{a.subTitle}</p>
//                 <button
//                   className="danger"
//                   onClick={() => deleteArticle(a._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button onClick={() => setSelectedPartner(null)}>
//             ❌ Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PartnerManager;





import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import "./PartnerManager.css";

const PartnerManager = () => {
  const { admin, loading } = useContext(AuthContext);

  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [partnerForm, setPartnerForm] = useState({
    title: "",
    iconUrl: "",
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    link: "",
  });

  // ---------------- FETCH PARTNERS ----------------
  const fetchPartners = async () => {
    try {
      const res = await api.get("/partners");
      setPartners(res.data.partners || []);
    } catch (err) {
      console.error("Fetch partners failed", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // ---------------- ADD PARTNER ----------------
  const addPartner = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/partners", partnerForm);
      setPartners([res.data.partner, ...partners]);
      setPartnerForm({ title: "", iconUrl: "" });
    } catch (err) {
      console.error("Add partner failed", err);
      alert("Failed to add partner");
    }
  };

  // ---------------- DELETE PARTNER ----------------
  const deletePartner = async (id) => {
    if (!window.confirm("Delete partner?")) return;
    try {
      await api.delete(`/partners/${id}`);
      setPartners(partners.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete partner failed", err);
    }
  };

  // ---------------- ADD ARTICLE ----------------
  const addArticle = async () => {
    try {
      const res = await api.post(
        `/partners/${selectedPartner._id}/articles`,
        articleForm
      );

      setPartners(
        partners.map((p) =>
          p._id === selectedPartner._id ? res.data.partner : p
        )
      );

      setArticleForm({
        title: "",
        subTitle: "",
        description: "",
        imageUrl: "",
        link: "",
      });
    } catch (err) {
      console.error("Add article failed", err);
      alert("Failed to add article");
    }
  };

  // ---------------- DELETE ARTICLE ----------------
  const deleteArticle = async (articleId) => {
    try {
      await api.delete(
        `/partners/${selectedPartner._id}/articles/${articleId}`
      );
      fetchPartners();
    } catch (err) {
      console.error("Delete article failed", err);
    }
  };

  // ---------------- AUTH GUARD ----------------
  if (loading) return <p>Loading...</p>;

  if (!admin) {
    return <h2>⛔ Admin Login Required</h2>;
  }

  return (
    <div className="partner-manager-container">
      <h1>🤝 Partner Management</h1>

      {/* ADD PARTNER */}
      <form className="partner-form" onSubmit={addPartner}>
        <input
          placeholder="Partner Title"
          value={partnerForm.title}
          onChange={(e) =>
            setPartnerForm({ ...partnerForm, title: e.target.value })
          }
          required
        />
        <input
          placeholder="Icon URL"
          value={partnerForm.iconUrl}
          onChange={(e) =>
            setPartnerForm({ ...partnerForm, iconUrl: e.target.value })
          }
          required
        />
        <button type="submit">Add Partner</button>
      </form>

      {/* PARTNER LIST */}
      <div className="partner-grid">
        {partners.map((p) => (
          <div key={p._id} className="partner-card">
            <img src={p.iconUrl} alt={p.title} />
            <h3>{p.title}</h3>
            <p>/{p.slug}</p>

            <button onClick={() => setSelectedPartner(p)}>
              📰 Manage Articles
            </button>
            <button className="danger" onClick={() => deletePartner(p._id)}>
              ❌ Delete
            </button>
          </div>
        ))}
      </div>

      {/* ARTICLE MANAGER */}
      {selectedPartner && (
        <div className="article-panel">
          <h2>📰 Articles – {selectedPartner.title}</h2>

          {/* ADD ARTICLE */}
          <div className="article-form">
            <input
              placeholder="Title"
              value={articleForm.title}
              onChange={(e) =>
                setArticleForm({ ...articleForm, title: e.target.value })
              }
            />
            <input
              placeholder="Sub Title"
              value={articleForm.subTitle}
              onChange={(e) =>
                setArticleForm({ ...articleForm, subTitle: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={articleForm.description}
              onChange={(e) =>
                setArticleForm({
                  ...articleForm,
                  description: e.target.value,
                })
              }
            />
            <input
              placeholder="Image URL"
              value={articleForm.imageUrl}
              onChange={(e) =>
                setArticleForm({ ...articleForm, imageUrl: e.target.value })
              }
            />
            <input
              placeholder="External Link"
              value={articleForm.link}
              onChange={(e) =>
                setArticleForm({ ...articleForm, link: e.target.value })
              }
            />
            <button onClick={addArticle}>➕ Add Article</button>
          </div>

          {/* ARTICLE LIST */}
          <div className="article-list">
            {selectedPartner.articles?.map((a) => (
              <div key={a._id} className="article-card">
                <img src={a.imageUrl} alt={a.title} />
                <h4>{a.title}</h4>
                <p>{a.subTitle}</p>
                <button
                  className="danger"
                  onClick={() => deleteArticle(a._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => setSelectedPartner(null)}>❌ Close</button>
        </div>
      )}
    </div>
  );
};

export default PartnerManager;
