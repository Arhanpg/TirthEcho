import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { placesService } from '@/services/api'
import MaterialIcon from '@/components/MaterialIcon'
import PlaceCard from '@/components/PlaceCard'
import type { Place } from '@/types'

export default function HomePage() {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const places = await placesService.getFeaturedPlaces()
        setFeaturedPlaces(places)
      } catch (error) {
        console.error('Failed to fetch featured places:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const categories = [
    { name: 'Tirth', icon: 'temple_hindu' },
    { name: 'Temple', icon: 'synagogue' },
    { name: 'Dharamshala', icon: 'hotel' },
    { name: 'Jain Food', icon: 'restaurant' },
    { name: 'Fuel', icon: 'local_gas_station' },
    { name: 'Hospital', icon: 'local_hospital' },
    { name: 'Jain History', icon: 'menu_book' },
    { name: 'Community', icon: 'diversity_3' },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-xl bg-surface-container-low border-b border-outline-variant overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
        <div className="relative z-10 max-w-3xl px-lg py-xl flex flex-col gap-lg">
          <h1 className="font-h1 text-h1 text-on-surface">Explore Jain Tirth, Temples & Heritage Worldwide</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Discover sacred sites, community resources, and historical landmarks to guide your spiritual journey and connect with the global community.
          </p>

          {/* Search Bar */}
          <div className="mt-md flex flex-col sm:flex-row w-full max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:border-outline transition-colors">
            <div className="flex-grow flex items-center px-md py-sm border-b sm:border-b-0 sm:border-r border-outline-variant">
              <MaterialIcon name="search" className="text-outline mr-sm" />
              <input
                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder-outline outline-none"
                placeholder="Search for Tirths, Temples, Cities..."
                type="text"
              />
            </div>
            <button className="flex items-center justify-center gap-xs px-md py-sm bg-surface-container hover:bg-surface-variant text-on-surface transition-colors font-label-sm text-label-sm whitespace-nowrap">
              <MaterialIcon name="my_location" size={18} />
              Use My Location
            </button>
            <Link to="/search" className="px-lg py-sm bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed font-body-md text-body-md transition-colors">
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-lg py-xl flex flex-col gap-xl">
        {/* Category Grid */}
        <section className="flex flex-col gap-md">
          <h2 className="font-h2 text-h2 text-on-surface border-b border-outline-variant pb-xs">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/search?category=${cat.name}`}
                className="flex flex-col items-center justify-center p-lg bg-surface-container-lowest border border-outline-variant hover:bg-primary-container hover:border-primary-fixed transition-colors rounded-lg gap-sm group"
              >
                <MaterialIcon name={cat.icon} size={32} className="text-primary group-hover:fill-icon" />
                <span className="font-label-sm text-label-sm text-on-surface">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured & Trending */}
        <section className="flex flex-col gap-md">
          <div className="flex justify-between items-end border-b border-outline-variant pb-xs">
            <h2 className="font-h2 text-h2 text-on-surface">Featured & Trending</h2>
            <Link to="/search" className="font-label-sm text-label-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-xl">
              <p className="text-on-surface-variant">Loading featured places...</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-md pb-sm no-scrollbar snap-x">
              {featuredPlaces.slice(0, 4).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-md border-y border-outline-variant py-lg bg-surface-bright">
          <div className="flex flex-col items-center text-center gap-xs">
            <span className="font-h1 text-h1 text-primary">1,200+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Tirth</span>
          </div>
          <div className="flex flex-col items-center text-center gap-xs">
            <span className="font-h1 text-h1 text-primary">5,400+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Temples</span>
          </div>
          <div className="flex flex-col items-center text-center gap-xs">
            <span className="font-h1 text-h1 text-primary">10k+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Volunteers</span>
          </div>
          <div className="flex flex-col items-center text-center gap-xs">
            <span className="font-h1 text-h1 text-primary">25+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Countries</span>
          </div>
        </section>

        {/* Hierarchy Section */}
        <section className="flex flex-col gap-md">
          <h2 className="font-h2 text-h2 text-on-surface border-b border-outline-variant pb-xs text-center md:text-left">
            Hierarchy & Participation
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg overflow-x-auto">
            <div className="flex items-center min-w-max justify-between gap-sm">
              {[
                { role: 'Public', icon: 'public' },
                { role: 'Member', icon: 'person' },
                { role: 'Volunteer', icon: 'volunteer_activism' },
                { role: 'District', icon: 'corporate_fare' },
                { role: 'State', icon: 'account_balance' },
                { role: 'National', icon: 'flag' },
                { role: 'Founder', icon: 'military_tech' },
              ].map((item, idx) => (
                <div key={item.role} className="flex items-center gap-sm">
                  <div className={`flex flex-col items-center gap-sm w-24 text-center ${idx === 2 ? 'opacity-100' : 'opacity-70'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${idx === 2 ? 'border-2 border-primary bg-primary-container' : 'border border-outline-variant bg-surface'}`}>
                      <MaterialIcon name={item.icon} className={idx === 2 ? 'text-primary fill-icon' : 'text-on-surface-variant'} />
                    </div>
                    <span className={`font-label-sm text-label-sm ${idx === 2 ? 'text-primary font-bold' : 'text-on-surface'}`}>{item.role}</span>
                  </div>
                  {idx < 6 && <div className="flex-grow h-px bg-outline-variant min-w-[24px]"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Volunteer Banner */}
          <div className="flex flex-col justify-center p-xl bg-primary-container border border-outline-variant rounded-xl gap-md relative overflow-hidden">
            <div className="absolute right-[-20%] bottom-[-20%] opacity-10">
              <MaterialIcon name="group_add" size={200} />
            </div>
            <div className="relative z-10 flex flex-col gap-sm">
              <h3 className="font-h2 text-h2 text-on-primary-fixed-variant">Join the Movement</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Become a volunteer and help us document and maintain data for Tirths and Temples in your local district.
              </p>
              <Link to="/volunteer" className="mt-sm w-fit px-lg py-sm bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed font-label-sm text-label-sm rounded transition-colors uppercase tracking-widest">
                Become a Volunteer
              </Link>
            </div>
          </div>

          {/* Donation Banner */}
          <div className="flex flex-col justify-center p-xl bg-surface-container-lowest border border-outline-variant rounded-xl gap-md hover:border-outline transition-colors">
            <div className="flex items-center gap-sm">
              <MaterialIcon name="favorite" size={32} className="text-primary" />
              <h3 className="font-h2 text-h2 text-on-surface">Support Our Mission</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your contributions ensure the continued development of this platform and help preserve our heritage digitally.
            </p>
            <Link
              to="/donate"
              className="mt-sm w-fit px-lg py-sm border border-outline text-on-surface hover:bg-surface-variant font-label-sm text-label-sm rounded transition-colors uppercase tracking-widest flex items-center gap-xs"
            >
              <MaterialIcon name="volunteer_activism" size={18} />
              Donate Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
