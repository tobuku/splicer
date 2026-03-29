import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cable Splicing Blog | Industry Resources & Guides',
  description: 'Guides, cost breakdowns, and industry knowledge for cable splicing contractors, project owners, and telecom engineers.',
}

const posts = [
  {
    slug: 'fiber-optic-splicing-cost',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    title: 'Fiber Optic Splicing Cost Per Splice (2025 Guide)',
    excerpt: 'Fusion splicing typically runs $50–$150 per splice point. Here is a full breakdown of what drives cost — fiber type, access, contractor overhead, and testing.',
    date: 'March 2025',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-choose-cable-splicing-contractor',
    category: 'Hiring Guide',
    categoryColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    title: 'How to Choose a Cable Splicing Contractor',
    excerpt: 'Certifications, equipment, and local experience are the top factors. This guide walks through exactly what to verify before hiring a splice crew.',
    date: 'February 2025',
    readTime: '8 min read',
  },
  {
    slug: 'copper-vs-fiber-cable-repair',
    category: 'Copper Cable',
    categoryColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    title: 'Copper vs Fiber Cable Repair: Key Differences',
    excerpt: 'Different tools, techniques, and technician skills. Understanding the gap between copper and fiber repair saves time and prevents costly mistakes.',
    date: 'February 2025',
    readTime: '5 min read',
  },
  {
    slug: 'what-is-otdr-testing',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    title: 'What Is OTDR Testing and Why It Matters',
    excerpt: 'OTDR (Optical Time Domain Reflectometer) testing verifies every splice and finds faults in a fiber run. Learn when to require it and what to expect in the results.',
    date: 'January 2025',
    readTime: '7 min read',
  },
  {
    slug: 'fusion-splicing-vs-mechanical-splicing',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    title: 'Fusion Splicing vs Mechanical Splicing: Which Do You Need?',
    excerpt: 'Fusion splicing delivers lower loss and better long-term performance. Mechanical is faster and cheaper for certain applications. Here is when to use each.',
    date: 'January 2025',
    readTime: '6 min read',
  },
  {
    slug: 'osp-cable-splicing-basics',
    category: 'Telecom',
    categoryColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    title: 'Outside Plant Cable Splicing: What Contractors Need to Know',
    excerpt: 'OSP splicing covers aerial, buried, and direct-buried plant environments. This primer covers the tools, training, and safety requirements for OSP splicers.',
    date: 'December 2024',
    readTime: '9 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cable Splicing Resources &amp; Guides</h1>
          <p className="text-slate-400 text-lg">Industry knowledge for contractors, project owners, and telecom engineers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#0f172a] border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${post.categoryColor} mb-4 w-fit`}>
                {post.category}
              </span>
              <h2 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#0ea5e9] transition-colors flex-1">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
