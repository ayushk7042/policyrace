
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { admin, logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-dashboard-header">
        <h1>🛠 Admin Dashboard</h1>
        <div className="admin-header-actions">
          <span className="admin-name">Hello, {admin?.name || "Admin"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-dashboard-content">
        {/* Sidebar */}
        <aside className="admin-dashboard-sidebar">
          <h3>Navigation</h3>
          <nav>
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
            <Link to="/admin/categories">📂 Manage Categories</Link>
            <Link to="/admin/policies">📑 Manage Policies</Link>
            <Link to="/admin/partners">🤝 Manage Partners</Link>
            <Link to="/admin/applications">📋 User Applications</Link>
           <Link to="/admin/hero">🖼 Manage Hero Sliders</Link>
{/* <Link to="/admin/calculators">🧮 Manage Calculators</Link> */}

            <Link to="/">🌐 Homepage</Link>
          </nav>
        </aside>

        {/* Main Section */}
        <main className="admin-dashboard-main">
          <section className="admin-welcome">
            <h2>Welcome Back, {admin?.name || "Admin"} 👋</h2>
            <p>Here’s a quick overview of your insurance platform.</p>
          </section>

          {/* Summary Cards */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Categories</h3>
              <p>View and manage all categories.</p>
              <Link to="/admin/categories" className="view-btn">Go →</Link>
            </div>

            <div className="dashboard-card">
              <h3>Policies</h3>
              <p>Create, edit, and manage policies.</p>
              <Link to="/admin/policies" className="view-btn">Go →</Link>
            </div>

            <div className="dashboard-card">
              <h3>Partners</h3>
              <p>Manage platform partners.</p>
              <Link to="/admin/partners" className="view-btn">Go →</Link>
            </div>

            <div className="dashboard-card">
              <h3>Applications</h3>
              <p>View all user policy applications.</p>
              <Link to="/admin/applications" className="view-btn">Go →</Link>
            </div>
          </div>

          {/* Status Table */}
          <section className="admin-dashboard-table-section">
            <h3>System Overview</h3>
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Feature</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Category Management</td>
                  <td>✅ Active</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Policy Management</td>
                  <td>✅ Active</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Partner Management</td>
                  <td>✅ Active</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>User Applications</td>
                  <td>✅ Active</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
