/**
 * dashboardQueries.js
 * -------------------
 * Central place for all TanStack Query keys and fetcher functions
 * used across the SplitPay dashboard. Import from here rather than
 * defining inline axiosInstance calls in every page/component.
 */

import axiosInstance from "@/utils/axiosInstance";

// ─── Query Keys ────────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  userProfile: ["userProfile"],
  splits: ["splits"],
};

// ─── Fetchers ──────────────────────────────────────────────────────────────────

/**
 * Fetch the currently authenticated user's profile.
 * POST /profile
 */
export async function fetchUserProfile() {
  const response = await axiosInstance.post("/profile");
  return response.data;
}

/**
 * Fetch all publicly available split groups.
 * GET /get-splits
 * Response: { message, splitsfound, availableSplit: [{ _id, name, priceForSplit }] }
 */
export async function fetchSplits() {
  const response = await axiosInstance.get("/get-splits");
  return response.data;
}
