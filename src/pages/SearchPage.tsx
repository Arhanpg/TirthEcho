import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { placesService } from '@/services/api'
import MaterialIcon from '@/components/MaterialIcon'
import PlaceCard from '@/components/PlaceCard'
import type { Place } from '@/types'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [distance, setDistance] = useState(50)
  const [sortBy, setSortBy] = useState('popular')

  const category = searchParams.get('category') || ''
  const query = searchParams.get('q') || ''

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true)
        const data = await placesService.searchPlaces(query || category, {
          distance,
        })
        setPlaces(data)
      } catch (error) {
        console.error('Failed to fetch places:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [query, category, distance])

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row mt-24 px-lg gap-lg pb-xl">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-xl border-r-0 md:border-r border-outline-variant pr-0 md:pr-lg">
        <div className="flex items-center justify-between border-b border-outline-variant pb-sm">
          <h2 className="font-h3 text-h3 text-on-surface">Filters</h2>
          <button className="font-label-sm text-label-sm text-primary hover:underline">Clear All</button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-sm">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Category</label>
          <div className="flex flex-col gap-xs">
            {['Tirth', 'Temple', 'Dharamshala', 'Bhojanalaya'].map((cat) => (
              <label key={cat} className="flex items-center gap-sm cursor-pointer group">
                <input type="checkbox" defaultChecked={cat === category} className="w-4 h-4 rounded accent-primary" />
                <span className="font-body-md text-body-md text-on-surface group-hover:text-primary">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance Slider */}
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Distance</label>
            <span className="font-label-sm text-label-sm text-on-surface">{distance} km</span>
          </div>
          <input
            type="range"
            min="5"
            max="200"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Facilities */}
        <div className="flex flex-col gap-sm">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Facilities</label>
          <div className="flex flex-col gap-xs">
            {['Parking', 'AC Rooms', 'Wheelchair Accessible'].map((facility) => (
              <label key={facility} className="flex items-center gap-sm cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                <span className="font-body-md text-body-md text-on-surface group-hover:text-primary">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-sm rounded uppercase tracking-wider hover:opacity-90 transition-opacity mt-md">
          Apply Filters
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col gap-md">
        {/* Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-container-low p-md rounded border border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant mb-sm sm:mb-0">
            Showing <span className="font-bold text-on-surface">{places.length}</span> results
          </p>
          <div className="flex items-center gap-sm">
            <label className="font-label-sm text-label-sm text-on-surface-variant">Sort by:</label>
            <div className="flex bg-surface border border-outline-variant rounded overflow-hidden">
              {['Popular', 'Rating', 'Distance'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort.toLowerCase())}
                  className={`px-sm py-xs font-label-sm text-label-sm transition-colors ${
                    sortBy === sort.toLowerCase()
                      ? 'bg-surface-variant text-on-surface'
                      : 'text-on-surface-variant hover:bg-surface-variant'
                  } ${sort !== 'Distance' ? 'border-r border-outline-variant' : ''}`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-xl">
            <p className="text-on-surface-variant">Loading places...</p>
          </div>
        ) : places.length === 0 ? (
          <div className="flex justify-center py-xl">
            <p className="text-on-surface-variant">No places found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && places.length > 0 && (
          <div className="flex justify-center items-center gap-sm mt-lg pt-md border-t border-outline-variant">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant">
              <MaterialIcon name="chevron_left" size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded font-label-sm text-label-sm ${
                  page === 1
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant text-on-surface hover:bg-surface-variant'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant">
              <MaterialIcon name="chevron_right" size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
