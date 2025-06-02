// src/components/UI/TripSummaryCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSuitcase } from "react-icons/fa";

export default function TripSummaryCard({ trip }) {
  const navigate = useNavigate();
  const {
    id,
    destination,
    start_date: startDate,
    end_date: endDate,
  } = trip;

  const handleClick = () => {
    // Par exemple, on peut naviguer vers une page detail en passant l’objet trip en state
    navigate("/saved-trip", { state: { trip } });
  };

  return (
    <div 
      className="flex items-center justify-between p-4 border rounded-lg shadow hover:shadow-lg transition"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center gap-3">
        <FaSuitcase className="text-green-600 dark:text-green-400" size={24} />
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            {destination}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(startDate).toLocaleDateString()} → {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button className="text-blue-600 dark:text-blue-400 underline text-sm">
        Voir détails
      </button>
    </div>
  );
}