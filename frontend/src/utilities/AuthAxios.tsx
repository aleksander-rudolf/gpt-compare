import axios from "axios";

// Create an instance of axios
const authAxios = axios.create({
  baseURL:
    import.meta.env.VITE_ENVIRONMENT === "prod"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV,
});

// Setup an interceptor to inject the token into headers of each request
authAxios.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage

    const token = localStorage.getItem("token");

    // If token is found, set the Authorization header
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
