import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Star } from "lucide-react";

export default function HotelCard({ hotels = [], nightsCount = 3 }) {
  const { darkMode } = useTheme();

  const border = darkMode ? "border-purple-700" : "border-green-200";
  const bg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const badge = darkMode ? "text-purple-400" : "text-green-600";
  const button = darkMode
    ? "bg-purple-600 hover:bg-purple-700"
    : "bg-green-500 hover:bg-green-600";

  const displayedHotels = hotels.slice(0, 2);

  return (
    <div className="space-y-4">
      {displayedHotels.map((hotel, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className={`rounded-xl border ${border} ${bg} shadow-md overflow-hidden`}
        >
          <img
            src={hotel.photo}
            alt={hotel.name}
            className="w-full h-32 object-cover"
          />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>

            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              {Array(hotel.stars)
                .fill(0)
                .map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
            </div>

            <p className="text-sm text-gray-400">{hotel.address}</p>
            <p className="text-sm text-gray-400">
              À {hotel.distance || "1.2 km"} du centre • Check-in {hotel.checkIn}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className={`text-lg font-bold ${badge}`}>
                Total : €{hotel.price} ({nightsCount} nuits)
              </span>
              <a href={hotel.bookUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className={`px-4 py-1 text-sm font-semibold text-white rounded-full ${button}`}
                >
                  Réserver
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
