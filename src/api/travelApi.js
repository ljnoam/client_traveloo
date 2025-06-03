<<<<<<< HEAD
// src/api/travelApi.js
import { api } from "./config"

// Fetch flights via POST /api/search
=======
// client/src/api/travelApi.js
import { FLIGHTS_API_URL, HOTELS_API_URL } from './config';

>>>>>>> 155e32b9211cdeaf7ac787abb9d84430c878e29f
export async function fetchFlights({
  origin,
  destination,
  departure_at,
  return_at,
<<<<<<< HEAD
  currency = "eur",
  limit = 10,
  page = 1,
  direct = false,
}) {
  const payload = {
=======
  currency = 'eur',
  limit = 10,
  page = 1,
  direct = false
}) {
  const params = new URLSearchParams({
>>>>>>> 155e32b9211cdeaf7ac787abb9d84430c878e29f
    origin,
    destination,
    departure_at,
    return_at,
    currency,
    limit,
    page,
<<<<<<< HEAD
    direct,
  }
  const res = await api.post("/api/search", payload)
  return Array.isArray(res.data) ? res.data : []
}

// Fetch hotels via GET /hotels/search?...
=======
    direct: direct.toString()
  });
  const res = await fetch(`${FLIGHTS_API_URL}/search?${params}`);
  if (!res.ok) throw new Error(`Erreur réseau vols : ${res.status}`);
  const { success, flights } = await res.json();
  if (!success) throw new Error('API Vols a renvoyé une erreur');
  return flights;
}

>>>>>>> 155e32b9211cdeaf7ac787abb9d84430c878e29f
export async function fetchHotels({
  city,
  checkIn,
  checkOut,
<<<<<<< HEAD
  currency = "eur",
  limit = 10,
}) {
  const params = {
=======
  currency = 'eur',
  limit = 10
}) {
  const params = new URLSearchParams({
>>>>>>> 155e32b9211cdeaf7ac787abb9d84430c878e29f
    city,
    checkIn,
    checkOut,
    currency,
<<<<<<< HEAD
    limit,
  }
  const res = await api.get("/hotels/search", { params })
  if (!res.data.success) throw new Error("API Hôtels a renvoyé une erreur")
  return Array.isArray(res.data.hotels) ? res.data.hotels : []
=======
    limit
  });
  const res = await fetch(`${HOTELS_API_URL}/search?${params}`);
  if (!res.ok) throw new Error(`Erreur réseau hôtels : ${res.status}`);
  const { success, hotels } = await res.json();
  if (!success) throw new Error('API Hôtels a renvoyé une erreur');
  return hotels;
>>>>>>> 155e32b9211cdeaf7ac787abb9d84430c878e29f
}
