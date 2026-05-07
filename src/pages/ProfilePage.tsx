import { useState } from 'react'
import { useAuth } from '@/hooks'
import MaterialIcon from '@/components/MaterialIcon'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Call updateProfile API
    setIsEditing(false)
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-lg py-xl">
        <div className="flex justify-between items-center mb-xl">
          <h1 className="font-h1 text-h1 text-on-surface">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-lg py-sm border border-outline-variant text-on-surface hover:bg-surface-variant rounded transition-colors font-label-sm text-label-sm"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col items-center gap-md">
              <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <MaterialIcon name="account_circle" size={56} />
              </div>
              <div className="text-center">
                <h2 className="font-h3 text-h3 text-on-surface mb-xs">{user?.name}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant capitalize mb-md">{user?.role}</p>
                <div className="inline-block px-md py-sm bg-primary-container text-primary rounded-full font-label-caps text-label-caps">
                  Member since 2024
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-lg">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-h2 text-h2 text-on-surface mb-lg">Personal Information</h2>
              <div className="space-y-md">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Full Name</label>
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input-base" />
                  ) : (
                    <p className="font-body-md text-body-md text-on-surface">{formData.name}</p>
                  )}
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Email</label>
                  {isEditing ? (
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-base" />
                  ) : (
                    <p className="font-body-md text-body-md text-on-surface">{formData.email}</p>
                  )}
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Phone</label>
                  {isEditing ? (
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-base" />
                  ) : (
                    <p className="font-body-md text-body-md text-on-surface">{formData.phone}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <button onClick={handleSave} className="mt-lg w-full btn-primary">
                  Save Changes
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-md">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md text-center">
                <p className="font-h2 text-h2 text-primary">12</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Places Visited</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md text-center">
                <p className="font-h2 text-h2 text-primary">8</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Favorites</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md text-center">
                <p className="font-h2 text-h2 text-primary">24</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
