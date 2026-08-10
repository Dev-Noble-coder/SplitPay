import api from "../lib/api";
import { User } from "../types/user";
import { SplitsResponse, JoinedSplitsResponse, SplitInfoResponse } from "../types/split";

export async function fetchUserProfile(): Promise<User> {
  const response = await api.post<User>("/profile");
  return response.data;
}

export async function fetchSplits(): Promise<SplitsResponse> {
  const response = await api.get<SplitsResponse>("/get-splits");
  return response.data;
}

export async function fetchMySplits(): Promise<SplitsResponse> {
  const response = await api.get<SplitsResponse>("/userown-split");
  return response.data;
}

export async function fetchJoinedSplits(): Promise<JoinedSplitsResponse> {
  const response = await api.get<JoinedSplitsResponse>("/joined-splits");
  return response.data;
}

export async function fetchSplitInfo(splitCode: string): Promise<SplitInfoResponse> {
  const response = await api.post<SplitInfoResponse>("/split-info", { splitCode });
  return response.data;
}
