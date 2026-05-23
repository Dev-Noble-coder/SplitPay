"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, UserSquare } from 'iconsax-react'

// CTA bar: Ready to Join A Split?
const JoinASplit = () => {
  return (
    <Link href="/dashboard/split" className="col-span-3">
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-between gap-2 rounded-md px-4 py-6 overflow-hidden cursor-pointer select-none border border-gray-100 mt-5"
        style={{ backgroundColor: '#ECF9F1' }}
      >
       
        {/* Left side text */}
        <div className="flex flex-col">
          <span className="text-sm font-medium" style={{ color: '#0B355B' }}>
            Ready to Join a Split?
          </span>
        </div>
        {/* Right side caret */}
        <ArrowRight size={24} color="#0B355B" variant="Bold" />
      </motion.div>
    </Link>
  )
}

export default JoinASplit