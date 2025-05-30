// src/components/UI/GradientButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function GradientButton({ to, onClick, children }) {
  const { darkMode } = useTheme();

  const lightFrom = 'from-green-400';
  const lightTo   = 'to-blue-400';
  const darkFrom  = 'from-purple-700';
  const darkTo    = 'to-blue-700';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        inline-flex items-center px-6 py-3 rounded-full font-semibold
        bg-gradient-to-r ${darkMode ? `${darkFrom} ${darkTo}` : `${lightFrom} ${lightTo}`}
        text-white shadow-lg transition-all duration-300 hover:brightness-105
      `}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
