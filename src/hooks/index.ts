import { useAppStore } from '@/stores/appStore'

export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout } = useAppStore()

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  }
}

export const useTheme = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore()

  return {
    isDarkMode,
    toggleDarkMode,
  }
}

export const useSearch = () => {
  const { searchFilters, setSearchFilters, resetSearchFilters } = useAppStore()

  return {
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
  }
}

export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite, isFavorited } = useAppStore()

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
  }
}
