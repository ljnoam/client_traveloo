// src/pages/Itinerary.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Itinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  // On s’attend à ce que location.state.itinerary soit un objet { city, start_date, end_date, activities: [ … ] }
  const itinerary = location.state?.itinerary || null;

  if (!itinerary) {
    return (
      <div className="text-center mt-12">
        <p>Aucun itinéraire n'a été généré.</p>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate("/")}
        >
          Retour à l’accueil
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl my-12 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Itinéraire pour {itinerary.city} du {itinerary.start_date} au {itinerary.end_date}
      </h2>
      {itinerary.activities && itinerary.activities.length > 0 ? (
        <div className="space-y-6">
          {itinerary.activities.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                Jour {item.day} : {item.title}
              </h3>
              <p className="mt-2 text-gray-700">{item.description}</p>
              {item.time && (
                <p className="mt-1 text-sm text-gray-500">Heure : {item.time}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Aucune activité n’a été générée.</p>
      )}
      <div className="text-center mt-8">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate(-1)}
        >
          Retour
        </button>
      </div>
    </div>
  );
}
