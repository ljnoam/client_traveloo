// src/components/filters/FiltersHotels.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function FiltersHotels({ data, onFilter }) {
  const { darkMode } = useTheme();
  const [maxPrice, setMaxPrice] = useState("");
  const starOpts = [...new Set(data.map((h) => Math.floor(h.rating)))];
  const [selectedStars, setSelectedStars] = useState([]);
  const distanceRanges = [
    { label: "< 1 km", fn: (d) => d < 1 },
    { label: "1 - 3 km", fn: (d) => d >= 1 && d <= 3 },
    { label: "3 - 5 km", fn: (d) => d >= 3 && d <= 5 },
    { label: "> 5 km", fn: (d) => d > 5 },
  ];
  const [selectedDistances, setSelectedDistances] = useState([]);
  const allAmenities = [...new Set(data.flatMap((h) => h.amenities || []))];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleStar = (s) =>
    setSelectedStars((sel) =>
      sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s]
    );
  const toggleDistance = (i) =>
    setSelectedDistances((sel) =>
      sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i]
    );
  const toggleAmenity = (a) =>
    setSelectedAmenities((sel) =>
      sel.includes(a) ? sel.filter((x) => x !== a) : [...sel, a]
    );

  const apply = () => {
    let res = data;
    if (maxPrice) res = res.filter((h) => h.price <= +maxPrice);
    if (selectedStars.length)
      res = res.filter((h) => selectedStars.includes(Math.floor(h.rating)));
    if (selectedDistances.length)
      res = res.filter((h) =>
        selectedDistances.some((i) => distanceRanges[i].fn(h.distance))
      );
    if (selectedAmenities.length)
      res = res.filter((h) =>
        selectedAmenities.every((a) => (h.amenities || []).includes(a))
      );
    onFilter(res);
  };

  const bg = darkMode
    ? "bg-gray-800/60 border-gray-600 text-gray-100"
    : "bg-white/70 border-gray-200 text-gray-900";
  const inputBg = darkMode
    ? "bg-gray-700/50 placeholder-gray-300"
    : "bg-white/80 placeholder-gray-600";

  return (
    <div className={`backdrop-blur-lg ${bg} border p-4 rounded-lg mb-6`}>
      <div className="flex flex-wrap gap-6">
        {/* Prix max */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Prix max / nuit</label>
          <input
            type="number"
            placeholder="€"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={`px-3 py-2 ${inputBg} border border-transparent rounded`}
          />
        </div>

        {/* Étoiles */}
        <div className="flex flex-col">
          <span className="font-medium mb-1">Étoiles</span>
          <div className="flex gap-2 flex-wrap">
            {starOpts.map((s) => (
              <label key={s} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedStars.includes(s)}
                  onChange={() => toggleStar(s)}
                />
                <span>{s}★</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance centre */}
        <div className="flex flex-col">
          <span className="font-medium mb-1">Distance centre</span>
          <div className="flex gap-2 flex-wrap">
            {distanceRanges.map((r, i) => (
              <label key={i} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedDistances.includes(i)}
                  onChange={() => toggleDistance(i)}
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Commodités */}
        <div className="flex flex-col w-full">
          <span className="font-medium mb-1">Commodités</span>
          <div className="flex gap-2 flex-wrap">
            {allAmenities.map((a) => (
              <label key={a} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                />
                <span>{a}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={apply}
          className="self-end px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}
