import React from 'react'
import { Notification } from 'iconsax-react'

const Header = ({ user }: { user?: any }) => {
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full flex flex-col  pb-2 bg-transparent z-10 relative">
      {/* Top Row: Avatar, Badge, Notifications */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#fca5a5] flex items-center justify-center border border-white shadow-sm overflow-hidden relative">
            {/* Mocking the user image from screenshot, fallback to initials */}
            <span className="text-red-900 font-bold text-sm">{getInitials(user?.fullName || user?.name)}</span>
          </div>
          
          {/* Badge Pill */}
          <div className="flex items-center gap-1.5 bg-[#fce7f3] px-3 py-1.5 rounded-full">
            <div className="w-3.5 h-3.5 rounded-full bg-[#831843] flex items-center justify-center relative">
               <div className="w-1.5 h-1.5 bg-white rounded-full absolute right-0 top-0 transform translate-x-[20%] -translate-y-[20%]"></div>
            </div>
            <span className="text-sm font-bold text-[#831843]">Tier 1</span>
          </div>
        </div>

        {/* Right side: Notifications */}
        <div className="relative cursor-pointer">
          <Notification size="26" color="#334155" variant="Outline" />
          <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-600 rounded-full flex items-center justify-center border-2 border-gray-50">
            <span className="text-[10px] font-bold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs */}
      <div className="flex items-center gap-6">
        <button className="text-lg font-bold text-[#0A50E4]">Home</button>
        <button className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors">My Splits</button>
        <button className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors">Joined Splits</button>
      </div>
    </div>
  )
}

export default Header