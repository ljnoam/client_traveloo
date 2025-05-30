import React from "react";

const TripSummaryCard = ({ trip, onClick }) => {
  console.log("TRIP:", trip);

  // Si created_at est défini et valide, on le formate
  let formattedDate = "Date inconnue";
  if (trip.created_at) {
    const parsed = new Date(trip.created_at);
    if (!isNaN(parsed)) {
      formattedDate = parsed.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  return (
    <div
      onClick={() => onClick(trip)}
      className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md transition"
    >
      <h3 className="text-lg font-bold text-blue-700 mb-1">
        ✈️ {trip.destination}
      </h3>
      <p className="text-sm text-gray-600">
        📅 {trip.start_date} → {trip.end_date}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        🗓️ Enregistré le {formattedDate}
      </p>
    </div>
  );
};

export default TripSummaryCard;
