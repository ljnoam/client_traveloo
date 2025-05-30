// src/components/planner/ItinerarySection.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function ItinerarySection({ itinerary = [], showAll = false }) {
  const { darkMode } = useTheme();
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-200";
  const badge = darkMode ? "text-purple-400" : "text-green-600";

  // 1 jour par défaut, tous les jours si showAll
  const daysToShow = showAll ? itinerary : itinerary.slice(0, 1);

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
        Itinéraire
      </motion.h2>

      {daysToShow.map((day, dayIndex) => (
        <motion.div
          key={dayIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
          className={`
            rounded-xl border ${border} ${cardBg}
            shadow-md p-4 space-y-2
          `}
        >
          <p className={`font-semibold ${badge}`}>Jour {dayIndex + 1}</p>
          {/* 1 activité par défaut, toutes si showAll */}
          {day.activities
            .slice(0, showAll ? day.activities.length : 1)
            .map((act, i) => (
              <div
                key={i}
                className="
                  text-sm pl-2 border-l-2 border-dashed
                  border-gray-400 ml-1 mb-2
                "
              >
                <p className="font-medium">
                  {act.time} – {act.name}
                </p>
                <p className="text-gray-400 text-xs">{act.location}</p>
                <p className="text-xs">{act.description}</p>
                {act.price > 0 && (
                  <p className="text-xs italic text-gray-500">
                    €{act.price}
                  </p>
                )}
              </div>
            ))}
        </motion.div>
      ))}
    </div>
);
}
