// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { api } from "../api/config";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  loadingAuth: true,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("traveloo_token");
      if (!token) {
        setLoadingAuth(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setCurrentUser(res.data);
      } catch (err) {
        // Si token invalide/expiré, on l’enlève
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("traveloo_token");
          setCurrentUser(null);
        }
      } finally {
        setLoadingAuth(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("[AuthContext] currentUser →", currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loadingAuth }}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};