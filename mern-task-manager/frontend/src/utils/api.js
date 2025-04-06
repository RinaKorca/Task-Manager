// frontend/utils/api.js
import axios from "axios";

// Assuming the base URL is localhost:5000
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if necessary
});

// Add the token to the Authorization header for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to header
  }
  return config;
});

export default API;
