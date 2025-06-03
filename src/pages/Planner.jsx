// src/pages/Planner.jsx
"use client"

import React, { useState, useContext, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import GlobalBackground from "../components/layout/PlannerBackground"
import Navbar from "../components/layout/Navbar"
import SidebarNav from "../components/layout/SidebarNav"
import FlightFilters from "../components/planner/FlightFilters"
import VolsPreviewCard from "../components/planner/VolsPreviewCard"
import HotelPreviewCard from "../components/planner/HotelPreviewCard"
import Loader from "../components/layout/Loader"
import WidgetsContainer from "../components/widgets/WidgetsContainer"
import HotelMapSquareWidget from "../components/widgets/HotelMapSquareWidget"
import { api } from "../api/config"
import { fetchFlights, fetchHotels } from "../api/travelApi"

export default function Planner() {
  const { currentUser: user, loadingAuth } = useContext(AuthContext)
  const { darkMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state || {}
  const { flightPayload, hotelsPayload, itineraryPayload } = state

  // Si on n’a pas les payloads, rediriger vers TripForm
  useEffect(() => {
    if (!flightPayload || !itineraryPayload) {
      navigate("/trip-form")
    }
  }, [flightPayload, itineraryPayload, navigate])

  const [loadingFlights, setLoadingFlights] = useState(true)
  const [loadingHotels, setLoadingHotels] = useState(true)
  const [loadingItinerary, setLoadingItinerary] = useState(true)
  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [itinerary, setItinerary] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: 0,
    maxPrice: 1000,
    maxStops: 2,
    maxDuration: 1440,
    baggageIncluded: false,
    wifiRequired: false,
    mealsRequired: false,
    minRating: 0,
  })
  const [flightsOpen, setFlightsOpen] = useState(false)
  const [hotelsOpen, setHotelsOpen] = useState(false)
  const [error, setError] = useState("")

  const flightsRef = useRef(null)
  const hotelsRef = useRef(null)
  const itineraryRef = useRef(null)
  const widgetsRef = useRef(null)

  const handleSectionChange = (sectionId) => {
    const refs = {
      flights: flightsRef,
      hotels: hotelsRef,
      itinerary: itineraryRef,
      widgets: widgetsRef,
    }
    refs[sectionId]?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleFlightsToggle = () => {
    setFlightsOpen((prev) => !prev)
    if (!flightsOpen) setHotelsOpen(false)
  }

  const handleHotelsToggle = () => {
    setHotelsOpen((prev) => !prev)
    if (!hotelsOpen) setFlightsOpen(false)
  }

  const getDisplayMode = () => {
    if (flightsOpen && !hotelsOpen) return "flights-expanded"
    if (hotelsOpen && !flightsOpen) return "hotels-expanded"
    return "collapsed"
  }

  const displayMode = getDisplayMode()

  const getFlexClasses = () => {
    switch (displayMode) {
      case "flights-expanded":
        return { flights: "flex-[3]", hotels: "flex-[1]" }
      case "hotels-expanded":
        return { flights: "flex-[1]", hotels: "flex-[3]" }
      default:
        return { flights: "flex-1", hotels: "flex-1" }
    }
  }

  const flexClasses = getFlexClasses()

  // Appliquer les filtres aux vols disponibles
  const applyFilters = (criteria) => {
    setFilterCriteria(criteria)
    const {
      minPrice,
      maxPrice,
      maxStops,
      maxDuration,
      baggageIncluded,
      wifiRequired,
      mealsRequired,
      minRating,
    } = criteria

    const result = flights.filter((flight) => {
      if (flight.price < minPrice || flight.price > maxPrice) return false
      if (flight.stops > maxStops) return false
      if (flight.duration > maxDuration) return false
      if (baggageIncluded && !flight.baggage_included) return false
      if (wifiRequired && !flight.wifi) return false
      if (mealsRequired && !flight.meals) return false
      if (flight.rating < minRating) return false
      return true
    })
    setFilteredFlights(result)
  }

  // Fonction pour (re)générer l’itinéraire via l’API
  const fetchItinerary = async () => {
    setLoadingItinerary(true)
    setError("")
    try {
      const itinRes = await api.post("/api/generate-itinerary", itineraryPayload, {
        headers: { "Content-Type": "application/json" },
      })
      setItinerary(Array.isArray(itinRes.data.days) ? itinRes.data.days : [])
    } catch (err) {
      const status = err.response?.status
      const detail = err.response?.data || "Erreur inconnue"
      if (status === 502) setError("Serveur IA indisponible.")
      else
        setError(
          (prev) =>
            prev +
            (prev ? " | " : "") +
            `Itinéraire : ${
              Array.isArray(detail) ? detail.join(", ") : detail
            }`
        )
      setItinerary([])
    } finally {
      setLoadingItinerary(false)
    }
  }

  // Charger vols, hôtels et itinéraire au montage
  useEffect(() => {
    const fetchAll = async () => {
      setLoadingFlights(true)
      setLoadingHotels(true)
      setError("")

      try {
        const flightsRes = await api.post("/api/search", flightPayload, {
          headers: { "Content-Type": "application/json" },
        })
        const data = Array.isArray(flightsRes.data) ? flightsRes.data : []
        setFlights(data)
        setFilteredFlights(data)
      } catch (err) {
        const detail = err.response?.data?.detail || "Erreur inconnue"
        setError(`Vols : ${
          Array.isArray(detail) ? detail.join(", ") : detail
        }`)
        setFlights([])
        setFilteredFlights([])
      } finally {
        setLoadingFlights(false)
      }

      try {
        if (hotelsPayload) {
          const hotelsList = await fetchHotels(hotelsPayload)
          setHotels(Array.isArray(hotelsList) ? hotelsList : [])
        } else {
          setHotels([])
        }
      } catch (err) {
        setError((prev) =>
          prev ? prev : `Hôtels : ${err.message || "Erreur inconnue"}`
        )
        setHotels([])
      } finally {
        setLoadingHotels(false)
      }

      await fetchItinerary()
    }

    if (flightPayload && itineraryPayload) {
      fetchAll()
    }
  }, [flightPayload, hotelsPayload, itineraryPayload])

  const displayedFlights = flightsOpen
    ? filteredFlights.slice(0, 10)
    : filteredFlights.slice(0, 2)
  const displayedHotels = hotelsOpen ? hotels : hotels.slice(0, 2)

  if (loadingAuth || loadingFlights || loadingHotels || loadingItinerary)
    return <Loader />

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlobalBackground />
      <Navbar />
      <SidebarNav onNavigate={handleSectionChange} />
<br></br><br></br>
      <div className="relative z-10 w-full px-4 py-12 space-y-12 max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-6 rounded text-center">
            {error}
          </div>
        )}
        <div className="lg:flex lg:space-x-8 min-h-[600px]">
          {/* Colonne de gauche */}
          <div className="lg:w-2/5 flex flex-col space-y-8">
            {/* Section Vols */}
            <div
              ref={flightsRef}
              className={`scroll-mt-24 flex flex-col transition-all duration-300 ${flexClasses.flights}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Vols
                </h2>
                <label className="flex flex-col gap-2 w-8 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={flightsOpen}
                    onChange={handleFlightsToggle}
                  />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
                  <div className="rounded-2xl h-[3px] w-full bg-black dark:bg-white duration-500 peer-checked:-rotate-45" />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
                </label>
              </div>
              <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
                <div className="relative z-10 flex flex-col space-y-4 h-full overflow-y-auto">
                  <FlightFilters onApply={applyFilters} />
                  {displayedFlights.map((flight, idx) => (
                    <VolsPreviewCard key={flight.id || idx} flights={[flight]} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section Hôtels + Carte interactive */}
            <div
              ref={hotelsRef}
              className={`scroll-mt-24 flex flex-col transition-all duration-300 ${flexClasses.hotels}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Hôtels
                </h2>
                <label className="flex flex-col gap-2 w-8 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={hotelsOpen}
                    onChange={handleHotelsToggle}
                  />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
                  <div className="rounded-2xl h-[3px] w-full bg-black dark:bg-white duration-500 peer-checked:-rotate-45" />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
                </label>
              </div>
              <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
                <div className="relative z-10 flex flex-col space-y-4 h-full overflow-y-auto">
                  {/* Carte interactive centrée sur la ville recherchée */}
                  <HotelMapSquareWidget city={itineraryPayload.city} hotels={hotels} />
                  {displayedHotels.map((hotel, idx) => (
                    <HotelPreviewCard key={hotel.id || idx} hotels={[hotel]} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite: Itinéraire */}
          <div ref={itineraryRef} className="lg:w-3/5 scroll-mt-24 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Itinéraire
              </h2>
              <button
                onClick={fetchItinerary}
                className="text-sm text-blue-500 hover:underline"
              >
                Régénérer
              </button>
            </div>
            <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
              <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
              <div className="relative z-10 flex-1 overflow-y-auto space-y-6">
                {itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Jour {idx + 1}
                    </h3>
                    <div className="space-y-2">
                      {day.activities.map((act, i) => (
                        <div key={idx + "-" + i} className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {act.time} — {act.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {act.location}
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-200">
                            {act.description}
                          </p>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            €{act.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zone Widgets */}
        <div ref={widgetsRef} className="scroll-mt-24">
          <WidgetsContainer flightsOpen={flightsOpen} hotelsOpen={hotelsOpen} />
        </div>
      </div>
    </div>
  )
}
