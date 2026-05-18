"use client"

import Link from "next/link";
import { ArrowLeft, Sms } from "iconsax-react";
import { motion } from "framer-motion";

export default function ResetPassword() {
  return (
    <>
      <div className="flex items-center pl-6 pt-6 bg-primary">
        <Link href="/login" className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size="24" color="currentColor" />
        </Link>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col bg-primary px-6 pt-10 pb-10"
      >
        <h1 className="text-2xl font-bold text-white mb-10 leading-tight">
          Reset Password
        </h1>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <label className="text-sm text-white/80 mb-1 block">Email Address</label>
            <div className="relative flex items-center border-b border-white/50 focus-within:border-white pb-2 transition-colors">
              <input 
                type="email" 
                className="w-full outline-none bg-transparent text-white placeholder-white/50 text-base"
                placeholder=""
              />
              <Sms size="20" className="text-white/80 absolute right-0" />
            </div>
          </div>

          <div className="mt-2">
            <button 
              type="submit"
              className="w-full py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-sm tracking-wide text-sm"
            >
              RESET
            </button>
          </div>

          <div className="flex justify-center mt-1">
            <p className="text-sm text-white/80">
              Or <Link href="/signup" className="text-white font-medium hover:underline">Create new account</Link>
            </p>
          </div>
        </form>
      </motion.main>
    </>
  );
}
