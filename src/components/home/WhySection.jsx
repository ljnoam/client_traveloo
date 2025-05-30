// src/components/home/WhySection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { FaMapMarkedAlt, FaPlaneDeparture, FaGlobeEurope } from "react-icons/fa";

const features = [
  {
    Icon: FaMapMarkedAlt,
    title: "Itinéraires intelligents",
    text: "Créé des parcours qui s’adaptent à la météo, à tes envies et à ton rythme.",
  },
  {
    Icon: FaPlaneDeparture,
    title: "Réservations simplifiées",
    text: "Géres tes vols, hébergements et activités en un seul endroit.",
  },
  {
    Icon: FaGlobeEurope,
    title: "Optimisé pour le climat",
    text: "Nos suggestions s’adaptent en temps réel à la météo de ta destination de rêve!",
  },
];

const WhySection = () => {
  const { darkMode } = useTheme();

  const sectionBg   = darkMode ? "bg-gray-900" : "bg-green-50";
  const titleColor  = darkMode ? "text-purple-400" : "text-green-600";
  const cardBg      = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const iconColor   = darkMode ? "text-purple-400" : "text-green-500";
  const headingCls  = "highlight-text";
  const textCls     = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <section className="transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl sm:text-4xl font-bold inline-block px-6 py-2 rounded-full ${titleColor} bg-white/70 dark:bg-gray-900/70 shadow-md backdrop-blur-md transition-all duration-500`}
        >
          Pourquoi choisir Traveloo ?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-center mt-16">
          {features.map(({ Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-colors duration-500 ${cardBg}`}
            >
              <Icon className={`${iconColor} text-4xl mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold mb-2 ${headingCls}`}>
                {title}
              </h3>
              <p className={`${textCls} text-sm leading-relaxed`}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;