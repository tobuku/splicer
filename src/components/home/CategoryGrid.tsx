'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: 'Telecom Cable Splicing',
    href: '/telecom-cable-splicing',
    borderColor: 'border-blue-500/30',
    hoverShadow: '0 0 0 2px rgba(59,130,246,0.5)',
    accentColor: '#3b82f6',
    iconColor: 'text-blue-400',
    accentClass: 'text-blue-400',
    bgAccent: 'bg-blue-500/5',
    description:
      'Certified technicians for telecommunications infrastructure splicing, backbone connections, and network buildouts.',
    services: ['OSP Plant Splicing', 'Central Office Connections', 'DSLAM / FTTX Splicing', 'Splicing Vault Work'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 12v3M8 12h8" />
      </svg>
    ),
  },
  {
    title: 'Fiber Optic Splicing',
    href: '/fiber-optic-splicing',
    borderColor: 'border-emerald-500/30',
    hoverShadow: '0 0 0 2px rgba(16,185,129,0.5)',
    accentColor: '#10b981',
    iconColor: 'text-emerald-400',
    accentClass: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/5',
    description:
      'Precision fusion and mechanical splicing for single-mode, multi-mode, and ribbon fiber deployments.',
    services: ['Fusion Splicing', 'Mechanical Splicing', 'OTDR Testing', 'Ribbon Fiber Splicing'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8v4l3 3M2 12h4M18 12h4M12 2v4M12 18v4" />
      </svg>
    ),
  },
  {
    title: 'Copper Cable Splicing',
    href: '/copper-cable-splicing',
    borderColor: 'border-amber-500/30',
    hoverShadow: '0 0 0 2px rgba(245,158,11,0.5)',
    accentColor: '#f59e0b',
    iconColor: 'text-amber-400',
    accentClass: 'text-amber-400',
    bgAccent: 'bg-amber-500/5',
    description:
      'Underground and aerial copper cable splicing for telephone, DSL, and low-voltage infrastructure.',
    services: ['Telephone Line Splicing', 'Underground Copper Repair', 'Buried Cable Splicing', 'Pedestal Work'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M4 12h16M4 6l4 6-4 6M20 6l-4 6 4 6" />
      </svg>
    ),
  },
]

export default function CategoryGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const headingLineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingLineRef.current) {
        const len = headingLineRef.current.getTotalLength?.() ?? 200
        gsap.set(headingLineRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(headingLineRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%' },
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Left-aligned heading with blue left border */}
      <div className="mb-8">
        <div className="cat-heading border-l-4 border-[#0b5cff] pl-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] mb-2">
            Splicing Services by Category
          </h2>
          <p className="text-[#555555] text-lg max-w-2xl">
            Find contractors specialized in your specific cabling infrastructure and project requirements.
          </p>
        </div>
        {/* Decorative animated line under heading */}
        <div className="mt-6 ml-5">
          <svg width="220" height="4" viewBox="0 0 220 4" className="overflow-visible" aria-hidden="true">
            <line
              ref={headingLineRef}
              x1="0"
              y1="2"
              x2="220"
              y2="2"
              stroke="#0b5cff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`cat-card group relative bg-white border ${cat.borderColor} rounded-lg p-6 overflow-hidden transition-all duration-300 ${cat.bgAccent}`}
            style={{
              ['--hover-shadow' as string]: cat.hoverShadow,
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = cat.hoverShadow
              ;(e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = ''
              ;(e.currentTarget as HTMLElement).style.filter = ''
            }}
          >
            {/* Top accent line */}
            <span
              className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
              style={{ background: cat.accentColor, opacity: 0.5 }}
              aria-hidden="true"
            />

            <div className={`${cat.iconColor} mb-4`}>{cat.icon}</div>

            <h3 className="text-xl font-bold text-[#1f1f1f] mb-3 group-hover:text-[#0b5cff] transition-colors duration-200">
              {cat.title}
            </h3>

            <p className="text-[#555555] text-sm leading-relaxed mb-5">{cat.description}</p>

            <ul className="space-y-2 mb-5">
              {cat.services.map((s) => (
                <li key={s} className={`flex items-center gap-2 text-[#555555] text-sm`}>
                  <span className={`${cat.accentClass} text-base leading-none select-none`} aria-hidden="true">
                    ›
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <div
              className={`${cat.accentClass} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200`}
            >
              Browse Contractors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}
