import type { Metadata } from 'next'
import Image from 'next/image'
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
            <div className="inline-flex items-center gap-2 bg-[#0b5cff]/10 border border-[#0b5cff]/30 text-[#0b5cff] px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              Field-Tested Equipment
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-4">
              Cable Splicing Tools &amp; Equipment
            </h1>
            <p className="text-[#555555] text-lg max-w-2xl">
              Gear used by professional splice crews in the field. Curated by category — fusion splicers, OTDR units, fiber prep tools, copper splicing supplies, and safety equipment.
            </p>
          </div>

          {/* Field photo strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
            {[
              { src: '/images/fiber/90S Fujikura Splice Kit.jpeg', alt: 'Fujikura 90S+ fusion splicer in carry case' },
              { src: '/images/fiber/IMG_0817.JPG', alt: 'Fujikura 90S+ fusion splicer open in the field' },
              { src: '/images/fiber/IMG_5309.JPG', alt: 'Fujikura 90S+ fusion splicer on job site' },
              { src: '/images/fiber/IMG_1214.jpg', alt: 'Fujikura CT-30 high precision fiber cleaver' },
              { src: '/images/fiber/IMG_3690.jpg', alt: 'Fujikura CT-30 fiber cleaver close-up' },
              { src: '/images/fiber/IMG_1113.jpg', alt: 'JDSU T-BERD 2000 OTDR test equipment' },
            ].map((photo) => (
              <div key={photo.src} className="rounded-lg overflow-hidden aspect-square">
                <Image src={photo.src} alt={photo.alt} width={200} height={200} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>

          <ToolsPageClient categories={TOOL_CATEGORIES} tools={TOOLS} />

          {/* Affiliate disclaimer */}
          <p className="text-[#777777] text-xs text-center mt-16 border-t border-[#e8e8e8]/50 pt-6">
            Links on this page are Amazon affiliate links. SpliceList earns a small commission at no extra cost to you. Recommendations are based on industry use — not advertising agreements.
          </p>
        </div>
      </div>
    </>
  )
}
