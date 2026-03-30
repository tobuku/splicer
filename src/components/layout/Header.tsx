'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const nav = [
  { label: 'Telecom Splicing', href: '/telecom-cable-splicing' },
  { label: 'Fiber Optic', href: '/fiber-optic-splicing' },
  { label: 'Copper Cable', href: '/copper-cable-splicing' },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // GSAP animate mobile menu open/close
  useEffect(() => {
    const el = mobileMenuRef.current
    if (!el) return
    if (open) {
      gsap.fromTo(
        el,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power3.out' }
      )
    } else {
      gsap.to(el, { y: -8, opacity: 0, duration: 0.18, ease: 'power2.in' })
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent py-5'
          : 'bg-white/96 backdrop-blur-md shadow-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/splicelist_logo.jpg"
            alt="SpliceList"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group/navlink ${
                  transparent
                    ? isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    : isActive ? 'text-[#0b5cff]' : 'text-[#555555] hover:text-[#1f1f1f]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-px bg-[#0b5cff] transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover/navlink:opacity-100 group-hover/navlink:scale-x-100'
                  }`}
                  style={{ transformOrigin: 'left center' }}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/listings/submit"
            className={`text-sm transition-colors duration-200 ${transparent ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#1f1f1f]'}`}
          >
            List Your Business
          </Link>
          <Link
            href="/search"
            className="bg-[#0b5cff] hover:bg-[#0946cc] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(11,92,255,0.4)] hover:shadow-[0_0_28px_rgba(11,92,255,0.55)]"
          >
            Find a Contractor
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${transparent ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#1f1f1f]'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — always rendered, animated with GSAP */}
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-white border-t border-[#e8e8e8] px-4 py-4 space-y-1"
        style={{ display: open ? 'block' : 'none', opacity: 0 }}
        aria-hidden={!open}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              pathname === item.href
                ? 'text-[#0b5cff] bg-[#0b5cff]/10'
                : 'text-[#555555] hover:text-[#1f1f1f] hover:bg-[#f5f5f5]'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div className="pt-2 border-t border-[#e8e8e8] mt-2 space-y-2">
          <Link
            href="/listings/submit"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm text-[#555555] hover:text-[#1f1f1f] hover:bg-[#f5f5f5] transition-colors"
          >
            List Your Business
          </Link>
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="block bg-[#0b5cff] text-white px-4 py-3 rounded-lg text-sm font-semibold text-center shadow-[0_0_16px_rgba(11,92,255,0.35)]"
          >
            Find a Contractor
          </Link>
        </div>
      </div>
    </header>
  )
}
