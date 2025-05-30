import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Le mot de passe doit faire au moins 6 caractères !");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error("Erreur : " + error.message);
    } else {
      toast.success("Mot de passe mis à jour avec succès !");
      navigate("/profile"); // Redirige vers le profil ou où tu veux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">🔒 Définir un nouveau mot de passe</h1>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Valider le nouveau mot de passe
        </button>
      </div>
    </div>
  );
}
