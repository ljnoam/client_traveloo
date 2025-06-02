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
    from: "",        // code IATA (ex : "PAR")
    to: "",          // code IATA (ex : "LIS")
    startDate: "",   // "YYYY-MM-DD"
    endDate: "",     // "YYYY-MM-DD" ou ""
    cls: "Y",        // "Y" (éco) ou "C" (affaires)
    adults: 1,
    children: 0,
    infants: 0,
    preferences: "", // chaîne “culture, bouffe, …”
  })

  // Si on ne connaît pas encore l’utilisateur connecté, on attend
  if (loadingAuth) return <Loader />
  useEffect(() => {
    if (!loadingAuth && !user) navigate("/login")
  }, [loadingAuth, user, navigate])

  // Mise à jour d’un champ texte/number/select
  const handleChange = ({ target: { name, value, type } }) => {
    const v = type === "number" ? +value : value
    setForm((f) => ({ ...f, [name]: v }))
  }

  const handleSubmit = () => {
    // Validation minimale
    if (
      !form.from ||
      form.from.trim().length !== 3 ||
      !form.to ||
      form.to.trim().length !== 3 ||
      !form.startDate ||
      form.adults < 1
    ) {
      alert(
        "Merci de saisir un code IATA valide (3 lettres) pour Origine & Destination, " +
        "une date de départ, et au moins 1 adulte."
      )
      return
    }

    // → Construire le payload EXACT pour la recherche de vols (IATA en majuscule)
    const flightPayload = {
      origin: form.from.trim().toUpperCase(),
      destination: form.to.trim().toUpperCase(),
      departure_date: form.startDate,
      ...(form.endDate ? { return_date: form.endDate } : {}),
      class_: form.cls,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
    }

    // → Construire le payload pour l’API “/generate-itinerary”
    const prefsArray = form.preferences
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    const itineraryPayload = {
      city: form.to.trim().toUpperCase(),
      start_date: form.startDate,
      end_date: form.endDate || form.startDate,
      profile: user.id || user.email || "solo",
      preferences: prefsArray,
    }

    // On envoie les deux objets à Planner via location.state
    navigate("/planner", {
      state: { flightPayload, itineraryPayload },
    })
  }

  // Classes Tailwind conditionnelles
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
        <div
          className={`${containerBg} ${backdrop} max-w-2xl mx-auto p-8 rounded-2xl space-y-8 shadow-xl`}
        >
          <h1 className={`text-3xl font-bold text-center ${labelText}`}>
            Rechercher un voyage
          </h1>

          {/* FROM (IATA) */}
          <div>
            <label className={`block mb-1 ${labelText}`}>Ville de départ (IATA)</label>
            <input
              type="text"
              name="from"
              value={form.from}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 ${inputBg}`}
              placeholder="Ex : PAR"
              maxLength={3}
            />
          </div>

          {/* TO (IATA) */}
          <div>
            <label className={`block mb-1 ${labelText}`}>Ville d’arrivée (IATA)</label>
            <input
              type="text"
              name="to"
              value={form.to}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 ${inputBg}`}
              placeholder="Ex : LIS"
              maxLength={3}
            />
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
              <label className={`block mb-1 ${labelText}`}>Retour (facultatif)</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${inputBg}`}
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
                className={`w-full border rounded-lg p-3 ${inputBg}`}
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
                className={`w-full border rounded-lg p-3 ${inputBg}`}
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
                className={`w-full border rounded-lg p-3 ${inputBg}`}
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
                className={`w-full border rounded-lg p-3 ${inputBg}`}
              />
            </div>
          </div>

          {/* Préférences */}
          <div>
            <label className={`block mb-1 ${labelText}`}>
              Préférences (séparées par virgule)
            </label>
            <input
              type="text"
              name="preferences"
              value={form.preferences}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 ${inputBg}`}
              placeholder="Ex : culture, bouffe"
            />
          </div>

          {/* Bouton Rechercher */}
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
  )
}
