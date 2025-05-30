import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/about.png';

const HeroSection = ({ sectionText }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center gap-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${sectionText}`}>
          Qui sommes-nous ? <span>🌍</span>
        </h1>
        <p className={sectionText}>
          Traveloo est né de la passion du voyage et de l’envie de rendre chaque escapade aussi fluide que mémorable. Notre mission ? Te simplifier la vie tout en t’inspirant.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 flex justify-center"
      >
        <img src={aboutImage} alt="Équipe Traveloo" className="rounded-3xl shadow-2xl w-full max-w-md" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
