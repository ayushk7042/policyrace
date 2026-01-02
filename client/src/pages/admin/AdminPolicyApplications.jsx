


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
