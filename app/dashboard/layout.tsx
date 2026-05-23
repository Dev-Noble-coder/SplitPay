"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WalletAdd, ElementPlus } from "iconsax-react";
import { isLoggedIn } from "../services/authService";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

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

      <div className="relative z-10 flex-1 flex flex-col w-full h-full">
        {children}
      </div>
    </motion.main>
  );
}
