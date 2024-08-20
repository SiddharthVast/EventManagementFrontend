import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  timeout: 10000, // Optional: Set a request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Use 'Authorization' for the header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login.");
      // Handle unauthorized access, e.g., redirect to login or clear the token
      sessionStorage.removeItem("token");
      // Redirect logic or state management can be added here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
