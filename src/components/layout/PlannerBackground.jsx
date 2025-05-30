// src/components/layout/GlobalBackground.jsx
import React, { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import lightBg from "../../assets/PlannerBackground_light.png";
import darkBg  from "../../assets/PlannerBackground_dark.png";

const GlobalBackground = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scaleFactor = 1.05;  // zoom léger
    const amplitude   = 5;     // translation max ±5px

    // applique le zoom initial
    container.style.transform = `scale(${scaleFactor})`;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const moveX = -x * amplitude;
      const moveY = -y * amplitude;
      container.style.transform = 
        `scale(${scaleFactor}) translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden transition-transform duration-500 ease-out"
    >
      {/* fond clair */}
      <img
        src={lightBg}
        alt="Fond clair Traveloo"
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-[2000ms] ease-in-out
          ${darkMode ? "opacity-0" : "opacity-100"}
        `}
      />
      {/* fond sombre */}
      <img
        src={darkBg}
        alt="Fond sombre Traveloo"
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-[2000ms] ease-in-out
          ${darkMode ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
};

export default GlobalBackground;
