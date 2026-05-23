"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sms, Lock1, EyeSlash, Eye } from "iconsax-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { login, setLoggedIn } from "../services/authService";

export default function Login() {
  const router = useRouter();
  
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Verifying your credentials...");

    try {
      const data = await login({ email, password });
      toast.success("Logged in successfully! Welcome back.", { id: toastId });
      
      
      setLoggedIn(true);

      setIsLoading(false)

      if (data.isFirstLogin === false) {
        router.push("/dashboard/home");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Login error details:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to log in. Please check your credentials.";
      toast.error(errMsg, { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center pl-6 pt-6">
        <Link href="/" className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
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
          <div className="w-32 h-32 relative animate-pulse">
            {/* Abstract 3D-like Steps/Coins Placeholder */}
            <div className="absolute bottom-0 w-24 h-24 bg-primary-light rounded-lg transform rotate-45 shadow-sm" />
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-100 rounded-lg transform rotate-45 shadow-sm" />
            <div className="absolute top-0 left-8 w-16 h-16 bg-yellow-300 rounded-full shadow-md border-4 border-white flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-yellow-400 rounded-full opacity-50" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-light text-gray-900 mb-10 max-w-[200px] leading-tight font-sans">
          Jump right back in.
        </h1>

        {/* Form Fields */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="text-sm text-gray-500 mb-1 block">Email Address</label>
            <div className="relative flex items-center border-b border-gray-300 focus-within:border-primary pb-2 transition-colors">
              <input 
                type="email" 
                className="w-full outline-none text-gray-900 placeholder-gray-400 text-base disabled:opacity-50"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <Sms size="20" color="grey" className="text-gray-400 absolute right-0" />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-500 mb-1 block">Password</label>
            <div className="relative flex items-center border-b border-gray-300 focus-within:border-primary pb-2 transition-colors">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full outline-none text-gray-900 placeholder-gray-400 text-base disabled:opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                className="absolute right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <Eye size="20" color="grey" /> : <EyeSlash size="20" color="grey"/>}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/reset-password" className="text-sm text-primary font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3.5 mt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark disabled:bg-primary/50 transition-colors shadow-sm text-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>

            <button 
              type="button"
              disabled={isLoading}
              className="w-full py-4 bg-gray-50 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.73 17.58V20.35H19.28C21.36 18.44 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.35L15.73 17.58C14.75 18.24 13.48 18.63 12 18.63C9.14 18.63 6.7 16.71 5.82 14.12H2.15V16.97C3.96 20.57 7.68 23 12 23Z" fill="#34A853"/>
                <path d="M5.82 14.12C5.6 13.46 5.47 12.75 5.47 12C5.47 11.25 5.6 10.54 5.82 9.88V7.03H2.15C1.4 8.52 1 10.21 1 12C1 13.79 1.4 15.48 2.15 16.97L5.82 14.12Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.36 3.86C17.45 2.08 14.97 1 12 1C7.68 1 3.96 3.43 2.15 7.03L5.82 9.88C6.7 7.29 9.14 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              Login with Google
            </button>
          </div>
        </form>

        <div className="flex justify-center pt-8">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.main>
    </> 
  );
}
