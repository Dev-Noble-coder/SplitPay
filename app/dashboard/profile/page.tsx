"use client";

import { useRouter } from "next/navigation";
import { useUserProfile } from "@/app/hooks/useDashboard";
import { isLoggedIn } from "@/app/services/authService";
import { ArrowLeft, Camera, ArrowRight2 } from "iconsax-react";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("PERSONAL");
  const [visibility, setVisibility] = useState(true);

  const { data: userResponse, isLoading } = useUserProfile({
    enabled: isLoggedIn(),
  });

  const user = (userResponse as any)?.userInformation || userResponse;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#0A50E4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Fallback demo info
  const fullName = user?.fullName || "Favour Adebayo";
  const username = user?.username || `@${fullName.toLowerCase().replace(/\s+/g, '')}637`;
  const nextOfKin = "Daniel";
  const gender = "Male";
  const dob = "October 17, 2000";

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button onClick={() => router.back()} className="mb-6 hover:text-[#0A50E4] transition-colors">
          <ArrowLeft size="24" variant="Outline" color="#0B355B" className="hover:text-[#0A50E4]" />
        </button>
        <h1 className="text-[28px] font-bold text-blue-950">Profile</h1>
      </div>

      {/* Tabs */}
      <div className="flex w-full border-b border-gray-100">
        {["PERSONAL", "SECURITY", "BEHAVIOUR"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-[13px] font-bold pb-3 text-center transition-colors ${
              activeTab === tab
                ? "text-[#0A50E4] border-b-2 border-[#0A50E4]"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-24 h-24 rounded-full bg-amber-500 overflow-hidden mb-4 shadow-sm border-2 border-white">
            {/* Demo Image Placeholder */}
            <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-amber-400 opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Camera size="32" color="#FFFFFF" variant="Outline" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-blue-950">{fullName}</h2>
          
          <div className="mt-2 flex items-center gap-1.5 bg-[#fce7f3] px-4 py-1.5 rounded-full cursor-pointer hover:bg-pink-100 transition-colors">
            <div className="w-4 h-4 rounded-full bg-[#831843] flex items-center justify-center relative">
               <div className="w-1.5 h-1.5 bg-white rounded-full absolute right-0 top-0 transform translate-x-[20%] -translate-y-[20%]"></div>
            </div>
            <span className="text-sm font-bold text-[#831843]">Seed <span className="ml-1 text-xs">›</span></span>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-8">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Account Details</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-gray-600">Username</span>
              <span className="text-[15px] font-bold text-[#0A50E4]">{username}</span>
            </div>
            
            <hr className="border-gray-50" />
            
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="text-[15px] text-gray-600">Next of Kin</span>
              <div className="flex items-center gap-1 text-[#0A50E4] group-hover:text-blue-700 transition-colors">
                <span className="text-[15px] font-bold">{nextOfKin}</span>
                <ArrowRight2 size="16" variant="Outline" />
              </div>
            </div>
            
            <hr className="border-gray-50" />
            
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-gray-600">Gender</span>
              <span className="text-[15px] font-medium text-gray-400">{gender}</span>
            </div>
            
            <hr className="border-gray-50" />
            
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-gray-600">Date of Birth</span>
              <span className="text-[15px] font-medium text-gray-400">{dob}</span>
            </div>
            
            <hr className="border-gray-50" />
          </div>
        </div>

        {/* Additional Details */}
        <div className="mb-8">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Additional Details</h3>
          <button className="flex items-center gap-1 text-[13px] font-bold text-[#0A50E4] hover:text-blue-700 transition-colors tracking-wide uppercase">
            See More Information
            <ArrowRight2 size="14" variant="Outline" />
          </button>
          <hr className="border-gray-50 mt-6" />
        </div>

        {/* Account Visibility */}
        <div className="mb-4">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Account Visibility</h3>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[14px] text-gray-600 leading-snug">
              Enable my account to be discovered by friends.
            </span>
            
            {/* Toggle Switch */}
            <button 
              onClick={() => setVisibility(!visibility)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${visibility ? "bg-[#0A50E4]" : "bg-gray-200"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${visibility ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <hr className="border-gray-50 mt-6" />
        </div>
      </div>

      {/* Save Changes Button (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50">
        <button className="w-full bg-[#0A50E4] hover:bg-blue-700 text-white font-bold py-4 rounded-full shadow shadow-blue-500/20 transition-all active:scale-[0.98] text-sm">
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
}
