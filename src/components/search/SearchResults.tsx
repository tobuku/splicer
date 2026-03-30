'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ListingCard from '@/components/listings/ListingCard'

interface Listing {
  id: string
  slug: string
  businessName: string
  city: string
  state: string
  category: string[]
  services: string[]
  phone: string | null
  certifications: string[]
  emergencyService: boolean
  rating: number | null
  reviewCount: number
  verified: boolean
  yearsInBusiness: number | null
}

interface Props {
  city?: string
  state?: string
  category?: string
  page?: number
}

const categories = [
  { value: '', label: 'All Services' },
  { value: 'FIBER', label: 'Fiber Optic' },
  { value: 'TELECOM', label: 'Telecom' },
  { value: 'COPPER', label: 'Copper Cable' },
]

export default function SearchResults({ city, state, category: initCat, page = 1 }: Props) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState(initCat || '')
  const [emergency, setEmergency] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchListings = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (state) params.set('state', state)
    if (category) params.set('category', category)
    if (emergency) params.set('emergency', 'true')
    params.set('page', String(page))

    try {
      const res = await fetch(`/api/listings?${params.toString()}`)
      const data = await res.json()
      setListings(data.listings || [])
      setTotal(data.total || 0)
    } catch {
      setListings([])
    } finally {
      setLoading(false)
    }
  }, [city, state, category, emergency, page])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  function updateFilter(cat: string) {
    setCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat) params.set('category', cat)
    else params.delete('category')
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => updateFilter(c.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              category === c.value
                ? 'bg-[#0b5cff] text-white'
                : 'bg-white border border-[#e8e8e8] text-[#555555] hover:border-slate-500'
            }`}
          >
            {c.label}
          </button>
        ))}
        <button
          onClick={() => setEmergency(!emergency)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            emergency
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
              : 'bg-white border-[#e8e8e8] text-[#555555] hover:border-slate-500'
          }`}
        >
          24/7 Emergency
        </button>
        <span className="text-[#777777] text-sm ml-auto">{total} contractors found</span>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e8e8e8] rounded-2xl p-6 animate-pulse">
              <div className="h-5 bg-[#eeeeee] rounded w-3/4 mb-3" />
              <div className="h-4 bg-[#eeeeee] rounded w-1/2 mb-6" />
              <div className="h-3 bg-[#eeeeee] rounded w-full mb-2" />
              <div className="h-3 bg-[#eeeeee] rounded w-4/5" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && listings.length === 0 && (
        <div className="text-center py-20">
          <div className="text-[#777777] text-5xl mb-4">&#8212;</div>
          <h3 className="text-[#1f1f1f] font-semibold text-lg mb-2">No contractors found</h3>
          <p className="text-[#555555] text-sm mb-6">
            Try a different city, state, or service type.
          </p>
        </div>
      )}
    </div>
  )
}
