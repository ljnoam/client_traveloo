// src/components/layout/SidebarNav.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function SidebarNav({ onNavigate }) {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState(null);

  const items = [
    { id: "flights", emoji: "✈️", label: "Vols" },
    { id: "hotels", emoji: "🏨", label: "Hôtels" },
    { id: "itinerary", emoji: "🗓️", label: "Itinéraire" },
    { id: "food", emoji: "🍽️", label: "Restos" },
  ];

  // Couleurs de la charte graphique
  const primary = darkMode ? "#1BA1C3" : "#37C0D8";
  const secondary = darkMode ? "#E0484C" : "#FF5A5F";
  const textPrimary = darkMode ? "#E5E7EB" : "#111827";
  const surface = darkMode ? "#1E1E1E" : "#FFFFFF";

  const handleClick = (sectionId) => {
    setActiveSection(sectionId);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-2 top-1/3 z-50 flex flex-col space-y-4"
    >
      {items.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={item.id}
            title={item.label}
            onClick={() => handleClick(item.id)}
            className="w-10 h-10 flex items-center justify-center text-xl rounded-xl shadow-md border transition-all duration-300"
            style={{
              backgroundColor: isActive ? primary : surface,
              color: isActive ? "#FFFFFF" : textPrimary,
              borderColor: isActive ? primary : "transparent",
              boxShadow: isActive ? `0 0 0 2px ${primary}40` : "",
            }}
          >
            {item.emoji}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
