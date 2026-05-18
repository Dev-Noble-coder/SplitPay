"use client"

import Link from "next/link";
import { ArrowLeft, Sms } from "iconsax-react";
import { motion } from "framer-motion";

export default function SignUpEmail() {
  return (
    <>
     <div className="flex items-center pl-6 pt-6">
        <Link href="/signup" className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size="24" color="currentColor" />
        </Link>
      </div>
    <motion.main 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col justify-end bg-white px-6 pb-10"
    >
      {/* Illustration Placeholder */}
      <div className="w-full flex justify-center mb-20">
        <div className="w-32 h-32 relative">
          {/* Abstract 3D-like Steps/Coins Placeholder */}
          <div className="absolute bottom-0 w-24 h-24 bg-primary-light rounded-lg transform rotate-45 shadow-sm" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-100 rounded-lg transform rotate-45 shadow-sm" />
          <div className="absolute top-0 left-8 w-16 h-16 bg-yellow-300 rounded-full shadow-md border-4 border-white flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-yellow-400 rounded-full opacity-50" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-light text-gray-900 mb-10 max-w-[200px] leading-tight">
        Start your savings circle.
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3.5 mt-4">
        <button 
          type="button"
          className="w-full py-4 bg-gray-50 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 border border-gray-200 text-sm"
        >
          {/* Simple Google Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.73 17.58V20.35H19.28C21.36 18.44 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.35L15.73 17.58C14.75 18.24 13.48 18.63 12 18.63C9.14 18.63 6.7 16.71 5.82 14.12H2.15V16.97C3.96 20.57 7.68 23 12 23Z" fill="#34A853"/>
            <path d="M5.82 14.12C5.6 13.46 5.47 12.75 5.47 12C5.47 11.25 5.6 10.54 5.82 9.88V7.03H2.15C1.4 8.52 1 10.21 1 12C1 13.79 1.4 15.48 2.15 16.97L5.82 14.12Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.36 3.86C17.45 2.08 14.97 1 12 1C7.68 1 3.96 3.43 2.15 7.03L5.82 9.88C6.7 7.29 9.14 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <div className="relative flex items-center border-b border-gray-300 focus-within:border-primary pb-2 transition-colors">
              <input 
                type="email" 
                className="w-full outline-none text-gray-900 placeholder-gray-400 text-sm"
                placeholder="Type in your email"
              />
              <Sms size="20" className="text-gray-400 absolute right-0" />
            </div>
          </div>

          <Link href="/signup/verify" className="w-full">
            <button 
              type="button"
              className="w-full py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm text-sm"
            >
              Get started
            </button>
          </Link>
        </form>
      </div>

      <div className=" flex justify-center pt-5">
        <p className="text-sm text-gray-500">
          Got an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </motion.main>
    </>
  );
}
