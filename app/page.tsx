"use client"

import Link from "next/link";
import { ArrowRight, WalletAdd } from "iconsax-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col relative overflow-hidden bg-primary"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] opacity-20 pointer-events-none">
        <WalletAdd size="120" color="#ffffff" variant="Bulk" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pt-12 pb-32 z-10">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <WalletAdd size="32" color="#ffffff" variant="Bold" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-4 leading-tight">
          Automate group savings and payouts.
        </h1>
        <p className="text-white/80 text-center text-lg max-w-[400px] mx-auto leading-relaxed">
          Join trusted savings circles where members contribute fixed amounts securely.
        </p>
      </div>

      {/* Bottom Action Container */}
      <div className="absolute bottom-0 w-full p-6 pb-10 bg-gradient-to-t from-primary via-primary to-transparent z-20">
        <div className="flex flex-col gap-4">
          <Link 
            href="/login" 
            className="w-full py-4 px-6 rounded-full border-2 border-white/20 text-white font-semibold text-center text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Log In
          </Link>
          <Link 
            href="/signup" 
            className="w-full py-4 px-6 rounded-full bg-white text-primary font-bold text-center text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Sign Up
          </Link>
        </div>
        <p className="text-white/60 text-center text-xs mt-6">
          Secured by SplitPay Infrastructure
        </p>
      </div>
    </motion.main>
  );
}
