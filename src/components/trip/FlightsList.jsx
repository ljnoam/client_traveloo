// src/components/trip/FlightsList.jsx
import React from "react";
import FlightCard from "./FlightCard";

export default function FlightsList({ flights }) {
    return (
      <div className="...">
        <h2 className="...">✈️ Vols disponibles</h2>
        {flights.length > 0 ? (
          <div className="...">
            {flights.map((flight, i) => (
              <FlightCard key={i} flight={flight} />
            ))}
          </div>
        ) : (
          <p className="text-red-400">❌ Aucun vol trouvé.</p>
        )}
      </div>
    );
  }
  