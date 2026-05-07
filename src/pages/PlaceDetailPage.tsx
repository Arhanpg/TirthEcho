import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { placesService } from '@/services/api'
import { useFavorites } from '@/hooks'
import MaterialIcon from '@/components/MaterialIcon'
import type { Place } from '@/types'

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [place, setPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)
  const { isFavorited, addFavorite, removeFavorite } = useFavorites()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return
      try {
        const data = await placesService.getPlaceById(id)
        setPlace(data)
      } catch (error) {
        console.error('Failed to fetch place:', error)
        navigate('/search')
      } finally {
        setLoading(false)
      }
    }

    fetchPlace()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-xl">
        <p className="text-on-surface-variant">Loading place details...</p>
      </div>
    )
  }

  if (!place) {
    return (
      <div className="flex-1 flex items-center justify-center py-xl">
        <p className="text-on-surface-variant">Place not found</p>
      </div>
    )
  }

  const isFav = isFavorited(place.id)

  return (
    <div className="w-full">
      {/* Hero Image Gallery */}
      <section className="relative w-full h-96 bg-surface-container overflow-hidden">
        {place.images?.[imageIndex] && (
          <img src={place.images[imageIndex]} alt={place.name} className="w-full h-full object-cover" />
        )}

        {/* Image Navigation */}
        {place.images && place.images.length > 1 && (
          <>
            <button
              onClick={() => setImageIndex((i) => (i - 1 + place.images.length) % place.images.length)}
              className="absolute left-lg top-1/2 -translate-y-1/2 p-sm bg-surface/80 hover:bg-surface text-on-surface rounded-full transition-colors"
            >
              <MaterialIcon name="chevron_left" size={24} />
            </button>
            <button
              onClick={() => setImageIndex((i) => (i + 1) % place.images.length)}
              className="absolute right-lg top-1/2 -translate-y-1/2 p-sm bg-surface/80 hover:bg-surface text-on-surface rounded-full transition-colors"
            >
              <MaterialIcon name="chevron_right" size={24} />
            </button>
          </>
        )}

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-surface to-transparent">
          <div className="max-w-7xl mx-auto flex justify-between items-end">
            <div>
              <span className="inline-block bg-surface-container-lowest px-md py-sm rounded-lg font-label-caps text-label-caps text-primary mb-md">
                {place.category.name}
              </span>
              <h1 className="font-h1 text-h1 text-on-surface">{place.name}</h1>
            </div>
            <button
              onClick={() => (isFav ? removeFavorite(place.id) : addFavorite(place))}
              className="p-md bg-surface rounded-full hover:bg-surface-container transition-colors"
            >
              <MaterialIcon name={isFav ? 'favorite' : 'favorite_border'} size={24} className={isFav ? 'text-error' : 'text-on-surface'} filled={isFav} />
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-lg py-xl grid grid-cols-1 md:grid-cols-3 gap-xl">
        {/* Main Content */}
        <div className="md:col-span-2 flex flex-col gap-xl">
          {/* Quick Info */}
          <section className="flex gap-md flex-wrap">
            <div className="flex items-center gap-sm px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg">
              <MaterialIcon name="star" size={18} filled className="text-primary" />
              <span className="font-label-sm text-label-sm text-on-surface">{place.rating.toFixed(1)}</span>
              <span className="text-on-surface-variant">({place.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-sm px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg">
              <MaterialIcon name="location_on" size={18} className="text-on-surface-variant" />
              <span className="font-label-sm text-label-sm text-on-surface">{place.address}</span>
            </div>
          </section>

          {/* Description */}
          <section className="flex flex-col gap-md">
            <h2 className="font-h2 text-h2 text-on-surface">About</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{place.description}</p>
          </section>

          {/* Facilities */}
          <section className="flex flex-col gap-md">
            <h2 className="font-h2 text-h2 text-on-surface">Facilities & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
              {place.facilities.map((facility) => (
                <div key={facility} className="flex items-center gap-sm p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
                  <MaterialIcon name="check_circle" size={18} className="text-primary" />
                  <span className="font-body-md text-body-md text-on-surface">{facility}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Hours & Contact */}
          <section className="flex flex-col gap-md">
            <h2 className="font-h2 text-h2 text-on-surface">Hours & Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {place.openingHours && (
                <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Opening Hours</p>
                  <p className="font-body-md text-body-md text-on-surface">{place.openingHours}</p>
                </div>
              )}
              {place.phone && (
                <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Phone</p>
                  <a href={`tel:${place.phone}`} className="font-body-md text-body-md text-primary hover:underline">
                    {place.phone}
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-md">
          {/* Map */}
          <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden h-64">
            <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
              <div className="text-center">
                <MaterialIcon name="location_on" size={32} className="text-primary mx-auto mb-sm" />
                <p className="font-body-md text-body-md text-on-surface-variant">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-sm">
            <button className="w-full btn-primary">
              <MaterialIcon name="directions" size={18} />
              Get Directions
            </button>
            <button className="w-full btn-secondary">
              <MaterialIcon name="phone" size={18} />
              Call
            </button>
            {place.website && (
              <a href={place.website} target="_blank" rel="noopener noreferrer" className="w-full btn-secondary text-center">
                <MaterialIcon name="language" size={18} />
                Website
              </a>
            )}
          </div>

          {/* Share */}
          <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-md">Share</p>
            <div className="flex gap-sm">
              <button className="flex-1 p-sm bg-surface-container hover:bg-surface-variant rounded transition-colors">
                <MaterialIcon name="share" size={18} />
              </button>
              <button className="flex-1 p-sm bg-surface-container hover:bg-surface-variant rounded transition-colors">
                <MaterialIcon name="bookmark_border" size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
