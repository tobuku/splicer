'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Search Your Area',
    desc: 'Enter your city or state and select a service type — telecom, fiber optic, or copper cable splicing.',
  },
  {
    num: '02',
    title: 'Compare Contractors',
    desc: 'Review verified profiles including certifications, service areas, equipment, and customer reviews.',
  },
  {
    num: '03',
    title: 'Request a Quote',
    desc: 'Submit a lead form directly to the contractor. Get a response fast for standard or emergency projects.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-item', {
        opacity: 0,
        x: -40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-[#060c18] border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How SpliceList Works
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Connecting job owners with qualified splice crews in three steps.
            </p>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="step-item flex gap-5">
                  <div className="text-4xl font-black text-[var(--blue)]/20 leading-none w-12 shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side image placeholder */}
          <div className="relative hidden lg:block">
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-[#0f172a] border border-slate-700/50 overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 mx-auto mb-4 opacity-40"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="1"
                >
                  <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="60" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="30" />
                  <line x1="10" y1="100" x2="190" y2="100" />
                  <line x1="100" y1="10" x2="100" y2="190" />
                  <circle cx="100" cy="100" r="5" fill="#0ea5e9" />
                  <circle cx="160" cy="100" r="4" fill="#0ea5e9" opacity="0.6" />
                  <circle cx="40" cy="100" r="4" fill="#0ea5e9" opacity="0.6" />
                  <circle cx="100" cy="40" r="4" fill="#0ea5e9" opacity="0.6" />
                </svg>
                <p className="text-slate-500 text-sm">
                  Place your field photos in
                  <br />
                  <code className="text-slate-400">public/images/</code>
                </p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[var(--blue)]/5 blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
