'use client'
import { useState } from 'react'
import Link from 'next/link'

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
  listing: Listing
}

const categoryColors: Record<string, string> = {
  FIBER: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  TELECOM: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  COPPER: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
}

const REPORT_REASONS = [
  'Not a splicing company',
  'Duplicate listing',
  'Incorrect information',
  'Out of business',
]

function ReportButton({ listingId }: { listingId: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState(REPORT_REASONS[0])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    setStatus('submitting')
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, reason }),
      })
    } catch {
      // fire-and-forget — still show confirmation
    }
    setStatus('done')
  }

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setOpen(o => !o)
  }

  if (status === 'done') {
    return (
      <span className="text-[#777777] text-[11px]">Reported — thank you</span>
    )
  }

  return (
    <div onClick={e => e.preventDefault()}>
      {!open ? (
        <button
          type="button"
          onClick={handleToggle}
          className="text-[#777777] hover:text-[#555555] text-[11px] underline underline-offset-2 transition-colors"
        >
          Report
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 flex-wrap"
          onClick={e => e.stopPropagation()}
        >
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="bg-white border border-[#e8e8e8] text-[#555555] text-[11px] rounded-lg px-2 py-1 outline-none"
          >
            {REPORT_REASONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="text-[11px] bg-[#eeeeee] hover:bg-gray-300 text-[#1f1f1f] px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className="text-[#777777] hover:text-[#555555] text-[11px] transition-colors"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default function ListingCard({ listing }: Props) {
  const primaryCategory = listing.category[0] ?? ''
  const colorClass = categoryColors[primaryCategory] ?? 'text-[#555555] border-slate-500/30 bg-slate-500/10'

  return (
    <div className="relative group block bg-white border border-[#e8e8e8] hover:border-[#e0e0e0] rounded-2xl p-6 transition-all">
      <Link href={`/contractors/${listing.slug}`} className="block">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[#1f1f1f] font-semibold text-base leading-snug group-hover:text-[#0b5cff] transition-colors">
            {listing.businessName}
          </h3>
          {listing.verified && (
            <span className="shrink-0 text-[10px] font-semibold bg-[#0b5cff]/10 border border-[#0b5cff]/30 text-[#0b5cff] px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>

        {/* Location */}
        <p className="text-[#777777] text-sm mb-4">
          {listing.city}{listing.state ? `, ${listing.state}` : ''}
          {listing.yearsInBusiness ? ` · ${listing.yearsInBusiness} yrs` : ''}
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.category.map((cat) => (
            <span
              key={cat}
              className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${categoryColors[cat] ?? colorClass}`}
            >
              {cat === 'FIBER' ? 'Fiber Optic' : cat === 'TELECOM' ? 'Telecom' : cat === 'COPPER' ? 'Copper' : cat}
            </span>
          ))}
          {listing.emergencyService && (
            <span className="text-[10px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">
              24/7 Emergency
            </span>
          )}
        </div>

        {/* Services preview */}
        {listing.services.length > 0 && (
          <p className="text-[#777777] text-xs truncate mb-4">
            {listing.services.slice(0, 3).join(' · ')}
            {listing.services.length > 3 ? ` +${listing.services.length - 3} more` : ''}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e8e8e8]">
          {listing.rating !== null ? (
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-xs font-bold">{listing.rating.toFixed(1)}</span>
              <span className="text-[#777777] text-xs">({listing.reviewCount})</span>
            </div>
          ) : (
            <span className="text-[#777777] text-xs">No reviews yet</span>
          )}
          {listing.phone && (
            <span className="text-[#777777] text-xs">{listing.phone}</span>
          )}
        </div>
      </Link>

      {/* Report button — outside the Link to avoid nested interactive elements */}
      <div className="pt-3 mt-3 border-t border-[#e8e8e8]/50">
        <ReportButton listingId={listing.id} />
      </div>
    </div>
  )
}
