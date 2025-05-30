// src/components/filters/FiltersToolbarVols.jsx
import React from "react";

export default function FiltersToolbarVols() {
  return (
    <div className="space-y-4">
      {/* --- Top bar: aller/retour, passagers, classe --- */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-900/60 backdrop-blur-lg p-3 rounded-lg">
        {/* Aller-retour */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-pointer transition">
          <span className="text-lg">🔄</span>
          <span className="text-gray-100">Aller-retour</span>
          <span className="text-gray-400">▾</span>
        </div>
        {/* Passagers */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-pointer transition">
          <span className="text-lg">👤</span>
          <span className="text-gray-100">1</span>
          <span className="text-gray-400">▾</span>
        </div>
        {/* Classe */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-pointer transition">
          <span className="text-gray-100">Éco</span>
          <span className="text-gray-400">▾</span>
        </div>
      </div>

      {/* --- Origine / Destination / Dates --- */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-900/60 backdrop-blur-lg p-3 rounded-lg">
        {/* Ville départ */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-text transition">
          <span className="text-pink-400">📍</span>
          <span className="text-gray-100">Paris</span>
        </div>
        {/* Swap */}
        <div className="px-3 text-gray-400">⇄</div>
        {/* Ville arrivée */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-text transition">
          <span className="text-pink-400">📍</span>
          <span className="text-gray-100">Chicago</span>
        </div>
        {/* Dates */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-pointer transition">
          <span className="text-gray-100">📅 dim. 15 juin ← mer. 25 juin</span>
        </div>
        {/* More */}
        <div className="ml-auto px-3 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full cursor-pointer transition">
          <span className="text-gray-400">⋯</span>
        </div>
      </div>

      {/* --- Filtres secondaires (simulés) --- */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900/60 backdrop-blur-lg rounded-full shadow hover:bg-gray-900 transition">
          <span className="text-gray-100">⚙️ Tous les filtres</span>
        </button>
        {["Escales","Compagnies","Bagages","Prix","Horaires"].map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 px-4 py-2 bg-gray-900/40 hover:bg-gray-900/60 rounded-full transition"
          >
            <span className="text-gray-100">{f}</span>
            <span className="text-gray-400">▾</span>
          </button>
        ))}
        <div className="ml-auto px-3 py-2 bg-gray-900/50 hover:bg-gray-900 rounded-full cursor-pointer transition">
          <span className="text-gray-400">→</span>
        </div>
      </div>
    </div>
  );
}
