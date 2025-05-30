// src/components/home/FinalCTASection.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/valise-light.png";
import logoDark from "../../assets/valise-dark.png";

const FinalCTASection = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();

  // classes dynamiques
  const containerBg = `
    bg-white/30 dark:bg-black/30 backdrop-blur-xl
    border border-white/20 dark:border-black/20
    transition-colors duration-500
  `;
  const headingCls  = "highlight-text"; // vert en light, violet en dark
  const textCls     = darkMode ? "text-gray-200" : "text-gray-800";
  const btnPrimary  = darkMode
    ? "bg-purple-600 hover:bg-purple-700 text-white"
    : "bg-green-500 hover:bg-green-600 text-white";

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className={`rounded-2xl p-8 shadow-lg text-center ${containerBg}`}>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${headingCls}`}>
          Et toi, tu attends quoi pour ton prochain voyage&nbsp;? 
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-white">
          Traveloo construit ton voyage sur-mesure en quelques clics : destinations, vols, hôtels, activités, tout est optimisé pour toi. 
        </p>

        {user ? (
          <Link to="/tripform">
            <button className={`px-8 py-4 rounded-full font-semibold transition ${btnPrimary}`}>
              Planifier mon voyage
            </button>
          </Link>
        ) : (
          <Link to="/register">
            <button className={`px-8 py-4 rounded-full font-semibold transition ${btnPrimary}`}>
              Créer un compte
            </button>
          </Link>
        )}

        {/* Logo animé avec effet de flou et switch light/dark */}
        <div className="relative w-28 h-28 mx-auto mt-10 group">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Logo Traveloo"
            className="absolute w-full h-full object-contain animate-mega-bounce-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          />
          <div className="absolute w-full h-full rounded-full bg-white/20 dark:bg-black/20 blur-2xl animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
