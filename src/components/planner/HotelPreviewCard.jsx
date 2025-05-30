// src/components/planner/HotelPreviewCard.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function HotelPreviewCard({
  hotels = [],
  nightsCount = 3,
  showAll = false,
}) {
  const { darkMode } = useTheme();
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-200";
  const badgeColor = darkMode ? "text-purple-400" : "text-green-600";
  const buttonColor = darkMode
    ? "bg-purple-600 hover:bg-purple-700"
    : "bg-green-500 hover:bg-green-600";

  // 1 seul hôtel par défaut, jusqu’à 3 quand showAll
  const hotelsToShow = showAll ? hotels.slice(0, 3) : hotels.slice(0, 1);

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`
          text-2xl font-bold text-center
          bg-gradient-to-r ${titleGradient}
          bg-clip-text text-transparent
        `}
      >
        
      </motion.h2>

      {hotelsToShow.map((hotel, i) => (
        <motion.div
          key={hotel.id || i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className={`
            flex rounded-xl border ${border} ${cardBg}
            shadow-md overflow-hidden
          `}
        >
          <img
            src={hotel.photo}
            alt={hotel.name}
            className="w-32 h-32 object-cover flex-shrink-0"
          />
          <div className="p-4 flex-1 space-y-1 text-sm">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <div className="flex items-center gap-1 text-yellow-400">
              {Array(hotel.stars)
                .fill(0)
                .map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
              <span className={`${badgeColor} ml-2`}>
                ⭐ {hotel.rating}/10
              </span>
            </div>
            <p className="text-gray-400">{hotel.address}</p>
            <p className="text-gray-400">Distance : {hotel.distance}</p>
            <p className={`font-bold ${badgeColor}`}>
              €{hotel.price} total ({nightsCount} nuit
              {nightsCount > 1 ? "s" : ""})
            </p>
            <a href={hotel.bookUrl} target="_blank" rel="noopener noreferrer">
              <button
                className={`
                  mt-2 w-full py-2 text-sm text-white
                  rounded-full ${buttonColor}
                `}
              >
                Réserver
              </button>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
