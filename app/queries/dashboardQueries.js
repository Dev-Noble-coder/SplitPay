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
  mySplits: ["mySplits"],
  joinedSplits: ["joinedSplits"],
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

/**
 * Fetch the splits created by the currently authenticated user.
 * GET /userown-split
 * Response: { message, splitsfound, split: [{ _id, name, priceForSplit }] }
 */
export async function fetchMySplits() {
  const response = await axiosInstance.get("/userown-split");
  return response.data;
}

/**
 * Fetch the split groups the authenticated user is currently a member of.
 * GET /joined-splits
 * Response: { message, totalsplitjoined, splitJoined: [{ _id, splitname, splitCode, userId, username, approved }] }
 */
export async function fetchJoinedSplits() {
  const response = await axiosInstance.get("/joined-splits");
  return response.data;
}
