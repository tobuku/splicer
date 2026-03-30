import Link from 'next/link'
import { getFeaturedTools, getToolsForCategory } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import ToolCard from '@/components/tools/ToolCard'

interface Props {
  splicingCategory?: 'FIBER' | 'TELECOM' | 'COPPER'
  limit?: number
}

export default function RecommendedTools({ splicingCategory, limit = 4 }: Props) {
  const tools: Tool[] = splicingCategory
    ? getToolsForCategory(splicingCategory).slice(0, limit)
    : getFeaturedTools().slice(0, limit)

  if (tools.length === 0) return null

  return (
    <section className="py-16 border-t border-[#e8e8e8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-1">Recommended Equipment</h2>
            <p className="text-[#555555] text-sm">
              {splicingCategory
                ? `Tools used by professional ${splicingCategory === 'FIBER' ? 'fiber optic' : splicingCategory === 'COPPER' ? 'copper cable' : 'telecom'} splice crews.`
                : 'Field-tested gear used by professional splice crews.'}
            </p>
          </div>
          <Link
            href="/tools"
            className="text-[#0b5cff] hover:text-[#0946cc] text-sm font-semibold transition-colors hidden sm:block whitespace-nowrap"
          >
            See All Tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-4 sm:hidden">
          <Link href="/tools" className="text-[#0b5cff] text-sm font-semibold">
            See All Tools &rarr;
          </Link>
        </div>

        <p className="text-[#555555] text-xs mt-6">
          Affiliate links — SpliceList earns a small commission at no cost to you.
        </p>
      </div>
    </section>
  )
}
