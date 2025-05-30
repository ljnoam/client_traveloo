import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  FaSearchLocation,
  FaCalendarAlt,
  FaRobot,
  FaSmileBeam,
} from "react-icons/fa";

const steps = [
  {
    Icon: FaSearchLocation,
    title: "1. Choisis ta destination",
    text: "Entre une ville, on trouve l'aéroport le plus proche.",
  },
  {
    Icon: FaCalendarAlt,
    title: "2. Sélectionne tes dates et ton budget",
    text: "On optimise selon ton style de voyage.",
  },
  {
    Icon: FaRobot,
    title: "3. Laisse faire l'IA",
    text: "Elle te propose les meilleures options de vols, hôtels et activités.",
  },
  {
    Icon: FaSmileBeam,
    title: "4. Profite sans stress",
    text: "Tu obtiens un itinéraire complet, prêt à l'emploi.",
  },
];

const HowItWorks = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const titleColor = darkMode ? "text-purple-400" : "text-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const iconColor = darkMode ? "text-purple-400" : "text-green-500";
  const headingColor = "highlight-text";
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <section className="transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold inline-block px-6 py-2 rounded-full ${titleColor} bg-white/70 dark:bg-gray-900/70 shadow-md backdrop-blur-md transition-all duration-500`}>
          Comment ça marche ?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map(({ Icon, title, text }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => navigate("/tripform")}
              className={`
                p-6 rounded-2xl shadow-xl ${cardBg}
                cursor-pointer transition-colors duration-500
              `}
            >
              <Icon className={`${iconColor} text-3xl mx-auto mb-4`} />
              <h3 className={`mt-2 text-lg font-semibold text-center ${headingColor}`}>
                {title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed text-center ${textColor}`}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
