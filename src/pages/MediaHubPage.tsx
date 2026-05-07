import MaterialIcon from '@/components/MaterialIcon'

export default function MediaHubPage() {
  const categories = ['All', 'Temples', 'Architectural', 'Cultural Events', 'Testimonials', 'Behind the Scenes']
  const media = [
    { id: 1, title: 'Palitana Temples at Sunrise', category: 'Temples', type: 'image' },
    { id: 2, title: 'Jain Architecture Documentary', category: 'Cultural Events', type: 'video' },
    { id: 3, title: 'Community Volunteer Stories', category: 'Testimonials', type: 'video' },
    { id: 4, title: 'Temple Restoration Project', category: 'Behind the Scenes', type: 'image' },
    { id: 5, title: 'Ancient Manuscript Collection', category: 'Architectural', type: 'image' },
    { id: 6, title: 'Heritage Conservation Webinar', category: 'Cultural Events', type: 'video' },
  ]

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-lg py-xl">
        <div className="mb-xl">
          <h1 className="font-h1 text-h1 text-on-surface mb-md">Media Hub</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Explore our collection of photos, videos, and documentaries showcasing Jain heritage.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-md overflow-x-auto no-scrollbar mb-lg pb-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-lg py-sm rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                cat === 'All'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container border border-outline-variant text-on-surface hover:border-outline'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {media.map((item) => (
            <div key={item.id} className="group rounded-lg overflow-hidden border border-outline-variant hover:border-outline transition-all cursor-pointer">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/40 transition-all flex items-center justify-center">
                  <MaterialIcon
                    name={item.type === 'video' ? 'play_circle' : 'image'}
                    size={48}
                    className="text-on-surface opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="p-md bg-surface-container-lowest">
                <p className="font-label-caps text-label-caps text-primary mb-xs">{item.category}</p>
                <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-xl bg-primary-container border border-outline-variant rounded-xl p-lg">
          <div className="flex items-center gap-md">
            <div className="p-lg bg-primary rounded-lg text-on-primary flex-shrink-0">
              <MaterialIcon name="upload" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="font-h2 text-h2 text-on-surface mb-sm">Share Your Media</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Help document Jain heritage by uploading your photos and videos</p>
            </div>
            <button className="btn-primary flex-shrink-0">
              Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
