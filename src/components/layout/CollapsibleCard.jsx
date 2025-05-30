import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function CollapsibleCard({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode } = useTheme();

  const cardStyle = darkMode
    ? "bg-gray-800 text-white border-purple-700"
    : "bg-white text-gray-800 border-green-200";

  return (
    <div className={`rounded-2xl shadow border ${cardStyle} overflow-hidden`}>
      {/* Header */}
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
