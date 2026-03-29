'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 1400, suffix: '+', label: 'Contractors' },
  { value: 48, suffix: '', label: 'States' },
  { value: 24, suffix: '/7', label: 'Emergency' },
  { value: 100, suffix: '%', label: 'Certified' },
]

const WIRE_YS = [12, 22, 35, 48, 61, 74, 85]

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // ── Wire draw + ambient pulse ──────────────────────────────────────────
      if (svgRef.current) {
        const lines = Array.from(svgRef.current.querySelectorAll('path.wire-line'))
        lines.forEach((line, i) => {
          const len = (line as SVGPathElement).getTotalLength()
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })

          if (prefersReduced) {
            gsap.set(line, { strokeDashoffset: 0 })
          } else {
            gsap.to(line, {
              strokeDashoffset: 0,
              duration: 2.0 + i * 0.25,
              ease: 'power2.inOut',
              delay: 0.08 * i,
              onComplete() {
                // After draw, each wire slowly pulses opacity forever
                gsap.to(line, {
                  opacity: i % 3 === 0 ? 0.28 : 0.18,
                  duration: 2.5 + i * 0.5,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  delay: i * 0.35,
                })
              },
            })
          }
        })
      }

      // ── Ambient glow orbs float ────────────────────────────────────────────
      if (!prefersReduced) {
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            y: -40,
            x: 20,
            duration: 5.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            y: 35,
            x: -25,
            duration: 7,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.8,
          })
        }
      }

      // ── Main entrance timeline ─────────────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        ...(prefersReduced ? { duration: 0 } : {}),
      })

      tl.from('.hero-badge', { opacity: 0, y: -24, duration: 0.6 })
        .from('.hero-line-1', { opacity: 0, y: 60, duration: 0.8 }, '-=0.15')
        .from('.hero-line-2', { opacity: 0, y: 60, duration: 0.8 }, '-=0.55')
        .from('.hero-sub',    { opacity: 0, y: 35, duration: 0.7 }, '-=0.45')
        .from('.hero-search-label', { opacity: 0, y: 15, duration: 0.5 }, '-=0.3')
        .from('.hero-search', { opacity: 0, y: 35, duration: 0.75 }, '-=0.3')
        .from('.hero-ctas',   { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-stat-wrap', { opacity: 0, y: 24, stagger: 0.1, duration: 0.55 }, '-=0.3')
        // Right column photos stagger in after left side settles
        .from('.hero-photo-item', {
          opacity: 0,
          y: 70,
          scale: 0.88,
          stagger: 0.18,
          duration: 1.0,
          ease: 'power4.out',
        }, '-=0.4')

      // ── Stats countup ──────────────────────────────────────────────────────
      STATS.forEach((stat, i) => {
        const el = statRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: prefersReduced ? 0 : 2.0,
          ease: 'power2.out',
          delay: prefersReduced ? 0 : 1.4 + i * 0.1,
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      })

      // ── Hero parallax on scroll ────────────────────────────────────────────
      if (!prefersReduced) {
        gsap.to('.hero-photos', {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })

        // Left column scrolls a touch slower for depth
        gsap.to('.hero-left', {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
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
        {/* Animated SVG wire pattern */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {WIRE_YS.map((y, i) => {
            const yPx = (y / 100) * 900
            const wave = i % 2 === 0 ? 6 : -6
            return (
              <path
                key={i}
                className="wire-line"
                d={`M-20,${yPx} C360,${yPx + wave} 720,${yPx - wave} 1080,${yPx + wave} L1460,${yPx}`}
                stroke="#0ea5e9"
                strokeWidth={i % 3 === 0 ? '1.5' : '1'}
                fill="none"
                opacity={i % 3 === 0 ? '0.14' : '0.08'}
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/80 via-transparent to-[#0a0f1e]/40" />

        {/* Ambient glow orbs — animated via ref */}
        <div
          ref={orb1Ref}
          className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }}
        />
        <div
          ref={orb2Ref}
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="hero-left max-w-2xl">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 text-[#0ea5e9] px-4 py-2 rounded-full text-sm font-medium mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              1,400+ Verified Contractors Nationwide
            </div>

            {/* H1 */}
            <h1 className="font-bold leading-tight mb-6">
              <span className="hero-line-1 block text-4xl sm:text-5xl lg:text-6xl text-slate-300 mb-1">
                The National Directory for
              </span>
              <span className="hero-line-2 block text-4xl sm:text-5xl lg:text-6xl text-white">
                <span className="relative inline-block text-[#0ea5e9]">
                  Cable
                  <span
                    className="absolute left-0 w-full"
                    style={{
                      height: '3px',
                      background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
                      borderRadius: '2px',
                      bottom: '-4px',
                    }}
                  />
                </span>{' '}
                Splicing Contractors
              </span>
            </h1>

            {/* Subheadline */}
            <p className="hero-sub text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Connect with vetted telecom, fiber optic, and copper cable splicing crews for commercial, residential, and emergency projects across the United States.
            </p>

            {/* Search label */}
            <p className="hero-search-label text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Find splice crews near you
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="hero-search bg-[#0f172a] border border-slate-700/60 rounded-lg flex flex-col sm:flex-row gap-0 mb-6 max-w-2xl shadow-2xl overflow-hidden"
            >
              <input
                type="text"
                placeholder="City or state..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-transparent px-5 py-4 text-white placeholder-slate-600 outline-none text-sm border-b sm:border-b-0 sm:border-r border-slate-700/60"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#0f172a] border-0 text-slate-400 px-5 py-4 text-sm outline-none cursor-pointer border-b sm:border-b-0 sm:border-r border-slate-700/60 min-w-[160px]"
              >
                <option value="">All Services</option>
                <option value="FIBER">Fiber Optic</option>
                <option value="TELECOM">Telecom</option>
                <option value="COPPER">Copper Cable</option>
              </select>
              <button
                type="submit"
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-4 font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Secondary CTAs */}
            <div className="hero-ctas flex flex-wrap gap-6 mb-16">
              <Link href="/locations" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
                Browse by State →
              </Link>
              <Link href="/services/emergency-repair" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                ⚡ Emergency Repair →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="hero-stat-wrap">
                  <div className="text-2xl sm:text-3xl font-bold text-[#0ea5e9] tabular-nums">
                    <span ref={(el) => { statRefs.current[i] = el }}>
                      0{stat.suffix}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — photo collage ─────────────────────────────── */}
          <div className="hero-photos hidden lg:grid grid-cols-2 gap-3">
            <div className="hero-photo-item col-span-2 rounded-xl overflow-hidden aspect-video shadow-2xl ring-1 ring-white/5">
              <Image
                src="/images/fiber/IMG_0794.jpg"
                alt="Fiber splice tray with completed splices"
                width={560}
                height={315}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hero-photo-item rounded-xl overflow-hidden shadow-xl ring-1 ring-white/5" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/copper/IMG_0818.jpg"
                alt="Copper cable splice"
                width={280}
                height={210}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hero-photo-item rounded-xl overflow-hidden shadow-xl ring-1 ring-white/5" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/equipment/IMG_5898.jpg"
                alt="Fusion splicer equipment"
                width={280}
                height={210}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
