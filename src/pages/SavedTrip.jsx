// src/pages/SavedTrip.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightCard from "../components/trip/FlightCard";
import HotelCard from "../components/trip/HotelCard";
import ItineraryDay from "../components/trip/ItineraryDay";

const SavedTrip = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const trip = state?.trip;

  if (!trip)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="p-10 text-red-500 text-center text-lg">❌ Aucun voyage trouvé.</p>
      </div>
    );

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 sm:py-20 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-gray-900 dark:to-gray-800 space-y-10 text-gray-900 dark:text-gray-100">
      {/* 🔙 Bouton retour */}
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ⬅️ Retour au profil
        </button>
      </div>

      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl p-6 sm:p-10 rounded-2xl max-w-5xl mx-auto space-y-10 border border-yellow-200 dark:border-gray-700">
        {/* Destination */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-yellow-800 dark:text-yellow-300">
          ✈️ Voyage enregistré à {trip.destination}
        </h1>

        {/* Dates */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          📅 {new Date(trip.start_date).toLocaleDateString()} ➔ {new Date(trip.end_date).toLocaleDateString()}
        </p>

        {/* ✈️ Vols */}
        {trip.flights && (
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-sky-800 dark:text-sky-300">✈️ Vols</h2>

            {/* Vols aller */}
            {trip.flights.outbound?.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-sky-600 dark:text-sky-400">Aller</h3>
                <div className="flex flex-wrap gap-4">
                  {trip.flights.outbound.map((f, i) => (
                    <FlightCard key={i} flight={f} />
                  ))}
                </div>
              </>
            )}

            {/* Vols retour */}
            {trip.flights.return?.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-sky-600 dark:text-sky-400">Retour</h3>
                <div className="flex flex-wrap gap-4">
                  {trip.flights.return.map((f, i) => (
                    <FlightCard key={i} flight={f} />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* 🏨 Hôtels */}
        {trip.hotels && Array.isArray(trip.hotels) && trip.hotels.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-700 dark:text-yellow-400">🏨 Hôtels recommandés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.hotels.map((hotel, i) => (
                <HotelCard key={i} hotel={hotel} />
              ))}
            </div>
          </section>
        )}

        {/* 📅 Itinéraire */}
        {trip.itinerary && Array.isArray(trip.itinerary) && trip.itinerary.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-800 dark:text-teal-400">📘 Itinéraire</h2>
            <div className="space-y-6">
              {trip.itinerary.map((day, i) => (
                <ItineraryDay key={i} day={day} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SavedTrip;
