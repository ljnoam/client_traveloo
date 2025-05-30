// File: src/components/support/SupportPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';
import SupportHeader from './SupportHeader';
import SupportForm from './SupportForm';
import ContactLink from './ContactLink';
import { useTheme } from '../../context/ThemeContext';

export default function SupportPage() {
  const { darkMode } = useTheme();
  const wrapperBg = darkMode
    ? 'bg-gray-900 text-gray-100'
    : 'bg-gray-50 text-gray-900';

  return (
    <div className={`${wrapperBg} relative min-h-screen w-full overflow-hidden transition-colors duration-500`}>
      <Navbar />
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-purple-300/30 rounded-full blur-3xl pointer-events-none z-0" />
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-20"
      >
        <SupportHeader />
        <SupportForm />
        <ContactLink />
      </motion.main>
    </div>
  );
}