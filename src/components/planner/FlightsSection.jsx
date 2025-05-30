"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../../context/ThemeContext"
import { Plane, Clock, ExternalLink } from "lucide-react"

export default function FlightsSection({ flights = [] }) {
  const { darkMode } = useTheme()
  const [showAll, setShowAll] = useState(false)

  const visibleFlights = showAll ? flights : flights.slice(0, 2)

  // Couleurs de la charte graphique
  const primary = darkMode ? "#1BA1C3" : "#37C0D8"
  const secondary = darkMode ? "#E0484C" : "#FF5A5F"
  const textPrimary = darkMode ? "#E5E7EB" : "#111827"
  const textSecondary = darkMode ? "#9CA3AF" : "#6B7280"
  const border = darkMode ? "#374151" : "#E5E7EB"
  const surface = darkMode ? "#1E1E1E" : "#FFFFFF"
  const cardBg = darkMode ? "rgba(18,18,18,0.3)" : "rgba(255,255,255,0.3)"

  return (
    <section className="w-full space-y-4">
      <div className="space-y-3">
        <AnimatePresence>
          {visibleFlights.map((flight, i) => (
            <motion.div
              key={flight.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg rounded-2xl backdrop-blur-lg"
              style={{
                backgroundColor: cardBg,
                borderColor: border,
                borderWidth: "1px",
              }}
            >
              {/* Perforations style billet */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-center space-y-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: darkMode ? "#374151" : "#E5E7EB" }}
                  />
                ))}
              </div>

              <div className="pl-8 pr-4 py-4">
                {/* Header compact */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${primary}20` }}>
                      <Plane style={{ color: primary }} className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm" style={{ color: textPrimary }}>
                        {flight.airline || flight.carrier || flight.company || "Compagnie"}
                      </span>
                      <p className="text-xs" style={{ color: textSecondary }}>
                        {flight.flightNumber || "Vol direct"}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: secondary }}>
                    €{flight.price || flight.totalPrice || "N/A"}
                  </div>
                </div>

                {/* Ligne pointillée */}
                <div className="border-t border-dashed mb-3" style={{ borderColor: border }}></div>

                {/* Trajet principal */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: textPrimary }}>
                      {flight.departTime || flight.departureTime || "08:30"}
                    </div>
                    <div className="text-xs" style={{ color: textSecondary }}>
                      {flight.from || flight.departureAirport || "CDG"}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-px flex-1" style={{ backgroundColor: border }}></div>
                      <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-opacity-20 backdrop-blur-sm">
                        <Clock style={{ color: primary }} className="w-3 h-3" />
                        <span className="text-xs font-medium" style={{ color: textPrimary }}>
                          {flight.duration || flight.totalDuration || "2h30"}
                        </span>
                      </div>
                      <div className="h-px flex-1" style={{ backgroundColor: border }}></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold" style={{ color: textPrimary }}>
                      {flight.arrivalTime || "11:00"}
                    </div>
                    <div className="text-xs" style={{ color: textSecondary }}>
                      {flight.to || flight.arrivalAirport || "FCO"}
                    </div>
                  </div>
                </div>

                {/* Infos supplémentaires */}
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: flight.stops === 0 ? `${primary}20` : `${secondary}20`,
                      color: flight.stops === 0 ? primary : secondary,
                    }}
                  >
                    {flight.stops === 0 ? "Direct" : `${flight.stops || 1} escale${(flight.stops || 1) > 1 ? "s" : ""}`}
                  </span>

                  {flight.bookingUrl && (
                    <a
                      href={flight.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 rounded-full transition-colors text-white"
                      style={{ backgroundColor: primary }}
                    >
                      <span>Réserver</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bouton voir plus */}
      {!showAll && flights.length > 2 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border"
            style={{
              backgroundColor: `${primary}20`,
              color: primary,
              borderColor: `${primary}30`,
            }}
          >
            +{flights.length - 2} vol{flights.length - 2 > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </section>
  )
}
