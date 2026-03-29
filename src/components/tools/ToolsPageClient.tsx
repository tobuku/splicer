'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Tool } from '@/lib/tools'
import ToolCard from '@/components/tools/ToolCard'

interface Category { id: string; label: string }

interface Props {
  categories: Category[]
  tools: Tool[]
}

export default function ToolsPageClient({ categories, tools }: Props) {
  const [active, setActive] = useState('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'all' ? tools : tools.filter(t => t.category === active)

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.querySelectorAll('.tool-card'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' }
    )
  }, [active])

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            active === 'all'
              ? 'bg-[#0ea5e9] text-white'
              : 'bg-[#0f172a] border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
          }`}
        >
          All Equipment
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === cat.id
                ? 'bg-[#0ea5e9] text-white'
                : 'bg-[#0f172a] border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">No tools in this category yet.</div>
      )}
    </div>
  )
}
