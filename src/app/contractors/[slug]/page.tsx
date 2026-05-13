import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { categoryLabel, categoryColor } from '@/lib/utils'

interface Listing {
  id: string
  slug: string
  businessName: string
  description: string | null
  city: string
  state: string
  address: string | null
  phone: string | null
  website: string | null
  email: string | null
  category: string[]
  services: string[]
  certifications: string[]
  emergencyService: boolean
  rating: number | null
  reviewCount: number
  verified: boolean
  yearsInBusiness: number | null
  latitude: number | null
  longitude: number | null
  reviews: { id: string; name: string; rating: number; comment: string | null; createdAt: string }[]
}

// Mock for dev
const mockListings: Record<string, Listing> = {
  'pacific-fiber-solutions-los-angeles': {
    id: '1',
    slug: 'pacific-fiber-solutions-los-angeles',
    businessName: 'Pacific Fiber Solutions',
    description: 'Full-service fiber optic splicing and testing for OSP and ISP projects throughout Southern California. We specialize in fusion splicing, OTDR acceptance testing, and emergency fiber cut restoration for carriers, municipalities, and general contractors.',
    city: 'Los Angeles',
    state: 'CA',
    address: '1234 Fiber Way, Los Angeles, CA 90001',
    phone: '(310) 555-0142',
    website: 'https://example.com',
    email: null,
    category: ['FIBER', 'TELECOM'],
    services: ['Fusion Splicing', 'OTDR Testing', 'Aerial Fiber Installation', 'Underground Fiber Repair', 'Splice Closure Work', 'FTTX Splicing'],
    certifications: ['BICSI RCDD', 'FOA CFOT', 'OSHA 10', 'California C-7 Contractor'],
    emergencyService: true,
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    yearsInBusiness: 12,
    latitude: 34.0522,
    longitude: -118.2437,
    reviews: [
      { id: 'r1', name: 'Mike T.', rating: 5, comment: 'Excellent work on our FTTX build. Fast and clean splices, OTDR traces provided for every closure.', createdAt: '2025-01-15T00:00:00Z' },
      { id: 'r2', name: 'Sara L.', rating: 5, comment: 'Called them for an emergency fiber cut on a Saturday. On site within 2 hours, restored service fast.', createdAt: '2025-02-10T00:00:00Z' },
    ],
  },
}

async function getListing(slug: string): Promise<Listing | null> {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')
      const l = await prisma.listing.findFirst({
        where: { slug, published: true },
        include: { reviews: { orderBy: { createdAt: 'desc' }, take: 10 } },
      })
      return l as unknown as Listing | null
    } catch { return null }
  }
  return mockListings[slug] || null
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return { title: 'Contractor Not Found' }
  return {
    title: `${listing.businessName} | ${listing.city}, ${listing.state} Cable Splicing`,
    description: listing.description || `${listing.businessName} offers professional cable splicing services in ${listing.city}, ${listing.state}. View certifications, services, and request a quote.`,
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.businessName,
    description: listing.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.state,
    },
    telephone: listing.phone,
    url: listing.website,
    ...(listing.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: listing.rating, reviewCount: listing.reviewCount } } : {}),
  }

  // Primary category for internal links
  const primaryCat = listing.category[0]?.toLowerCase() || 'fiber'
  const catSlug = primaryCat === 'fiber' ? 'fiber-optic-splicing' : primaryCat === 'telecom' ? 'telecom-cable-splicing' : 'copper-cable-splicing'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#777777] mb-8">
            <Link href="/" className="hover:text-[#555555] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/search" className="hover:text-[#555555] transition-colors">Contractors</Link>
            <span>/</span>
            <Link href={`/${catSlug}`} className="hover:text-[#555555] transition-colors">{categoryLabel(primaryCat.toUpperCase())}</Link>
            <span>/</span>
            <span className="text-[#555555]">{listing.businessName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {listing.category.map((cat) => (
                        <span key={cat} className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColor(cat)}`}>
                          {categoryLabel(cat)}
                        </span>
                      ))}
                      {listing.emergencyService && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-amber-400 bg-amber-400/10 border-amber-400/30">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] mb-1">{listing.businessName}</h1>
                    <p className="text-[#555555] text-sm">
                      {listing.city}, {listing.state}
                      {listing.yearsInBusiness ? ` · ${listing.yearsInBusiness} years in business` : ''}
                    </p>
                  </div>
                  {listing.verified && (
                    <div className="flex items-center gap-1.5 bg-[#0b5cff]/10 border border-[#0b5cff]/30 text-[#0b5cff] px-3 py-1.5 rounded-lg text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {listing.rating !== null && (
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={listing.rating} />
                    <span className="text-[#1f1f1f] font-semibold">{listing.rating.toFixed(1)}</span>
                    <span className="text-[#777777] text-sm">({listing.reviewCount} reviews)</span>
                  </div>
                )}

                {listing.description && (
                  <p className="text-[#555555] leading-relaxed">{listing.description}</p>
                )}
              </div>

              {/* Services */}
              {listing.services.length > 0 && (
                <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-[#1f1f1f] mb-4">Services Offered</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {listing.services.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-[#555555] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0b5cff] shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {listing.certifications.length > 0 && (
                <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-[#1f1f1f] mb-4">Certifications &amp; Licenses</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.certifications.map((cert) => (
                      <span key={cert} className="bg-gray-100 border border-[#e8e8e8] text-[#555555] text-xs font-medium px-3 py-1.5 rounded-lg">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service area */}
              <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1f1f1f] mb-3">Service Area</h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  {listing.businessName} is based in {listing.city}, {listing.state} and serves the surrounding region.
                  Contact them directly to confirm coverage for your project location.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link
                    href={`/${catSlug}`}
                    className="text-xs text-[#0b5cff] hover:underline"
                  >
                    Browse all {categoryLabel(listing.category[0])} contractors
                  </Link>
                  <span className="text-gray-300">·</span>
                  <Link
                    href={`/search?state=${listing.state}`}
                    className="text-xs text-[#0b5cff] hover:underline"
                  >
                    More contractors in {listing.state}
                  </Link>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden">
                <iframe
                  title={`Map of ${listing.city}, ${listing.state}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${listing.city}, ${listing.state}`)}&output=embed`}
                  className="w-full h-48"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Reviews */}
              {listing.reviews && listing.reviews.length > 0 && (
                <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-[#1f1f1f] mb-5">Customer Reviews</h2>
                  <div className="space-y-4">
                    {listing.reviews.map((review) => (
                      <div key={review.id} className="border-b border-[#e8e8e8] last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#1f1f1f] font-medium text-sm">{review.name}</span>
                          <StarRating rating={review.rating} />
                        </div>
                        {review.comment && <p className="text-[#555555] text-sm">{review.comment}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact info */}
              <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
                <h3 className="text-[#1f1f1f] font-semibold mb-4">Contact</h3>
                {listing.phone && (
                  <a href={`tel:${listing.phone}`} className="flex items-center gap-3 text-[#555555] hover:text-[#0b5cff] transition-colors mb-3">
                    <svg className="w-4 h-4 text-[#0b5cff] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {listing.phone}
                  </a>
                )}
                {listing.email && (
                  <a href={`mailto:${listing.email}`} className="flex items-center gap-3 text-[#555555] hover:text-[#0b5cff] transition-colors text-sm mb-3">
                    <svg className="w-4 h-4 text-[#0b5cff] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {listing.email}
                  </a>
                )}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#555555] hover:text-[#0b5cff] transition-colors text-sm">
                    <svg className="w-4 h-4 text-[#0b5cff] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>

              {/* Mobile click-to-call */}
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="sm:hidden w-full flex items-center justify-center gap-2 bg-[#0b5cff] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#0b5cff]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
