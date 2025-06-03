"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";

// Petite map pour ajouter une icône selon le type d'activité
const activityIcons = {
  walk: "🚶",
  restaurant: "🍽️",
  brunch: "🥐",
  visit: "🏛️",
  shop: "🛍️",
  experience: "⭐",
  market: "🧺",
  creative_workshop: "🎨",
};

export default function ItinerarySection({ itinerary = [] }) {
  const { darkMode } = useTheme();

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div
        className={`p-6 rounded-2xl ${
          darkMode ? "bg-black/70 text-violet-100" : "bg-white/80 text-gray-900"
        }`}
      >
        <p>Aucune activité disponible.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {itinerary.map((day, dayIndex) => {
        const displayDate = new Date(day.date).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div key={day.date || dayIndex} className="space-y-3">
            {/* Header du jour */}
            <div
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                darkMode
                  ? "bg-violet-700 text-violet-100"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Jour {dayIndex + 1} – {displayDate}
            </div>

            {/* Conteneur des activités */}
            <div
              className={`rounded-2xl overflow-hidden divide-y ${
                darkMode
                  ? "bg-black/70 divide-violet-500/20 text-violet-100"
                  : "bg-white/80 divide-gray-200 text-gray-900"
              }`}
            >
              {Array.isArray(day.activities) && day.activities.length > 0 ? (
                day.activities.map((act, actIndex) => (
                  <div
                    key={`${day.date}-${actIndex}-${act.name}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3"
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      {act.start_time} – {act.end_time}
                    </div>
                    <div className="flex-1 sm:ml-4 mt-1 sm:mt-0 flex justify-between items-center">
                      <span className="text-base font-semibold">{act.name}</span>
                      <span className="text-sm opacity-70 ml-4">
                        {activityIcons[act.type] || "🎯"} {act.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3">Aucune activité ce jour.</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
