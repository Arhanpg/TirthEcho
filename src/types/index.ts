export type UserRole = 'public' | 'member' | 'volunteer' | 'district' | 'state' | 'national' | 'founder'

export interface User {
  id: string
  email: string
  phone: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface PlaceCategory {
  id: string
  name: string
  icon: string
  description: string
}

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  description: string
  address: string
  location: {
    latitude: number
    longitude: number
  }
  rating: number
  reviews: number
  images: string[]
  phone?: string
  website?: string
  openingHours?: string
  facilities: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SearchFilters {
  query: string
  category?: string
  distance?: number
  location?: string
  facilities?: string[]
}

export interface DonationTier {
  id: string
  name: string
  amount: number
  benefits: string[]
  description: string
}
