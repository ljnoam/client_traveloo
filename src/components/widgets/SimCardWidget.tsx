"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { Smartphone, Wifi, Globe, Signal, Search, ChevronRight } from "lucide-react"

export default function SimCardWidget() {
  const { darkMode } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://tpemd.com/content?trs=412943&shmarker=627699.627699&locale=fr&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23caccedcc&special=%23caccedcc&border_radius=10&plain=false&no_labels=true&promo_id=8588&campaign_id=541"
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
        featureBox: "bg-violet-900/30",
        featureText: "text-violet-200",
        input: "bg-black/50 border-violet-500/30 text-violet-100 placeholder-violet-400",
        button: "bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800",
        regionButton: "bg-violet-900/40 hover:bg-violet-800/50 text-violet-200",
      }
    } else {
      // Light mode: Green and Dark White
      return {
        container: "bg-slate-50/80 border-green-300/50",
        gradient: "from-green-500 via-emerald-500 to-green-600",
        title: "text-slate-800",
        description: "text-slate-600",
        featureBox: "bg-green-50/60",
        featureText: "text-slate-700",
        input: "bg-white/70 border-green-300/40 text-slate-800 placeholder-slate-500",
        button: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
        regionButton: "bg-green-100/60 hover:bg-green-200/60 text-slate-700",
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
            <Smartphone className="w-9 h-9 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Cartes SIM</h3>
            <p className={`text-base ${themeClasses.description}`}>Restez connecté partout</p>
          </div>
        </div>

        {/* Features avec icônes colorées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.featureBox}`}>
            <Globe className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
            <span className={`text-base font-medium ${themeClasses.featureText}`}>Couverture mondiale</span>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.featureBox}`}>
            <Wifi className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
            <span className={`text-base font-medium ${themeClasses.featureText}`}>Tarifs abordables</span>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${themeClasses.featureBox}`}>
            <Signal className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
            <span className={`text-base font-medium ${themeClasses.featureText}`}>Activation instantanée</span>
          </div>
        </div>

        {/* Formulaire de recherche interactif */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un pays..."
              className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-violet-400" : "text-slate-500"}`}
            />
          </div>
          <button
            type="submit"
            className={`w-full mt-4 p-4 rounded-xl flex items-center justify-center font-semibold text-white transition-all ${
              isLoading ? "bg-gray-500" : themeClasses.button
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {isLoading ? "Recherche en cours..." : "Rechercher"}
          </button>
        </form>

        {/* Destinations populaires */}
        <div className="space-y-3">
          <h4 className={`text-lg font-semibold mb-3 ${themeClasses.title}`}>Destinations populaires</h4>
          <div className="grid grid-cols-2 gap-3">
            {["Europe", "Asie", "Amérique", "Afrique"].map((region) => (
              <button
                key={region}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${themeClasses.regionButton}`}
              >
                <span className="text-base font-medium">{region}</span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? "text-violet-400" : "text-slate-500"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
