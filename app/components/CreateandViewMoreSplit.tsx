"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Add, Eye } from 'iconsax-react'
import Link from 'next/link'

const CreateandViewMoreSplit = () => {
  return (
    <div className='mt-6 grid grid-cols-3 gap-3 px-1'>

      {/* ── CREATE SPLIT ── Soft Cyan Blue */}
      <Link href="/dashboard/create-split" className="col-span-1">
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className='relative flex flex-col items-center justify-center gap-3 rounded-md p-5 overflow-hidden cursor-pointer select-none h-32 border border-gray-100'
          style={{ backgroundColor: '#E6F7FD' }}
        >
          {/* Subtle glow blob */}
          {/* <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl pointer-events-none" style={{ backgroundColor: '#b3e8f9' }} /> */}

          {/* Icon */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#0B355B1A' }}
          >
            <Add size={22} color="#0B355B" variant="Bold" />
          </div>

          {/* Label */}
          <span className="text-[12px] font-semibold text-center leading-tight" style={{ color: '#0B355B' }}>
            Create Split
          </span>
        </motion.div>
      </Link>

      {/* ── SEE ALL SPLITS ── Soft Lavender */}
      <Link href="/dashboard/splits" className="col-span-2">
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className='relative flex flex-row items-center justify-between gap-3 rounded-md p-5 overflow-hidden cursor-pointer select-none h-32 border border-gray-100'
          style={{ backgroundColor: '#F7EFFF' }}
        >
          {/* Glow blob */}
          {/* <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-xl pointer-events-none" style={{ backgroundColor: '#d9b8ff' }} /> */}

          {/* Left: text + sub-label */}
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[14px] font-bold leading-tight" style={{ color: '#1E355E' }}>
              See all created splits
            </span>
            <span className="text-[11px] font-medium" style={{ color: '#1E355E99' }}>
              View &amp; manage
            </span>
          </div>

          {/* Icon */}
          <div
            className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#1E355E1A' }}
          >
            <Eye size={22} color="#1E355E" variant="Bold" />
          </div>
        </motion.div>
      </Link>

    </div>
  )
}

export default CreateandViewMoreSplit