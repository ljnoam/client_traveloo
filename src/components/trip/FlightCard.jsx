// src/components/trip/FlightCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function FlightCard({ flight }) {
  const { darkMode } = useTheme();

  // Couleurs selon le mode
  const badgeColor = darkMode ? "text-purple-400" : "text-green-600";
  const borderColor = darkMode ? "border-purple-700" : "border-green-200";
  const bgColor = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";
  const accentButton = darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-green-500 hover:bg-green-600";

  // Fake fallback si données manquent
  const fake = {
    logo: flight.logo || "https://yt3.googleusercontent.com/pt2Y-468S8Z9ZomqIGm5MXm2WG9xEtKsi2c1nYqnC_QFIZJjhaeHfVyt5ROz5giG-tuBnewoXds=s900-c-k-c0x00ffffff-no-rj", // Ryanair par défaut
    carrier: flight.carrier || "Ryanair",
    from: flight.from || "CDG",
    to: flight.to || "JFK",
    departTime: flight.departTime || "10:45",
    arrivalTime: flight.arrivalTime || "14:20",
    duration: flight.duration || "8h 35m",
    stops: flight.stops ?? 1,
    baggages: flight.baggages || "1 bagage cabine + 1 bagage en soute",
    comfort: flight.comfort || { wifi: true, meal: true },
    rating: flight.rating || 4.3,
    price: flight.price || 465.99,
    bookUrl: flight.bookUrl || "#",
  };

  return (
    <motion.div
      className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} shadow-sm flex flex-col justify-between space-y-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header compagnie + logo */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={fake.logo} alt="logo compagnie" className="w-6 h-6 rounded-full" />
          <p className="text-sm font-semibold">{fake.carrier}</p>
        </div>
        <span className={`text-xs ${badgeColor}`}>
          {fake.stops === 0 ? "Vol direct" : `${fake.stops} escale${fake.stops > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Trajet */}
      <div className="flex items-center justify-between text-center">
        <div>
          <p className="text-lg font-bold">{fake.from}</p>
          <p className="text-sm text-gray-400">{fake.departTime}</p>
        </div>
        <div className="flex-1 mx-2 border-t border-dashed border-gray-400 relative">
          <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xl ${badgeColor}`}>✈️</span>
        </div>
        <div>
          <p className="text-lg font-bold">{fake.to}</p>
          <p className="text-sm text-gray-400">{fake.arrivalTime}</p>
        </div>
      </div>

      {/* Durée + bagages + confort */}
      <div className="text-sm space-y-1 text-gray-400">
        <p>🕒 Durée : <span className="text-gray-200">{fake.duration}</span></p>
        <p>🧳 Bagages : <span className="text-gray-200">{fake.baggages}</span></p>
        <p>🍽️ Repas : {fake.comfort.meal ? "Inclus" : "Non"} • 📶 Wifi : {fake.comfort.wifi ? "Oui" : "Non"}</p>
        <p>⭐ Note : <span className="text-gray-200">{fake.rating}/5</span></p>
      </div>

      {/* Bas de carte */}
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-xl font-bold ${badgeColor}`}>€{fake.price}</span>
        <a href={fake.bookUrl} target="_blank" rel="noopener noreferrer">
          <button className={`px-4 py-1 rounded-full text-sm font-semibold shadow ${accentButton} text-white`}>
            Réserver
          </button>
        </a>
      </div>
    </motion.div>
  );
}
