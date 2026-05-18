"use client"

import Link from "next/link";
import { ArrowLeft, Mobile } from "iconsax-react";
import { motion } from "framer-motion";

export default function SignUpVerify() {
  return (
    <>
     <div className="flex items-center pl-6 pt-6">
        <Link href="/signup/email" className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
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
      <div className="w-full flex justify-center mb-16">
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
      <h1 className="text-2xl font-light text-gray-900 mb-2 leading-tight">
        Enter the code sent to
      </h1>
      <p className="text-gray-400 text-sm mb-10">
        user@gmail.com
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <label className="text-sm text-gray-400 mb-2 block">Code</label>
            <div className="relative flex items-center border-b border-gray-300 focus-within:border-primary pb-2 transition-colors">
              <input 
                type="text" 
                className="w-full outline-none text-gray-900 placeholder-gray-400 text-lg tracking-widest"
                placeholder=""
                maxLength={6}
              />
              <Mobile size="20" className="text-gray-400 absolute right-0" />
            </div>
          </div>

          <div className="flex justify-center ">
            <button type="button" className="text-sm text-primary font-semibold hover:text-primary-dark ">
              Check your email
            </button>
          </div>

          <button 
            type="button"
            className="w-full py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm text-sm"
          >
            Continue
          </button>
        </form>
      </div>

      <div className=" flex justify-center pt-5">
        <p className="text-sm text-gray-400">
          Wrong email? <Link href="/signup/email" className="text-primary font-semibold hover:underline">Start over</Link>
        </p>
      </div>
    </motion.main>
    </>
  );
}
