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

          {/* Right side — field photo grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="col-span-2 rounded-lg overflow-hidden aspect-video">
                <Image src="/images/fiber/IMG_0989.jpg" alt="Fiber optic splice technician" width={480} height={270} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden aspect-square">
                <Image src="/images/copper/IMG_0024.jpg" alt="Copper cable splicing" width={240} height={240} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden aspect-square">
                <Image src="/images/equipment/IMG_1046.jpg" alt="Splice equipment" width={240} height={240} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[#0ea5e9]/5 blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
