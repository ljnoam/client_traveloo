// src/components/admin/NavbarAdmin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";

export default function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erreur lors de la déconnexion :", error.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur inattendue lors de la déconnexion", error);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </header>
  );
}
