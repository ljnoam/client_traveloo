import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSearchLocation, FaCalendarAlt, FaRobot, FaSmileBeam, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import GlobalBackground from '../components/layout/GlobalBackground';
import aboutImage from '../assets/about.png';

const values = [
  {
    title: 'Personnalisation avancée',
    emoji: '🎯',
    content: 'Traveloo ne se contente pas de suggérer des destinations. Notre moteur conçoit des itinéraires uniques adaptés à ton budget, ta météo et ton style.'
  },
  {
    title: 'Météo intégrée',
    emoji: '🌦️',
    content: 'Chaque suggestion tient compte des prévisions locales pour éviter les mauvaises surprises.'
  },
  {
    title: 'Vols & hébergements',
    emoji: '🧳',
    content: 'Compare et réserve vols et hôtels depuis une seule interface, en toute confiance.'
  },
  {
    title: 'Communauté & inspiration',
    emoji: '👥',
    content: 'Rejoins d’autres voyageurs, partage tes récits et puise l’inspiration.'
  },
  {
    title: 'Support 24/7',
    emoji: '🛎️',
    content: 'Notre équipe est disponible jour et nuit pour t’accompagner en toute situation.'
  },
  {
    title: 'Accessibilité globale',
    emoji: '🌐',
    content: 'Des services pensés pour tous, où que tu sois dans le monde.'
  }
];

const steps = [
  {
    icon: <FaSearchLocation />,
    title: '1. Choisis ta destination',
    text: "Entre une ville, on trouve l'aéroport le plus proche."
  },
  {
    icon: <FaCalendarAlt />,
    title: '2. Indique tes dates & budget',
    text: 'On optimise tout selon ton style de voyage.'
  },
  {
    icon: <FaRobot />,
    title: '3. Génère ton itinéraire intelligent',
    text: 'L’IA te propose vols, hôtels et activités adaptés.'
  },
  {
    icon: <FaSmileBeam />,
    title: '4. Profite du voyage sans stress',
    text: 'Un planning sur mesure, prêt à l’emploi.'
  }
];

export default function About() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const textPrimary     = darkMode ? 'text-gray-100' : 'text-gray-900';
  const sectionBg       = darkMode ? 'bg-gray-800/70' : 'bg-white/70';
  const sectionBackdrop = 'backdrop-blur-lg';
  const accent          = darkMode ? 'text-purple-400' : 'text-green-500';
  const borderActive    = darkMode ? 'border-purple-400' : 'border-green-500';

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <GlobalBackground />
      <Navbar />
      <br />
      <br />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Hero */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${accent}`}>
              Qui sommes-nous ? 🌍
            </h1>
            <p className={textPrimary}>
              Traveloo est né de la passion du voyage. Notre mission : t’offrir
              une expérience sur-mesure, fluide et inspirante.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={aboutImage}
              alt="Équipe Traveloo"
              className="rounded-3xl shadow-2xl w-full max-w-md"
            />
          </motion.div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className={`text-3xl font-bold text-center mb-8 ${accent}`}>
            Comment ça marche ? 🛠️
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`${sectionBg} ${sectionBackdrop} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/tripform')}
              >
                <div className={`text-4xl mb-4 ${accent}`}>
                  {React.cloneElement(step.icon, {
                    className: `text-4xl ${accent}`,
                  })}
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${textPrimary}`}>
                  {step.title}
                </h3>
                <p className={`mt-2 text-sm ${textPrimary}`}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className={`text-3xl font-bold text-center mb-8 ${accent}`}>
            Nos valeurs fondamentales 🚀
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={`
                  ${sectionBg} ${sectionBackdrop} p-6 rounded-2xl shadow-xl
                  border-2 ${activeIndex === i ? borderActive : 'border-transparent'}
                  cursor-pointer transition-colors duration-300 relative
                `}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`text-3xl mb-2 ${accent}`}>{v.emoji}</div>
                <h3 className={`text-lg font-semibold mb-2 ${textPrimary}`}>{v.title}</h3>

                {activeIndex === i && (
                  <p className={`text-sm leading-relaxed ${textPrimary}`}>{v.content}</p>
                )}

                <FaChevronDown
                  className={`
                    absolute top-3 right-3 transition-transform duration-300
                    ${activeIndex === i ? 'rotate-180 opacity-0' : 'opacity-50'}
                    text-${darkMode ? 'gray-100' : 'gray-700'} text-sm
                  `}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
