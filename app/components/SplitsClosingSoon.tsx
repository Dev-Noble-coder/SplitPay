"use client";

import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "@/app/services/authService";
import { fetchSplits, QUERY_KEYS } from "@/app/queries/dashboardQueries";
import { Timer1, MoneyRecive, People, ArrowRight3 } from "iconsax-react";
import { motion } from "framer-motion";

interface Split {
  _id: string;
  name: string;
  priceForSplit: number;
  payout?: string; // Included to show dynamic payout frequencies cleanly
}

const SplitsClosingSoon = () => {
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

  // ── Loading State ──────────────────────────────────────────────────
  // Increased height with h-[96px] to complement the dashboard's design padding
  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-[96px] bg-white rounded-xl animate-pulse border border-gray-100"
          />
        ))}
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="mt-4 flex items-center gap-3 py-5 px-4 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm font-medium">
        <Timer1 size="20" color="#f59e0b" variant="Bold" />
        Could not load splits. Please try again later.
      </div>
    );
  }

  // ── Empty State ────────────────────────────────────────────────────
  if (splits.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center gap-2 py-10 bg-white border border-gray-100 rounded-xl text-center">
        <People size="32" color="#0B355B" variant="Bold" className="opacity-40" />
        <p className="text-sm font-semibold text-gray-600">No open splits right now</p>
        <p className="text-xs text-gray-400">Check back later or create your own!</p>
      </div>
    );
  }

  // ── Splits List ────────────────────────────────────────────────────
  return (
    <div className="mt-4 space-y-3">
      {splits.map((split, i) => (
        <motion.div
          key={split._id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.3 }}
          className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-sm px-5 py-8  transition-all cursor-pointer group "
        >
          {/* Left: Icon + Info */}
          <div className="flex items-center gap-3">
            {/* Subtle Amber Glow wrapper indicating priority/urgency */}
            <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Timer1 size="22" color="#f59e0b" variant="Bold" />
            </div>
            <div>
              {/* Clear Header Target Title */}
              <p className="text-[15px] font-bold text-blue-950 leading-tight group-hover:text-blue-900 transition-colors">
                {split.name}
              </p>
              
              {/* Secondary Details Container */}
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                {/* Naira Value Split Indicator */}
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md">
                  <MoneyRecive size="14" color="#0B355B" variant="Bold" />
                  <span className="text-blue-950 font-bold">
                    ₦{split.priceForSplit.toLocaleString()}
                  </span>
                </div>

                {/* Explicit Payout Details Tag */}
                <div className="text-gray-400">
                  Payout: <span className="text-amber-600 font-semibold capitalize">{split.payout || "weekly"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Interactive Arrow */}
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors flex-shrink-0">
            <ArrowRight3 size="20" color="#0B355B" className="group-hover:translate-x-0.5 transition-transform" variant="Bold" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SplitsClosingSoon;