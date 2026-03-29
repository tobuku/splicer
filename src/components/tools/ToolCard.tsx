import Image from 'next/image'
import type { Tool } from '@/lib/tools'

const priceLabels: Record<string, string> = {
  '$':   'Budget-Friendly',
  '$$':  'Mid-Range',
  '$$$': 'Professional',
}

const priceColors: Record<string, string> = {
  '$':   'text-emerald-400',
  '$$':  'text-blue-400',
  '$$$': 'text-amber-400',
}

const badgeColors: Record<string, string> = {
  'Industry Standard': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Best Value':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'Top Rated':         'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Pro Choice':        'bg-purple-500/10 text-purple-400 border-purple-500/30',
  'Essential':         'bg-slate-500/10 text-slate-300 border-slate-500/30',
  'Compact':           'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'Required':          'bg-red-500/10 text-red-400 border-red-500/30',
}

interface Props { tool: Tool }

export default function ToolCard({ tool }: Props) {
  return (
    <div className={`tool-card relative flex flex-col bg-[#0f172a] border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      tool.featured
        ? 'border-[#0ea5e9]/30 hover:border-[#0ea5e9]/60 hover:shadow-[#0ea5e9]/10'
        : 'border-slate-800 hover:border-slate-600'
    }`}>
      {/* Photo */}
      {tool.image && (
        <div className="relative w-full h-36 -mx-5 -mt-5 mb-4 rounded-t-2xl overflow-hidden">
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/60" />
        </div>
      )}

      {/* Badge */}
      {tool.badge && (
        <span className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full border ${badgeColors[tool.badge] || 'bg-slate-500/10 text-slate-400 border-slate-500/30'}`}>
          {tool.badge}
        </span>
      )}

      {/* Brand */}
      <div className="text-[#0ea5e9] text-xs font-semibold uppercase tracking-wider mb-1">
        {tool.brand}
      </div>

      {/* Name */}
      <h3 className="text-white font-bold text-base leading-snug mb-3 pr-16">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
        {tool.description}
      </p>

      {/* Price range */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`font-bold text-sm ${priceColors[tool.priceRange] || 'text-slate-400'}`}>
          {tool.priceRange}
        </span>
        <span className="text-slate-600 text-xs">
          {priceLabels[tool.priceRange] || ''}
        </span>
      </div>

      {/* CTA */}
      <a
        href={tool.affiliate}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="w-full flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-400 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
      >
        View on Amazon
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    </div>
  )
}
