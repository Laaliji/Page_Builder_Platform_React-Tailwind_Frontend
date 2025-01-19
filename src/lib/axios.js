import axios from "axios";

// Set default configs
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

// Add a response interceptor to handle common errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      toast.error("Please login to continue");
    }
    return Promise.reject(error);
  }
);

export default axios;
