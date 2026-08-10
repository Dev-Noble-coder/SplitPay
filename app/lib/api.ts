import axios, { InternalAxiosRequestConfig } from "axios";
import { normalizeEmailFields } from "../../utils/normalizationUtils";

// Fallback to localhost if the env variable is not set
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },   
});

// Attach token on requests (cookies are sent automatically via withCredentials)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Standard check for 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${API_BASE_URL}/refresh-token`, {}, {
            withCredentials: true,
        });
        return api(originalRequest);
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

export default api;