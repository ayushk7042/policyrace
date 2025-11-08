// // // // src/pages/admin/AdminPolicyApplications.jsx
// // // import React, { useState, useEffect, useContext } from "react";
// // // import api from "../../api/axios";
// // // import { AdminAuthContext } from "../../context/AdminAuthContext";
// // // import "./AdminPolicyApplications.css";

// // // const AdminPolicyApplications = () => {
// // //   const { admin } = useContext(AdminAuthContext);
// // //   const [applications, setApplications] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchApplications = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem("adminToken");
// // //       const headers = { Authorization: `Bearer ${token}` };
// // //       const res = await api.get("/applications/admin", { headers });
// // //       setApplications(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching applications", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchApplications();
// // //   }, []);

// // //   const handleStatusChange = async (id, newStatus) => {
// // //     try {
// // //       const token = localStorage.getItem("adminToken");
// // //       const headers = { Authorization: `Bearer ${token}` };
// // //       await api.put(`/applications/${id}/status`, { status: newStatus }, { headers });
// // //       // update local state
// // //       setApplications(applications.map(app => app._id === id ? { ...app, status: newStatus } : app));
// // //     } catch (err) {
// // //       console.error("Error updating status", err);
// // //       alert("Failed to update status");
// // //     }
// // //   };

// // //   if (!admin) {
// // //     return (
// // //       <div className="no-access">
// // //         <p>⛔ Access Denied. Please log in as Admin.</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="admin-applications-container">
// // //       <h1>📋 User Policy Applications</h1>
// // //       {loading ? (
// // //         <p>Loading applications...</p>
// // //       ) : applications.length === 0 ? (
// // //         <p>No applications found.</p>
// // //       ) : (
// // //         <div className="applications-grid">
// // //           {applications.map((app) => (
// // //             <div key={app._id} className="application-card">
// // //               <h3>User: {app.user?.name} ({app.user?.email})</h3>
// // //               <p><strong>Policy:</strong> {app.policy?.title}</p>
// // //               {app.appliedPriceOption && (
// // //                 <p>
// // //                   <strong>Price Option:</strong> {app.appliedPriceOption.price} {app.appliedPriceOption.currency} ({app.appliedPriceOption.billingCycle})
// // //                 </p>
// // //               )}
// // //               <p><strong>Status:</strong> {app.status}</p>
// // //               <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>

// // //               {app.quizAnswers && app.quizAnswers.length > 0 && (
// // //                 <div className="quiz-answers">
// // //                   <h4>Quiz Answers:</h4>
// // //                   <ul>
// // //                     {app.quizAnswers.map((qa, idx) => (
// // //                       <li key={idx}>
// // //                         QuizID: {qa.quizId} | Selected: {qa.selectedOptionIndex} | Correct: {qa.correct ? "✅" : "❌"}
// // //                       </li>
// // //                     ))}
// // //                   </ul>
// // //                 </div>
// // //               )}

// // //               <div className="actions">
// // //                 {app.status !== "approved" && (
// // //                   <button onClick={() => handleStatusChange(app._id, "approved")}>Approve ✅</button>
// // //                 )}
// // //                 {app.status !== "rejected" && (
// // //                   <button onClick={() => handleStatusChange(app._id, "rejected")}>Reject ❌</button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdminPolicyApplications;



// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import { toast } from "react-toastify";
// // import { FaCheck, FaTimes, FaTrash, FaInfoCircle } from "react-icons/fa";
// // import "./AdminPolicyApplications.css";

// // const AdminPolicyApplication = () => {
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // ✅ Fetch all user policy applications (admin-only)
// //   const fetchApplications = async () => {
// //     try {
// //       const res = await api.get("/api/admin/policies", {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       });
// //       setApplications(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to fetch applications");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchApplications();
// //   }, []);

// //   // ✅ Update status (Approve/Reject)
// //   const handleStatusChange = async (id, status) => {
// //     try {
// //       await api.patch(
// //         `/api/admin/policies/${id}`,
// //         { status },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );
// //       toast.success(`Application ${status} successfully`);
// //       fetchApplications();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Status update failed");
// //     }
// //   };

// //   // ✅ Delete application
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure to delete this application?")) return;
// //     try {
// //       await api.delete(`/api/admin/policies/${id}`, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       });
// //       toast.info("Application deleted");
// //       setApplications(applications.filter((app) => app._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Delete failed");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
// //         Loading applications...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
// //         🧾 User Policy Applications (Admin Panel)
// //       </h2>

// //       {applications.length === 0 ? (
// //         <p className="text-center text-gray-600">No applications found.</p>
// //       ) : (
// //         <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
// //           <table className="min-w-full border border-gray-200">
// //             <thead className="bg-gray-100 text-gray-700">
// //               <tr>
// //                 <th className="p-3 border">Name</th>
// //                 <th className="p-3 border">Email</th>
// //                 <th className="p-3 border">Policy Type</th>
// //                 <th className="p-3 border">Status</th>
// //                 <th className="p-3 border">Applied On</th>
// //                 <th className="p-3 border text-center">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {applications.map((app) => (
// //                 <tr key={app._id} className="hover:bg-gray-50 transition">
// //                   <td className="p-3 border">{app.name}</td>
// //                   <td className="p-3 border">{app.email}</td>
// //                   <td className="p-3 border">{app.policyType}</td>
// //                   <td className="p-3 border">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm ${
// //                         app.status === "Approved"
// //                           ? "bg-green-100 text-green-700"
// //                           : app.status === "Rejected"
// //                           ? "bg-red-100 text-red-700"
// //                           : "bg-yellow-100 text-yellow-700"
// //                       }`}
// //                     >
// //                       {app.status}
// //                     </span>
// //                   </td>
// //                   <td className="p-3 border">
// //                     {new Date(app.createdAt).toLocaleDateString()}
// //                   </td>
// //                   <td className="p-3 border text-center space-x-3">
// //                     <button
// //                       onClick={() => handleStatusChange(app._id, "Approved")}
// //                       className="text-green-600 hover:text-green-800"
// //                       title="Approve"
// //                     >
// //                       <FaCheck />
// //                     </button>
// //                     <button
// //                       onClick={() => handleStatusChange(app._id, "Rejected")}
// //                       className="text-red-600 hover:text-red-800"
// //                       title="Reject"
// //                     >
// //                       <FaTimes />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(app._id)}
// //                       className="text-gray-500 hover:text-black"
// //                       title="Delete"
// //                     >
// //                       <FaTrash />
// //                     </button>
// //                     <button
// //                       onClick={() => alert(JSON.stringify(app, null, 2))}
// //                       className="text-blue-600 hover:text-blue-800"
// //                       title="View Details"
// //                     >
// //                       <FaInfoCircle />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPolicyApplication;


// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { toast } from "react-toastify";
// import {
//   FaCheck,
//   FaTimes,
//   FaTrash,
//   FaInfoCircle,
//   FaSearch,
// } from "react-icons/fa";
// import "./AdminPolicyApplications.css";

// const AdminPolicyApplication = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Fetch all policy applications (admin-only)
//   const fetchApplications = async () => {
//     try {
//       const res = await api.get("/admin/policies");
//       setApplications(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       toast.error("Failed to fetch policy applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   // ✅ Update status (Approve/Reject)
//   const handleStatusChange = async (id, status) => {
//     try {
//       await api.patch(`/admin/policies/${id}`, { status });
//       toast.success(`Application ${status} successfully`);
//       fetchApplications();
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Status update failed");
//     }
//   };

//   // ✅ Delete application
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this application?")) return;
//     try {
//       await api.delete(`/admin/policies/${id}`);
//       toast.info("Application deleted");
//       setApplications(applications.filter((app) => app._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//       toast.error("Delete failed");
//     }
//   };

//   // ✅ Filtered search
//   const filteredApps = applications.filter(
//     (app) =>
//       app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.policyType?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ Loader UI
//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="spinner"></div>
//         <p>Loading applications...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-policy-wrapper">
//       <h2 className="admin-heading">🧾 User Policy Applications (Admin Panel)</h2>

//       {/* 🔍 Search Bar */}
//       <div className="search-bar">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search by name, email, or policy type..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {filteredApps.length === 0 ? (
//         <p className="no-data">No applications found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Policy Type</th>
//                 <th>Status</th>
//                 <th>Applied On</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApps.map((app) => (
//                 <tr key={app._id}>
//                   <td>{app.name}</td>
//                   <td>{app.email}</td>
//                   <td>{app.policyType}</td>
//                   <td>
//                     <span
//                       className={`status-badge ${
//                         app.status === "Approved"
//                           ? "approved"
//                           : app.status === "Rejected"
//                           ? "rejected"
//                           : "pending"
//                       }`}
//                     >
//                       {app.status}
//                     </span>
//                   </td>
//                   <td>{new Date(app.createdAt).toLocaleDateString()}</td>
//                   <td className="actions">
//                     <button
//                       onClick={() => handleStatusChange(app._id, "Approved")}
//                       className="icon-btn approve"
//                       title="Approve"
//                     >
//                       <FaCheck />
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(app._id, "Rejected")}
//                       className="icon-btn reject"
//                       title="Reject"
//                     >
//                       <FaTimes />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(app._id)}
//                       className="icon-btn delete"
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                     <button
//                       onClick={() =>
//                         alert(JSON.stringify(app, null, 2))
//                       }
//                       className="icon-btn view"
//                       title="View Details"
//                     >
//                       <FaInfoCircle />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPolicyApplication;



import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrash, FaInfoCircle, FaSearch } from "react-icons/fa";
import "./AdminPolicyApplications.css";

const AdminPolicyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all user policy applications (admin-only)
  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Update status (Approve/Reject)
  const handleStatusChange = async (id, status) => {
    try {
      await api.put(
        `/applications/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      toast.success(`Application ${status} successfully`);
      fetchApplications();
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Status update failed");
    }
  };

  // ✅ Delete application (optional — only if backend supports it)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await api.delete(`/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.info("Application deleted");
      setApplications(applications.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed");
    }
  };

  // ✅ Filtered search
  const filteredApps = applications.filter((app) => {
    const userName = app.user?.name || "";
    const userEmail = app.user?.email || "";
    const policyName = app.policy?.title || "";

    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-policy-wrapper">
      <h2 className="admin-heading">🧾 User Policy Applications (Admin Panel)</h2>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by user, email, or policy..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredApps.length === 0 ? (
        <p className="no-data">No applications found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Policy</th>
                <th>Status</th>
                <th>Applied On</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app._id}>
                  <td>{app.user?.name}</td>
                  <td>{app.user?.email}</td>
                  <td>{app.policy?.title}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        app.status === "Approved"
                          ? "approved"
                          : app.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleStatusChange(app._id, "Approved")}
                      className="icon-btn approve"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "Rejected")}
                      className="icon-btn reject"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="icon-btn delete"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => alert(JSON.stringify(app, null, 2))}
                      className="icon-btn view"
                      title="View Details"
                    >
                      <FaInfoCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPolicyApplication;
