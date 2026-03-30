'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  defaultCategory?: string
}

export default function ListingSearchWidget({ defaultCategory = '' }: Props) {
  const [city, setCity] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (defaultCategory) params.set('category', defaultCategory)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg">
      <input
        type="text"
        placeholder="Enter city or state..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] placeholder-gray-400 text-sm outline-none focus:border-[#0b5cff] transition-colors"
      />
      <button
        type="submit"
        className="bg-[#0b5cff] hover:bg-[#0946cc] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
      >
        Find Contractors
      </button>
    </form>
  )
}
