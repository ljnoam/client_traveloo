// src/api/travelApi.js
import { api } from "./config"

// Fetch flights via POST /api/search
export async function fetchFlights({
  origin,
  destination,
  departure_at,
  return_at,
  currency = "eur",
  limit = 10,
  page = 1,
  direct = false,
}) {
  const payload = {
    origin,
    destination,
    departure_at,
    return_at,
    currency,
    limit,
    page,
    direct,
  }
  const res = await api.post("/api/search", payload)
  return Array.isArray(res.data) ? res.data : []
}

// Fetch hotels via GET /hotels/search?...
export async function fetchHotels({
  city,
  checkIn,
  checkOut,
  currency = "eur",
  limit = 10,
}) {
  const params = {
    city,
    checkIn,
    checkOut,
    currency,
    limit,
  }
  const res = await api.get("/hotels/search", { params })
  if (!res.data.success) throw new Error("API Hôtels a renvoyé une erreur")
  return Array.isArray(res.data.hotels) ? res.data.hotels : []
}
