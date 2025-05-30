import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

/**
 * Bouton pour ajouter un voyage aux favoris.
 * Prend en entrée userId et trip (avec toutes les infos),
 * mappe vers le format snake_case, insère en base.
 */
export default function AddToFavoritesButton({ userId, trip, className = "" }) {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!userId) {
      toast.error("Veuillez vous connecter pour ajouter aux favoris !");
      return;
    }

    // Debug logs pour vérifier les données
    console.log("[AddToFavorites] userId:", userId);
    console.log("[AddToFavorites] trip:", trip);

    setSaving(true);
    const newFavorite = {
      user_id: userId,
      destination: trip.destination,
      start_date: trip.startDate,
      end_date: trip.endDate,
      flights: trip.flights,
      hotels: trip.hotels,
      itinerary: trip.itinerary,
    };

    // On ajoute .select() pour retourner la donnée insérée
    const { data, error } = await supabase
      .from("favorites")
      .insert([newFavorite])
      .select();

    setSaving(false);

    console.log("[AddToFavorites] insert result:", { data, error });

    if (error) {
      toast.error("Erreur en ajoutant aux favoris : " + error.message);
    } else {
      toast.success("Voyage ajouté aux favoris !");
      setSuccess(true);
    }
  };

  // Reset animation
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 800);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      {/* Notification repositionnée en bas de la page */}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />

      <motion.button
        onClick={handleSave}
        disabled={saving}
        className={`${className} mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-md hover:opacity-90 transition`}
        animate={success ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {saving ? "Enregistrement..." : "⭐ Ajouter aux favoris"}
      </motion.button>
    </>
  );
}
