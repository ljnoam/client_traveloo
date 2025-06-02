// src/pages/Admin.jsx
import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/config";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/layout/Loader";

export default function Admin() {
  const { currentUser } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Si l’utilisateur n’est pas admin, on le redirige
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/admin/data");
        setAdminData(response.data);
      } catch (err) {
        console.error("Erreur récupération données admin :", err.response || err);
        setError("Impossible de charger les données d’administration.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Tableau de bord Admin</h2>
      {loading ? (
        <div className="flex justify-center mt-12">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
          {error}
        </div>
      ) : (
        <>
          {/* Exemple d’affichage des favorites totaux */}
          {adminData.favorites && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Favoris enregistrés :</h3>
              <ul className="list-disc list-inside">
                {adminData.favorites.map((fav) => (
                  <li key={fav.id}>
                    {fav.user_id} : {fav.origin} → {fav.destination} (
                    {fav.departure_date}
                    {fav.return_date && ` - ${fav.return_date}`})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Exemple d’affichage de la liste des utilisateurs */}
          {adminData.users && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Utilisateurs :</h3>
              <ul className="list-disc list-inside">
                {adminData.users.map((user) => (
                  <li key={user.id}>
                    {user.email} – Rôle : {user.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Vous pouvez étendre l’affichage selon ce que l’API renvoie */}
        </>
      )}
    </div>
  );
}
