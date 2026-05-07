import MaterialIcon from '@/components/MaterialIcon'

export default function CommunityPage() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-lg py-xl">
        <h1 className="font-h1 text-h1 text-on-surface mb-lg">Community Hub</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Main Feed */}
          <div className="md:col-span-2 space-y-md">
            {/* Post Input */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <div className="flex items-start gap-md">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary flex-shrink-0">
                  <MaterialIcon name="account_circle" size={24} />
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts with the community..."
                    className="w-full input-base resize-none mb-md"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end gap-sm">
                    <button className="btn-secondary">
                      <MaterialIcon name="image" size={18} />
                      Add Media
                    </button>
                    <button className="btn-primary">Post</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                <div className="flex items-start gap-md mb-md">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary flex-shrink-0">
                    <MaterialIcon name="account_circle" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body-md text-body-md text-on-surface font-semibold">Community Member</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">2 hours ago</p>
                  </div>
                  <button className="p-sm hover:bg-surface-variant rounded transition-colors">
                    <MaterialIcon name="more_vert" size={18} />
                  </button>
                </div>

                <p className="font-body-md text-body-md text-on-surface mb-md">
                  Just visited the recently renovated Palitana temples. The documentation team has done an amazing job updating the infrastructure info!
                </p>

                <div className="flex gap-md text-on-surface-variant text-label-sm">
                  <button className="flex items-center gap-xs hover:text-primary transition-colors">
                    <MaterialIcon name="favorite_border" size={16} />
                    {48 + i}
                  </button>
                  <button className="flex items-center gap-xs hover:text-primary transition-colors">
                    <MaterialIcon name="comment" size={16} />
                    {12 + i}
                  </button>
                  <button className="flex items-center gap-xs hover:text-primary transition-colors">
                    <MaterialIcon name="share" size={16} />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-lg">
            {/* Trending */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-h3 text-h3 text-on-surface mb-md">Trending Topics</h2>
              <div className="space-y-sm">
                {['#JainHeritage', '#VolunteerUpdates', '#TempleConservation', '#CommunityDrives'].map((tag) => (
                  <button key={tag} className="block w-full text-left p-sm hover:bg-surface-container rounded transition-colors">
                    <p className="font-body-md text-body-md text-primary">{tag}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-h3 text-h3 text-on-surface mb-md">Upcoming Events</h2>
              <div className="space-y-md">
                {[1, 2].map((i) => (
                  <div key={i} className="p-sm border border-outline-variant rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                    <p className="font-label-sm text-label-sm text-primary font-semibold">Documentation Drive</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">May {15 + i}, 2024</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
