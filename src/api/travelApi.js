// client/src/api/travelApi.js
import { FLIGHTS_API_URL, HOTELS_API_URL } from './config';

export async function fetchFlights({
  origin,
  destination,
  departure_at,
  return_at,
  currency = 'eur',
  limit = 10,
  page = 1,
  direct = false
}) {
  const params = new URLSearchParams({
    origin,
    destination,
    departure_at,
    return_at,
    currency,
    limit,
    page,
    direct: direct.toString()
  });
  const res = await fetch(`${FLIGHTS_API_URL}/search?${params}`);
  if (!res.ok) throw new Error(`Erreur réseau vols : ${res.status}`);
  const { success, flights } = await res.json();
  if (!success) throw new Error('API Vols a renvoyé une erreur');
  return flights;
}

export async function fetchHotels({
  city,
  checkIn,
  checkOut,
  currency = 'eur',
  limit = 10
}) {
  const params = new URLSearchParams({
    city,
    checkIn,
    checkOut,
    currency,
    limit
  });
  const res = await fetch(`${HOTELS_API_URL}/search?${params}`);
  if (!res.ok) throw new Error(`Erreur réseau hôtels : ${res.status}`);
  const { success, hotels } = await res.json();
  if (!success) throw new Error('API Hôtels a renvoyé une erreur');
  return hotels;
}
