'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { label: 'Telecom Splicing', href: '/telecom-cable-splicing' },
  { label: 'Fiber Optic', href: '/fiber-optic-splicing' },
  { label: 'Copper Cable', href: '/copper-cable-splicing' },
  { label: 'Emergency', href: '/services/emergency-repair', highlight: true },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f1e]/95 backdrop-blur-md shadow-lg shadow-black/30 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[var(--blue)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 4l4 4M4 20l4-4M20 4l-4 4M20 20l-4-4M12 2v4M12 18v4M2 12h4M18 12h4"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Splice<span className="text-[var(--blue)]">List</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                item.highlight
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                  : pathname === item.href
                  ? 'text-[var(--blue)] bg-[var(--blue)]/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.highlight && <span className="mr-1">⚡</span>}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/listings/submit"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            List Your Business
          </Link>
          <Link
            href="/search"
            className="bg-[var(--blue)] hover:bg-[var(--blue-dark)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-[var(--blue)]/20"
          >
            Find a Contractor
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f172a] border-t border-slate-800 px-4 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                item.highlight
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="block mt-3 bg-[var(--blue)] text-white px-4 py-3 rounded-lg text-sm font-semibold text-center"
          >
            Find a Contractor
          </Link>
        </div>
      )}
    </header>
  )
}
