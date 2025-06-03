// src/components/planner/PlannerHeader.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import UiverseFavoriteButton from "../ui/UiverseFavoriteButton";

export default function PlannerHeader({ origin, destination, departureDate, returnDate }) {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();

  // Choix du gradient selon le thème sombre ou clair
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";

  // Fonction qui enregistre ce voyage en favoris, en envoyant origin/destination dans le body
  const saveToFavorites = async () => {
    if (!user) return alert("Connecte-toi d'abord !");
    try {
      await fetch("http://localhost:5002/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.uid,
          origin,
          destination,
          departureDate,
          returnDate,
        }),
      });
      alert("Ajouté aux favoris !");
    } catch (error) {
      console.error("Erreur ajout favori :", error);
      alert("Impossible d'ajouter aux favoris.");
    }
  };

  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1
        className={`inline-block px-6 py-4 rounded-full text-3xl font-extrabold
                    bg-gradient-to-r ${titleGradient} text-white shadow-lg`}
      >
        {origin} → {destination}{" "}
        <span className="text-base font-medium ml-2">
          ({departureDate}
          {returnDate && ` ↔ ${returnDate}`})
        </span>
      </h1>

      {/* Bouton Favoris centré sous le titre */}
      <div className="flex justify-center">
        <UiverseFavoriteButton onClick={saveToFavorites} />
      </div>
    </motion.div>
  );
}
