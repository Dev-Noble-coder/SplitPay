"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Add, Login, WalletAdd, ElementPlus, ArrowLeft, Copy, TickCircle } from "iconsax-react";
import { toast } from "sonner";
import { isLoggedIn } from "../services/authService";
import axiosInstance from "@/utils/axiosInstance";

export default function Dashboard() {
  const router = useRouter();

  // Authentication & Profile State
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Demo state for first login
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [activeCard, setActiveCard] = useState<"join" | "create">("join");

  // Form Flow States
  const [isCreatingSplit, setIsCreatingSplit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareCode, setShareCode] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [priceForSplit, setPriceForSplit] = useState("");
  const [payout, setPayout] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [numberofusers, setNumberofusers] = useState(4);


  // useEffect(() => {
  //   const loggedIn = isLoggedIn();
  //   if (!loggedIn) {
  //     router.push("/login");
  //     return;
  //   }

  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axiosInstance.post("/userinfos");
  //       setUser(response.data);
  //     } catch (err: any) {
  //       console.error("Failed to load user info:", err);
  //       // Toast is handled inside interceptor if it returns a 401
  //     } finally {
  //       setLoadingUser(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [router]);

  // Form submission handler
  const handleCreateSplitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !priceForSplit) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Launching your Split Circle...");

    try {
      const creatorId = user?.id || user?._id || user?.userID || user?.userId || "anonymous";

      const payload = {
        name: name.trim(),
        priceForSplit: parseFloat(priceForSplit),
        payout: payout,
        numberofusers: numberofusers,
        creatorId: creatorId,
      };

      const response = await axiosInstance.post("/splits", payload);
      const data = response.data;

      toast.success("Split Circle created successfully!", { id: toastId });

      // Support backend variations in returning share code, otherwise generate an organic fallback
      const code = data?.shareCode || data?.code || data?.circleCode || Math.random().toString(36).substring(2, 8).toUpperCase();
      setShareCode(code);
    } catch (err: any) {
      console.error("Create split error:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to create Split Circle. Please try again.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyShareCode = () => {
    if (!shareCode) return;
    navigator.clipboard.writeText(shareCode);
    toast.success("Share code copied to clipboard!");
  };

  const handleShareWhatsApp = () => {
    if (!shareCode) return;
    const message = encodeURIComponent(`Hey! Join my SplitPay savings circle "${name}" using this invite code: ${shareCode}. Let's save together! 💸`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  // if (loadingUser) {
  //   return (
  //     <main className="flex-1 flex flex-col justify-center items-center bg-gray-50 p-6">
  //       <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //       </svg>
  //       <p className="text-gray-500 mt-4 font-medium text-sm">Synchronizing dashboard...</p>
  //     </main>
  //   );
  // }

  // if (!isFirstLogin) {
  //   return (
  //     <main className="flex-1 flex flex-col bg-white p-6">
  //       <h1 className="text-2xl font-bold">Welcome back, {user?.name || "User"}!</h1>
  //       <p className="text-gray-500 mt-2">Your active savings dashboard will appear here.</p>
  //     </main>
  //   );
  // }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex-1 flex flex-col bg-gray-50 pt-8 px-6 pb-10 overflow-hidden relative min-h-screen"
    >
      {/* Background SVG Decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-5 pointer-events-none">
        <WalletAdd size="250" color="#0A50E4" variant="Bold" />
      </div>
      <div className="absolute bottom-10 left-0 -ml-16 opacity-5 pointer-events-none transform -rotate-12">
        <ElementPlus size="200" color="#0A50E4" variant="Bold" />
      </div>

      {/* Main Title Section */}
      <AnimatePresence mode="wait">
        {!isCreatingSplit && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8 relative z-10"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to <span className="text-primary font-extrabold">SplitPay</span>
            </h1>
            <p className="text-sm text-gray-500">
              Looks like you don't have any active savings circles yet. Let's get you started!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stacked Cards Container */}
      <div 
        className={`relative flex-1 flex flex-col justify-top items-center w-full mx-auto z-10 pb-10 transition-all duration-500 ${
          isCreatingSplit ? "mt-[5%]" : "mt-[15%]"
        }`}
      >
        <div className="relative w-full h-[520px]">
          
          {/* Create Split Card */}
          <motion.div
            onClick={() => !isCreatingSplit && activeCard !== "create" && setActiveCard("create")}
            initial={false}
            animate={{
              y: isCreatingSplit ? 0 : activeCard === "create" ? 0 : -60,
              scale: isCreatingSplit ? 1 : activeCard === "create" ? 1 : 0.95,
              zIndex: isCreatingSplit || activeCard === "create" ? 20 : 0,
              height: isCreatingSplit ? "520px" : "320px",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className={`absolute top-0 w-full rounded-xl p-6 shadow-xl flex flex-col bg-secondary border-t border-white/20 transition-all ${
              isCreatingSplit ? "cursor-default" : "cursor-pointer h-[320px]"
            } ${activeCard === "create" && !isCreatingSplit ? "cursor-default" : ""}`}
          >
            {/* Form Flow Header */}
            {isCreatingSplit && (
              <div className="flex items-center justify-between w-full mb-6">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreatingSplit(false);
                    setShareCode(null);
                  }}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft size="18" color="#ffffff" variant="Outline" />
                </button>
                <span className="text-sm font-extrabold text-white uppercase tracking-widest">
                  Create Split Circle
                </span>
                <div className="w-8" />
              </div>
            )}

            {/* Inner Content depending on state */}
            {!isCreatingSplit ? (
              // CARD LANDING VIEW
              <div className="flex flex-col items-center flex-1 justify-center text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Add size="32" color="#ffffff" variant="Bold" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Create a Split</h2>
                <p className="text-sm text-white/90 leading-relaxed max-w-[280px]">
                  Start a new savings circle and invite your friends to contribute together.
                </p>
                
                <button 
                  className="w-full py-4 bg-white text-secondary font-bold rounded-full text-sm hover:bg-gray-50 active:scale-98 transition-all shadow-sm mt-6 cursor-pointer"
                  onClick={(e) => {
                    if (activeCard !== "create") return;
                    e.stopPropagation();
                    setIsCreatingSplit(true);
                  }}
                >
                  Continue
                </button>
              </div>
            ) : shareCode ? (
              // SUCCESS SHARE CODE VIEW
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center flex-1 justify-center text-white py-2 text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <TickCircle size="40" color="#ffffff" variant="Bold" />
                </div>
                <h3 className="text-2xl font-extrabold mb-1">Circle Launched!</h3>
                <p className="text-xs text-white/90 mb-5 max-w-[260px]">
                  Your savings circle <span className="font-bold">"{name}"</span> is active. Share this code with friends so they can contribute.
                </p>
                
                {/* Share Code Pill */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 flex items-center justify-between w-full max-w-[280px] mb-6">
                  <span className="font-mono text-xl font-bold tracking-widest text-white ml-2 select-all">
                    {shareCode}
                  </span>
                  <button 
                    onClick={handleCopyShareCode}
                    className="p-2 bg-white text-secondary rounded-lg hover:bg-gray-50 active:scale-95 transition-all shadow-sm cursor-pointer"
                    title="Copy Share Code"
                  >
                    <Copy size="18" color="currentColor" variant="Bold" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                  <button 
                    onClick={handleShareWhatsApp}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 active:scale-98 text-white font-bold rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Share on WhatsApp
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsCreatingSplit(false);
                      setShareCode(null);
                      setName("");
                      setPriceForSplit("");
                      setPayout("weekly");
                      setNumberofusers(4);
                    }}
                    className="w-full py-3 bg-white text-secondary hover:bg-gray-50 active:scale-98 font-bold rounded-full text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            ) : (
              // DYNAMIC FORM VIEW
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleCreateSplitSubmit} 
                className="flex-1 flex flex-col justify-between text-left"
              >
                <div className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Group Circle Name
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dinner Split, House Rent" 
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl outline-none focus:ring-2 focus:ring-white border border-transparent placeholder-gray-400 text-sm shadow-sm transition-all font-semibold"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Target Price Input */}
                  <div>
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Total Target Price ($)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="1"
                      value={priceForSplit}
                      onChange={(e) => setPriceForSplit(e.target.value)}
                      placeholder="e.g. 120.50" 
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl outline-none focus:ring-2 focus:ring-white border border-transparent placeholder-gray-400 text-sm shadow-sm transition-all font-semibold"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Payout Selection Segmented Pills */}
                  <div>
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Payout Cycle
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-black/10 p-1 rounded-xl border border-white/10 relative">
                      {(["daily", "weekly", "monthly"] as const).map((cycle) => (
                        <button
                          key={cycle}
                          type="button"
                          onClick={() => setPayout(cycle)}
                          className={`py-2 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer select-none ${
                            payout === cycle 
                              ? "bg-white text-secondary shadow-sm" 
                              : "text-white/80 hover:text-white hover:bg-white/5"
                          }`}
                          disabled={isSubmitting}
                        >
                          {cycle}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Contributors Stepper */}
                  <div>
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Number of Members
                    </label>
                    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-transparent shadow-sm">
                      <button
                        type="button"
                        onClick={() => setNumberofusers(prev => Math.max(2, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-200 active:scale-90 transition-all cursor-pointer"
                        disabled={isSubmitting || numberofusers <= 2}
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-900 text-sm">{numberofusers} contributors</span>
                      <button
                        type="button"
                        onClick={() => setNumberofusers(prev => Math.min(20, prev + 1))}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-200 active:scale-90 transition-all cursor-pointer"
                        disabled={isSubmitting || numberofusers >= 20}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !priceForSplit}
                  className="w-full py-4 bg-white text-secondary font-bold rounded-full text-sm hover:bg-gray-50 active:scale-98 disabled:opacity-50 transition-all shadow-sm mt- flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Group...
                    </>
                  ) : (
                    "Create Split Group"
                  )}
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Join Split Card */}
          <AnimatePresence>
            {!isCreatingSplit && (
              <motion.div
                onClick={() => activeCard !== "join" && setActiveCard("join")}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  y: activeCard === "join" ? 0 : -60,
                  scale: activeCard === "join" ? 1 : 0.95,
                  zIndex: activeCard === "join" ? 10 : 0,
                  opacity: activeCard === "join" ? 1 : 0.4,
                }}
                exit={{ opacity: 0, y: 150, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute top-0 w-full rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center h-[320px] bg-primary cursor-pointer border-t border-white/20 ${
                  activeCard === "join" ? "cursor-default" : ""
                }`}
              >
                <div className="flex flex-col items-center flex-1 justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Login size="32" color="#ffffff" variant="Bold" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Join a Split</h2>
                  <p className="text-sm text-white/90 leading-relaxed max-w-[280px]">
                    Got an invite code? Join an existing circle and start saving with others.
                  </p>
                </div>
                
                <button 
                  className="w-full py-4 bg-white text-primary font-bold rounded-full text-sm hover:bg-gray-50 active:scale-98 transition-all shadow-sm mt-6 cursor-pointer"
                  onClick={(e) => {
                    if (activeCard !== "join") return;
                    e.stopPropagation();
                    // Action for join split
                  }}
                >
                  Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
