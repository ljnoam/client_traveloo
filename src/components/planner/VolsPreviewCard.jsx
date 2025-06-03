// src/components/planner/VolsPreviewCard.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function VolsPreviewCard({ flights = [], showAll = false }) {
  const { darkMode } = useTheme();
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-200";
  const flightsToShow = showAll ? flights.slice(0, 10) : flights.slice(0, 1);

  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}
      >
        {flights.length} vol{flights.length > 1 ? "s" : ""} trouvé
        {flights.length > 1 ? "s" : ""}
      </h3>
      <div className="flex flex-col space-y-6">
        {flightsToShow.map((flight, i) => {
          console.log("Flight object:", flight);
          return (
            <motion.div
              key={flight.id || flight.uuid || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`w-full rounded-2xl border ${border} ${cardBg} shadow-lg p-6 flex flex-col space-y-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={flight.airline_logo || "/placeholder-logo.png"}
                    alt={flight.airline || "Logo non disponible"}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-semibold text-lg">
                    {flight.airline || "Compagnie inconnue"}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {flight.stops > 0 ? `${flight.stops} escales` : "Direct"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {flight.origin_code}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {flight.departure_time}
                  </span>
                </div>
                <div className="text-center text-gray-400 dark:text-gray-500">
                  ✈️
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {flight.destination_code}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {flight.arrival_time}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-center space-x-1">
                  <span>⏱️ Durée :</span>
                  <span>{flight.duration} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🛄 Bagages :</span>
                  <span>{flight.baggage}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🍽️ Repas :</span>
                  <span>{flight.meals}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📶 Wifi :</span>
                  <span>{flight.wifi ? "Oui" : "Non"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold">
                  €{flight.price}
                </span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full">
                  Réserver
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
