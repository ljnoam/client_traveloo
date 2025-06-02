/services/apiService.js


import api from "../api"
import { ENDPOINTS } from "../api/endpoints"

export const authService = {
  login: async (email, password) => {
    const response = await api.post(ENDPOINTS.AUTH_LOGIN, { email, password })
    if (response.data.token) {
      localStorage.setItem("traveloo_token", response.data.token)
    }
    return response.data
  },

  register: async (name, email, password) => {
    const response = await api.post(ENDPOINTS.AUTH_REGISTER, { name, email, password })
    return response.data
  },

  getProfile: async () => {
    const response = await api.get(ENDPOINTS.AUTH_ME)
    return response.data
  },

  updateProfile: async (profileData) => {
    const response = await api.put(ENDPOINTS.AUTH_UPDATE_PROFILE, profileData)
    return response.data
  },

  logout: () => {
    localStorage.removeItem("traveloo_token")
  },
}

export const searchService = {
  searchFlights: async (searchParams) => {
    const response = await api.post(ENDPOINTS.FLIGHTS_SEARCH, {
      ...searchParams,
      type: "flights",
    })
    return response.data
  },

  searchHotels: async (searchParams) => {
    const response = await api.post(ENDPOINTS.HOTELS_SEARCH, {
      ...searchParams,
      type: "hotels",
    })
    return response.data
  },
}

export const itineraryService = {
  generateItinerary: async (itineraryData) => {
    const response = await api.post(ENDPOINTS.ITINERARY_GENERATE, itineraryData)
    return response.data
  },

  getItinerary: async () => {
    const response = await api.get(ENDPOINTS.ITINERARY_GET)
    return response.data
  },

  addToItinerary: async (item) => {
    const response = await api.post(ENDPOINTS.ITINERARY_ADD, item)
    return response.data
  },

  removeFromItinerary: async (itemId) => {
    const response = await api.delete(ENDPOINTS.ITINERARY_REMOVE(itemId))
    return response.data
  },
}

export const favoritesService = {
  getFavorites: async () => {
    const response = await api.get(ENDPOINTS.FAVORITES_GET)
    return response.data
  },

  addFavorite: async (itemType, itemId) => {
    const response = await api.post(ENDPOINTS.FAVORITES_ADD, {
      destination: itemType === "flight" ? "flights" : "hotels",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      itinerary: itemType === "flight" ? { flights: [{ id: itemId }] } : { hotels: [{ id: itemId }] },
    })
    return response.data
  },

  removeFavorite: async (favoriteId) => {
    const response = await api.delete(ENDPOINTS.FAVORITES_REMOVE(favoriteId))
    return response.data
  },
}
