"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, TickCircle, MoneyRecive, People, Timer1 } from "iconsax-react";
import { toast } from "sonner";
import { isLoggedIn } from "@/app/services/authService";
import axiosInstance from "@/utils/axiosInstance";
import { fetchUserProfile, QUERY_KEYS } from "@/app/queries/dashboardQueries";

export default function CreateSplitPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // App States
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [isNavigatingToHome, setIsNavigatingToHome] = useState(false);

  // Form Field States
  const [name, setName] = useState("");
  const [priceForSplit, setPriceForSplit] = useState("");
  const [payout, setPayout] = useState<"daily" | "weekly" | "monthly" | string>("weekly");
  const [numberofusers, setNumberofusers] = useState(4);
  const [joinAsMember, setJoinAsMember] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  const { data: userResponse, isLoading: loadingUser } = useQuery({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: fetchUserProfile,
    enabled: isLoggedIn(),
  });

  const user = userResponse?.userInformation || userResponse;

  const createSplitMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.post("/create-splits", payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Split Circle created successfully!", { id: "create-split" });
      const code =
        data?.split?.splitCode ||
        data?.shareCode ||
        data?.code ||
        data?.circleCode ||
        Math.random().toString(36).substring(2, 8).toUpperCase();
      setShareCode(code);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.splits });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mySplits });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.joinedSplits });
    },
    onError: (err: any) => {
      console.error("Create split error:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to create Split Circle.";
      toast.error(errMsg, { id: "create-split" });
    },
  });

  const isSubmitting = createSplitMutation.isPending;

  const handleCreateSplitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !priceForSplit) return;

    toast.loading("Launching your Split Circle...", { id: "create-split" });
    const creatorId = user?._id || user?.id || user?.userID || user?.userId || "anonymous";

    const payload = {
      name: name.trim(),
      priceForSplit: parseFloat(priceForSplit),
      payout: payout,
      numberofusers: numberofusers,
      creatorId: creatorId,
      member: joinAsMember,
    };

    createSplitMutation.mutate(payload);
  };

  const handleCopyShareCode = () => {
    if (!shareCode) return;
    navigator.clipboard.writeText(shareCode);
    toast.success("Share code copied to clipboard!");
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 mt-4 font-medium text-sm">Setting up workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!shareCode ? (
            /* ── DYNAMIC FORM CONTAINER ───────────────────────────────────── */
            <motion.div
              key="form-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              {/* Header Navigation */}
              <div className="flex items-center justify-between mb-8">
               <button
  onClick={() => router.back()}
  className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200"
>
  <ArrowLeft size="18" variant="Outline" color="#1e293b" />
</button>
                <h1 className="text-lg font-bold text-blue-950">Create Split Group</h1>
                <div className="w-10" />
              </div>

              <form onSubmit={handleCreateSplitSubmit} className="space-y-5">
                {/* Input: Circle Name */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Group Circle Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rent Split, Festive Contribution"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400 text-sm shadow-inner transition-all font-semibold"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Input: Target Price */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Total Target Price (₦)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-500 font-bold text-sm">₦</span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={priceForSplit}
                      onChange={(e) => setPriceForSplit(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400 text-sm shadow-inner transition-all font-semibold"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Input: Payout Cycles */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Payout Schedule Cycle
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 border border-gray-200 p-1.5 rounded-xl">
                    {(["daily", "weekly", "monthly"] as const).map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setPayout(cycle)}
                        className={`py-2 text-xs font-bold rounded-lg capitalize transition-all select-none ${
                          payout === cycle
                            ? "bg-blue-950 text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                        }`}
                        disabled={isSubmitting}
                      >
                        {cycle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input: Members Stepper */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Maximum Number of Members
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setNumberofusers((prev) => Math.max(2, prev - 1))}
                      className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-100 active:scale-90 transition-all cursor-pointer"
                      disabled={isSubmitting || numberofusers <= 2}
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-900 text-sm">{numberofusers} Contributors</span>
                    <button
                      type="button"
                      onClick={() => setNumberofusers((prev) => Math.min(20, prev + 1))}
                      className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-100 active:scale-90 transition-all cursor-pointer"
                      disabled={isSubmitting || numberofusers >= 20}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Toggle: Member Participation Switch */}
                <div className="flex items-center justify-between border border-gray-100 bg-gray-50/50 rounded-xl p-3.5">
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-bold text-blue-950">Join as Active Contributor</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Secure one of the slots in this collection group yourself</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setJoinAsMember(!joinAsMember)}
                    disabled={isSubmitting}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border ${
                      joinAsMember ? "bg-blue-950 border-blue-950" : "bg-gray-200 border-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        joinAsMember ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Form Action Launcher button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !priceForSplit}
                  className="w-full py-3 bg-blue-950 text-white font-bold rounded-full text-sm active:scale-[0.99]  disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Launching Circle...
                    </>
                  ) : (
                    "Launch Split Circle"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* ── SUCCESS COMPLETION DISPLAY ─────────────────────────────────── */
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <TickCircle size="42" color="#10b981" variant="Bold" />
              </div>
              <h2 className="text-xl font-extrabold text-blue-950 mb-1">Circle Successfully Active!</h2>
              <p className="text-xs text-gray-500 max-w-[280px] mb-6">
                Your savings group circle <span className="font-bold text-gray-900">"{name}"</span> is deployed. Send this invitation code out to your friends.
              </p>

              {/* Data Preview Pill */}
              <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 space-y-2.5 text-left text-xs font-semibold text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-400 font-medium"><MoneyRecive size="14"/> Target Value</span>
                  <span className="text-blue-950 font-bold text-sm">₦{parseFloat(priceForSplit).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-400 font-medium"><People size="14"/> Target Group</span>
                  <span className="text-gray-800">{numberofusers} slots available</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-400 font-medium"><Timer1 size="14"/> Cycle Term</span>
                  <span className="text-gray-800 capitalize">{payout} roundings</span>
                </div>
              </div>

              {/* Unique Code Block */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between w-full mb-8">
                <span className="font-mono text-xl font-black tracking-widest text-[#1e293b] ml-2 select-all">
                  {shareCode}
                </span>
                <button
                  onClick={handleCopyShareCode}
                  className="p-2.5 bg-white text-blue-950 rounded-lg hover:bg-gray-50 active:scale-95 transition-all shadow-sm border border-gray-200 cursor-pointer"
                  title="Copy Code"
                >
                  <Copy size="16" variant="Bold" color="#1e293b" />
                </button>
              </div>

              {/* Route back dashboard anchor action */}
              <button
                onClick={() => {
                  setIsNavigatingToHome(true);
                  router.push("/dashboard/home");
                }}
                disabled={isNavigatingToHome}
                className="w-full py-4 bg-blue-950 hover:bg-blue-900 text-white active:scale-[0.99] font-bold rounded-full text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
              >
                {isNavigatingToHome ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Synchronizing Dashboard...
                  </>
                ) : (
                  "Return to Dashboard Workspace"
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}