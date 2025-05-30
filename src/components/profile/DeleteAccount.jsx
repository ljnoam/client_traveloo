import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../api/supabaseClient";
import { toast } from "react-toastify";

export default function DeleteAccount() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const outerBg = darkMode ? "bg-gray-800/80" : "bg-green-50/80";
  const backdrop = "backdrop-blur-md";
  const border = darkMode ? "border-violet-700" : "border-green-300";
  const titleCol = darkMode ? "text-violet-300" : "text-green-600";
  const descCol = darkMode ? "text-gray-300" : "text-gray-700";
  const footerBg = darkMode ? "bg-gray-900/80" : "bg-green-100/80";
  const btnLogout = darkMode
    ? "bg-violet-500 text-white hover:bg-violet-600"
    : "bg-green-400 text-white hover:bg-green-500";
  const btnDelete = "bg-red-500 text-white hover:bg-red-600";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDelete = async () => {
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      toast.error("❌ Erreur lors de la suppression !");
    } else {
      toast.success("Compte supprimé !");
      navigate("/");
    }
  };

  return (
    <div className={`${outerBg} ${backdrop} ${border} border-2 max-w-xl mx-auto rounded-xl overflow-hidden transition-colors duration-500`}>
      <div className="pt-12 pb-8 px-5 text-center">
        <h4 className={`text-xl font-semibold mb-2 ${titleCol}`}>
          Désactiver / Supprimer le compte
        </h4>
        <p className={`mb-2 ${descCol}`}>
          Êtes-vous sûr·e de vouloir désactiver votre compte ?
        </p>
      </div>
      <div className={`${footerBg} px-6 pb-6 pt-4 space-y-4`}>
        <button
          onClick={handleLogout}
          className={`w-full py-3 rounded-lg font-semibold transition ${btnLogout}`}
        >
          Se déconnecter
        </button>
        <button
          onClick={handleDelete}
          className={`w-full py-3 rounded-lg font-semibold transition ${btnDelete}`}
        >
          Supprimer définitivement
        </button>
      </div>
    </div>
  );
}
