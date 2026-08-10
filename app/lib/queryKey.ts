const DASHBOARD_QUERY_KEYS = {
  userProfile: ["userProfile"] as const,
  splits: ["splits"] as const,
  mySplits: ["mySplits"] as const,
  joinedSplits: ["joinedSplits"] as const,
  splitInfo: (code: string) => ["splitInfo", code] as const,
};

export default DASHBOARD_QUERY_KEYS;