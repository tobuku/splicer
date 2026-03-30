'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    slug: 'fiber-optic-splicing-cost',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10',
    title: 'Fiber Optic Splicing Cost Per Splice (2025 Guide)',
    excerpt:
      'Fusion splicing typically runs $50\u2013$150 per splice point depending on fiber type, access difficulty, and contractor. Here is what drives the cost.',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-choose-cable-splicing-contractor',
    category: 'Telecom',
    categoryColor: 'text-blue-400 bg-blue-400/10',
    title: 'How to Choose a Cable Splicing Contractor',
    excerpt:
      'Certifications, equipment, and local experience matter. This guide walks you through what to verify before hiring a splice crew for your project.',
    readTime: '8 min read',
  },
  {
    slug: 'copper-vs-fiber-cable-repair',
    category: 'Copper',
    categoryColor: 'text-amber-400 bg-amber-400/10',
    title: 'Copper vs Fiber Cable Repair: Key Differences',
    excerpt:
      'Copper and fiber require completely different tooling, techniques, and technician skill sets. Understanding the difference saves time and money.',
    readTime: '5 min read',
  },
]

export default function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-heading', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="blog-heading flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-[#1f1f1f] mb-2">Cable Splicing Resources</h2>
          <p className="text-[#555555]">Industry knowledge for contractors and project owners.</p>
        </div>
        <Link
          href="/blog"
          className="text-[var(--blue)] hover:text-[var(--blue-dark)] text-sm font-semibold transition-colors hidden sm:block"
        >
          All Articles &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card group bg-white border border-[#e8e8e8] rounded-2xl p-6 hover:border-[#e0e0e0] transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor} mb-4 w-fit`}
            >
              {post.category}
            </span>
            <h3 className="text-[#1f1f1f] font-bold text-lg leading-snug mb-3 group-hover:text-[var(--blue)] transition-colors flex-1">
              {post.title}
            </h3>
            <p className="text-[#555555] text-sm leading-relaxed mb-5">{post.excerpt}</p>
            <div className="text-[#777777] text-xs">{post.readTime}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
