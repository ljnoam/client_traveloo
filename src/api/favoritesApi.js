// src/api/favoritesApi.js
import { api } from "./config";

// Récupérer tous les favoris de l'utilisateur courant
export const getFavorites = () =>
  api.get("/favorites/").then((res) => res.data);

// Ajouter un nouveau favori
export const addFavorite = ({ user_id, origin, destination, departure_date, return_date }) =>
  api
    .post("/favorites", { user_id, origin, destination, departure_date, return_date })
    .then((res) => res.data);

// Supprimer un favori par son ID
export const deleteFavorite = (id) =>
  api.delete(/favorites/${id}).then((res) => res.data);