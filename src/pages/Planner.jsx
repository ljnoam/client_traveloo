"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import GlobalBackground from "../components/layout/PlannerBackground";
import Navbar from "../components/layout/Navbar";
import SidebarNav from "../components/layout/SidebarNav";
import FlightFilters from "../components/planner/FlightFilters";
import VolsPreviewCard from "../components/planner/VolsPreviewCard";
import Loader from "../components/layout/Loader";
import ItinerarySection from "../components/planner/ItinerarySection";
import WidgetsContainer from "../components/widgets/WidgetsContainer";

import { api } from "../api/config";

export default function Planner() {
  const { currentUser: user, loadingAuth } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  useEffect(() => {
    if (
      !state ||
      typeof state.flightPayload !== "object" ||
      typeof state.itineraryPayload !== "object"
    ) {
      navigate("/trip-form");
    }
  }, [state, navigate]);

  if (
    !state ||
    typeof state.flightPayload !== "object" ||
    typeof state.itineraryPayload !== "object"
  ) {
    return null;
  }

  const { flightPayload, itineraryPayload } = state;

  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingItinerary, setLoadingItinerary] = useState(true);
  const [flights, setFlights] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [flightsOpen, setFlightsOpen] = useState(false);
  const [error, setError] = useState("");
  const [savingFavorite, setSavingFavorite] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const flightsRef = useRef(null);
  const itineraryRef = useRef(null);
  const widgetsRef = useRef(null);

  const handleSectionChange = (sectionId) => {
    const refsMap = {
      flights: flightsRef,
      itinerary: itineraryRef,
      widgets: widgetsRef,
    };
    refsMap[sectionId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFlightsToggle = () => {
    setFlightsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      setLoadingFlights(true);
      setError("");
      try {
        const res = await api.post("/api/search", flightPayload, {
          headers: { "Content-Type": "application/json" },
        });
        setFlights(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        const detail = err.response?.data?.detail || "Erreur inconnue";
        setError(`Vols : ${Array.isArray(detail) ? detail.join(", ") : detail}`);
        setFlights([]);
      } finally {
        setLoadingFlights(false);
      }
    };

    const fetchItinerary = async () => {
      setLoadingItinerary(true);
      setError("");
      try {
        const res = await api.post("/generate-itinerary", itineraryPayload, {
          headers: { "Content-Type": "application/json" },
        });
        setItinerary(Array.isArray(res.data.days) ? res.data.days : []);
        itineraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        const status = err.response?.status;
        const detail = err.response?.data || "Erreur inconnue";
        if (status === 502) setError("Serveur IA indisponible.");
        else setError(`Itinéraire : ${Array.isArray(detail) ? detail.join(", ") : detail}`);
        setItinerary([]);
      } finally {
        setLoadingItinerary(false);
      }
    };

    fetchFlights();
    fetchItinerary();
  }, [flightPayload, itineraryPayload]);

  const handleGenerateItinerary = async () => {
    setLoadingItinerary(true);
    setError("");
    try {
      const res = await api.post("/generate-itinerary", itineraryPayload, {
        headers: { "Content-Type": "application/json" },
      });
      setItinerary(Array.isArray(res.data.days) ? res.data.days : []);
      itineraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data || "Erreur inconnue";
      if (status === 502) setError("Serveur IA indisponible.");
      else setError(`Itinéraire : ${Array.isArray(detail) ? detail.join(", ") : detail}`);
      setItinerary([]);
    } finally {
      setLoadingItinerary(false);
    }
  };

  const handleSaveFavorite = async () => {
    setSavingFavorite(true);
    setSaveMessage("");
    try {
      const payload = {
        destination: itineraryPayload.city,
        start_date: itineraryPayload.start_date,
        end_date: itineraryPayload.end_date,
        itinerary,
        flights,
      };
      await api.post("/favorites/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setSaveMessage("🌟 Itinéraire ajouté aux favoris !");
    } catch (err) {
      console.error("Erreur ajout favori :", err);
      setSaveMessage("❌ Erreur lors de l'ajout aux favoris.");
    } finally {
      setSavingFavorite(false);
    }
  };

  if (loadingAuth) return <Loader />;
  if (!user) return null;

  const getFlexClasses = () => {
    if (flightsOpen) return { flights: "flex-[3]" };
    return { flights: "flex-1" };
  };
  const flexClasses = getFlexClasses();

  const displayedFlights = Array.isArray(flights)
    ? flightsOpen
      ? flights
      : flights.slice(0, 2)
    : [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlobalBackground />
      <Navbar />
      <SidebarNav onNavigate={handleSectionChange} />

      <div className="relative z-10 w-full px-4 py-12 space-y-12 max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-6 rounded text-center">
            {error}
          </div>
        )}

        {loadingFlights ? (
          <Loader />
        ) : (
          <div className="lg:flex lg:space-x-8 min-h-[600px]">
            <div className="lg:w-2/5 flex flex-col space-y-8">
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
                    <FlightFilters {...flightPayload} />
                    {Array.isArray(flights) && flights.length > 0 ? (
                      <VolsPreviewCard flights={flights} showAll={flightsOpen} />
                    ) : (
                      <p className="text-center text-gray-700 dark:text-gray-300">
                        Aucun vol trouvé.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={itineraryRef}
              className="lg:w-3/5 scroll-mt-24 flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Itinéraire
                </h2>
              </div>
              <div className="relative flex-1 p-4 -m-2 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
                <div className="absolute inset-0 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md" />
                <div className="relative z-10 flex-1 overflow-y-auto space-y-6">
                  {loadingItinerary ? (
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Chargement de l’itinéraire…
                    </p>
                  ) : Array.isArray(itinerary) && itinerary.length > 0 ? (
                    <ItinerarySection itinerary={itinerary} />
                  ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Aucun itinéraire généré.
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center mt-6 space-y-3">
                <button
                  onClick={handleGenerateItinerary}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Régénérer mon itinéraire
                </button>
                <div>
                  <button
                    onClick={handleSaveFavorite}
                    disabled={savingFavorite}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {savingFavorite ? "Ajout en cours..." : "Ajouter aux favoris"}
                  </button>
                  {saveMessage && (
                    <p className="mt-2 text-sm text-center text-white">{saveMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={widgetsRef} className="scroll-mt-24">
          <WidgetsContainer flightsOpen={flightsOpen} />
        </div>
      </div>
    </div>
  );
}
