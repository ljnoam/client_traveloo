// src/components/layout/Loader.jsx
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import GlobalBackground from "./GlobalBackground";
import logoLight from "../../assets/valise-light.png";
import logoDark from "../../assets/valise-dark.png";

const Loader = () => {
  const { darkMode } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3 + 2);
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 text-white">
      <GlobalBackground />

      <div className="relative w-32 h-32 mb-10 group">
        <img
          src={darkMode ? logoDark : logoLight}
          alt="Logo Traveloo"
          className="absolute w-full h-full object-contain animate-mega-bounce-glow transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
        />
        <div className="absolute w-full h-full rounded-full bg-white/20 dark:bg-black/20 blur-2xl animate-pulse-glow" />
      </div>

      <h1 className="text-xl font-bold animate-fade-slide mb-4 tracking-wide text-center">
        On prépare ton voyage de rêve...
      </h1>

      <div className="w-full max-w-sm bg-gray-800/50 dark:bg-gray-900/50 rounded-full h-3 overflow-hidden shadow-lg border border-gray-700">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 animate-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm mt-3 font-mono">{progress}%</p>
    </div>
  );
};

export default Loader;
