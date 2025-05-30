"use client"

import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import GlobalBackground from "../components/layout/PlannerBackground"
import Navbar from "../components/layout/Navbar"
import SidebarNav from "../components/layout/SidebarNav"
import FlightFilters from "../components/planner/FlightFilters"
import VolsPreviewCard from "../components/planner/VolsPreviewCard"
import HotelFilters from "../components/planner/HotelFilters"
import HotelPreviewCard from "../components/planner/HotelPreviewCard"
import FoodRecommendations from "../components/planner/FoodRecommendations"
import Loader from "../components/layout/Loader"
import mockTrip from "../data/mockTrip.json"

export default function Planner() {
  const { user } = useContext(AuthContext)
  const { darkMode } = useTheme()

  const [loading, setLoading] = useState(true)
  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [itinerary, setItinerary] = useState([])
  const [flightsOpen, setFlightsOpen] = useState(false)
  const [hotelsOpen, setHotelsOpen] = useState(false)

  const flightsRef = useRef(null)
  const hotelsRef = useRef(null)
  const itineraryRef = useRef(null)
  const foodRef = useRef(null)

  const handleSectionChange = (sectionId) => {
    const refs = { flights: flightsRef, hotels: hotelsRef, itinerary: itineraryRef, food: foodRef }
    refs[sectionId]?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleFlightsToggle = () => {
    if (flightsOpen) {
      setFlightsOpen(false)
    } else {
      setFlightsOpen(true)
      setHotelsOpen(false) // Fermer les hôtels si on ouvre les vols
    }
  }

  const handleHotelsToggle = () => {
    if (hotelsOpen) {
      setHotelsOpen(false)
    } else {
      setHotelsOpen(true)
      setFlightsOpen(false) // Fermer les vols si on ouvre les hôtels
    }
  }

  // Déterminer le mode d'affichage
  const getDisplayMode = () => {
    if (flightsOpen && !hotelsOpen) return "flights-expanded"
    if (hotelsOpen && !flightsOpen) return "hotels-expanded"
    return "collapsed"
  }

  const displayMode = getDisplayMode()

  useEffect(() => {
    setFlights(mockTrip.flights)
    setHotels(mockTrip.hotels)

    // Debug: voir combien de vols/hôtels on a
    console.log("Nombre de vols:", mockTrip.flights?.length)
    console.log("Nombre d'hôtels:", mockTrip.hotels?.length)
    console.log("Vols:", mockTrip.flights)

    setItinerary([
      {
        activities: [
          {
            name: "Colisée",
            location: "Rome centre",
            time: "09:00",
            description: "Visite guidée du célèbre amphithéâtre antique.",
            price: 16,
          },
          {
            name: "Fontaine de Trevi",
            location: "Via delle Muratte",
            time: "11:30",
            description: "Pause photo et lancer une pièce pour un vœu.",
            price: 0,
          },
        ],
      },
      {
        activities: [
          {
            name: "Vatican",
            location: "Cité du Vatican",
            time: "10:00",
            description: "Musées + chapelle Sixtine.",
            price: 25,
          },
          {
            name: "Trastevere",
            location: "Quartier Trastevere",
            time: "15:00",
            description: "Balade et déjeuner en terrasse.",
            price: 18,
          },
        ],
      },
      {
        activities: [
          {
            name: "Pantheon",
            location: "Piazza della Rotonda",
            time: "09:30",
            description: "Visite libre du temple antique.",
            price: 5,
          },
          {
            name: "Piazza Navona",
            location: "Centre historique",
            time: "11:00",
            description: "Artistes de rue et fontaines baroques.",
            price: 0,
          },
        ],
      },
      {
        activities: [
          {
            name: "Villa Borghese",
            location: "Parc",
            time: "10:00",
            description: "Matinée détente dans le parc.",
            price: 0,
          },
          {
            name: "Galerie Borghese",
            location: "Villa Borghese",
            time: "11:00",
            description: "Musée d'art avec Caravage et Bernini.",
            price: 15,
          },
        ],
      },
      {
        activities: [
          {
            name: "Trastevere Evening",
            location: "Trastevere",
            time: "18:00",
            description: "Dîner et promenade en soirée.",
            price: 30,
          },
          {
            name: "Piazza di Spagna",
            location: "Place d'Espagne",
            time: "20:00",
            description: "Ambiance nocturne et gelato.",
            price: 0,
          },
        ],
      },
      {
        activities: [
          {
            name: "Castel Sant'Angelo",
            location: "Borgo",
            time: "09:00",
            description: "Visite du pont et du château.",
            price: 12,
          },
          {
            name: "Champs de Mars",
            location: "Rome Sud",
            time: "14:00",
            description: "Balade paisible en fin d'après-midi.",
            price: 0,
          },
        ],
      },
      {
        activities: [
          {
            name: "Ostia Antica",
            location: "Port antique",
            time: "10:00",
            description: "Excursion historique en banlieue.",
            price: 8,
          },
          {
            name: "Testaccio Market",
            location: "Testaccio",
            time: "16:00",
            description: "Dégustation de spécialités locales.",
            price: 20,
          },
        ],
      },
    ])
    setLoading(false)
  }, [])

  if (loading) return <Loader />

  // Déterminer les classes flex selon le mode
  const getFlexClasses = () => {
    switch (displayMode) {
      case "flights-expanded":
        return {
          flights: "flex-[3]", // Section agrandie (75%)
          hotels: "flex-[1]", // Section réduite (25%)
        }
      case "hotels-expanded":
        return {
          flights: "flex-[1]", // Section réduite (25%)
          hotels: "flex-[3]", // Section agrandie (75%)
        }
      default: // collapsed
        return {
          flights: "flex-1", // Sections égales (50% chacune)
          hotels: "flex-1",
        }
    }
  }

  const flexClasses = getFlexClasses()

  // Filtrer les vols et hôtels selon l'état d'ouverture
  const displayedFlights = flightsOpen ? flights : flights.slice(0, 1)
  const displayedHotels = hotelsOpen ? hotels : hotels.slice(0, 1)

  // Debug: voir ce qu'on passe aux composants
  console.log("Flights open:", flightsOpen)
  console.log("Displayed flights:", displayedFlights?.length)

  // Fonction pour rendre plusieurs cartes de vols si nécessaire
  const renderFlights = () => {
    if (flightsOpen && flights.length > 1) {
      // Si ouvert et qu'il y a plusieurs vols, on affiche chaque vol dans sa propre carte
      return (
        <div className="space-y-4">
          {flights.map((flight, index) => (
            <div key={index}>
              <VolsPreviewCard flights={[flight]} />
            </div>
          ))}
        </div>
      )
    } else {
      // Sinon, affichage normal
      return <VolsPreviewCard flights={displayedFlights} />
    }
  }

  const renderHotels = () => {
    if (hotelsOpen && hotels.length > 1) {
      // Si ouvert et qu'il y a plusieurs hôtels, on affiche chaque hôtel dans sa propre carte
      return (
        <div className="space-y-4">
          {hotels.map((hotel, index) => (
            <div key={index}>
              <HotelPreviewCard hotels={[hotel]} />
            </div>
          ))}
        </div>
      )
    } else {
      // Sinon, affichage normal
      return <HotelPreviewCard hotels={displayedHotels} />
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlobalBackground />
      <Navbar />
      <SidebarNav onNavigate={handleSectionChange} />
<br></br><br></br><br></br><br></br>
      <div className="relative z-10 w-full px-4 py-12 space-y-12 max-w-7xl mx-auto">
        {/* Layout principal */}
        <div className="lg:flex lg:space-x-8 min-h-[600px]">
          {/* Colonne de gauche */}
          <div className="lg:w-1/2 flex flex-col space-y-8">
            {/* Section Vols */}
            <div
              ref={flightsRef}
              className={`scroll-mt-24 flex flex-col transition-all duration-300 ${flexClasses.flights}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Vols</h2>
                <label className="flex flex-col gap-2 w-8 cursor-pointer">
                  <input type="checkbox" className="peer hidden" checked={flightsOpen} onChange={handleFlightsToggle} />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
                  <div className="rounded-2xl h-[3px] w-full bg-black dark:bg-white duration-500 peer-checked:-rotate-45" />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
                </label>
              </div>
              <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
                <div className="relative z-10 flex flex-col space-y-4 h-full overflow-y-auto">
                  <FlightFilters />
                  {renderFlights()}
                </div>
              </div>
            </div>

            {/* Section Hôtels */}
            <div
              ref={hotelsRef}
              className={`scroll-mt-24 flex flex-col transition-all duration-300 ${flexClasses.hotels}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Hôtels</h2>
                <label className="flex flex-col gap-2 w-8 cursor-pointer">
                  <input type="checkbox" className="peer hidden" checked={hotelsOpen} onChange={handleHotelsToggle} />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
                  <div className="rounded-2xl h-[3px] w-full bg-black dark:bg-white duration-500 peer-checked:-rotate-45" />
                  <div className="rounded-2xl h-[3px] w-1/2 bg-black dark:bg-white duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
                </label>
              </div>
              <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
                <div className="relative z-10 flex flex-col space-y-4 h-full overflow-y-auto">
                  {renderHotels()}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite: Itinéraire */}
          <div ref={itineraryRef} className="lg:w-1/2 scroll-mt-24 flex flex-col">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Itinéraire</h2>
            </div>
            <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
              <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
              <div className="relative z-10 flex-1 overflow-y-auto space-y-6">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jour {idx + 1}</h3>
                    <div className="space-y-2">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {act.time} — {act.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{act.location}</span>
                          <p className="text-sm text-gray-700 dark:text-gray-200">{act.description}</p>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">€{act.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Restos - toujours en bas */}
        <div ref={foodRef} className="scroll-mt-24">
          <div className="relative p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
            <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
            <div className="relative z-10">
              <FoodRecommendations />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
