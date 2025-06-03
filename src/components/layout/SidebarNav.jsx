// src/components/layout/SidebarNav.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Plane, Building, MapPin, Sparkles } from "lucide-react";

export default function SidebarNav({ onNavigate }) {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("flights");
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    onNavigate(sectionId);
  };

  const navItems = [
    {
      id: "flights",
      icon: Plane,
      title: "Vols",
      description: "Rechercher et réserver des vols",
    },
    {
      id: "hotels",
      icon: Building,
      title: "Hôtels",
      description: "Trouver l'hébergement parfait",
    },
    {
      id: "itinerary",
      icon: MapPin,
      title: "Itinéraire",
      description: "Planifier votre voyage",
    },
    {
      id: "widgets",
      icon: Sparkles,
      title: "Services",
      description: "Outils et services de voyage",
    },
  ];

  const getThemeClasses = () => {
    if (darkMode) {
      return {
        container: "bg-black/80 border-violet-500/30 shadow-violet-900/40",
        itemDefault: "text-violet-200 hover:bg-violet-900/40",
        itemActive: "bg-violet-900/60 border-violet-400/60 text-violet-300 shadow-violet-500/30",
        itemHover: "text-violet-300 scale-125",
        tooltip: "bg-black/95 text-violet-100 border-violet-500/40",
        tooltipArrow: "border-r-black/95",
        tooltipDescription: "text-violet-300",
      };
    } else {
      return {
        container: "bg-slate-50/90 border-green-300/50 shadow-green-900/20",
        itemDefault: "text-slate-700 hover:bg-green-50/60",
        itemActive: "bg-green-100/80 border-green-500/60 text-green-700 shadow-green-500/20",
        itemHover: "text-green-600 scale-125",
        tooltip: "bg-slate-50/95 text-slate-800 border-green-300/50",
        tooltipArrow: "border-r-slate-50/95",
        tooltipDescription: "text-slate-600",
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out w-16">
        <article
          className={`
            border w-full rounded-2xl inline-block shadow-xl backdrop-blur-lg
            ${themeClasses.container}
          `}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredSection === item.id;

            return (
              <div key={item.id} className="relative group">
                <label
                  className={`
                    relative w-full h-16 p-4 flex flex-row items-center justify-center rounded-xl cursor-pointer transition-all duration-300
                    ${isActive ? `shadow-lg ${themeClasses.itemActive}` : themeClasses.itemDefault}
                  `}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => handleNavigation(item.id)}
                >
                  <Icon
                    className={`
                      text-2xl transition-all duration-300 ease-in-out
                      ${isActive || isHovered ? themeClasses.itemHover : "scale-100"}
                    `}
                    size={24}
                  />
                </label>

                <div
                  className={`
                    absolute left-full ml-3 top-1/2 transform -translate-y-1/2 backdrop-blur-lg px-3 py-2 rounded-xl shadow-xl transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap z-50
                    ${themeClasses.tooltip}
                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                  `}
                >
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className={`text-xs ${themeClasses.tooltipDescription}`}>
                    {item.description}
                  </div>

                  <div
                    className={`
                      absolute right-full top-1/2 transform -translate-y-1/2 border-6 border-transparent
                      ${themeClasses.tooltipArrow}
                    `}
                  />
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
}
