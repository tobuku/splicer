import type { Metadata } from 'next'
import Link from 'next/link'
import ListingSearchWidget from '@/components/search/ListingSearchWidget'
import SchemaScript from '@/components/seo/SchemaScript'
import RecommendedTools from '@/components/tools/RecommendedTools'

export const metadata: Metadata = {
  title: 'Fiber Optic Splicing Contractors | Fusion Splicing Services',
  description:
    'Find certified fiber optic splicing contractors near you. Fusion splicing, mechanical splicing, OTDR testing, and ribbon fiber. Get quotes from verified splice crews.',
  keywords: [
    'fiber optic splicing contractors',
    'fusion splicing services',
    'fiber splicing near me',
    'OTDR testing',
    'ribbon fiber splicing',
  ],
  openGraph: {
    title: 'Fiber Optic Splicing Contractors | SpliceList',
    description:
      'Connect with certified fiber optic splicing crews for fusion splicing, OTDR testing, and emergency fiber repair.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fiber Optic Splicing Services',
  description:
    'Professional fiber optic splicing including fusion splicing, mechanical splicing, OTDR testing, and ribbon fiber work.',
  provider: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Fiber Optic Cable Splicing',
}

export default function FiberOpticSplicingPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20">

        {/* Hero */}
        <div className="bg-gradient-to-b from-emerald-900/20 to-transparent border-b border-slate-800/50 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium mb-5">
              Fiber Optic Splicing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Fiber Optic Splicing Contractors for Hire
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Connect with certified fiber optic splicing contractors across the United States. Whether you
              need fusion splicing for a new deployment, OTDR testing, or emergency fiber cut repair —
              SpliceList has verified technicians ready to quote your project.
            </p>
            <ListingSearchWidget defaultCategory="FIBER" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* What is fiber optic splicing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Is Fiber Optic Splicing?</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Fiber optic splicing is the process of permanently joining two fiber optic cables end-to-end
              to create a continuous optical path. Unlike connectorization — which uses mechanical
              terminations — splicing creates a near-seamless joint that minimizes signal loss and maximizes
              transmission performance.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              Splicing is required during cable plant builds, network expansions, fiber break repairs, and
              any situation where a continuous fiber run is needed without a connector-based patch point.
              Certified splice technicians use specialized fusion splicers, OTDR equipment, and fiber closure
              systems to complete the work to industry specification.
            </p>
            <p className="text-slate-400 leading-relaxed">
              The quality of a splice is measured in insertion loss (dB) and return loss (dB). A well-executed
              fusion splice typically introduces less than 0.1 dB of loss — far below the 0.75 dB threshold
              allowed under TIA-568 standards. Poor splicing technique, dirty fiber ends, or mismatched fiber
              types can cause losses that degrade signal over long distances and fail OTDR acceptance testing.
            </p>
          </section>

          {/* Types */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Fusion vs. Mechanical Splicing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: 'Fusion Splicing',
                  color: 'emerald',
                  points: [
                    'Uses electric arc to weld fibers together',
                    'Lowest splice loss: 0.01–0.1 dB typical',
                    'Industry standard for OSP and long-haul',
                    'Requires fusion splicer equipment',
                    'Best for permanent, high-performance joints',
                  ],
                },
                {
                  type: 'Mechanical Splicing',
                  color: 'blue',
                  points: [
                    'Mechanical alignment sleeve with index gel',
                    'Higher loss: 0.2–0.5 dB typical',
                    'Faster — no splicer equipment needed',
                    'Good for emergency field repairs',
                    'Suitable for lower-bandwidth applications',
                  ],
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className={`bg-[#0f172a] border border-${item.color}-500/20 rounded-xl p-5`}
                >
                  <h3 className={`text-${item.color}-400 font-bold text-lg mb-4`}>{item.type}</h3>
                  <ul className="space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="text-slate-400 text-sm flex items-start gap-2">
                        <span className={`text-${item.color}-400 mt-0.5`}>&#8594;</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Common Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-5">Common Fiber Splicing Services</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Fiber splicing contractors handle a wide range of project types — from single-strand emergency
              repairs to mass-splicing thousands of fibers in a new ribbon cable deployment. The following
              services represent the most frequently requested work on SpliceList:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Single-Mode Fusion Splicing',
                'Multi-Mode Fusion Splicing',
                'Ribbon Fiber Splicing',
                'OTDR Acceptance Testing',
                'Splice Enclosure Installation',
                'Aerial Fiber Splicing',
                'Underground Fiber Repair',
                'FTTX / FTTH Splicing',
                'Emergency Fiber Cut Repair',
              ].map((s) => (
                <div
                  key={s}
                  className="bg-[#0f172a] border border-slate-800 rounded-lg px-4 py-3 text-slate-300 text-sm"
                >
                  {s}
                </div>
              ))}
            </div>
          </section>

          {/* When to hire */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">When Do You Need a Fiber Splicing Contractor?</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Fiber splicing is specialized work that requires equipment most organizations do not own and
              skills that take years to develop. Here are the most common situations that call for a
              professional splice crew:
            </p>
            <ul className="space-y-4">
              {[
                {
                  title: 'New Construction and Cable Plant Builds',
                  desc: 'During large fiber deployments, splice crews follow cable installation teams to terminate sections, build splice points, and test end-to-end loss budgets before the system goes live.',
                },
                {
                  title: 'Fiber Break and Emergency Repair',
                  desc: 'A backhoe strike, vehicle collision, or weather event can sever an underground or aerial fiber run. A qualified splice crew can restore service within hours using OTDR fault location and rapid fusion splicing.',
                },
                {
                  title: 'Network Expansion and Adds',
                  desc: 'Connecting a new building, adding a splice point to extend a run, or tapping into an existing cable plant for additional capacity all require splice work in the field.',
                },
                {
                  title: 'OTDR Acceptance Testing',
                  desc: 'Before accepting a newly installed cable plant from a contractor, an independent splice technician with an OTDR can verify every splice point and connector meets the project loss budget.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-4">
                  <span className="text-emerald-400 mt-0.5 shrink-0">&#8594;</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-slate-400 text-sm">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* What to look for */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What to Look for in a Fiber Splicing Contractor
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Fiber optic splicing requires precision work with expensive equipment. Choosing the wrong
              contractor can result in high splice losses, failed OTDR tests, and costly remediation.
              Here is what to verify before hiring:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'BICSI or FOA Certification',
                  desc: 'Fiber Optic Association (FOA) CFOT certification and BICSI credentials indicate formal training in fiber handling and splicing standards.',
                },
                {
                  title: 'Fusion Splicer Equipment',
                  desc: 'Ask what splicer model they use. Name brands like Fujikura, Sumitomo, or Fitel indicate a professional operation.',
                },
                {
                  title: 'OTDR Testing Capability',
                  desc: 'Every splice should be verified with an OTDR (Optical Time Domain Reflectometer). Contractors who skip this step are cutting corners.',
                },
                {
                  title: 'Experience with Your Fiber Type',
                  desc: 'Single-mode, multi-mode, bend-insensitive, and ribbon fiber each have different handling requirements. Verify relevant experience.',
                },
                {
                  title: 'Closure and Documentation',
                  desc: 'A quality contractor provides a splice tray layout diagram and OTDR trace records for every closure completed.',
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-4"
                >
                  <span className="text-emerald-400 mt-0.5 shrink-0">&#10003;</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-slate-400 text-sm">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How much does fiber optic splicing cost?',
                  a: 'Fusion splicing typically costs $50–$150 per splice point. Emergency calls, remote locations, and confined-space work add to that. Mass-splicing ribbon fiber in a new build is often priced per-fiber or per-closure rather than per-splice.',
                },
                {
                  q: 'How long does fiber splicing take?',
                  a: 'An experienced technician can complete a fusion splice in 2–5 minutes per fiber once set up. A 12-fiber closure might take 1–3 hours including setup, splicing, OTDR testing, and closure sealing.',
                },
                {
                  q: 'Can fiber be repaired in the field after a cut?',
                  a: 'Yes. Emergency fiber repair typically involves locating the break with an OTDR, excavating if underground, cutting and re-preparing the fiber ends, fusion splicing, and re-sealing the closure. Most experienced crews can restore service within a few hours of arriving on site.',
                },
                {
                  q: 'What is the difference between single-mode and multi-mode fiber splicing?',
                  a: 'Single-mode fiber (SMF) has a much smaller core (8–10 microns) than multi-mode (50–62.5 microns), requiring tighter cleave and alignment tolerances. Most outside plant and long-haul work uses single-mode. Multi-mode is common in data centers and shorter enterprise runs. Both are routinely fusion spliced, but SMF demands more precise equipment and technique.',
                },
                {
                  q: 'Do I need OTDR testing after splicing?',
                  a: 'Yes, always. OTDR testing documents every event on the fiber — splices, connectors, bends, and breaks — and verifies that splice losses meet spec. Most network owners and carriers require OTDR trace records before accepting a completed cable plant.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-emerald-900/20 to-[#0ea5e9]/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Find a Fiber Splicing Crew?</h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Search SpliceList for verified fiber optic splicing contractors in your area. Filter by service
              type, location, and emergency availability.
            </p>
            <Link
              href="/search?category=FIBER"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Search Fiber Contractors
            </Link>
          </section>

          {/* Internal links */}
          <section className="border-t border-slate-800 pt-10">
            <h2 className="text-xl font-bold text-white mb-5">Related Splicing Services</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/telecom-cable-splicing"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:border-blue-500/40 hover:text-blue-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Telecom Cable Splicing &#8594;
              </Link>
              <Link
                href="/copper-cable-splicing"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:border-amber-500/40 hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Copper Cable Splicing &#8594;
              </Link>
              <Link
                href="/search"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Search All Contractors &#8594;
              </Link>
            </div>
          </section>
        </div>
      </div>
      <RecommendedTools splicingCategory="FIBER" />
    </>
  )
}
