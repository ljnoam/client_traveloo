// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { register } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { FaSuitcaseRolling, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ROUTES } from "../routes/routes";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRegister = async () => {
    if (!acceptedPolicy) {
      toast.error(
        "Vous devez accepter la Politique de Confidentialité et les Conditions d’Utilisation."
      );
      return;
    }
    try {
      const { user, session } = await register({ email, password });
      toast.success("📧 Inscription réussie, vérifiez votre mail.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      toast.error("Erreur : " + msg);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-4 pt-28 relative z-10"
    >
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100 dark:border-gray-700 transition-all duration-500">
        <div className="flex flex-col items-center mb-6">
          <FaSuitcaseRolling className="text-4xl text-purple-600 dark:text-purple-400 mb-2" />
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            Créer un compte
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Bienvenue dans l’aventure Traveloo ✈️
          </p>
        </div>

        <input
          type="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Crée un mot de passe sécurisé"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={
              showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <label className="flex items-start mb-6 text-gray-900 dark:text-gray-100">
          <input
            type="checkbox"
            checked={acceptedPolicy}
            onChange={(e) => setAcceptedPolicy(e.target.checked)}
            className="mt-1 mr-2 w-5 h-5 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <span className="leading-tight">
            J’accepte la{" "}
            <Link
              to={ROUTES.politique}
              className="text-blue-600 underline whitespace-nowrap"
            >
              Politique de Confidentialité
            </Link>{" "}
            et les{" "}
            <Link
              to={ROUTES.terms}
              className="text-blue-600 underline whitespace-nowrap"
            >
              Conditions d’Utilisation
            </Link>
          </span>
        </label>

        <button
          onClick={handleRegister}
          disabled={!acceptedPolicy}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            acceptedPolicy
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          ✨ S'inscrire
        </button>
      </div>
    </motion.section>
  );
};

export default Register;
