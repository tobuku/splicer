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
    glowColor: 'shadow-blue-500/10',
    iconColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
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
    glowColor: 'shadow-emerald-500/10',
    iconColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
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
    glowColor: 'shadow-amber-500/10',
    iconColor: 'text-amber-400',
    dotColor: 'bg-amber-400',
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-card', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
      gsap.from('.emergency-card', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.emergency-card',
          start: 'top 85%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Splicing Services by Category
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Find contractors specialized in your specific cabling infrastructure and project requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`cat-card group relative bg-[#0f172a] border ${cat.borderColor} rounded-2xl p-6 hover:shadow-xl ${cat.glowColor} transition-all duration-300 hover:-translate-y-1 ${cat.bgAccent}`}
          >
            <div className={`${cat.iconColor} mb-4`}>{cat.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--blue)] transition-colors">
              {cat.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{cat.description}</p>
            <ul className="space-y-2">
              {cat.services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                  {s}
                </li>
              ))}
            </ul>
            <div className={`mt-5 ${cat.iconColor} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}>
              Browse Contractors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Emergency card */}
      <Link
        href="/services/emergency-repair"
        className="emergency-card group flex flex-col sm:flex-row items-center gap-6 bg-amber-500/5 border border-amber-500/30 rounded-2xl p-6 hover:bg-amber-500/10 transition-all duration-300"
      >
        <div className="text-amber-400 shrink-0">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-amber-400 mb-1">
            Emergency Cable Repair &mdash; 24/7 Response
          </h3>
          <p className="text-slate-400 text-sm">
            Downed lines, fiber cuts, flood damage. Find contractors with emergency response capabilities available now.
          </p>
        </div>
        <div className="text-amber-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
          Find Emergency Help
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </section>
  )
}
