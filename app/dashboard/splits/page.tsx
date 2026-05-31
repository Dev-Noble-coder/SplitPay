"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/app/services/authService";
import { fetchSplits, QUERY_KEYS } from "@/app/queries/dashboardQueries";
import { Timer1, MoneyRecive, ArrowLeft, SearchNormal1, People } from "iconsax-react";
import { motion } from "framer-motion";

interface Split {
  _id: string;
  name: string;
  priceForSplit: number;
  payout?: string;
}

export default function AvailableSplitsPage() {
  const router = useRouter();

  const {
    data: splitsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.splits,
    queryFn: fetchSplits,
    enabled: isLoggedIn(),
  });

  const splits: Split[] = splitsResponse?.availableSplit ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white shadow border-b border-gray-100 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="text-blue-950 hover:text-[#0A50E4] transition-colors p-1 -ml-1">
            <ArrowLeft size="24" variant="Outline" color="#0B355B" className="hover:text-[#0A50E4]" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-950 hover:bg-gray-100 transition-colors">
             <SearchNormal1 size="18" color="#0B355B" />
          </button>
        </div>
        <div>
          <h1 className="text-[28px] font-bold text-[#0B355B] leading-tight">Available Splits</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Find and join open saving groups.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 no-scrollbar pt-6">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-[112px] bg-white rounded-xl animate-pulse border border-gray-100 shadow-sm"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex items-center gap-3 py-5 px-4 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm font-medium">
            <Timer1 size="20" color="#f59e0b" variant="Bold" />
            Could not load splits. Please try again later.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && splits.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 bg-white border border-dashed border-gray-200 rounded-xl text-center">
            <div className="w-24 h-24 mb-2 flex items-center justify-center bg-gray-50 rounded-full">
               <People size="40" color="#0B355B" variant="Bold" className="opacity-30" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-950">No Splits Available</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
                There are currently no public splits available to join. Check back later or create your own!
              </p>
            </div>
          </div>
        )}

        {/* Populated List */}
        {!isLoading && !isError && splits.length > 0 && (
          <div className="space-y-4">
            {splits.map((split, i) => (
              <motion.div
                key={split._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="w-full bg-white border border-gray-200 rounded-sm p-5 transition-all hover:border-blue-100 "
              >
                <div className="flex items-start justify-between">
                  {/* Left content */}
                  <div className="flex items-start gap-4">
                    {/* Icon wrapper */}
                    <div className="w-12 h-12 rounded-xl bg-[#0A50E4]/10 flex items-center justify-center flex-shrink-0">
                      <People size="24" color="#0A50E4" variant="Bold" />
                    </div>
                    
                    {/* Info */}
                    <div className="pt-0.5">
                      <h3 className="text-[16px] font-bold text-[#0B355B] leading-tight mb-1">{split.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <MoneyRecive size="14" color="#0B355B" variant="Bold" />
                          <span className="text-sm font-bold text-blue-950">
                            ₦{split.priceForSplit.toLocaleString()}
                          </span>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                   <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Payouts run <span className="capitalize text-amber-600 font-bold">{split.payout || "weekly"}</span>
                      </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">Open to join</span>
                  <button className="px-6 py-2 bg-[#0A50E4] hover:bg-blue-700 transition-colors text-white text-xs font-bold rounded-full">
                    Join Split
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}