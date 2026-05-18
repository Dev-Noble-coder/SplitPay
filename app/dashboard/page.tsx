"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Add, Login, WalletAdd, ElementPlus } from "iconsax-react";

export default function Dashboard() {
  // Demo state for first login
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [activeCard, setActiveCard] = useState<"join" | "create">("join");

  if (!isFirstLogin) {
    return (
      <main className="flex-1 flex flex-col bg-white p-6">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-gray-500 mt-2">Your dashboard will appear here.</p>
      </main>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex-1 flex flex-col bg-gray-50 pt-10 px-6 pb-10 overflow-hidden relative"
    >
      {/* Background SVG Decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-5 pointer-events-none">
        <WalletAdd size="250" color="#0A50E4" variant="Bold" />
      </div>
      <div className="absolute bottom-10 left-0 -ml-16 opacity-5 pointer-events-none transform -rotate-12">
        <ElementPlus size="200" color="#0A50E4" variant="Bold" />
      </div>

      <div className="mb-10 relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to <span className="text-primary">SplitPay</span>
        </h1>
        <p className="text-sm text-gray-500">
          Looks like you don't have any active savings circles yet. Let's get you started!
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="relative flex-1 flex flex-col justify-top mt-[15%] items-center w-full mx-auto z-10 pb-10">
        <div className="relative w-full h-[320px]">
        
        {/* Create Split Card */}
        <motion.div
          onClick={() => activeCard !== "create" && setActiveCard("create")}
          initial={false}
          animate={{
            y: activeCard === "create" ? 0 : -60,
            scale: activeCard === "create" ? 1 : 0.9,
            zIndex: activeCard === "create" ? 10 : 0,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`absolute top-0 w-full rounded-xl p-8 shadow-xl flex flex-col items-center justify-center text-center h-[320px] bg-secondary cursor-pointer border-t border-white/20 ${activeCard === "create" ? "cursor-default" : ""}`}
        >
          <div className="flex flex-col items-center flex-1 justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Add size="32" color="#ffffff" variant="Bold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Create a Split</h2>
            <p className="text-sm text-white/90 leading-relaxed max-w-[240px]">
              Start a new savings circle and invite your friends to contribute together.
            </p>
          </div>
          
          <button 
            className="w-full py-4 bg-white text-secondary font-bold rounded-full text-sm hover:bg-gray-50 transition-colors shadow-sm mt-6"
            onClick={(e) => {
              if (activeCard !== "create") return;
              e.stopPropagation();
              // Action for create split
            }}
          >
            Continue
          </button>
        </motion.div>

        {/* Join Split Card */}
        <motion.div
          onClick={() => activeCard !== "join" && setActiveCard("join")}
          initial={false}
          animate={{
            y: activeCard === "join" ? 0 : -60,
            scale: activeCard === "join" ? 1 : 0.9,
            zIndex: activeCard === "join" ? 10 : 0,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`absolute top-0 w-full rounded-xl p-8 shadow-xl flex flex-col items-center justify-center text-center h-[320px] bg-primary cursor-pointer border-t border-white/20 ${activeCard === "join" ? "cursor-default" : ""}`}
        >
          <div className="flex flex-col items-center flex-1 justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Login size="32" color="#ffffff" variant="Bold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join a Split</h2>
            <p className="text-sm text-white/90 leading-relaxed max-w-[240px]">
              Got an invite code? Join an existing circle and start saving with others.
            </p>
          </div>
          
          <button 
            className="w-full py-4 bg-white text-primary font-bold rounded-full text-sm hover:bg-gray-50 transition-colors shadow-sm mt-6"
            onClick={(e) => {
              if (activeCard !== "join") return;
              e.stopPropagation();
              // Action for join split
            }}
          >
            Continue
          </button>
        </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
