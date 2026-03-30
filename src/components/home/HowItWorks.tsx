'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
  const photo1Ref = useRef<HTMLDivElement>(null)
  const photo2Ref = useRef<HTMLDivElement>(null)
  const photo3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.from('.hiw-heading', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      })

      if (!prefersReduced) {
        const photoParallax = [
          { el: photo1Ref.current, y: -50 },
          { el: photo2Ref.current, y: -30 },
          { el: photo3Ref.current, y: -70 },
        ]
        photoParallax.forEach(({ el, y }) => {
          if (!el) return
          gsap.to(el, {
            y,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        })
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-14 bg-[#f8f8f8] border-y border-[#e8e8e8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — steps */}
          <div>
            <div className="hiw-heading mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] mb-4">
                How SpliceList Works
              </h2>
              <p className="text-[#555555] text-lg">
                Connecting job owners with qualified splice crews in three steps.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="step-item flex gap-5">
                  <div className="step-num text-4xl font-black text-[#0b5cff]/20 leading-none w-12 shrink-0 tabular-nums">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[#1f1f1f] font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-[#555555] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo grid with parallax */}
          <div className="hiw-photo-grid relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div ref={photo1Ref} className="hiw-photo col-span-2 rounded-xl overflow-hidden aspect-video shadow-2xl ring-1 ring-[#e8e8e8]">
                <Image
                  src="/images/fiber/IMG_0989.jpg"
                  alt="Fiber optic splice technician"
                  width={480}
                  height={270}
                  className="w-full h-full object-cover"
                />
              </div>
              <div ref={photo2Ref} className="hiw-photo rounded-xl overflow-hidden aspect-square shadow-xl ring-1 ring-[#e8e8e8]">
                <Image
                  src="/images/copper/IMG_0024.jpg"
                  alt="Copper cable splicing"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              <div ref={photo3Ref} className="hiw-photo rounded-xl overflow-hidden aspect-square shadow-xl ring-1 ring-[#e8e8e8]">
                <Image
                  src="/images/equipment/IMG_5898.jpg"
                  alt="Splice equipment"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[#0b5cff]/5 blur-xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  )
}
