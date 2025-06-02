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
  const flightsToShow = showAll ? flights.slice(0, 3) : flights.slice(0, 1);

  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}
      >
        {flights.length} vol{flights.length > 1 ? "s" : ""} trouvé
        {flights.length > 1 ? "s" : ""}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flightsToShow.map((flight, i) => (
          <motion.div
            key={flight.id || flight.uuid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`rounded-xl border ${border} ${cardBg} shadow-md p-4`}
          >
            <FlightCard flight={flight} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
