// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/layout/Loader";
import { ROUTES } from "./routes";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return user ? children : <Navigate to={ROUTES.login} />;
}
