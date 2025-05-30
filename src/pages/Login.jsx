// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaSuitcaseRolling, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Erreur de connexion : " + error.message);
      } else {
        const user = data.user;
        // ✅ Redirection selon le type d'utilisateur
        if (user?.email === "support@traveloo.fr") {
          navigate("/admin");
        } else {
          navigate("/trip-form");
        }
      }
    } catch (err) {
      alert("Erreur inattendue : " + err.message);
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
            Connexion
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Ravis de te revoir voyageur !
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all shadow-md hover:shadow-lg"
        >
          Se connecter
        </button>
      </div>
    </motion.section>
  );
};

export default Login;
