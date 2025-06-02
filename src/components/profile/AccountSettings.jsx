// src/components/profile/AccountSettings.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { api } from "../../api/config";

export default function AccountSettings() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const borderColor = darkMode ? "border-violet-700" : "border-gray-300";
  const titleColor = darkMode ? "text-violet-300" : "text-gray-900";

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setLoading(false);
    }
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      const payload = { email };
      const res = await api.put("/auth/update-profile", payload);
      setCurrentUser(res.data);
      alert("Profil mis à jour.");
    } catch (err) {
      console.error("Erreur update-profile :", err);
      alert("Impossible de mettre à jour le profil");
    }
  };

  if (!currentUser || loading) {
    return (
      <div
        className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md`}
      >
        <p className="text-center text-gray-500">Chargement des paramètres…</p>
      </div>
    );
  }

  return (
    <div
      className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md transition-colors duration-500`}
    >
      <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>
        Paramètres du compte
      </h3>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200">Email :</span>
        <input
          type="email"
          value={email}
          disabled
          className="mt-1 w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </label>
      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Mettre à jour l’email
      </button>
    </div>
  );
}
