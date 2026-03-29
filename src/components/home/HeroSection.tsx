'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.6 })
        .from('.hero-h1', { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from('.hero-search', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (category) params.set('category', category)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0f1e]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/30 via-transparent to-[#0a0f1e]" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--blue)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-[var(--blue)]/10 border border-[var(--blue)]/30 text-[var(--blue)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--blue)] animate-pulse" />
            The National Cable Splicing Contractor Directory
          </div>

          {/* H1 */}
          <h1 className="hero-h1 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Find Certified{' '}
            <span className="text-[var(--blue)]">Cable Splicing</span>{' '}
            Contractors Near You
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
            Connect with vetted telecom, fiber optic, and copper cable splicing crews for commercial, residential, and emergency projects across the United States.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hero-search bg-[#0f172a]/80 backdrop-blur border border-slate-700/50 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-6 max-w-2xl shadow-2xl"
          >
            <input
              type="text"
              placeholder="City or State..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 outline-none text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#1e293b] border border-slate-700 text-slate-300 px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="">All Services</option>
              <option value="FIBER">Fiber Optic</option>
              <option value="TELECOM">Telecom</option>
              <option value="COPPER">Copper Cable</option>
            </select>
            <button
              type="submit"
              className="bg-[var(--blue)] hover:bg-[var(--blue-dark)] text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[var(--blue)]/25 whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Secondary CTAs */}
          <div className="hero-ctas flex flex-wrap gap-4 mb-16">
            <Link
              href="/locations"
              className="text-slate-400 hover:text-[var(--blue)] text-sm transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Browse by State
            </Link>
            <Link
              href="/services/emergency-repair"
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency Repair
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Contractors' },
              { value: '48', label: 'States Covered' },
              { value: '24/7', label: 'Emergency' },
              { value: '100%', label: 'Verified' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat">
                <div className="text-2xl font-bold text-[var(--blue)]">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
