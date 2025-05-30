"use client"

import { useTheme } from "../../context/ThemeContext"

export default function FlightFilters() {
  const { darkMode } = useTheme()

  // Couleurs de la charte graphique
  const primary = darkMode ? "#1BA1C3" : "#37C0D8"
  const textPrimary = darkMode ? "#E5E7EB" : "#111827"
  const textSecondary = darkMode ? "#9CA3AF" : "#6B7280"
  const border = darkMode ? "#374151" : "#E5E7EB"
  const surface = darkMode ? "#1E1E1E" : "#FFFFFF"
  const cardBg = darkMode ? "rgba(18,18,18,0.3)" : "rgba(255,255,255,0.3)"

  const selectStyle = {
    backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
    color: textPrimary,
    borderColor: border,
  }

  return (
    <div
      className="p-3 rounded-xl mb-4 flex flex-wrap items-center gap-2 backdrop-blur-lg"
      style={{
        backgroundColor: cardBg,
        borderLeft: `4px solid ${primary}`,
      }}
    >
      <h3 className="w-full font-semibold text-sm mb-2" style={{ color: primary }}>
        Filtres Vols
      </h3>

      <select className="rounded px-2 py-1 text-xs border" style={selectStyle}>
        <option value="">Durée</option>
        <option value="<3">⏱️ &lt; 3h</option>
        <option value="3-6">⏱️ 3–6h</option>
        <option value=">6">⏱️ &gt; 6h</option>
      </select>

      <select className="rounded px-2 py-1 text-xs border" style={selectStyle}>
        <option value="">Prix</option>
        <option value="low">€</option>
        <option value="med">€€</option>
        <option value="high">€€€</option>
      </select>

      <select className="rounded px-2 py-1 text-xs border" style={selectStyle}>
        <option value="">Escales</option>
        <option value="0">Sans escale</option>
        <option value="1">1 escale</option>
        <option value="2+">2+ escales</option>
      </select>

      <details className="relative">
        <summary className="cursor-pointer rounded px-2 py-1 text-xs border" style={selectStyle}>
          + Options
        </summary>
        <div
          className="absolute rounded p-2 mt-1 shadow-lg z-10"
          style={{
            backgroundColor: surface,
            borderColor: border,
            borderWidth: "1px",
          }}
        >
          <label className="flex items-center gap-1 text-xs" style={{ color: textPrimary }}>
            <input type="checkbox" /> Wifi
          </label>
          <label className="flex items-center gap-1 text-xs" style={{ color: textPrimary }}>
            <input type="checkbox" /> Repas
          </label>
          <label className="flex items-center gap-1 text-xs" style={{ color: textPrimary }}>
            <input type="checkbox" /> Note globale
          </label>
        </div>
      </details>
    </div>
  )
}
