import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

export async function login(userData) {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, {
        withCredentials : true,
    });
    const data = response.data;
    return data;
}

export async function createUser(userData) {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        withCredentials : true,
    });
    const data = response.data;
    return data;
}

/**
 * Checks if the user is logged in (non-sensitive check for routing protection).
 */
export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("isLoggedIn") === "true";
}

/**
 * Sets or removes the logged-in status in session storage.
 */
export function setLoggedIn(status) {
  if (typeof window === "undefined") return;
  if (status) {
    sessionStorage.setItem("isLoggedIn", "true");
  } else {
    sessionStorage.removeItem("isLoggedIn");
  }
}

/**
 * Sends a refresh token request (backend automatically returns new HTTP-Only cookies).
 */
export async function refreshToken() {
  const response = await axios.post(`${API_BASE_URL}/refresh`, {}, {
    withCredentials: true,
  });
  return response.data;
}