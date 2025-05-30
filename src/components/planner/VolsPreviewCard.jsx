// src/components/planner/VolsPreviewCard.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import FlightCard from "../trip/FlightCard";

export default function VolsPreviewCard({ flights = [], showAll = false }) {
  const { darkMode } = useTheme();
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-200";
  
  // 1 seul vol par défaut, jusqu’à 3 quand showAll
  const flightsToShow = showAll ? flights.slice(0, 3) : flights.slice(0, 1);

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

      {flightsToShow.map((flight, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className={`
            rounded-xl border ${border} ${cardBg}
            shadow-md p-4
          `}
        >
          <FlightCard flight={flight} />
        </motion.div>
      ))}
    </div>
  );
}
