"use client"

import { useEffect, useRef } from "react"
import { Ticket, Camera, Calendar, MapPin } from "lucide-react"

export default function TicketsWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://c89.travelpayouts.com/content?currency=EUR&trs=412943&shmarker=627699.627699&language=fr&locale=260932&layout=responsive&cards=4&powered_by=true&promo_id=3947"
      script.charset = "utf-8"
      containerRef.current.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl border border-white/30 dark:border-gray-700/30 overflow-hidden hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 shadow-lg">
      <div className="p-6">
        {/* Header avec gradient et icône */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Ticket className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Attractions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Billets et activités</p>
          </div>
        </div>

        {/* Features avec icônes colorées */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 dark:bg-gray-800/20">
            <Camera className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Expériences uniques</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 dark:bg-gray-800/20">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Réservation instantanée</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/10 dark:bg-gray-800/20">
            <MapPin className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Guides locaux</span>
          </div>
        </div>

        {/* Widget intégré avec style amélioré */}
        <div className="relative">
          <div
            ref={containerRef}
            className="w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/20 dark:bg-gray-800/30 px-3 py-1 rounded-full">
            Musées et attractions
          </span>
        </div>
      </div>
    </div>
  )
}
