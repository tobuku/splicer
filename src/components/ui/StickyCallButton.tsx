'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const SESSION_KEY = 'splicelist_sticky_dismissed'

export default function StickyCallButton() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shownRef = useRef(false)

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setDismissed(true)
    }
  }, [])

  // Scroll listener — show after 600px
  useEffect(() => {
    if (dismissed) return

    function onScroll() {
      if (window.scrollY > 600 && !shownRef.current) {
        shownRef.current = true
        setVisible(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  // GSAP animate in when visible becomes true
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (visible) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }, [visible])

  function handleDismiss() {
    const el = containerRef.current
    sessionStorage.setItem(SESSION_KEY, '1')
    if (el) {
      gsap.to(el, {
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setDismissed(true),
      })
    } else {
      setDismissed(true)
    }
  }

  if (!visible || dismissed) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      style={{ opacity: 0 }}
    >
      <Link
        href="/search"
        className="flex items-center gap-2 bg-[#0b5cff] hover:bg-[#0946cc] text-white font-semibold text-sm px-5 py-3 rounded-full shadow-xl transition-colors duration-200 whitespace-nowrap"
        title="Find Contractors"
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <span className="sm:inline hidden">Find Contractors</span>
      </Link>
      <button
        onClick={handleDismiss}
        className="self-center w-6 h-6 rounded-full bg-[#eeeeee] hover:bg-gray-300 text-[#555555] hover:text-[#1f1f1f] text-xs flex items-center justify-center transition-colors duration-200 shadow-md"
        aria-label="Dismiss"
        title="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
