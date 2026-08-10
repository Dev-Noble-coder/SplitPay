import api from "../lib/api";
import { AuthResponse } from "../types/auth";

export async function login(userData: Record<string, any>): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/login", userData);
    return response.data;
}

export async function createUser(userData: Record<string, any>): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/register", userData);
    return response.data;
}

/**
 * Checks if the user is logged in (non-sensitive check for routing protection).
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("isLoggedIn") === "true";
}

/**
 * Sets or removes the logged-in status in session storage.
 */
export function setLoggedIn(status: boolean): void {
  if (typeof window === "undefined") return;
  if (status) {
    sessionStorage.setItem("isLoggedIn", "true");
  } else {
    sessionStorage.removeItem("isLoggedIn");
  }
}

// Note: refreshToken is now handled directly inside lib/api.ts interceptors.
// If you still need a manual refresh token function, you can call it here.
export async function refreshToken(): Promise<any> {
  const response = await api.post("/refresh-token");
  return response.data;
}
