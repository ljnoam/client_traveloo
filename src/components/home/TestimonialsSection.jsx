// src/components/home/TestimonialsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const testimonials = [
  {
    quote: "Super pratique, j’ai pu réserver tout mon voyage en 10 minutes. Trop fluide !",
    author: "— Fatou, 21 ans",
    img: "https://www.100pour100culture.com/wp-content/uploads/cwv-webp-images/2021/08/Marie-Paule-Adj%C3%A9-1.jpg.webp",
  },
  {
    quote: "En tant que maman de deux ados, j’ai apprécié la simplicité et la sécurité de l’organisation.",
    author: "— Sophie, 42 ans",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
  },
  {
    quote: "Enfin une plateforme accessible même à mon âge ! Et j’ai découvert l’Italie autrement.",
    author: "— Jean-Pierre, 67 ans",
    img: "https://images.unsplash.com/photo-1703759354715-17fcbeea4b66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


const TestimonialsSection = () => {
  const { darkMode } = useTheme();

  const titleColor = darkMode ? "text-purple-400" : "text-green-600";
  const cardBg     = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const borderCol  = darkMode ? "border-purple-600" : "border-green-500";
  const quoteColor = darkMode ? "text-gray-300" : "text-gray-700";
  const authorCls  = "highlight-text";

  return (
    <section className="transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl sm:text-4xl font-bold inline-block px-6 py-2 rounded-full ${titleColor} bg-white/70 dark:bg-gray-900/70 shadow-md backdrop-blur-md transition-all duration-500`}
        >
          Ils ont voyagé avec Traveloo
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-colors duration-500 ${cardBg}`}
            >
              <img
                src={t.img}
                alt={t.author}
                className={`w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 ${borderCol}`}
              />
              <p className={`italic mb-4 ${quoteColor}`}>“{t.quote}”</p>
              <h4 className={`text-lg font-semibold text-center ${authorCls}`}>
                {t.author}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;