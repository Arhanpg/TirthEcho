import axios from 'axios'
import type { Place, User, DonationTier } from '@/types'

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth endpoints
export const authService = {
  login: async (phone: string, otp: string) => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', {
      phone,
      otp,
    })
    return response.data
  },

  register: async (email: string, phone: string, name: string) => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', {
      email,
      phone,
      name,
    })
    return response.data
  },

  sendOtp: async (phone: string) => {
    const response = await api.post('/auth/send-otp', { phone })
    return response.data
  },

  verifyOtp: async (phone: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { phone, otp })
    return response.data
  },
}

// Places endpoints
export const placesService = {
  getPlaces: async (filters?: any) => {
    const response = await api.get<Place[]>('/places', { params: filters })
    return response.data
  },

  getPlaceById: async (id: string) => {
    const response = await api.get<Place>(`/places/${id}`)
    return response.data
  },

  searchPlaces: async (query: string, filters?: any) => {
    const response = await api.get<Place[]>('/places/search', {
      params: { q: query, ...filters },
    })
    return response.data
  },

  getNearbyPlaces: async (lat: number, lon: number, distance: number = 50) => {
    const response = await api.get<Place[]>('/places/nearby', {
      params: { latitude: lat, longitude: lon, distance },
    })
    return response.data
  },

  getFeaturedPlaces: async () => {
    const response = await api.get<Place[]>('/places/featured')
    return response.data
  },

  getPlacesByCategory: async (category: string) => {
    const response = await api.get<Place[]>(`/places/category/${category}`)
    return response.data
  },
}

// User endpoints
export const userService = {
  getProfile: async () => {
    const response = await api.get<User>('/users/profile')
    return response.data
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put<User>('/users/profile', data)
    return response.data
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await api.post<{ url: string }>('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
}

// Donations endpoints
export const donationService = {
  getDonationTiers: async () => {
    const response = await api.get<DonationTier[]>('/donations/tiers')
    return response.data
  },

  createDonation: async (tierId: string, amount: number) => {
    const response = await api.post('/donations', { tierId, amount })
    return response.data
  },
}

// Community endpoints
export const communityService = {
  getCommunityUpdates: async (page: number = 1) => {
    const response = await api.get('/community/updates', { params: { page } })
    return response.data
  },

  postUpdate: async (content: string, media?: File[]) => {
    const formData = new FormData()
    formData.append('content', content)
    if (media) {
      media.forEach((file) => formData.append('media', file))
    }
    const response = await api.post('/community/updates', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
}

// Volunteer endpoints
export const volunteerService = {
  getVolunteerDashboard: async () => {
    const response = await api.get('/volunteer/dashboard')
    return response.data
  },

  submitPlaceData: async (data: any) => {
    const response = await api.post('/volunteer/submissions', data)
    return response.data
  },
}

export default api
