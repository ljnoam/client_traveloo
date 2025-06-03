// src/pages/Favorites.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../api/config";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/layout/Loader";

export default function Favorites() {
  const { currentUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger la liste des favoris à l’affichage de la page
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/favorites/");
        // On suppose que l’API renvoie un tableau d’objets favoris
        setFavorites(response.data || []);
      } catch (err) {
        console.error("Erreur récupération favoris :", err.response || err);
        setError("Impossible de récupérer vos favoris.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Fonction pour supprimer un favori
  const handleDelete = async (favId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce favori ?")) return;
    try {
      await api.delete(`/favorites/${favId}`);
      setFavorites((prev) => prev.filter((f) => f.id !== favId));
    } catch (err) {
      console.error("Erreur suppression favori :", err.response || err);
      alert("Impossible de supprimer ce favori.");
    }
  };

  // Fonction pour ajouter un nouveau favori (exemple manuel ou via un formulaire)
  const handleAddCustom = async () => {
    // Exemple simplifié : on ajoute un favori statique
    const payload = {
      user_id: currentUser.id,
      origin: "PAR",
      destination: "NYC",
      departure_date: "2025-08-01",
      return_date: "2025-08-10",
    };
    try {
      const response = await api.post("/favorites", payload);
      setFavorites((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Erreur ajout favori :", err.response || err);
      alert("Impossible d’ajouter ce favori.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Mes favoris</h2>
      {loading ? (
        <div className="flex justify-center mt-12">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
          {error}
        </div>
      ) : favorites.length === 0 ? (
        <p className="text-center">Vous n’avez aucun favori pour l’instant.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="p-4 border border-gray-300 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {fav.origin} → {fav.destination}
                </p>
                <p className="text-sm text-gray-600">
                  {fav.departure_date}
                  {fav.return_date && ` - ${fav.return_date}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(fav.id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Pour tester manuellement l’ajout — à supprimer si pas nécessaire */}
      <div className="text-center mt-8">
        <button
          onClick={handleAddCustom}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ajouter un favori d’exemple
        </button>
      </div>
    </div>
  );
}
