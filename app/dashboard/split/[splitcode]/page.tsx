"use client";

import { useParams, useRouter } from "next/navigation";
import { useJoinedSplits, useSplitInfo } from "@/app/hooks/useDashboard";
import { isLoggedIn } from "@/app/services/authService";
import { ArrowLeft, UserTick, People, Timer1, User, TickCircle, Information } from "iconsax-react";
import { motion } from "framer-motion";

export default function SplitDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const splitCode = params.splitcode as string;

  const {
    data: infoResponse,
    isLoading,
    isError,
  } = useSplitInfo(splitCode, {
    enabled: !!splitCode,
  });

  const { data: joinedSplitsResponse } = useJoinedSplits({
    enabled: isLoggedIn(),
  });

  const joinedSplits = joinedSplitsResponse?.splitJoined ?? [];
  const isMember = joinedSplits.some((s: any) => s.splitCode === splitCode);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-200 z-10 sticky top-0">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size="24" variant="Outline" color="var(--color-navy)" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-navy leading-tight">Split Details</h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-widest">
              Code: {splitCode}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6 max-w-2xl mx-auto w-full">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            <div className="w-full h-32 bg-white rounded-md animate-pulse border border-gray-200" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-white rounded-md animate-pulse border border-gray-200" />
              <div className="h-24 bg-white rounded-md animate-pulse border border-gray-200" />
            </div>
            <div className="w-full h-48 bg-white rounded-md animate-pulse border border-gray-200" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 bg-white border border-red-200 rounded-md text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <Timer1 size="32" color="#ef4444" variant="Bold" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Oops!</h3>
              <p className="text-sm text-red-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
                Could not load details for this split. It may not exist or you might be offline.
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="mt-2 px-6 py-2 bg-red-50 hover:bg-red-100 transition-colors text-red-600 text-sm font-bold rounded-full"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && infoResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Creator Info Card */}
            <div className="bg-gradient-to-br from-navy to-primary rounded-md p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <People size="120" color="#ffffff" variant="Bold" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-4">
                  <User size="16" color="#ffffff" variant="Bold" />
                  <span className="text-xs font-semibold tracking-wide">CREATOR</span>
                </div>
                <h2 className="text-3xl font-extrabold mb-1">
                  {infoResponse.creatorName || "Unknown Creator"}
                </h2>
                <p className="text-blue-100 text-sm flex items-center gap-1.5 mt-2">
                  <TickCircle size="16" variant="Bold" className="text-green-400" />
                  Verified Organizer
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="bg-white p-5 rounded-md border border-gray-200 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <People size="20" color="var(--color-primary)" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Estimated Users
                  </p>
                  <p className="text-2xl font-bold text-navy">
                    {infoResponse.estimetedUsers || 0}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-white p-5 rounded-md border border-gray-200 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <UserTick size="20" color="#10b981" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Approved Members
                  </p>
                  <p className="text-2xl font-bold text-navy">
                    {infoResponse.approvedMebers || 0}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Members List (if available and not empty) */}
            {infoResponse.members && infoResponse.members.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="bg-white rounded-md border border-gray-200 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-navy">Current Members</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {infoResponse.members.map((member: any, i: number) => (
                    <div key={i} className="px-5 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
                        {(member.name || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">{member.name || "User"}</p>
                        <p className="text-xs text-gray-500">Joined Recently</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-8 mb-8"
            >
              {!isMember ? (
                <button className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all text-white text-base font-bold rounded-full flex items-center justify-center gap-2">
                  Join this Split
                </button>
              ) : (
                <div className="w-full py-4 bg-green-50 border border-green-200 text-green-700 text-base font-bold rounded-xl flex items-center justify-center gap-2">
                  <TickCircle size="20" variant="Bold" />
                  You are a member of this split
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
