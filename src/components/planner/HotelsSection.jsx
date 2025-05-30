"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../../context/ThemeContext"
import { MapPin, Star, Wifi, Car, Waves, ExternalLink, Bed } from "lucide-react"

export default function HotelsSection({ hotels = [], nightsCount = 3 }) {
  const { darkMode } = useTheme()
  const [showAll, setShowAll] = useState(false)

  const visibleHotels = showAll ? hotels : hotels.slice(0, 2)

  // Couleurs de la charte graphique
  const primary = darkMode ? "#1BA1C3" : "#37C0D8"
  const secondary = darkMode ? "#E0484C" : "#FF5A5F"
  const textPrimary = darkMode ? "#E5E7EB" : "#111827"
  const textSecondary = darkMode ? "#9CA3AF" : "#6B7280"
  const border = darkMode ? "#374151" : "#E5E7EB"
  const surface = darkMode ? "#1E1E1E" : "#FFFFFF"
  const cardBg = darkMode ? "rgba(18,18,18,0.3)" : "rgba(255,255,255,0.3)"

  const getAmenityIcon = (amenity) => {
    const iconClass = "w-3 h-3"
    const iconColor = primary
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className={iconClass} style={{ color: iconColor }} />
      case "parking":
        return <Car className={iconClass} style={{ color: iconColor }} />
      case "piscine":
      case "pool":
        return <Waves className={iconClass} style={{ color: iconColor }} />
      default:
        return <span className="w-2 h-2 rounded-full" style={{ backgroundColor: iconColor }}></span>
    }
  }

  return (
    <section className="w-full space-y-4">
      <div className="space-y-3">
        <AnimatePresence>
          {visibleHotels.map((hotel, i) => (
            <motion.div
              key={hotel.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg backdrop-blur-lg"
              style={{
                backgroundColor: cardBg,
                borderColor: border,
                borderWidth: "1px",
              }}
            >
              <div className="flex">
                {/* Image compacte */}
                {hotel.photo && (
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={hotel.photo || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Contenu principal */}
                <div className="flex-1 p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate" style={{ color: textPrimary }}>
                        {hotel.name}
                      </h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {hotel.stars && (
                          <div className="flex">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                        {hotel.rating && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: hotel.rating >= 8 ? `${primary}20` : `${secondary}20`,
                              color: hotel.rating >= 8 ? primary : secondary,
                            }}
                          >
                            {hotel.rating}/10
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin style={{ color: textSecondary }} className="w-3 h-3" />
                        <span className="text-xs truncate" style={{ color: textSecondary }}>
                          {hotel.distance || hotel.location || hotel.address}
                        </span>
                      </div>
                    </div>

                    <div className="text-right ml-2">
                      <div className="text-lg font-bold" style={{ color: secondary }}>
                        €{hotel.price || hotel.totalPrice || "N/A"}
                      </div>
                      <div className="text-xs" style={{ color: textSecondary }}>
                        {nightsCount} nuit{nightsCount > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Équipements compacts */}
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="flex items-center space-x-2 mb-2">
                      {hotel.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-1">
                          {getAmenityIcon(amenity)}
                        </div>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-xs" style={{ color: textSecondary }}>
                          +{hotel.amenities.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Chambre principale */}
                  {hotel.rooms && hotel.rooms[0] && (
                    <div
                      className="text-xs p-2 rounded"
                      style={{ backgroundColor: darkMode ? "rgba(30,30,30,0.5)" : "rgba(249,250,251,0.5)" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Bed style={{ color: primary }} className="w-3 h-3" />
                          <span style={{ color: textPrimary }}>{hotel.rooms[0].type}</span>
                        </div>
                        <span className="font-medium" style={{ color: textPrimary }}>
                          €{hotel.rooms[0].price}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      {hotel.rooms && hotel.rooms.length > 1 && (
                        <span className="text-xs" style={{ color: textSecondary }}>
                          +{hotel.rooms.length - 1} chambre{hotel.rooms.length - 1 > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    {hotel.bookUrl && (
                      <a
                        href={hotel.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors text-white"
                        style={{ backgroundColor: primary }}
                      >
                        <span>Réserver</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bouton voir plus */}
      {!showAll && hotels.length > 2 && (
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
            +{hotels.length - 2} hôtel{hotels.length - 2 > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </section>
  )
}
