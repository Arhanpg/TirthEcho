import { Link } from 'react-router-dom'
import MaterialIcon from '@/components/MaterialIcon'
import type { Place } from '@/types'

interface PlaceCardProps {
  place: Place
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link
      to={`/place/${place.id}`}
      className="min-w-[280px] max-w-[280px] flex flex-col bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden hover:border-outline hover:shadow-md transition-all cursor-pointer"
    >
      <div
        className="h-32 bg-surface-container bg-cover bg-center"
        style={{
          backgroundImage: place.images?.[0] ? `url(${place.images[0]})` : undefined,
        }}
      />
      <div className="p-md flex flex-col gap-xs">
        <span className="font-label-caps text-label-caps text-primary">{place.category.name}</span>
        <h3 className="font-h3 text-h3 text-on-surface truncate">{place.name}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
          <MaterialIcon name="location_on" size={16} />
          {place.address}
        </p>
      </div>
    </Link>
  )
}
