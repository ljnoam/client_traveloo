// src/components/profile/UserCard.jsx
import React, { useContext } from "react";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const cardBg = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const borderColor = darkMode ? "border-violet-700" : "border-gray-300";
  const headingColor = darkMode ? "text-violet-300" : "text-gray-900";
  const textColor = darkMode ? "text-gray-100" : "text-gray-900";
  const btnGradient = darkMode
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600";

  if (!currentUser) {
    return (
      <div
        className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md flex flex-col items-center`}
      >
        <p className={textColor}>Chargement de votre profil…</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("traveloo_token");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div
      className={`${cardBg} ${borderColor} border rounded-2xl p-6 shadow-md flex flex-col items-center transition-colors duration-500`}
    >
      <img
        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.email}`}
        alt="avatar"
        className="w-20 h-20 rounded-full mb-4"
      />
      <h2 className={`text-2xl font-bold mb-2 ${headingColor}`}>Mon profil</h2>
      <p className={`${textColor}`}>{currentUser.email}</p>
      <p className={`${textColor}`}>Rôle : {currentUser.role}</p>
      <button
        onClick={handleLogout}
        className={`mt-4 px-4 py-2 rounded-full text-white bg-gradient-to-r ${btnGradient} hover:scale-[1.02] transition`}
      >
        Déconnexion
      </button>
    </div>
  );
}
