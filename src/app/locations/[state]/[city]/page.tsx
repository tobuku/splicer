import type { Metadata } from 'next'
import Link from 'next/link'
import { MAJOR_CITIES } from '@/lib/cities'
import ListingSearchWidget from '@/components/search/ListingSearchWidget'
import SchemaScript from '@/components/seo/SchemaScript'

interface Props { params: Promise<{ state: string; city: string }> }

function titleCase(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateStaticParams() {
  return MAJOR_CITIES.map((c) => ({
    state: c.stateSlug,
    city: c.city.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params
  const cityName = titleCase(city)
  const stateName = titleCase(state)
  return {
    title: `Cable Splicing Contractors in ${cityName}, ${stateName}`,
    description: `Find certified fiber optic, telecom, and copper cable splicing contractors in ${cityName}, ${stateName}. Get quotes from verified local splice crews for commercial and emergency projects.`,
    keywords: [
      `fiber optic splicing ${cityName}`,
      `cable splicing contractors ${cityName}`,
      `telecom splicing ${cityName} ${stateName}`,
      `copper cable splicing ${cityName}`,
    ],
  }
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params
  const cityName = titleCase(citySlug)
  const stateName = titleCase(stateSlug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cable Splicing Contractors in ${cityName}, ${stateName}`,
    description: `Professional fiber optic, telecom, and copper cable splicing services in ${cityName}, ${stateName}.`,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: { '@type': 'State', name: stateName },
    },
    provider: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  }

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#777777] mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#555555]">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-[#555555]">Locations</Link>
            <span>/</span>
            <Link href={`/locations/${stateSlug}`} className="hover:text-[#555555]">{stateName}</Link>
            <span>/</span>
            <span className="text-[#555555]">{cityName}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] mb-4 leading-tight">
            Fiber Optic &amp; Cable Splicing Contractors in {cityName}, {stateName}
          </h1>

          <p className="text-[#555555] text-lg leading-relaxed mb-8">
            SpliceList connects project owners, carriers, and general contractors with certified cable splicing crews serving {cityName} and the surrounding {stateName} metro area.
          </p>

          <div className="mb-10">
            <ListingSearchWidget defaultCategory="" />
          </div>

          <div className="space-y-8 text-[#555555] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">
                Cable Splicing Services in {cityName}
              </h2>
              <p>
                {cityName} is a hub for telecommunications infrastructure, with active fiber deployments, legacy copper plant maintenance, and ongoing OSP construction throughout the metro area. Contractors in the {cityName} market work across a range of environments — from underground conduit runs and aerial strand splicing to central office connections and fiber-to-the-premises buildouts.
              </p>
              <p className="mt-3">
                Whether your project is a new fiber deployment requiring precision fusion splicing, a copper plant repair in an aging neighborhood, or an emergency fiber cut restoration, SpliceList helps you find the right crew with the right certifications for the job.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">
                Fiber Optic Splicing in {cityName}, {stateName}
              </h2>
              <p>
                Fiber optic splicing demand in {cityName} is driven by FTTX expansion, dark fiber leasing, carrier backbone upgrades, and municipal broadband initiatives. Local contractors offer fusion splicing, OTDR acceptance testing, ribbon fiber splicing, and splice closure installation. Most experienced crews in the area work with both single-mode and multi-mode fiber.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">
                Copper &amp; Telecom Splicing in {cityName}
              </h2>
              <p>
                Legacy copper plant remains active throughout {cityName} for telephone service, DSL, and low-voltage applications. OSP plant splicers handle buried cable repairs, pedestal and vault work, and central office cross-connect terminations. Many local telecom splicers are cross-trained on fiber as well, offering hybrid service for transition projects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">Emergency Cable Repair in {cityName}</h2>
              <p>
                Cable cuts, storm damage, and excavation strikes require fast response. Several contractors in the {cityName} area offer 24/7 emergency splicing services with rapid mobilization. These crews carry portable fusion splicers, OTDR equipment, and closure hardware to restore service on-site without waiting for a material delivery.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-[#e8e8e8] pt-8">
            <h3 className="text-[#1f1f1f] font-semibold mb-4">Related Pages</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/locations/${stateSlug}`}
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:text-[#0b5cff] px-4 py-2 rounded-lg text-sm transition-all"
              >
                All Contractors in {stateName}
              </Link>
              <Link
                href="/fiber-optic-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:text-emerald-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Fiber Optic Splicing
              </Link>
              <Link
                href="/telecom-cable-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:text-blue-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Telecom Cable Splicing
              </Link>
              <Link
                href="/copper-cable-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Copper Cable Splicing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
