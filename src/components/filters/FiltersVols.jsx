// src/components/filters/FiltersVols.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function FiltersVols({ data, onFilter }) {
  const { darkMode } = useTheme();
  const [maxPrice, setMaxPrice] = useState("");
  const carriers = [...new Set(data.map((f) => f.carrier))];
  const stopsOpts = [...new Set(data.map((f) => f.stops))];
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);

  const toggleCarrier = (c) => {
    setSelectedCarriers((sel) =>
      sel.includes(c) ? sel.filter((x) => x !== c) : [...sel, c]
    );
  };
  const toggleStop = (s) => {
    setSelectedStops((sel) =>
      sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s]
    );
  };

  const apply = () => {
    let res = data;
    if (maxPrice) res = res.filter((f) => f.price <= +maxPrice);
    if (selectedCarriers.length)
      res = res.filter((f) => selectedCarriers.includes(f.carrier));
    if (selectedStops.length) res = res.filter((f) => selectedStops.includes(f.stops));
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
          <label className="font-medium mb-1">Prix max</label>
          <input
            type="number"
            placeholder="€"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={`px-3 py-2 ${inputBg} border border-transparent rounded focus:outline-none`}
          />
        </div>

        {/* Compagnies */}
        <div className="flex flex-col">
          <span className="font-medium mb-1">Compagnies</span>
          <div className="flex gap-2 flex-wrap">
            {carriers.map((c) => (
              <label key={c} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedCarriers.includes(c)}
                  onChange={() => toggleCarrier(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Escales */}
        <div className="flex flex-col">
          <span className="font-medium mb-1">Escales</span>
          <div className="flex gap-2 flex-wrap">
            {stopsOpts.map((s) => (
              <label key={s} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedStops.includes(s)}
                  onChange={() => toggleStop(s)}
                />
                <span>
                  {s} escale{ s > 1 ? "s" : "" }
                </span>
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
