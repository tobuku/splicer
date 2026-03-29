'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const signals = [
  { icon: '\u2713', label: 'BICSI Certified Contractors' },
  { icon: '\u2713', label: 'OSHA-Compliant Crews' },
  { icon: '\u2713', label: 'Licensed & Insured' },
  { icon: '\u2713', label: '24/7 Emergency Response' },
]

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-item', {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="bg-[#0d1526] border-y border-slate-800/60 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {signals.map((s, i) => (
            <div key={i} className="trust-item flex items-center gap-2">
              <span className="text-[var(--blue)] font-bold text-sm">{s.icon}</span>
              <span className="text-slate-300 text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
