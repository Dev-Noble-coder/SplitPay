import axios from "axios";
import { refreshToken } from "../app/services/authService";
import { normalizeEmailFields } from "./normalizationUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach token on requests (cookies are sent automatically via withCredentials)
axiosInstance.interceptors.request.use(
  (config) => {
    // Normalize email fields in payload or params
    if (config.data && !(config.data instanceof FormData)) {
      config.data = normalizeEmailFields(config.data);
    }
    if (config.params) {
      config.params = normalizeEmailFields(config.params);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration (backend handles set-cookie responses silently)
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Standard check for 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Auto-refresh failed → redirecting to login");
        if (typeof window !== "undefined") {
          sessionStorage.clear();
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
