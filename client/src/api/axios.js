
//  // ✅ Axios setup
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;




// ✅ Axios setup
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor for both Admin & User
api.interceptors.request.use((config) => {
  // Check both tokens
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  // if (adminToken) {
  //   config.headers.Authorization = `Bearer ${adminToken}`;
  // } else if (userToken) {
  //   config.headers.Authorization = `Bearer ${userToken}`;
  // }

  if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

  return config;

   },
  (error) => Promise.reject(error)
);


export default api;
