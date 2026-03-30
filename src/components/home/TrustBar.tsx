'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const signals = [
  { icon: '\u2713', label: 'BICSI Certified Contractors' },
  { icon: '\u2713', label: 'OSHA-Compliant Crews' },
  { icon: '\u2713', label: 'Licensed & Insured' },
  { icon: '\u2713', label: 'Nationwide Coverage' },
]

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-item', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.6,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="bg-white border-y border-[#e8e8e8]/60 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {signals.map((s, i) => (
            <div key={i} className="trust-item flex items-center gap-2">
              <span className="text-[var(--blue)] font-bold text-sm">{s.icon}</span>
              <span className="text-[#555555] text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
