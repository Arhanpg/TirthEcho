import { useState } from 'react'
import MaterialIcon from '@/components/MaterialIcon'

export default function VolunteerPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submit' | 'community'>('dashboard')

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-lg py-xl">
        <h1 className="font-h1 text-h1 text-on-surface mb-xl">Volunteer Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-md border-b border-outline-variant mb-xl overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'submit', label: 'Submit Data' },
            { id: 'community', label: 'Community' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-md px-lg font-body-md text-body-md border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
              {[
                { label: 'Places Added', value: '24', icon: 'location_on' },
                { label: 'Submissions', value: '156', icon: 'check_circle' },
                { label: 'Reviews Given', value: '89', icon: 'rate_review' },
                { label: 'Rank Points', value: '2,450', icon: 'star' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                  <div className="flex items-center gap-md mb-md">
                    <div className="p-md bg-primary-container rounded-lg text-primary">
                      <MaterialIcon name={stat.icon} size={24} />
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</p>
                      <p className="font-h2 text-h2 text-on-surface">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-h2 text-h2 text-on-surface mb-md">Recent Activity</h2>
              <div className="space-y-md">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-md pb-md border-b border-outline-variant last:border-b-0">
                    <div className="p-sm bg-primary-container rounded-full text-primary mt-1">
                      <MaterialIcon name="check_circle" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-body-md text-body-md text-on-surface">Added details to "Shikharji Tirth"</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === 'submit' && (
          <div className="max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
            <h2 className="font-h2 text-h2 text-on-surface mb-lg">Submit Place Information</h2>
            <form className="space-y-md">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Place Name</label>
                <input type="text" placeholder="Enter place name" className="input-base" />
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Category</label>
                <select className="input-base">
                  <option>Select category</option>
                  <option>Tirth</option>
                  <option>Temple</option>
                  <option>Dharamshala</option>
                </select>
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Description</label>
                <textarea placeholder="Describe the place" rows={4} className="input-base resize-none"></textarea>
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Location</label>
                <input type="text" placeholder="Address or coordinates" className="input-base" />
              </div>
              <button type="submit" className="w-full btn-primary">
                Submit Information
              </button>
            </form>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
            <h2 className="font-h2 text-h2 text-on-surface mb-md">Volunteer Community</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              Connect with other volunteers, share insights, and collaborate on documentation projects.
            </p>
            <button className="btn-primary">
              <MaterialIcon name="group" size={18} />
              Join Community Forum
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
