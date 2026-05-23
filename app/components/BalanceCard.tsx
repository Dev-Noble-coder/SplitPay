"use client"
import React, { useState } from 'react';
import { Eye, EyeSlash, ArrowRight2, Chart1 } from 'iconsax-react';

interface BalanceCardProps {
  totalBalance?: number;
  totalInvested?: number;
}

const BalanceCard = ({ totalBalance = 0, totalInvested = 0 }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  // Format currency
  const formatCurrency = (amount: number) => {
    if (!showBalance) return "****";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full mt-6">
      <div className="w-full bg-[#0A50E4] rounded-lg p-6 text-white relative overflow-hidden shadow shadow-blue-500/30">
        
        {/* Subtle Background Pattern/Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/3"></div>

        {/* Top Header: Title and Eye Icon */}
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <span className="text-sm text-blue-100 font-medium">Total Balance</span>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            {showBalance ? (
              <EyeSlash size="16" color="#dbeafe" variant="Outline" />
            ) : (
              <Eye size="16" color="#dbeafe" variant="Outline" />
            )}
          </button>
        </div>

        {/* Main Balance */}
        <div className="relative z-10 flex items-end justify-between mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight">
            {formatCurrency(totalBalance)}
          </h2>
        </div>

        {/* SVG Sparkline (Decorative) */}
        <div className="absolute bottom-16 left-0 right-0 h-16 pointer-events-none opacity-40">
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="w-full h-full stroke-white fill-none stroke-2">
            <path d="M0 40 Q 50 40, 100 20 T 200 30 T 300 10 T 400 50" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Bottom Section: Total Invested & Portfolio link */}
        <div className="relative z-10 flex items-center justify-between border-t border-blue-400/30 pt-4 mt-2">
          <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1.5 rounded backdrop-blur-sm border border-blue-400/20">
             <Chart1 size="14" color="#ffffff" variant="Bold" />
             <span className="text-xs font-semibold text-blue-50">
               {formatCurrency(totalInvested)} in Splits
             </span>
          </div>

          <button className="flex items-center gap-1 text-sm font-semibold text-blue-100 hover:text-white transition-colors">
            Portfolio <ArrowRight2 size="14" color="currentColor" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default BalanceCard;
