"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { Building, MapPin, Star, Calendar, Search } from "lucide-react"

export default function HotelListWidget() {
  const { darkMode } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://tpemd.com/content?currency=eur&trs=412943&shmarker=627699.627699&type=compact&host=search.hotellook.com&locale=fr&limit=10&powered_by=true&nobooking=&primary=%23596CB9FF&special=%23596CB9FF&promo_id=4026&campaign_id=101"
      script.charset = "utf-8"
      containerRef.current.appendChild(script)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const getThemeClasses = () => {
    if (darkMode) {
      // Dark mode: Violet and Black
      return {
        container: "bg-black/70 border-violet-500/40",
        gradient: "from-violet-600 via-purple-600 to-violet-700",
        title: "text-violet-100",
        description: "text-violet-300",
        input: "bg-black/50 border-violet-500/30 text-violet-100 placeholder-violet-400",
        button: "bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800",
        hotelCard: "bg-violet-900/40 hover:bg-violet-800/50",
        hotelIcon: "bg-violet-800/60 text-violet-300",
        hotelName: "text-violet-100",
        hotelRating: "text-violet-300",
        hotelPrice: "text-violet-400",
      }
    } else {
      // Light mode: Green and Dark White
      return {
        container: "bg-slate-50/80 border-green-300/50",
        gradient: "from-green-500 via-emerald-500 to-green-600",
        title: "text-slate-800",
        description: "text-slate-600",
        input: "bg-white/70 border-green-300/40 text-slate-800 placeholder-slate-500",
        button: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
        hotelCard: "bg-green-100/60 hover:bg-green-200/60",
        hotelIcon: "bg-green-200/60 text-green-700",
        hotelName: "text-slate-800",
        hotelRating: "text-slate-600",
        hotelPrice: "text-green-600",
      }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div
      className={`w-full backdrop-blur-lg rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 shadow-lg ${themeClasses.container}`}
    >
      <div className="p-8">
        {/* Header avec gradient et icône */}
        <div className="flex items-center space-x-4 mb-8">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <Building className="w-9 h-9 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Hôtels</h3>
            <p className={`text-base ${themeClasses.description}`}>Meilleurs prix garantis</p>
          </div>
        </div>

        {/* Formulaire de recherche interactif */}
        <form onSubmit={handleSearch} className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Destination"
              className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <MapPin
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-violet-400" : "text-slate-500"}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="date"
                placeholder="Arrivée"
                className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <Calendar
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-violet-400" : "text-slate-500"}`}
              />
            </div>

            <div className="relative">
              <input
                type="date"
                placeholder="Départ"
                className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <Calendar
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-violet-400" : "text-slate-500"}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-4 rounded-xl flex items-center justify-center font-semibold text-white transition-all ${
              isLoading ? "bg-gray-500" : themeClasses.button
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {isLoading ? "Recherche en cours..." : "Rechercher un hôtel"}
          </button>
        </form>

        {/* Hôtels populaires */}
        <div className="space-y-3">
          <h4 className={`text-lg font-semibold mb-3 ${themeClasses.title}`}>Hôtels populaires</h4>
          <div className="space-y-3">
            {[
              { name: "Grand Hôtel Paris", rating: "9.2", price: "€120" },
              { name: "Seaside Resort Barcelona", rating: "8.8", price: "€95" },
            ].map((hotel, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${themeClasses.hotelCard}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${themeClasses.hotelIcon}`}>
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-base font-medium ${themeClasses.hotelName}`}>{hotel.name}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className={`text-sm ${themeClasses.hotelRating}`}>{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-base font-semibold ${themeClasses.hotelPrice}`}>{hotel.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
