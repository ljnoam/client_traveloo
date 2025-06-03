// src/pages/TripForm.jsx
"use client"

import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import Loader from "../components/layout/Loader"

export default function TripForm() {
  const { currentUser: user, loadingAuth } = useContext(AuthContext)
  const { darkMode } = useTheme()
  const navigate = useNavigate()

  // État du formulaire (IATA, dates, pax, classe, préférences)
  const [form, setForm] = useState({
    fromName: "",        // nom complet de ville
    toName: "",
    fromCode: "",        // code IATA
    toCode: "",
    startDate: "",
    endDate: "",
    cls: "Y",
    adults: 1,
    children: 0,
    infants: 0,
    preferences: "",
  })

  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])

  if (loadingAuth) return <Loader />
  useEffect(() => {
    if (!loadingAuth && !user) navigate("/login")
  }, [loadingAuth, user, navigate])

  const fetchCitySuggestions = async (value, setSuggestions) => {
    try {
      const res = await fetch(
        `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(
          value
        )}&locale=fr&types[]=city`
      )
      const data = await res.json()
      const cities = data.map((item) => ({
        name: item.name,
        code: item.code,
      }))
      setSuggestions(cities.slice(0, 5))
    } catch {
      setSuggestions([])
    }
  }

  const handleChange = async ({ target: { name, value, type } }) => {
    const v = type === "number" ? +value : value
    setForm((f) => ({ ...f, [name]: v }))

    if (name === "fromName" && v.trim().length >= 2) {
      fetchCitySuggestions(v, setFromSuggestions)
    }
    if (name === "toName" && v.trim().length >= 2) {
      fetchCitySuggestions(v, setToSuggestions)
    }
  }

  const selectFrom = (city) => {
    setForm((f) => ({
      ...f,
      fromName: city.name,
      fromCode: city.code,
    }))
    setFromSuggestions([])
  }

  const selectTo = (city) => {
    setForm((f) => ({
      ...f,
      toName: city.name,
      toCode: city.code,
    }))
    setToSuggestions([])
  }

  const handleSubmit = () => {
    if (
      !form.fromCode ||
      !form.toCode ||
      !form.startDate ||
      form.adults < 1
    ) {
      alert(
        "Champs obligatoires : ville de départ et arrivée sélectionnées, date départ, au moins 1 adulte."
      )
      return
    }

    const flightPayload = {
      origin: form.fromCode,
      destination: form.toCode,
      departure_date: form.startDate,
      ...(form.endDate ? { return_date: form.endDate } : {}),
      class_: form.cls,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
    }

    const prefsArray = form.preferences
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    const itineraryPayload = {
      city: form.toName,
      start_date: form.startDate,
      end_date: form.endDate || form.startDate,
      profile: user.id || user.email || "solo",
      preferences: prefsArray,
    }

    navigate("/planner", {
      state: { flightPayload, itineraryPayload },
    })
  }

  const wrapperText = darkMode ? "text-gray-100" : "text-gray-900"
  const containerBg = darkMode ? "bg-gray-800/70" : "bg-green-50/70"
  const backdrop = "backdrop-blur-lg"
  const labelText = darkMode ? "text-gray-100" : "text-gray-800"
  const inputBg = darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
  const btnPrimary = darkMode
    ? "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    : "from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500"

  return (
    <div className={`relative min-h-screen ${wrapperText}`}>
      <div className="relative z-10 px-6 py-24">
        <div className={`${containerBg} ${backdrop} max-w-2xl mx-auto p-8 rounded-2xl space-y-8 shadow-xl`}>
          <h1 className={`text-3xl font-bold text-center ${labelText}`}>
            Rechercher un voyage
          </h1>

          {/* FROM (Ville) */}
          <div className="relative">
            <label className={`block mb-1 ${labelText}`}>Ville de départ</label>
            <input
              type="text"
              name="fromName"
              value={form.fromName}
              onChange={handleChange}
              className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              placeholder="Ex : Paris"
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute z-20 bg-white dark:bg-gray-700 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-auto">
                {fromSuggestions.map((city, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => selectFrom(city)}
                  >
                    {city.name} ({city.code})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TO (Ville) */}
          <div className="relative">
            <label className={`block mb-1 ${labelText}`}>Ville d’arrivée</label>
            <input
              type="text"
              name="toName"
              value={form.toName}
              onChange={handleChange}
              className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              placeholder="Ex : Lisbonne"
            />
            {toSuggestions.length > 0 && (
              <ul className="absolute z-20 bg-white dark:bg-gray-700 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-auto">
                {toSuggestions.map((city, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => selectTo(city)}
                  >
                    {city.name} ({city.code})
                  </li>
                ))}
              </ul>
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
                className={`w-full border rounded-lg p-4 ${inputBg}`}
              />
            </div>
            <div>
              <label className={`block mb-1 ${labelText}`}>Retour (facultatif)</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-4 ${inputBg}`}
              />
            </div>
          </div>

          {/* Classe + Adultes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1 ${labelText}`}>Classe</label>
              <select
                name="cls"
                value={form.cls}
                onChange={handleChange}
                className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              >
                <option value="Y">Économique (Y)</option>
                <option value="C">Affaires (C)</option>
              </select>
            </div>
            <div>
              <label className={`block mb-1 ${labelText}`}>Adultes (≥12 ans)</label>
              <input
                type="number"
                name="adults"
                min="1"
                value={form.adults}
                onChange={handleChange}
                className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              />
            </div>
          </div>

          {/* Enfants + Bébés */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1 ${labelText}`}>Enfants (2–12 ans)</label>
              <input
                type="number"
                name="children"
                min="0"
                value={form.children}
                onChange={handleChange}
                className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              />
            </div>
            <div>
              <label className={`block mb-1 ${labelText}`}>Bébés (0–2 ans)</label>
              <input
                type="number"
                name="infants"
                min="0"
                value={form.infants}
                onChange={handleChange}
                className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              />
            </div>
          </div>

          {/* Préférences */}
          <div>
            <label className={`block mb-1 ${labelText}`}>Préférences (séparées par virgule)</label>
            <input
              type="text"
              name="preferences"
              value={form.preferences}
              onChange={handleChange}
              className={`w-full border rounded-lg p-4 text-lg ${inputBg}`}
              placeholder="Ex : culture, bouffe"
            />
          </div>

          {/* Bouton Rechercher */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className={`px-8 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r ${btnPrimary}`}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
