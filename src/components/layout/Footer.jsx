import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { darkMode } = useTheme();

  const footerBg = darkMode ? "bg-purple-900" : "bg-green-700";
  const textColor = "text-white";
  const linkHover = "hover:text-gray-200";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${footerBg} ${textColor} py-4 text-center text-xs md:text-sm px-4 md:px-8`}
    >
      <p>
        &copy; {new Date().getFullYear()} Traveloo. Tous droits réservés ✈️
      </p>
      <div className="mt-1 space-x-4">
        <Link
          to="/politique-confidentialite"
          className={`underline ${linkHover} block md:inline`}
        >
          Politique de Confidentialité
        </Link>
        <Link
          to="/conditions-utilisation"
          className={`underline ${linkHover} block md:inline`}
        >
          Conditions d’Utilisation
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;