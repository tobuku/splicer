import type { Metadata } from 'next'
import Link from 'next/link'
import { MAJOR_CITIES } from '@/lib/cities'
import SchemaScript from '@/components/seo/SchemaScript'

interface Props { params: Promise<{ state: string }> }

function stateNameFromSlug(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const stateName = stateNameFromSlug(state)
  return {
    title: `Cable Splicing Contractors in ${stateName}`,
    description: `Find certified telecom, fiber optic, and copper cable splicing contractors in ${stateName}. Browse the SpliceList directory for verified splice crews.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const stateName = stateNameFromSlug(stateSlug)
  const cities = MAJOR_CITIES.filter((c) => c.stateSlug === stateSlug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cable Splicing Contractors in ${stateName}`,
    areaServed: { '@type': 'State', name: stateName },
    provider: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  }

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-slate-300">Locations</Link>
            <span>/</span>
            <span className="text-slate-300">{stateName}</span>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-4">
            Cable Splicing Contractors in {stateName}
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Browse verified telecom, fiber optic, and copper cable splicing contractors throughout {stateName}.
          </p>

          <Link
            href={`/search?state=${stateSlug}`}
            className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all mb-12"
          >
            View All Contractors in {stateName}
          </Link>

          {cities.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Browse by City</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
                {cities.map((city) => (
                  <Link
                    key={`${city.city}-${city.state}`}
                    href={`/locations/${stateSlug}/${city.city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-[#0f172a] border border-slate-800 hover:border-[#0ea5e9]/40 hover:text-[#0ea5e9] text-slate-300 rounded-xl px-4 py-3 text-sm font-medium transition-all text-center"
                  >
                    {city.city}
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="text-xl font-bold text-white mb-4">Services in {stateName}</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Fiber Optic Splicing', cat: 'FIBER' },
              { label: 'Telecom Splicing', cat: 'TELECOM' },
              { label: 'Copper Cable Splicing', cat: 'COPPER' },
            ].map((item) => (
              <Link
                key={item.cat}
                href={`/search?state=${stateSlug}&category=${item.cat}`}
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                {item.label} in {stateName} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
