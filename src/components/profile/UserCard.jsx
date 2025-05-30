import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { supabase } from "../../api/supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";

export default function UserCard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [sending, setSending] = useState(false);

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-green-50/80";
  const backdrop = "backdrop-blur-md";
  const borderColor = darkMode ? "border-violet-700" : "border-green-300";
  const headingColor = darkMode ? "text-violet-300" : "text-green-600";
  const textColor = darkMode ? "text-gray-100" : "text-gray-900";
  const btnGradient = darkMode
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500";

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleVerify = async () => {
    setSending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
    });
    setSending(false);

    if (error) {
      toast.error("❌ Erreur lors de l'envoi de l'email de vérification !");
    } else {
      toast.success("📬 Email de vérification envoyé !");
    }
  };

  return (
    <div className={`${cardBg} ${backdrop} border ${borderColor} flex flex-col items-center p-8 rounded-2xl shadow-xl space-y-4 transition-colors duration-500`}>
      <img
        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`}
        alt="avatar"
        className="w-24 h-24 rounded-full shadow mb-2"
      />
      <h2 className={`text-2xl font-bold ${headingColor}`}>Mon profil</h2>
      <p className={`${textColor}`}>{user?.email}</p>

      {user?.email_confirmed_at ? (
        <span className="flex items-center gap-2 text-green-400">
          <FaCheckCircle /> Email vérifié
        </span>
      ) : (
        <button
          onClick={handleVerify}
          disabled={sending}
          className="flex items-center gap-2 text-yellow-400 hover:underline"
        >
          <FaExclamationCircle /> {sending ? "Envoi en cours..." : "Vérifier mon email"}
        </button>
      )}

      <button
        onClick={logout}
        className={`mt-4 flex items-center gap-2 bg-gradient-to-r ${btnGradient} text-white px-6 py-2 rounded-full font-semibold hover:brightness-105 transition`}
      >
        <FaSignOutAlt /> Déconnexion
      </button>
    </div>
  );
}
