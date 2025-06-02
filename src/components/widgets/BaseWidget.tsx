"use client"

import { ReactNode } from "react"

interface BaseWidgetProps {
  children: ReactNode
  className?: string
}

export default function BaseWidget({ children, className = "" }: BaseWidgetProps) {
  return (
    <div className={`
      w-full h-20 
      bg-white/20 dark:bg-gray-800/20 
      backdrop-blur-lg 
      rounded-lg 
      border border-white/30 dark:border-gray-700/30 
      hover:scale-105 hover:bg-white/30 dark:hover:bg-gray-700/30
      transition-all duration-300 
      overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  )
}
