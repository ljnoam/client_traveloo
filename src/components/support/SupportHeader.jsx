// src/components/support/SupportHeader.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function SupportHeader() {
  const { darkMode } = useTheme();
  const titleColor = darkMode ? 'text-purple-400' : 'text-green-600';
  const textColor  = darkMode ? 'text-gray-200' : 'text-gray-800';

  return (
    <>
      <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-4 ${titleColor}`}>
        Une question ?
      </h2>
      <p className={`text-center max-w-xl mx-auto mb-8 ${textColor}`}>
        Besoin d’aide, d’assistance ou envie de nous faire un retour ?
        Écris-nous via ce formulaire, on te répond rapidement 💌
      </p>
    </>
  );
}
