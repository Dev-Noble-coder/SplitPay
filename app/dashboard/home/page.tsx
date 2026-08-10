"use client"

import { isLoggedIn } from "../../services/authService";
import { useSplits, useUserProfile } from "@/app/hooks/useDashboard";
import MobileNav from "@/app/components/MobileNav";
import Header from "@/app/components/Header";
import BalanceCard from "@/app/components/BalanceCard";
import CreateandViewMoreSplit from "@/app/components/CreateandViewMoreSplit";
import JoinASplit from "@/app/components/JoinASplit";
import SplitsClosingSoon from "@/app/components/SplitsClosingSoon";
import MySplitsContent from "@/app/components/MySplitsContent";
import JoinedSplitsContent from "@/app/components/JoinedSplitsContent";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: userResponse, isLoading: loadingUser } = useUserProfile({
    enabled: mounted ? isLoggedIn() : false,
  });

  const { data: splitsResponse } = useSplits({
    enabled: mounted ? isLoggedIn() : false,
  });

  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const user = (userResponse as any)?.userInformation || userResponse;
  const splitsCount: number = (splitsResponse as any)?.splitsfound ?? 0;

  if (!mounted || loadingUser) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-[#0A50E4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 mt-4 font-medium text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Header 
        user={user} 
        activeTab={activeTab} 
        onTabChange={(index) => {
          setActiveTab(index);
          swiperRef.current?.slideTo(index);
        }} 
      />
      <div className="flex-1 min-h-0 w-full relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
          className="w-full h-full"
          spaceBetween={24}
        >
          <SwiperSlide className="overflow-y-auto h-full pb-24 no-scrollbar">
            <BalanceCard />
            <CreateandViewMoreSplit onViewMore={() => {
              setActiveTab(1);
              swiperRef.current?.slideTo(1);
            }} />
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
          </SwiperSlide>
          <SwiperSlide className="overflow-y-auto h-full pb-24 no-scrollbar">
            <MySplitsContent />
          </SwiperSlide>
          <SwiperSlide className="overflow-y-auto h-full pb-24 no-scrollbar">
            <JoinedSplitsContent />
          </SwiperSlide>
        </Swiper>
      </div>
      <MobileNav />
    </>
  );
}
