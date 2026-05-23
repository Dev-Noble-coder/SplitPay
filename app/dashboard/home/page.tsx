"use client"

import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../../services/authService";
import axiosInstance from "@/utils/axiosInstance";
import MobileNav from "@/app/components/MobileNav";
import Header from "@/app/components/Header";
import BalanceCard from "@/app/components/BalanceCard";

export default function DashboardHome() {
  const { data: userResponse, isLoading: loadingUser } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await axiosInstance.post("/profile");
      return response.data;
    },
    enabled: isLoggedIn(),
  });
  
  const user = userResponse?.userInformation || userResponse;

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
      </div>
      <MobileNav />
    </>
  );
}
