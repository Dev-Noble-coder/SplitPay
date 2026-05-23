"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, PieChart, DownloadCloud, User } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard/home', icon: LayoutDashboard },
  { name: 'Splits', href: '/dashboard/splits', icon: PieChart },
  { name: 'Payouts', href: '/dashboard/payouts', icon: DownloadCloud },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="bg-[#F8FAFC]/85 backdrop-blur-md border border-slate-200 rounded-full px-2 py-2 w-full max-w-md ">
        <ul className="flex justify-between items-center relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className="relative flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center py-2 relative">
                  
                  {/* Sliding Background "Squircle" */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    className={`relative z-10 flex flex-col items-center transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`text-[10px] font-bold mt-1 tracking-tight ${
                      isActive ? 'text-primary' : 'text-slate-400'
                    }`}>
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
