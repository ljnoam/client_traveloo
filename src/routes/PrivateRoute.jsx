// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/layout/Loader";
import { ROUTES } from "./routes";

export default function PrivateRoute({ children }) {
  const { currentUser, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <Loader />;
  }

  return currentUser ? children : <Navigate to={ROUTES.login} replace />;
}
