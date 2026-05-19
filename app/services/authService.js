import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "https://splitpay-na1g.onrender.com";

export async function login(userData) {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, {
        withCredentials : true,
    });
    const data = response.data;
    console.log("Login response data:", data);
    return data;
}

export async function createUser(userData) {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        withCredentials : true,
    });
    const data = response.data;
    console.log("Create user response data:", data);
    return data;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

/**
 * Sets or removes the access token and user role in session storage.
 */
export function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
}