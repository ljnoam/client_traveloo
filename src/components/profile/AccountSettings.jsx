import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../api/supabaseClient";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function AccountSettings() {
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-green-50/80";
  const backdrop = "backdrop-blur-md";
  const borderColor = darkMode ? "border-violet-700" : "border-green-300";
  const titleColor = darkMode ? "text-violet-300" : "text-green-600";

  const handleResetPassword = async () => {
    if (!user) {
      toast.error("Utilisateur non connecté");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: "http://localhost:5173/update-password", // 🔥 Redirige vers UpdatePassword.jsx
    });

    if (error) {
      toast.error("❌ Erreur lors de l'envoi : " + error.message);
    } else {
      toast.success("📧 Email de réinitialisation envoyé !");
    }
  };

  return (
    <div className={`${cardBg} ${backdrop} border ${borderColor} p-6 rounded-xl shadow-md text-center transition-colors duration-500`}>
      <h3 className={`flex items-center justify-center gap-2 text-lg font-semibold mb-3 ${titleColor}`}>
        <FaUserEdit /> Paramètres du compte
      </h3>

      <button
        onClick={handleResetPassword}
        className={`underline ${titleColor} hover:opacity-80 transition-opacity`}
      >
        Réinitialiser mon mot de passe
      </button>
    </div>
  );
}
