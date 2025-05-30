// src/components/planner/FoodRecommendations.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function FoodRecommendations({ showAll = false }) {
  const { darkMode } = useTheme();
  const titleGradient = darkMode
    ? "from-purple-700 to-purple-900"
    : "from-green-400 to-green-600";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const border = darkMode ? "border-purple-700" : "border-green-200";

  const restos = [
    {
      name: "Osteria Romana",
      description: "Spécialités italiennes, ambiance rustique.",
      price: "€€",
      img: "https://dynamic-media-cdn.tripadvisor.com/...jpg",
    },
    {
      name: "Trattoria Da Enzo",
      description: "Cuisine romaine traditionnelle.",
      price: "€",
      img: "https://res.cloudinary.com/...jpg",
    },
    {
      name: "Rooftop Monti",
      description: "Cocktails & vue panoramique.",
      price: "€€€",
      img: "https://toohotel.com/...jpg",
    },
    {
      name: "Pizza e Birra",
      description: "Pizza artisanale & bières locales.",
      price: "€",
      img: "https://www.petitfute.com/...jpg",
    },
  ];

  // 1 resto par défaut, jusqu’à 4 si showAll
  const restosToShow = showAll ? restos.slice(0, 4) : restos.slice(0, 1);

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`
          text-2xl font-bold text-center
          bg-gradient-to-r ${titleGradient}
          bg-clip-text text-transparent
        `}
      >
        Recommandations
      </motion.h2>

      {restosToShow.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`
            rounded-xl border ${border} ${cardBg}
            shadow-md overflow-hidden
          `}
        >
          <img
            src={r.img}
            alt={r.name}
            className="w-full h-36 object-cover"
          />
          <div className="p-4 space-y-1 text-sm">
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-gray-400">{r.description}</p>
            <p className="text-xs italic text-right text-gray-400">
              Prix : {r.price}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
