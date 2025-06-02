// src/components/profile/SavedTrips.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { api } from "../../api/config";
import TripSummaryCard from "../UI/TripSummaryCard";

export default function SavedTrips() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Styles conditionnels
  const cardBg      = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const borderColor = darkMode ? "border-violet-700" : "border-gray-300";
  const titleColor  = darkMode ? "text-violet-300" : "text-gray-900";
  const textColor   = darkMode ? "text-gray-100" : "text-gray-900";

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Appel à l'API pour récupérer la liste des favoris
        const res = await api.get("/favorites/");
        setFavorites(res.data || []);
      } catch (err) {
        console.error("[SavedTrips] Erreur récupération des favoris :", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const handleDelete = async (tripId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce voyage ?")) return;
    try {
      await api.delete(`/favorites/${tripId}`);
      setFavorites((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      console.error("[SavedTrips] Erreur suppression favori :", err);
      alert("Impossible de supprimer ce favori pour le moment.");
    }
  };

  // Tant que currentUser n'est pas encore chargé
  if (!currentUser && loading) {
    return (
      <div className={`${cardBg} ${borderColor} border rounded-2xl p-8 shadow-md`}>
        <p className={textColor}>Vérification des accès…</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={`${cardBg} ${borderColor} border rounded-2xl p-8 shadow-md`}>
        <p className={textColor}>Vous devez être connecté pour voir vos favoris.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${cardBg} ${borderColor} border rounded-2xl p-8 shadow-md`}>
        <p className={textColor}>Chargement de vos voyages enregistrés…</p>
      </div>
    );
  }

  // CSS du bouton “Delete” tel que fourni (Uiverse)
  const deleteButtonCSS = `
    /* From Uiverse.io by vinodjangid07 */ 
    .button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgb(20, 20, 20);
      border: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
      cursor: pointer;
      transition-duration: .3s;
      overflow: hidden;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .svgIcon {
      width: 12px;
      transition-duration: .3s;
    }

    .svgIcon path {
      fill: white;
    }

    .button:hover {
      width: 140px;
      border-radius: 50px;
      transition-duration: .3s;
      background-color: rgb(255, 69, 69);
      align-items: center;
    }

    .button:hover .svgIcon {
      width: 50px;
      transition-duration: .3s;
      transform: translateY(60%);
    }

    .button::before {
      position: absolute;
      top: -20px;
      content: "Delete";
      color: white;
      transition-duration: .3s;
      font-size: 2px;
    }

    .button:hover::before {
      font-size: 13px;
      opacity: 1;
      transform: translateY(30px);
      transition-duration: .3s;
    }
  `;

  return (
    <>
      <style>{deleteButtonCSS}</style>

      <div className={`${cardBg} ${borderColor} border rounded-2xl p-8 shadow-md`}>
        <h3 className={`text-2xl font-bold mb-6 ${titleColor}`}>Mes voyages enregistrés</h3>

        {favorites.length === 0 ? (
          <p className={textColor}>Aucun voyage sauvegardé pour le moment.</p>
        ) : (
          <div className="grid gap-6">
            {favorites.map((trip) => (
              <div
                key={trip.id}
                className={`${cardBg} ${borderColor} border rounded-2xl relative p-6 shadow-lg transition-colors duration-500`}
              >
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="button"
                  title="Supprimer ce favori"
                >
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>

                <TripSummaryCard trip={trip} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
