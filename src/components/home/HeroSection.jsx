// src/components/home/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import GradientButton from "../UI/GradientButton";
import { Link } from "react-router-dom";
import BlurText from "../UI/BlurText";

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();

  return (
    <section className="relative z-10 w-full h-screen flex items-center justify-center">
      {/* Fond flou en haut */}
      <div className="absolute inset-0 -top-12 bg-white/30 dark:bg-black/60 backdrop-blur-3xl -z-10
                      border-b border-purple-200 dark:border-violet-800
                      shadow-inner shadow-purple-100 dark:shadow-black/20
                      transition-all duration-700 rounded-b-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 py-24 max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="text-white">Planifie ton&nbsp;</span>
          <span className={darkMode ? "text-purple-600" : "text-green-500"}>
            voyage parfait
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">
          Crée facilement des itinéraires personnalisés grâce à l’intelligence artificielle de Traveloo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <GradientButton to="/TripForm">Planifier</GradientButton>
          <Link
            to="/about"
            className={`border-2 font-semibold px-6 py-2 rounded-xl transition-colors duration-300
              ${darkMode
                ? "border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white"
                : "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              }`}
          >
            En savoir plus
          </Link>
        </div>

        {/* Texte animé agrandi */}
        <BlurText 
         text="Connectes toi pour planifier ton voyage!" 
         delay={100} 
         animateBy="words" 
         direction="top" 
         className={` 
           text-3xl sm:text-4xl font-bold mt-8 
           ${darkMode ? 'text-purple-400' : 'text-green-500'} 
         `} 
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
