// src/components/profile/DeleteAccount.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/config";

export default function DeleteAccount() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const borderColor = darkMode ? "border-violet-700" : "border-gray-300";
  const titleColor = darkMode ? "text-violet-300" : "text-gray-900";
  const descColor = darkMode ? "text-gray-400" : "text-gray-700";
  const btnLogout = darkMode
    ? "bg-violet-500 text-white hover:bg-violet-600"
    : "bg-blue-500 text-white hover:bg-blue-600";
  const btnDelete = "bg-red-600 text-white hover:bg-red-700";

  const handleLogout = () => {
    localStorage.removeItem("traveloo_token");
    setCurrentUser(null);
    navigate("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      return;
    }
    try {
      await api.delete("/auth/delete-account"); // Ajuster si endpoint différent
      localStorage.removeItem("traveloo_token");
      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      console.error("Erreur suppression compte :", err);
      alert("Impossible de supprimer le compte");
    }
  };

  if (!currentUser) {
    return (
      <div
        className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md`}
      >
        <p className="text-center text-gray-500">Chargement…</p>
      </div>
    );
  }

  return (
    <div
      className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md transition-colors duration-500`}
    >
      <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>
        Désactiver / Supprimer le compte
      </h3>
      <p className={`${descColor} mb-4`}>
        Vous pouvez vous déconnecter ou supprimer définitivement votre compte.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogout}
          className={`w-full py-2 rounded-lg font-semibold ${btnLogout} transition`}
        >
          Se déconnecter
        </button>
        <button
          onClick={handleDelete}
          className={`w-full py-2 rounded-lg font-semibold ${btnDelete} transition`}
        >
          Supprimer définitivement
        </button>
      </div>
    </div>
  );
}
