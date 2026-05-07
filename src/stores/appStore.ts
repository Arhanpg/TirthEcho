import { create } from 'zustand'
import type { User, SearchFilters, Place } from '@/types'

interface AppStore {
  user: User | null
  isAuthenticated: boolean
  isDarkMode: boolean
  searchFilters: SearchFilters
  favorites: Place[]

  // User actions
  setUser: (user: User | null) => void
  logout: () => void

  // Theme actions
  toggleDarkMode: () => void

  // Search actions
  setSearchFilters: (filters: SearchFilters) => void
  resetSearchFilters: () => void

  // Favorites actions
  addFavorite: (place: Place) => void
  removeFavorite: (placeId: string) => void
  isFavorited: (placeId: string) => boolean
}

const defaultFilters: SearchFilters = {
  query: '',
  category: undefined,
  distance: 50,
  location: undefined,
  facilities: [],
}

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isDarkMode: false,
  searchFilters: defaultFilters,
  favorites: [],

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setSearchFilters: (filters) => set({ searchFilters: filters }),
  resetSearchFilters: () => set({ searchFilters: defaultFilters }),

  addFavorite: (place) =>
    set((state) => {
      if (!state.favorites.find((p) => p.id === place.id)) {
        return { favorites: [...state.favorites, place] }
      }
      return state
    }),

  removeFavorite: (placeId) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== placeId),
    })),

  isFavorited: (placeId) => get().favorites.some((p) => p.id === placeId),
}))
