import { useQuery } from "@tanstack/react-query";
import { 
    fetchUserProfile, 
    fetchSplits, 
    fetchMySplits, 
    fetchJoinedSplits, 
    fetchSplitInfo 
} from "../services/dashboardService";
import DASHBOARD_QUERY_KEYS from "../lib/queryKey";


export function useUserProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.userProfile,
    queryFn: fetchUserProfile,
    ...options,
  });
}

export function useSplits(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.splits,
    queryFn: fetchSplits,
    ...options,
  });
}

export function useMySplits(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.mySplits,
    queryFn: fetchMySplits,
    ...options,
  });
}

export function useJoinedSplits(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.joinedSplits,
    queryFn: fetchJoinedSplits,
    ...options,
  });
}

export function useSplitInfo(splitCode: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.splitInfo(splitCode),
    queryFn: () => fetchSplitInfo(splitCode),
    enabled: !!splitCode && (options?.enabled ?? true),
  });
}
