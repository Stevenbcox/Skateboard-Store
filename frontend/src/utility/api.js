import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({ baseURL: `${import.meta.env.VITE_BASE_URL}/api` });

// Add an interceptor to include the token in every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Export API functions
export const fetchAccount = () => API.get("/account");
export const updatePassword = (password) =>
  API.put("/account/password", { password });
export const fetchSkateboards = () => API.get("/skateboards");
export const fetchSingleSkateboard = (id) => API.get(`/skateboards/${id}`);
