// src/components/support/ContactLink.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ContactLink() {
  const { darkMode } = useTheme();
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const hoverColor = darkMode ? 'hover:text-purple-400' : 'hover:text-green-600';

  return (
    <p className={`text-center text-sm mt-4 ${textColor}`}>
      Ou écris-nous directement à{' '}
      <a
        href="mailto:support@traveloo.fr"
        className={`underline transition-colors duration-300 ${hoverColor}`}
      >
        support@traveloo.com
      </a>
    </p>
  );
}
