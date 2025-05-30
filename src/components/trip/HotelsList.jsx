// src/components/trip/HotelsList.jsx
import React from "react";
import HotelCard from "./HotelCard";

export default function HotelsList({ hotels, nights }) {
  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          🏨 Hôtels disponibles
        </h2>
      </div>
      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, i) => (
            <HotelCard
              key={i}
              hotel={hotel}
              nights={nights}
              showTotalPrice={true} // tu peux rendre dynamique si besoin
            />
          ))}
        </div>
      ) : (
        <p className="text-red-400">❌ Aucun hôtel trouvé.</p>
      )}
    </div>
  );
}
