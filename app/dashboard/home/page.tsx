"use client"

import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../../services/authService";
import { fetchUserProfile, fetchSplits, QUERY_KEYS } from "@/app/queries/dashboardQueries";
import MobileNav from "@/app/components/MobileNav";
import Header from "@/app/components/Header";
import BalanceCard from "@/app/components/BalanceCard";
import CreateandViewMoreSplit from "@/app/components/CreateandViewMoreSplit";
import JoinASplit from "@/app/components/JoinASplit";
import SplitsClosingSoon from "@/app/components/SplitsClosingSoon";

export default function DashboardHome() {
  const { data: userResponse, isLoading: loadingUser } = useQuery({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: fetchUserProfile,
    enabled: isLoggedIn(),
  });

  const { data: splitsResponse } = useQuery({
    queryKey: QUERY_KEYS.splits,
    queryFn: fetchSplits,
    enabled: isLoggedIn(),
  });

  const user = userResponse?.userInformation || userResponse;
  const splitsCount: number = splitsResponse?.splitsfound ?? 0;

  if (loadingUser) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 mt-4 font-medium text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Header user={user} />
      <div className="flex-1 overflow-y-auto pb-24">
        <BalanceCard />
        <CreateandViewMoreSplit />
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl text-blue-950">Splits Closing Soon</h2>
            {splitsCount > 0 && (
              <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs font-bold rounded-full">
                {splitsCount}
              </span>
            )}
          </div>
          <SplitsClosingSoon />
        </div>
        <JoinASplit />
      </div>
      <MobileNav />
    </>
  );
}
