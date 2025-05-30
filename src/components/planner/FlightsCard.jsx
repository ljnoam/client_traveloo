import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

// Logos d’exemple par compagnie
const airlineLogos = {
  "Air France": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0SP9yj9YKqvtTZzSG4MR-GwtG9qFWIucZw&s",
  "Tunisair": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIzK5p2Nbqz5vcoGeQc4HpDC0MQwU2WVqHQ&s",
  "Ryanair": "https://yt3.googleusercontent.com/pt2Y-468S8Z9ZomqIGm5MXm2WG9xEtKsi2c1nYqnC_QFIZJjhaeHfVyt5ROz5giG-tuBnewoXds=s900-c-k-c0x00ffffff-no-rj",
};

export default function FlightCard({ flight }) {
  const { darkMode } = useTheme();

  const bg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-300";
  const badge = darkMode ? "text-purple-400" : "text-green-600";
  const button = darkMode
    ? "bg-purple-600 hover:bg-purple-700"
    : "bg-green-500 hover:bg-green-600";

  const logo = airlineLogos[flight.carrier] || "https://via.placeholder.com/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border ${border} ${bg} shadow-md p-4 flex flex-col gap-4`}
    >
      {/* Logo + compagnie */}
      <div className="flex items-center gap-3">
        <img src={logo} alt={flight.carrier} className="w-10 h-10 rounded-full object-cover" />
        <div className="font-bold">{flight.carrier}</div>
      </div>

      {/* Horaires & trajets */}
      <div className="flex justify-between text-sm font-medium">
        <div className="text-center">
          <p>{flight.from}</p>
          <p className="text-xs text-gray-400">{flight.departTime}</p>
        </div>
        <div className="text-xl">→</div>
        <div className="text-center">
          <p>{flight.to}</p>
          <p className="text-xs text-gray-400">{flight.arrivalTime}</p>
        </div>
      </div>

      {/* Détails techniques */}
      <div className="flex justify-between text-xs text-gray-400">
        <p>Durée : {flight.duration}</p>
        <p>{flight.stops === 0 ? "Vol direct" : `${flight.stops} escale(s)`}</p>
      </div>

      {/* Prix + bouton */}
      <div className="flex justify-between items-center mt-2">
        <p className={`text-lg font-bold ${badge}`}>€{flight.price}</p>
        <a href={flight.bookUrl || "#"} target="_blank" rel="noopener noreferrer">
          <button className={`px-4 py-1 text-xs text-white rounded-full ${button}`}>
            Réserver
          </button>
        </a>
      </div>
    </motion.div>
  );
}
