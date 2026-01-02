


// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { AdminAuthProvider } from "./context/AdminAuthContext";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
// // Admin pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminLogin from "./pages/admin/AdminLogin";
// import CategoryManager from "./pages/admin/CategoryManager";

// const App = () => {
//   return (
//     <AuthProvider>
//       <AdminAuthProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             {/* User Routes */}
//             <Route path="/" element={<Home />} />

//             {/* Admin Routes */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//              {/* Protected Admin Routes */}
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminProtectedRoute>
//                 <AdminDashboard />
//               </AdminProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/categories"
//             element={
//               <AdminProtectedRoute>
//                 <CategoryManager />
//               </AdminProtectedRoute>
//             }
//           />
//           </Routes>
//         </Router>
//       </AdminAuthProvider>
//     </AuthProvider>
//   );
// };

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Admin Components
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import CategoryManager from "./pages/admin/CategoryManager";
import PolicyManager from "./pages/admin/PolicyManager"; // ✅ new import
import PartnerManager from "./pages/admin/PartnerManager";
import AdminPolicyApplications from "./pages/admin/AdminPolicyApplications";
import AdminHero from "./pages/admin/AdminHero";
import AdminCalculatorPanel from "./pages/admin/AdminCalculatorPanel";
import KnowMore from "./pages/KnowMore";




import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CategoryPage from "./pages/CategoryPage";
import PolicyDetails from "./pages/PolicyDetails";
import Calculator from "./pages/Calculator";
import Policies from "./pages/Policies";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import CategoriesPage from "./pages/Categories";
import BlogPage from "./pages/BlogPage";
import TermsPage from "./pages/TermsPage";
import PartnerPost from "./pages/PartnerPost";
import Footer from "./components/Footer";
import WhyChooseUs from "./pages/WhyChooseUs";


const App = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Navbar />

          <Routes>
            {/* 🌐 User Routes */}
            <Route path="/" element={<Home />} />
 <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
<Route path="/category/:id" element={<CategoryPage />} />
<Route path="/policy/:id" element={<PolicyDetails />} />
<Route path="/calculator" element={<Calculator />} />
<Route path="/policies" element={<Policies />} />
<Route path="/partners" element={<Partners />} />
<Route path="/contact" element={<Contact />} />
<Route path="/categories" element={<CategoriesPage />} />
<Route path="/blog" element={<Partners />} />
<Route path="/terms" element={<TermsPage />} />
<Route path="/post/:slug" element={<PartnerPost />} />

<Route path="/know-more" element={<KnowMore />} />

<Route path="/why-choose-us" element={<WhyChooseUs />} />



            {/* 🔐 Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 🧩 Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

 <Route
              path="/admin/hero"
              element={
                <AdminProtectedRoute>
                  <AdminHero />
                </AdminProtectedRoute>
              }
            />

<Route
              path="/admin/calculators"
              element={
                <AdminProtectedRoute>
                  <AdminCalculatorPanel />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/categories"
              element={
                <AdminProtectedRoute>
                  <CategoryManager />
                </AdminProtectedRoute>
              }
            />

<Route
  path="/admin/applications"
  element={
    <AdminProtectedRoute>
      <AdminPolicyApplications />
    </AdminProtectedRoute>
  }
/>


            <Route
  path="/admin/partners"
  element={
    <AdminProtectedRoute>
      <PartnerManager />
    </AdminProtectedRoute>
  }
/>

            <Route
              path="/admin/policies"
              element={
                <AdminProtectedRoute>
                  <PolicyManager />
                </AdminProtectedRoute>
              }
            />
          </Routes>

 <Footer /> 

        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

export default App;
