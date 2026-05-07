import { useState, useEffect } from 'react'
import { donationService } from '@/services/api'
import MaterialIcon from '@/components/MaterialIcon'
import type { DonationTier } from '@/types'

export default function DonationPage() {
  const [tiers, setTiers] = useState<DonationTier[]>([])
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const data = await donationService.getDonationTiers()
        setTiers(data)
      } catch (error) {
        console.error('Failed to fetch donation tiers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTiers()
  }, [])

  const handleDonate = async (tierId?: string) => {
    const amount = customAmount ? parseFloat(customAmount) : undefined
    // TODO: Implement payment flow
    console.log('Donate', tierId || 'custom', amount)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary-container border-b border-outline-variant py-xl">
        <div className="max-w-4xl mx-auto px-lg text-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-md">Support Our Mission</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Your contributions help us preserve and share Jain heritage with the world. Every donation makes a difference.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-lg py-xl">
        {/* Donation Tiers */}
        <section className="mb-xl">
          <h2 className="font-h2 text-h2 text-on-surface mb-lg">Choose Your Support Level</h2>

          {loading ? (
            <div className="text-center py-xl">
              <p className="text-on-surface-variant">Loading donation options...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.id)
                    setCustomAmount('')
                  }}
                  className={`rounded-xl overflow-hidden cursor-pointer transition-all ${
                    selectedTier === tier.id
                      ? 'ring-2 ring-primary bg-primary-container border border-primary'
                      : 'border border-outline-variant hover:border-outline-variant'
                  } bg-surface-container-lowest`}
                >
                  <div className="p-lg flex flex-col gap-md h-full">
                    <div>
                      <h3 className="font-h3 text-h3 text-on-surface mb-sm">{tier.name}</h3>
                      <p className="font-h2 text-h2 text-primary">₹{tier.amount}</p>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant flex-1">{tier.description}</p>

                    <div className="space-y-sm border-t border-outline-variant pt-md">
                      {tier.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-sm">
                          <MaterialIcon name="check" size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span className="font-body-md text-body-md text-on-surface">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleDonate(tier.id)}
                      className={`w-full py-sm rounded font-label-sm text-label-sm transition-colors ${
                        selectedTier === tier.id
                          ? 'bg-primary text-on-primary hover:bg-primary-fixed'
                          : 'border border-primary text-primary hover:bg-primary-container'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Custom Amount */}
        <section className="mb-xl">
          <h2 className="font-h2 text-h2 text-on-surface mb-lg">Custom Amount</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg max-w-md">
            <div className="mb-md">
              <label className="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Enter Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedTier(null)
                }}
                className="input-base"
              />
            </div>
            <button onClick={() => handleDonate()} disabled={!customAmount} className="w-full btn-primary disabled:opacity-50">
              Donate ₹{customAmount || '0'}
            </button>
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-surface-bright border border-outline-variant rounded-xl p-lg">
          <h2 className="font-h2 text-h2 text-on-surface mb-lg">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {[
              { label: 'Places Documented', value: '1,200+', icon: 'location_on' },
              { label: 'Community Members', value: '50,000+', icon: 'people' },
              { label: 'Countries Reached', value: '25+', icon: 'public' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-sm p-md">
                <div className="p-md bg-primary-container rounded-lg text-primary text-2xl">
                  <MaterialIcon name={stat.icon} size={24} />
                </div>
                <p className="font-h2 text-h2 text-primary">{stat.value}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
