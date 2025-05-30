// src/routes/PrivateAdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/layout/Loader";
import { ROUTES } from "./routes";

export default function PrivateAdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  // 🛡️ Met ici ton email Admin :
  if (!user || user.email !== "support@traveloo.fr") {
    return <Navigate to={ROUTES.home} />;
  }

  return children;
}
