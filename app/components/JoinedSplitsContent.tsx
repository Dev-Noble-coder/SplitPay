"use client";

import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/app/services/authService";
import { useJoinedSplits } from "@/app/hooks/useDashboard";
import { Timer1, People, ArrowRight3, SearchZoomIn, DocumentText } from "iconsax-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface JoinedSplit {
  _id: string;
  splitname: string;
  splitCode: string;
  userId: string;
  username: string;
  approved: string;
}

const JoinedSplitsContent = () => {
  const router = useRouter();
  const {
    data: splitsResponse,
    isLoading,
    isError,
  } = useJoinedSplits({
    enabled: isLoggedIn(),
  });

  const joinedSplits: JoinedSplit[] = (splitsResponse as any)?.splitJoined ?? [];

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
      <div className="mt-4 flex items-center gap-3 py-5 px-4 bg-white border border-gray-200 rounded-sm text-gray-500 text-sm font-medium">
        <Timer1 size="20" color="#f59e0b" variant="Bold" />
        Could not load joined splits. Please try again later.
      </div>
    );
  }

  // ── Empty State ────────────────────────────────────────────────────
  if (joinedSplits.length === 0) {
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
              d="M78.6997 45.3002C78.6997 55.4082 70.508 63.6002 60.3997 63.6002C50.2915 63.6002 42.0997 55.4082 42.0997 45.3002C42.0997 35.1923 50.2915 27.0002 60.3997 27.0002C70.508 27.0002 78.6997 35.1923 78.6997 45.3002Z"
              stroke="currentColor"
              strokeWidth="6"
            />
            <path
              d="M33.6497 93.0002C33.6497 81.3502 46.1997 71.9002 60.3997 71.9002C74.5997 71.9002 87.1497 81.3502 87.1497 93.0002"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="92" cy="35" r="14" fill="#0A50E4" fillOpacity="1" />
            <path d="M92 27V43M84 35H100" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-950">You haven't joined any splits</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
            Browse available split groups and jump into a saving plan.
          </p>
        </div>
        <Link href="/dashboard/splits" className="block">
          <button className="mt-4 px-8 py-3 bg-[#0A50E4] hover:bg-blue-700 transition-colors text-white text-sm font-semibold rounded-full flex items-center gap-2">
            <SearchZoomIn size="18" color="#FFFFFF" variant="Bold" />
            Join Split
          </button>
        </Link>
      </div>
    );
  }

  // ── Joined Splits List ─────────────────────────────────────────────
  return (
    <div className="mt-6 px-1 pb-4">
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="font-semibold text-xl text-blue-950">Joined Splits</h2>
        <Link href="/dashboard/splits" className="block">
          <button className="text-sm font-bold text-[#0A50E4] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors px-6 py-1.5 rounded-full flex items-center gap-1">
            <SearchZoomIn size="16" color="#0A50E4" variant="Bold" />
            Join More
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {joinedSplits.map((split, i) => (
          <motion.div
            key={split._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            onClick={() => router.push(`/dashboard/split/${split.splitCode}`)}
            className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-sm px-5 py-8 transition-all cursor-pointer group hover:border-blue-100 hover:shadow-sm"
          >
            {/* Left: Icon + Info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A50E4] transition-colors">
                <People size="22" color="#0A50E4" className="group-hover:text-white transition-colors" variant="Bold" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-blue-950 leading-tight group-hover:text-blue-900 transition-colors">
                  {split.splitname}
                </p>
                
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md group-hover:bg-blue-50/50 transition-colors">
                    <DocumentText size="14" color="#0B355B" variant="Bold" />
                    <span className="text-blue-950 font-bold">
                      {split.splitCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${split.approved === 'approved' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className={`font-semibold capitalize ${split.approved === 'approved' ? 'text-green-600' : 'text-amber-600'}`}>
                      {split.approved}
                    </span>
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

export default JoinedSplitsContent;
