// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import CookieBanner from "./components/CookieBanner";
import Navbar from "./components/layout/Navbar";
import Loader from "./components/layout/Loader";
import GlobalBackground from "./components/layout/GlobalBackground";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/UI/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TripForm from "./pages/TripForm";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import SavedTrip from "./pages/SavedTrip";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/admin/Dashboard";
import AuthCallback from "./pages/AuthCallback"; // ✅ Ajouté ici

import { ROUTES } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import PrivateAdminRoute from "./routes/PrivateAdminRoute";

function AppContent() {
  const { user, loading } = useContext(AuthContext);
  const [consent, setConsent] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const stored = localStorage.getItem("traveloo_consent");
    if (stored !== null) setConsent(stored === "true");
  }, []);

  useEffect(() => {
    if (consent) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, [consent]);

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <GlobalBackground />}

      {consent === null && (
        <CookieBanner
          onAccept={(granted) => {
            localStorage.setItem("traveloo_consent", String(granted));
            setConsent(granted);
          }}
        />
      )}

      <Routes>
        {/* Pages publiques */}
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.support} element={<Support />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route path={ROUTES.tripForm} element={<TripForm />} />
        <Route path={ROUTES.planner} element={<Planner />} />
        <Route path={ROUTES.politique} element={<PrivacyPolicy />} />
        <Route path={ROUTES.terms} element={<TermsOfUse />} />
        <Route path={ROUTES.updatePassword} element={<UpdatePassword />} />
        <Route path={ROUTES.authCallback} element={<AuthCallback />} /> {/* ✅ ajout route callback */}

        {/* Pages utilisateur connecté */}
        <Route
          path={ROUTES.profile}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.savedTrip}
          element={
            <PrivateRoute>
              <SavedTrip />
            </PrivateRoute>
          }
        />

        {/* Pages admin */}
        <Route
          path={ROUTES.admin}
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to={ROUTES.home} />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
