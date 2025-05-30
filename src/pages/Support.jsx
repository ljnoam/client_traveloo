// src/pages/Support.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import GlobalBackground from '../components/layout/GlobalBackground';
import Navbar from '../components/layout/Navbar';
import SupportHeader from '../components/support/SupportHeader';
import SupportForm from '../components/support/SupportForm';
import ContactLink from '../components/support/ContactLink';

export default function Support() {
  const { darkMode } = useTheme();
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-500">
      <GlobalBackground />
      <div className={`relative z-10 px-6 md:px-12 pt-28 pb-20 ${textColor}`}>
        <Navbar />
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <SupportHeader />
          <SupportForm />
          <ContactLink />
        </motion.section>
      </div>
    </div>
  );
}
