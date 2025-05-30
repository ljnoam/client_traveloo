// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  // État darkMode local
  const [darkMode, setDarkMode] = useState(false);

  // Classes dynamiques
  const wrapperClass = darkMode
    ? 'bg-gray-900 text-gray-100'
    : 'bg-white text-gray-800';
  const navBgClass = darkMode
    ? 'bg-gray-800 shadow-gray-700'
    : 'bg-white shadow-md';
  const toggleIcon = darkMode ? '☀️' : '🌙';

  return (
    <div className={`transition-colors duration-300 ${wrapperClass} min-h-screen`}>
      {/* Navbar reçoit darkMode et toggle en props */}
      <Navbar
        darkMode={darkMode}
        toggleDark={() => setDarkMode(d => !d)}
        navBgClass={navBgClass}
        toggleIcon={toggleIcon}
      />

      {/* Contenu de la page */}
      <main className="pt-20 px-6">
        {children}
      </main>
    </div>
  );
}
