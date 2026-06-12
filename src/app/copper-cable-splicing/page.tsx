import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ListingSearchWidget from '@/components/search/ListingSearchWidget'
import SchemaScript from '@/components/seo/SchemaScript'

export const metadata: Metadata = {
  title: 'Copper Cable Splicing Contractors, Underground Cable Repair',
  description:
    'Find certified copper cable splicing contractors for 25-pair, 50-pair, and large-count buried cable repair, pedestal work, and telephone line splicing. Verified crews nationwide.',
  keywords: [
    'copper cable splicing',
    'underground copper cable repair',
    'telephone line splicing',
    '25-pair splicing',
    'buried copper cable repair',
    'pedestal cable splicing',
  ],
  openGraph: {
    title: 'Copper Cable Splicing Contractors, SpliceList',
    description:
      'Connect with verified copper cable splicing crews for buried cable repair, pedestal work, 25-pair to 2400-pair cable, and emergency telephone line restoration.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Copper Cable Splicing Services',
  description:
    'Professional copper cable splicing for underground repair, aerial cable, pedestal termination, and large-count telephone cable restoration.',
  provider: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Copper Telecommunications Cable Splicing',
}

export default function CopperCableSplicingPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20">

        {/* Hero */}
        <div className="bg-gradient-to-b from-amber-900/20 to-transparent border-b border-[#e8e8e8]/50 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full text-xs font-medium mb-5">
              Copper Cable Splicing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-5 leading-tight">
              Copper Cable Splicing Contractors
            </h1>
            <p className="text-lg text-[#555555] mb-8 leading-relaxed">
              Connect with certified copper cable splicing contractors across the United States. Whether you
              need buried cable repair, pedestal termination, 25-pair through 2400-pair splice work, or
              emergency telephone line restoration — SpliceList has verified splice crews ready to quote
              your project.
            </p>
            <ListingSearchWidget defaultCategory="COPPER" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* Photo gallery */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { src: '/images/copper/IMG_0024.jpg', alt: 'Copper cable splice work' },
                { src: '/images/copper/IMG_0673.jpg', alt: 'Multi-pair copper splicing' },
                { src: '/images/copper/IMG_0818.jpg', alt: 'Underground copper repair' },
                { src: '/images/copper/IMG_0820.jpg', alt: 'Pedestal cable work' },
              ].map((photo) => (
                <div key={photo.src} className="rounded-lg overflow-hidden aspect-square">
                  <Image src={photo.src} alt={photo.alt} width={240} height={240} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* What is copper cable splicing */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">What Is Copper Cable Splicing?</h2>
            <p className="text-[#555555] leading-relaxed mb-4">
              Copper cable splicing is the process of permanently joining multi-pair copper telecommunications
              cables using a combination of individual wire splices, insulation displacement connectors (IDCs),
              and weatherproof closure systems. Unlike fiber splicing — which joins glass strands using heat —
              copper splicing involves mechanically connecting individual copper pairs with precisely matched
              wire connectors and protecting the joint with a pressurized or gel-filled enclosure.
            </p>
            <p className="text-[#555555] leading-relaxed mb-4">
              Copper cable plant remains a significant part of the telecommunications infrastructure across
              the United States. Despite widespread fiber deployment, millions of premises are still served
              via copper pairs that originate from central offices and remote terminals, traveling through
              buried cable, aerial strand, and pedestals to reach homes and businesses.
            </p>
            <p className="text-[#555555] leading-relaxed">
              Copper splice work requires intimate knowledge of pair identification, cable color codes,
              bonding and grounding standards, and pressurization systems that protect the cable from
              moisture intrusion. A poor copper splice is one of the leading causes of telephone service
              degradation — crosstalk, high resistance, and wet contacts all trace back to substandard
              splice work.
            </p>
          </section>

          {/* Cable types and environments */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">Copper Cable Types and Work Environments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: 'Underground and Direct-Buried',
                  color: 'amber',
                  points: [
                    'PE-insulated, jelly-filled cable (ERJT, EARJT)',
                    'Splice closures with pressurization capability',
                    'Cable sheaths bonded to ground at each splice',
                    'Excavation and locating required for buried work',
                    'Most common environment for large-count repairs',
                  ],
                },
                {
                  type: 'Aerial and Lashed Cable',
                  color: 'slate',
                  points: [
                    'PE or PIC cable lashed to strand wire',
                    'Aerial splice closures (reenterable or heat-shrink)',
                    'Fall protection and aerial lift requirements',
                    'Bonding to strand and anchor hardware',
                    'Common in rural and older suburban cable plant',
                  ],
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className={`bg-white border border-${item.color}-500/20 rounded-xl p-5`}
                >
                  <h3 className={`text-${item.color}-400 font-bold text-lg mb-4`}>{item.type}</h3>
                  <ul className="space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="text-[#555555] text-sm flex items-start gap-2">
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
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-5">Common Copper Splicing Services</h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              Copper splice contractors handle the full range of outside plant work on existing telephone
              cable infrastructure — from single-pair pair-gain assignments to large-count cable breaks
              involving hundreds of pairs. The following are the most frequently requested copper splicing
              services on SpliceList:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                '25-Pair and 50-Pair Splicing',
                '100 to 2400-Pair Splicing',
                'Buried Cable Break Repair',
                'Aerial Cable Splicing',
                'Pedestal Termination',
                'Cross-Box Pair Assignment',
                'Cable Pressurization Repair',
                'Bonding and Grounding',
                'Emergency Telephone Restoration',
              ].map((s) => (
                <div
                  key={s}
                  className="bg-white border border-[#e8e8e8] rounded-lg px-4 py-3 text-[#555555] text-sm"
                >
                  {s}
                </div>
              ))}
            </div>
          </section>

          {/* When to hire */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">
              When Do You Need a Copper Splicing Contractor?
            </h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              Copper cable plant work is labor-intensive, requires specialized tools, and carries real risk
              of causing widespread service outages if done incorrectly. These are the most common
              situations where a professional copper splice crew is needed:
            </p>
            <ul className="space-y-4">
              {[
                {
                  title: 'Cable Break and Emergency Repair',
                  desc: 'A contractor strike, trench collapse, or vehicle impact can sever a buried copper cable carrying hundreds of active telephone pairs. Emergency splice crews respond quickly, locate the break using TDR equipment, excavate, cut out the damaged section, and restore service pair by pair using IDC connectors and weatherproof closures.',
                },
                {
                  title: 'Moisture-Damaged Cable Restoration',
                  desc: 'Water infiltration is the leading cause of copper cable degradation. Flooded closures, cracked sheaths, and failed pressurization allow moisture to wick into the cable and oxidize pair contacts. A splice contractor can locate the wet section, replace the damaged cable, and reseal or replace affected closures.',
                },
                {
                  title: 'Pedestal Retermination and Pair Reassignment',
                  desc: 'Serving area interface (SAI) pedestal work — adding new drops, reassigning pairs from one terminal to another, or clearing out abandoned pairs — requires a copper splicer familiar with the terminal layout and carrier pair-assignment records.',
                },
                {
                  title: 'New Service Extension',
                  desc: 'Extending service to a new development or adding capacity to an existing cable section may require a bridge splice or new cable splice point in the distribution plant — work that must be done without interrupting service on active pairs in the same cable.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 bg-white border border-[#e8e8e8] rounded-xl p-4">
                  <span className="text-amber-400 mt-0.5 shrink-0">&#8594;</span>
                  <div>
                    <div className="text-[#1f1f1f] font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-[#555555] text-sm">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* What to look for */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">
              What to Look for in a Copper Splicing Contractor
            </h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              Copper splicing is a trade skill that takes years to develop. A competent copper splicer
              knows pair colors by reflex, can work in a manhole in the rain, and understands how a
              bad splice in a 600-pair cable affects 60 customers. Here is what to verify:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'Hands-On OSP Experience',
                  desc: 'There is no substitute for time in the field. Ask how many years the contractor has been splicing copper in the outside plant, and what cable sizes they have experience with. Large-count (600 pair and above) requires a different skill set than small-count pedestal work.',
                },
                {
                  title: 'TDR and Pair Testing Equipment',
                  desc: 'A Time Domain Reflectometer (TDR) locates cable faults, breaks, and moisture by sending a pulse down the cable and measuring reflections. Contractors without TDR capability are guessing at fault locations. Also verify they carry a butt set and pair tone equipment for tracing.',
                },
                {
                  title: 'Closure and Connector Knowledge',
                  desc: 'Qualified contractors know the difference between Scotchlok, 3M UR2, and B-wire connector systems, and understand when to use reenterable closures vs. heat-shrink vs. pressurized enclosures. Mismatched materials in a buried environment lead to premature failure.',
                },
                {
                  title: 'Bonding and Grounding Compliance',
                  desc: 'Copper cable sheaths must be properly bonded and grounded at every splice to protect against lightning and stray current. This is both a performance requirement and a safety issue. Verify the contractor follows Telcordia and NEC grounding standards.',
                },
                {
                  title: 'Carrier Qualifications',
                  desc: 'For work on carrier-owned copper plant (AT&T, Lumen, Frontier, etc.), the contractor may need to be formally qualified by the carrier. Ask for documentation — working on a carrier network without qualification can result in work rejection and liability.',
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 bg-white border border-[#e8e8e8] rounded-xl p-4"
                >
                  <span className="text-amber-400 mt-0.5 shrink-0">&#10003;</span>
                  <div>
                    <div className="text-[#1f1f1f] font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-[#555555] text-sm">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Copper vs fiber */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Copper vs. Fiber: When to Repair vs. Replace</h2>
            <p className="text-[#555555] leading-relaxed mb-4">
              A common question when dealing with damaged or degraded copper cable plant is whether to
              repair the existing copper or replace it with fiber. The answer depends on the age of the
              infrastructure, the bandwidth demands being placed on it, and the cost of trenching vs.
              splicing.
            </p>
            <p className="text-[#555555] leading-relaxed mb-4">
              In many cases — particularly for a single cable break in otherwise healthy plant — copper
              repair is the right call. A skilled splice crew can restore service quickly and at a fraction
              of the cost of fiber replacement. In cases where the cable is chronically wet, heavily
              corroded, or being upgraded for broadband delivery, fiber replacement makes more economic
              sense over a 10–20 year horizon.
            </p>
            <p className="text-[#555555] leading-relaxed">
              SpliceList contractors can advise on both options. Many experienced OSP crews work in both
              copper and fiber and can give you a realistic assessment of the existing cable condition and
              what the most cost-effective path forward looks like.
            </p>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How much does copper cable splicing cost?',
                  a: 'Small-count splicing (25–50 pair) at a pedestal typically runs $150–$400 depending on travel and complexity. Large-count buried cable breaks (200 pair and above) requiring excavation and extended splice time can run $800–$3,000 or more. Emergency response pricing carries a premium. Get multiple quotes through SpliceList for accurate pricing in your area.',
                },
                {
                  q: 'How long does a copper cable repair take?',
                  a: 'A simple pedestal retermination or small splice add might take 1–2 hours. A buried cable break requiring locating, excavation, and a 100-pair splice can take 4–8 hours. Large-count emergency repairs (600 pair or more) may require a full day and a multi-person crew.',
                },
                {
                  q: 'What causes copper cable to fail?',
                  a: 'The most common causes are moisture infiltration (from cracked sheaths, failed closures, or improper sealing), physical damage from excavation or vehicle impact, lightning strike damage, and general aging of the cable insulation. Pressurized cable plant uses dry nitrogen or dehydrated air to push moisture out — a loss of pressure indicates a sheath breach that needs attention.',
                },
                {
                  q: 'What is the color code for copper telephone cable?',
                  a: 'Standard 25-pair telephone cable uses a two-color system based on five tip colors (white, red, black, yellow, violet) and five ring colors (blue, orange, green, brown, slate). This gives 25 unique pairs per binder group. Large-count cables use multiple binder groups, each with its own binder color, to identify pairs above 25. An experienced splicer knows this system from memory.',
                },
                {
                  q: 'Can a copper splicer also work on fiber?',
                  a: 'Many modern OSP crews are cross-trained in both copper and fiber, since mixed copper/fiber cable plants are common in FTTN (fiber to the node) architectures. However, fiber splicing requires different tools — a fusion splicer and OTDR — that not all copper contractors own. Always confirm that your contractor has the specific equipment for the cable type you need spliced.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white border border-[#e8e8e8] rounded-xl p-5">
                  <h3 className="text-[#1f1f1f] font-semibold mb-2">{faq.q}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-amber-900/20 to-[#f59e0b]/10 border border-amber-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">
              Need a Copper Splice Crew for Your Project?
            </h2>
            <p className="text-[#555555] mb-6 max-w-lg mx-auto">
              Search SpliceList for verified copper cable splicing contractors in your area. Filter by
              service type, emergency availability, and location.
            </p>
            <Link
              href="/search?category=COPPER"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Search Copper Contractors
            </Link>
          </section>

          {/* Internal links */}
          <section className="border-t border-[#e8e8e8] pt-10">
            <h2 className="text-xl font-bold text-[#1f1f1f] mb-5">Related Splicing Services</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/fiber-optic-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:border-emerald-500/40 hover:text-emerald-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Fiber Optic Splicing &#8594;
              </Link>
              <Link
                href="/telecom-cable-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:border-blue-500/40 hover:text-blue-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Telecom Cable Splicing &#8594;
              </Link>
              <Link
                href="/search"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:border-amber-500/40 hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Search All Contractors &#8594;
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
