"use client"

import { useTheme } from "../../context/ThemeContext"
import SimCardWidget from "./SimCardWidget"
import HotelListWidget from "./HotelListWidget"
import WeatherWidget from "./WeatherWidget"
import CurrencyWidget from "./CurrencyWidget"

interface WidgetsContainerProps {
  flightsOpen: boolean
  hotelsOpen: boolean
}

export default function WidgetsContainer({ flightsOpen, hotelsOpen }: WidgetsContainerProps) {
  const { darkMode } = useTheme()

  const getThemeClasses = () => {
    if (darkMode) {
      // Dark mode: Violet and Black
      return {
        container: "bg-black/60 backdrop-blur-lg",
        innerContainer: "bg-violet-900/30 border-violet-500/20",
        title: "text-violet-100",
        description: "text-violet-300",
      }
    } else {
      // Light mode: Green and Dark White
      return {
        container: "bg-slate-100/70 backdrop-blur-lg",
        innerContainer: "bg-green-50/60 border-green-300/30",
        title: "text-slate-800",
        description: "text-slate-600",
      }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div className={`relative p-8 -m-2 rounded-2xl ${themeClasses.container}`}>
      <div className={`absolute inset-0 rounded-2xl ${themeClasses.innerContainer} backdrop-blur-md border`} />
      <div className="relative z-10">
        {/* Header de section */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${themeClasses.title}`}>Services de voyage</h2>
          <p className={themeClasses.description}>Tout ce dont vous avez besoin pour votre voyage</p>
        </div>

        {/* Grid responsive optimisé avec widgets plus grands */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SimCardWidget />
          </div>
          <div>
            <HotelListWidget />
          </div>
          <div>
            <WeatherWidget />
          </div>
          <div>
            <CurrencyWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
