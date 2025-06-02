// src/api/itineraryApi.js
import api from "./config";

export async function generateItinerary({ city, startDate, endDate, profile = "", preferences = [] }) {
  // On crée un body avec les clés EXACTEMENT comme le backend les attend
  const body = {
    city,
    start_date: startDate,  // <--- underscore
    end_date: endDate,      // <--- underscore
    profile,
    preferences,
  };
  const response = await api.post("/itinerary/generate", body);
  return response.data;
}
