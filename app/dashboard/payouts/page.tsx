"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoneyRecive, MoneySend, Receipt21, Card, DocumentDownload } from "iconsax-react";
import { motion } from "framer-motion";

// Demo Data for Payouts
const transactions = [
  {
    id: "TRX-10293",
    title: "Payout from Dinner Party Split",
    type: "credit",
    amount: 150000,
    date: "May 28, 2026",
    status: "Completed",
  },
  {
    id: "TRX-10292",
    title: "Withdrawal to GTBank",
    type: "debit",
    amount: 50000,
    date: "May 25, 2026",
    status: "Completed",
  },
  {
    id: "TRX-10291",
    title: "Payout from Netflix Sub",
    type: "credit",
    amount: 12500,
    date: "May 20, 2026",
    status: "Completed",
  },
  {
    id: "TRX-10290",
    title: "Withdrawal to GTBank",
    type: "debit",
    amount: 25000,
    date: "May 18, 2026",
    status: "Pending",
  },
];

export default function PayoutsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-24">
      {/* Header */}
      <div className="px-3.5 pt-6 pb-4">
        <button onClick={() => router.back()} className="mb-6 hover:text-[#0A50E4] transition-colors">
          <ArrowLeft size="24" variant="Outline" color="#0B355B" className="hover:text-[#0A50E4]" />
        </button>
        <h1 className="text-[28px] font-bold text-[#0B355B]">Payouts</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3.5 no-scrollbar">
        {/* Balance Card */}
        <div className="w-full bg-[#0A50E4] rounded-md p-6 text-white mb-8 relative overflow-hidden shadow-lg shadow-blue-500/20">
          {/* Background pattern/gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">Available for Withdrawal</p>
            <h2 className="text-4xl font-bold mb-6">₦112,500<span className="text-xl text-blue-200">.00</span></h2>
            
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white text-[#0A50E4] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                <Card size="18" color="#0A50E4" variant="Bold" />
                Withdraw Funds
              </button>
              <button className="flex-1 bg-[#0940B8] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#07328E] transition-colors">
                <DocumentDownload size="18" color="#FFFFFF" variant="Outline" />
                Statement
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider">Transaction History</h3>
            <button className="text-sm font-bold text-[#0A50E4] hover:text-blue-700 transition-colors">
              Filter
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((trx, i) => (
              <motion.div
                key={trx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:border-blue-100 hover:shadow-sm transition-all"
              >
                {/* Top Row: Icon, Title, Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${trx.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                      {trx.type === 'credit' ? (
                        <MoneyRecive size="20" color="#10B981" variant="Bold" />
                      ) : (
                        <MoneySend size="20" color="#EF4444" variant="Bold" />
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#0B355B]">{trx.title}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{trx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[15px] font-bold ${trx.type === 'credit' ? 'text-green-600' : 'text-[#0B355B]'}`}>
                      {trx.type === 'credit' ? '+' : '-'}₦{trx.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Status & Receipt */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${trx.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                    <span className="text-xs font-semibold text-gray-500">{trx.status}</span>
                  </div>
                  
                  <button className="flex items-center gap-1 text-xs font-bold text-[#0A50E4] hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-full">
                    <Receipt21 size="14" color="#0A50E4" variant="Bold" />
                    Receipt
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
