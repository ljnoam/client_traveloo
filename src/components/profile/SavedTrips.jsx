import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSuitcase, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../api/supabaseClient";
import TripSummaryCard from "../UI/TripSummaryCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Composant modal spécifique à SavedTrips
function DeleteConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Confirmer la suppression
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Voulez-vous vraiment supprimer ce voyage de vos favoris ?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SavedTrips() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-green-50/80";
  const backdrop = "backdrop-blur-md";
  const borderColor = darkMode ? "border-violet-700" : "border-green-300";
  const titleColor = darkMode ? "text-violet-300" : "text-green-600";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur Supabase:", error.message);
        toast.error("Erreur de récupération des favoris : " + error.message);
      } else {
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  const handleTripClick = (trip) => {
    navigate("/saved-trip", { state: { trip } });
  };

  const openModal = (trip) => {
    setTripToDelete(trip);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!tripToDelete) return;
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", tripToDelete.id);

    if (error) {
      toast.error("Erreur lors de la suppression : " + error.message);
    } else {
      setFavorites((prev) => prev.filter((t) => t.id !== tripToDelete.id));
      toast.success("Voyage supprimé des favoris !");
    }

    setShowModal(false);
    setTripToDelete(null);
  };

  return (
    <>
      {/* Position changed to bottom-center for visibility */}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
      <div className={`${cardBg} ${backdrop} border ${borderColor} p-6 rounded-xl shadow-md transition-colors duration-500`}>
        <h3 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${titleColor}`}>
          <FaSuitcase /> Mes voyages enregistrés
        </h3>

        {loading ? (
          <p className={`italic ${textColor}`}>Chargement...</p>
        ) : favorites.length === 0 ? (
          <p className={`italic ${textColor}`}>Aucun voyage sauvegardé pour le moment.</p>
        ) : (
          <div className="grid gap-4">
            {favorites.map((trip) => (
              <div key={trip.id} className="relative group">
                <TripSummaryCard trip={trip} onClick={() => handleTripClick(trip)} />
                <button
                  onClick={() => openModal(trip)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white/50 rounded-full p-1"
                  title="Supprimer des favoris"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}