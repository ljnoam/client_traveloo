import React from 'react';
import { motion } from 'framer-motion';

const CoreValues = ({ sectionText, sectionBg, borderActive, activeIndex, setActiveIndex }) => {
  const values = [
    { emoji: '🎯', title: 'Personnalisation avancée', content: 'Traveloo crée des itinéraires uniques adaptés à ton budget, météo et style de voyage.' },
    { emoji: '🌦️', title: 'Météo intégrée', content: "L'intégration météo pour ajuster les suggestions en fonction des conditions locales." },
    { emoji: '🧳', title: 'Vols et hébergements connectés', content: 'Compare et réserve vols et hôtels depuis une seule interface.' },
    { emoji: '👥', title: 'Communauté et inspiration', content: 'Rejoins une communauté de voyageurs pour échanger des idées.' },
    { emoji: '🛎️', title: 'Support dédié 24/7', content: "Notre équipe est là pour t'accompagner à tout moment." },
    { emoji: '🌐', title: 'Accessibilité globale', content: "Services adaptés à tous les profils de voyageurs." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className={`text-3xl font-bold text-center mb-8 ${sectionText}`}>Nos valeurs fondamentales 🚀</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${sectionBg} p-6 rounded-2xl shadow-xl border-2 ${activeIndex === i ? borderActive : 'border-transparent'} cursor-pointer transition`}
          >
            <div className="text-3xl mb-2">{v.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
            {activeIndex === i && <p className={`text-sm leading-relaxed ${sectionText}`}>{v.content}</p>}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
