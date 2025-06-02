// src/api/authApi.js
import { api } from "./config";

export const register = ({ email, password }) =>
  api.post("/auth/register", { email, password }).then((res) => res.data);

export const login = ({ email, password }) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const getProfile = () =>
  api.get("/auth/me").then((res) => res.data);

// ... etc. pour updateProfile, searchFlights, etc.
