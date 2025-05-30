// src/pages/TripForm.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import GooglePlacesInput from "../components/UI/GooglePlacesInput";
import GlobalBackground from "../components/layout/GlobalBackground";
import Loader from "../components/layout/Loader";

export default function TripForm() {
  const { user, loading } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    language: "en",
  });

  const [form, setForm] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    cls: "economy",
    adults: 1,
    children: 0,
    infants: 0,
  });

  if (loading) return <Loader />;
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = ({ target: { name, value, type } }) => {
    const v = type === "number" ? +value : value;
    setForm(f => ({ ...f, [name]: v }));
  };
  const handleSelect = (field, val) =>
    setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = () => {
    const required = ["from","to","startDate","endDate"];
    for (let k of required) {
      if (!form[k]) {
        alert("Merci de remplir tous les champs obligatoires.");
        return;
      }
    }
    if (form.adults < 1) {
      alert("Il faut au moins un adulte.");
      return;
    }
    navigate("/planner", { state: form });
  };

  const wrapperText = darkMode ? "text-gray-100" : "text-gray-900";
  const containerBg = darkMode ? "bg-gray-800/70" : "bg-green-50/70";
  const backdrop = "backdrop-blur-lg";
  const labelText = darkMode ? "text-gray-100" : "text-gray-800";
  const inputBg = darkMode
    ? "bg-gray-700 text-gray-100"
    : "bg-white text-gray-900";
  const btnPrimary = darkMode
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500";

  return (
    <div className={`relative min-h-screen ${wrapperText}`}>
      <GlobalBackground />
      <div className="relative z-10 px-6 py-24">
        <div
          className={`${containerBg} ${backdrop} max-w-2xl mx-auto p-8 rounded-2xl space-y-8 shadow-xl`}
        >
          <h1 className={`text-3xl font-bold text-center ${labelText}`}>
            Rechercher un voyage
          </h1>

          {/* Vols vs Hôtels fields */}
          <div>
            <label className={`block mb-1 ${labelText}`}>Ville de départ</label>
            {isLoaded ? (
              <GooglePlacesInput
                field="from"
                value={form.from}
                onSelect={v => handleSelect("from", v)}
              />
            ) : (
              <input
                type="text"
                name="from"
                value={form.from}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            )}
          </div>
          <div>
            <label className={`block mb-1 ${labelText}`}>Ville d’arrivée</label>
            {isLoaded ? (
              <GooglePlacesInput
                field="to"
                value={form.to}
                onSelect={v => handleSelect("to", v)}
              />
            ) : (
              <input
                type="text"
                name="to"
                value={form.to}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1 ${labelText}`}>Départ</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
            <div>
              <label className={`block mb-1 ${labelText}`}>Retour</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
          </div>

          {/* Classe et passagers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Trip class */}
            <div>
              <label className={`block mb-1 ${labelText}`}>Classe</label>
              <select
                name="cls"
                value={form.cls}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              >
                <option value="economy">Économique</option>
                <option value="business">Affaires</option>
              </select>
            </div>
            {/* Adults */}
            <div>
              <label className={`block mb-1 ${labelText}`}>Adultes (≥12 ans)</label>
              <input
                type="number"
                name="adults"
                min="1"
                value={form.adults}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
            {/* Children */}
            <div>
              <label className={`block mb-1 ${labelText}`}>Enfants (2–12 ans)</label>
              <input
                type="number"
                name="children"
                min="0"
                value={form.children}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
            {/* Infants */}
            <div>
              <label className={`block mb-1 ${labelText}`}>Bébés (0–2 ans)</label>
              <input
                type="number"
                name="infants"
                min="0"
                value={form.infants}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className={`px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r ${btnPrimary}`}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
