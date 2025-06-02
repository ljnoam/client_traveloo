// src/api/config.js
import axios from "axios";

// En DEV on passe par le proxy Vite (vite.config.js).
// En prod, on pointe directement vers Render.
const baseURL = import.meta.env.DEV
  ? "" 
  : "https://backend-traveloo.onrender.com";

export const api = axios.create({
  baseURL,
});

// Ajoute le token dans chaque requête s’il existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("traveloo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
