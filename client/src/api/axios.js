
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const adminToken = localStorage.getItem("adminToken");
//     const userToken = localStorage.getItem("token");

//     if (userToken) {
//       config.headers.Authorization = `Bearer ${userToken}`;
//     } else if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const adminToken = localStorage.getItem("adminToken");
//   const userToken = localStorage.getItem("token");

//   // 🔥 ADMIN ROUTES FIRST
//   if (config.url.startsWith("/admin") || config.url.startsWith("/partners")) {
//     if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     }
//   } else if (userToken) {
//     config.headers.Authorization = `Bearer ${userToken}`;
//   }

//   return config;
// });

// export default api;





import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 FIXED INTERCEPTOR
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  // ✅ ADMIN ROUTES (IMPORTANT)
  if (
    config.url.startsWith("/admin") ||
    config.url.startsWith("/policies") ||
    config.url.startsWith("/partners") ||
    config.url.startsWith("/categories") ||
    config.url.startsWith("/applications") ||
    config.url.startsWith("/hero")
  ) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  }
  // ✅ USER ROUTES
  else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default api;
