import type { Metadata } from 'next'
import { TOOL_CATEGORIES, TOOLS } from '@/lib/tools'
import ToolsPageClient from '@/components/tools/ToolsPageClient'
import SchemaScript from '@/components/seo/SchemaScript'

export const metadata: Metadata = {
  title: 'Cable Splicing Tools & Equipment | SpliceList',
  description: 'Recommended tools and equipment for fiber optic and copper cable splicing professionals. Fusion splicers, OTDR units, fiber cleavers, and splice closures.',
  keywords: ['fusion splicer', 'OTDR', 'fiber cleaver', 'cable splicing tools', 'fiber optic equipment', 'copper splicing tools'],
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cable Splicing Tools & Equipment',
  description: 'Recommended tools for fiber optic and copper cable splicing professionals',
  url: 'https://splicelist.com/tools',
}

export default function ToolsPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 text-[#0ea5e9] px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              Field-Tested Equipment
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Cable Splicing Tools &amp; Equipment
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Gear used by professional splice crews in the field. Curated by category — fusion splicers, OTDR units, fiber prep tools, copper splicing supplies, and safety equipment.
            </p>
          </div>

          <ToolsPageClient categories={TOOL_CATEGORIES} tools={TOOLS} />

          {/* Affiliate disclaimer */}
          <p className="text-slate-600 text-xs text-center mt-16 border-t border-slate-800/50 pt-6">
            Links on this page are Amazon affiliate links. SpliceList earns a small commission at no extra cost to you. Recommendations are based on industry use — not advertising agreements.
          </p>
        </div>
      </div>
    </>
  )
}
