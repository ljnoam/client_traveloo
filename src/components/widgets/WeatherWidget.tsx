"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Search, ChevronDown } from "lucide-react"

export default function WeatherWidget() {
  const { darkMode } = useTheme()
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForecast, setShowForecast] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const forecast = [
    { day: "Demain", temp: "23°C", icon: <Sun className="w-6 h-6 text-yellow-400" /> },
    { day: "Mercredi", temp: "22°C", icon: <CloudRain className="w-6 h-6 text-blue-400" /> },
    { day: "Jeudi", temp: "20°C", icon: <Cloud className="w-6 h-6 text-gray-400" /> },
  ]

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
        tempMain: "text-violet-100",
        tempDesc: "text-violet-300",
        location: "text-violet-400",
        detailBox: "bg-violet-900/30",
        detailText: "text-violet-200",
        detailValue: "text-violet-100",
        forecastButton: "bg-violet-900/40 hover:bg-violet-800/50 text-violet-100",
        forecastCard: "bg-violet-900/30",
        forecastText: "text-violet-100",
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
        tempMain: "text-slate-800",
        tempDesc: "text-slate-600",
        location: "text-slate-500",
        detailBox: "bg-green-50/60",
        detailText: "text-slate-700",
        detailValue: "text-slate-800",
        forecastButton: "bg-green-100/60 hover:bg-green-200/60 text-slate-800",
        forecastCard: "bg-green-50/60",
        forecastText: "text-slate-800",
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
            <Sun className="w-9 h-9 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${themeClasses.title}`}>Météo</h3>
            <p className={`text-base ${themeClasses.description}`}>Conditions actuelles</p>
          </div>
        </div>

        {/* Formulaire de recherche interactif */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-violet-500" : "focus:ring-green-500"} transition-all ${themeClasses.input}`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
            {isLoading ? "Recherche en cours..." : "Voir la météo"}
          </button>
        </form>

        {/* Température principale */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className={`text-6xl font-bold mb-2 ${themeClasses.tempMain}`}>24°C</div>
            <div className={`text-xl font-medium ${themeClasses.tempDesc}`}>Ensoleillé</div>
            <div className={`text-sm ${themeClasses.location}`}>Paris, France</div>
          </div>
          <Sun className="w-24 h-24 text-yellow-400" />
        </div>

        {/* Détails météo */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className={`flex items-center justify-between p-4 rounded-lg ${themeClasses.detailBox}`}>
            <div className="flex items-center space-x-3">
              <Droplets className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
              <span className={`text-base ${themeClasses.detailText}`}>Humidité</span>
            </div>
            <span className={`text-base font-semibold ${themeClasses.detailValue}`}>20%</span>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${themeClasses.detailBox}`}>
            <div className="flex items-center space-x-3">
              <Wind className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
              <span className={`text-base ${themeClasses.detailText}`}>Vent</span>
            </div>
            <span className={`text-base font-semibold ${themeClasses.detailValue}`}>15 km/h</span>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-lg ${themeClasses.detailBox}`}>
            <div className="flex items-center space-x-3">
              <Thermometer className={`w-6 h-6 ${darkMode ? "text-violet-400" : "text-green-500"}`} />
              <span className={`text-base ${themeClasses.detailText}`}>Ressenti</span>
            </div>
            <span className={`text-base font-semibold ${themeClasses.detailValue}`}>26°C</span>
          </div>
        </div>

        {/* Prévisions */}
        <div>
          <button
            onClick={() => setShowForecast(!showForecast)}
            className={`flex items-center justify-between w-full p-4 rounded-lg transition-all ${themeClasses.forecastButton}`}
          >
            <span className="text-lg font-medium">Prévisions à 3 jours</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${showForecast ? "transform rotate-180" : ""} ${darkMode ? "text-violet-400" : "text-slate-500"}`}
            />
          </button>

          {showForecast && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex flex-col items-center space-y-2 ${themeClasses.forecastCard}`}
                >
                  <span className={`text-base font-medium ${themeClasses.forecastText}`}>{day.day}</span>
                  {day.icon}
                  <span className={`text-lg font-semibold ${themeClasses.forecastText}`}>{day.temp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
