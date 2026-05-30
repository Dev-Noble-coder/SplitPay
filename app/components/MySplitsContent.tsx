"use client";

import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "@/app/services/authService";
import { fetchMySplits, QUERY_KEYS } from "@/app/queries/dashboardQueries";
import { Timer1, MoneyRecive, ArrowRight3, AddCircle, People } from "iconsax-react";
import { motion } from "framer-motion";

interface Split {
  _id: string;
  name: string;
  priceForSplit: number;
  payout?: string;
}

const MySplitsContent = () => {
  const {
    data: splitsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.mySplits,
    queryFn: fetchMySplits,
    enabled: isLoggedIn(),
  });

  // the API returns { message: string, splitsfound: number, split: [] }
  const splits: Split[] = splitsResponse?.split ?? [];

  // ── Loading State ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mt-4 space-y-3 px-1">
        {[1, 2].map((i) => (
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
        Could not load your splits. Please try again later.
      </div>
    );
  }

  // ── Empty State ────────────────────────────────────────────────────
  if (splits.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-4 py-16 px-6 bg-white border border-dashed border-gray-200 rounded-sm text-center">
        {/* Custom Empty State SVG Illustration */}
        <div className="w-32 h-32 mb-2 relative flex items-center justify-center">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#0A50E4] opacity-20"
          >
            <path
              d="M101.999 35.8002H84.0487C82.1487 35.8002 80.3987 34.6502 79.5487 32.9002L76.1987 26.2502C74.6487 23.1002 71.3987 21.0502 67.8987 21.0502H52.1487C48.6487 21.0502 45.3987 23.1002 43.8487 26.2502L40.4987 32.9002C39.6487 34.6502 37.8987 35.8002 35.9987 35.8002H17.9987C11.9487 35.8002 6.99872 40.7502 6.99872 46.8002V85.3502C6.99872 91.4002 11.9487 96.3502 17.9987 96.3502H101.999C108.049 96.3502 112.999 91.4002 112.999 85.3502V46.8002C112.999 40.7502 108.049 35.8002 101.999 35.8002ZM49.9987 72.8002C49.9987 77.2002 45.4987 81.3502 39.9987 81.3502C34.4987 81.3502 29.9987 77.2002 29.9987 72.8002V71.8502C29.9987 67.4502 34.4987 63.3002 39.9987 63.3002C45.4987 63.3002 49.9987 67.4502 49.9987 71.8502V72.8002Z"
              fill="currentColor"
            />
            <path
              d="M74.9987 76.3502H59.9987C57.2487 76.3502 54.9987 74.1002 54.9987 71.3502C54.9987 68.6002 57.2487 66.3502 59.9987 66.3502H74.9987C77.7487 66.3502 79.9987 68.6002 79.9987 71.3502C79.9987 74.1002 77.7487 76.3502 74.9987 76.3502Z"
              fill="currentColor"
            />
            <circle cx="89" cy="20" r="16" fill="#0A50E4" fillOpacity="1" />
            <path d="M89 12V28M81 20H97" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-950">You don't have any splits yet</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
            Create a split group and invite your friends to start saving together.
          </p>
        </div>
        <button className="mt-4 px-8 py-3 bg-[#0A50E4] hover:bg-blue-700 transition-colors text-white text-sm font-semibold rounded-full  flex items-center gap-2">
          <AddCircle size="18" color="#FFFFFF" variant="Bold" />
          Create New Split
        </button>
      </div>
    );
  }

  // ── Splits List ────────────────────────────────────────────────────
  return (
    <div className="mt-6 px-1 pb-4">
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="font-semibold text-xl text-blue-950">Created Splits</h2>
        <button className="text-sm font-bold text-[#0A50E4] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors px-6 py-1.5 rounded-full flex items-center gap-1">
          <AddCircle size="16" color="#0A50E4" variant="Bold" />
          Add More
        </button>
      </div>

      <div className="space-y-3">
        {splits.map((split, i) => (
          <motion.div
            key={split._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-sm px-5 py-8 transition-all cursor-pointer group hover:border-blue-100 hover:shadow-sm"
          >
            {/* Left: Icon + Info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A50E4] transition-colors">
                <People size="22" color="#0A50E4" variant="Bold" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-blue-950 leading-tight group-hover:text-blue-900 transition-colors">
                  {split.name}
                </p>
                
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md group-hover:bg-blue-50/50 transition-colors">
                    <MoneyRecive size="14" color="#0B355B" variant="Bold" />
                    <span className="text-blue-950 font-bold">
                      ₦{split.priceForSplit?.toLocaleString() || "0"}
                    </span>
                  </div>

                  <div className="text-gray-400">
                    Payout: <span className="text-blue-600 font-semibold capitalize">{split.payout || "weekly"}</span>
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
    </div>
  );
};

export default MySplitsContent;
