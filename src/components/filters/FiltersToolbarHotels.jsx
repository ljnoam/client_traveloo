// src/components/filters/FiltersToolbarHotels.jsx
import React, { useState } from "react";

export default function FiltersToolbarHotels({ data, onFilter }) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 shadow-lg">
      {/* Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setShowPanel((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition"
        >
          ⚙️ Filtres hôtels <span className="text-sm">▾</span>
        </button>
        {["Prix", "Étoiles", "Distance", "Type"].map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"
          >
            {f} <span className="text-sm">▾</span>
          </button>
        ))}
        <div className="ml-auto px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer transition">
          →  
        </div>
      </div>

      {/* Advanced Panel */}
      {showPanel && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Prix max */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Prix max (€)
            </label>
            <input
              type="range"
              min="0"
              max="500"
              defaultValue="250"
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span>0</span>
              <span>500+</span>
            </div>
          </div>

          {/* Étoiles */}
          <div>
            <span className="block text-gray-700 dark:text-gray-200 mb-2">
              Étoiles
            </span>
            <div className="flex gap-2">
              {[5,4,3,2,1].map((s) => (
                <button
                  key={s}
                  className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm shadow-sm"
                  disabled
                >
                  {s}★
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <span className="block text-gray-700 dark:text-gray-200 mb-2">
              Distance au centre
            </span>
            <div className="flex flex-col gap-2">
              {["< 1 km", "1–3 km", "> 3 km"].map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <input type="radio" name="dist" disabled />
                  <span className="text-gray-700 dark:text-gray-200">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Type hébergement */}
          <div>
            <span className="block text-gray-700 dark:text-gray-200 mb-2">
              Type d’hébergement
            </span>
            <div className="flex flex-wrap gap-2">
              {["Hôtel", "Appart’", "Auberge"].map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input type="checkbox" disabled />
                  <span className="text-gray-700 dark:text-gray-200">{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
