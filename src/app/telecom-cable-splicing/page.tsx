import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ListingSearchWidget from '@/components/search/ListingSearchWidget'
import SchemaScript from '@/components/seo/SchemaScript'

export const metadata: Metadata = {
  title: 'Telecom Cable Splicing Contractors | OSP Outside Plant Splicing',
  description:
    'Find certified telecom cable splicing contractors for outside plant work, central office splicing, DSLAM connections, and buried cable repair. Verified OSP splice crews nationwide.',
  keywords: [
    'telecom cable splicing contractors',
    'OSP splicing',
    'outside plant splicing',
    'central office cable splicing',
    'DSLAM splicing',
    'buried telecom cable repair',
  ],
  openGraph: {
    title: 'Telecom Cable Splicing Contractors | SpliceList',
    description:
      'Connect with verified outside plant telecom splicing crews for OSP builds, central office work, DSLAM connections, and emergency cable repair.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Telecom Cable Splicing Services',
  description:
    'Professional telecom cable splicing for outside plant, central office, DSLAM connections, aerial and buried cable, and emergency OSP repair.',
  provider: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Telecommunications Cable Splicing',
}

export default function TelecomCableSplicingPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20">

        {/* Hero */}
        <div className="bg-gradient-to-b from-blue-900/20 to-transparent border-b border-[#e8e8e8]/50 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-full text-xs font-medium mb-5">
              Telecom Cable Splicing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-5 leading-tight">
              Telecom Cable Splicing Contractors
            </h1>
            <p className="text-lg text-[#555555] mb-8 leading-relaxed">
              Connect with certified outside plant (OSP) telecom cable splicing contractors across the United
              States. Whether you need new cable plant construction, central office splicing, DSLAM
              connections, or emergency repair of a buried cable break — SpliceList has verified splice crews
              ready to quote your project.
            </p>
            <ListingSearchWidget defaultCategory="TELECOM" />
          </div>
        </div>

        {/* Photo grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl overflow-hidden aspect-video shadow-md">
              <Image
                src="/images/copper/IMG_0074.jpg"
                alt="Telecom technician performing aerial splice work"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-video shadow-md">
              <Image
                src="/images/copper/IMG_0089.jpg"
                alt="Underground copper cable splice closure"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-video shadow-md">
              <Image
                src="/images/copper/IMG_0677.jpg"
                alt="OSP cable splicing in manhole vault"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 space-y-14">

          {/* What is telecom cable splicing */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">What Is Telecom Cable Splicing?</h2>
            <p className="text-[#555555] leading-relaxed mb-4">
              Telecom cable splicing is the process of joining telecommunications cables — which may carry
              copper pairs, fiber strands, or a combination — at splice points throughout the outside plant
              network. Unlike simple patching or connectorization, splicing creates a permanent, weatherproof
              joint designed to last decades in aerial, underground, or buried environments.
            </p>
            <p className="text-[#555555] leading-relaxed mb-4">
              OSP splice technicians work on the cable plant between the central office (CO) and the end
              customer — spanning aerial strand, underground conduit, direct-buried cable, pedestal
              terminations, and remote terminal enclosures. This work requires knowledge of network
              architecture, proper cable handling, and compliance with carrier-specific build standards such
              as Telcordia GR-20 and GR-765.
            </p>
            <p className="text-[#555555] leading-relaxed">
              Telecom splicing is distinct from structured cabling or data center work. OSP splice crews are
              trained for field conditions — trenches, manholes, aerial bucket work, and extreme weather —
              and understand the regulatory and safety requirements of working in the right-of-way alongside
              utility infrastructure.
            </p>
          </section>

          {/* OSP vs ISP */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">OSP vs. ISP Splicing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: 'Outside Plant (OSP)',
                  color: 'blue',
                  points: [
                    'Aerial, underground, and direct-buried cable',
                    'Weatherproof splice enclosures and closures',
                    'Manholes, vaults, pedestals, and aerial strand',
                    'Compliance with GR-20, GR-765, and utility specs',
                    'Work alongside power and right-of-way requirements',
                  ],
                },
                {
                  type: 'Inside Plant (ISP)',
                  color: 'slate',
                  points: [
                    'Central office and building riser cabling',
                    'Splice frames, patch panels, and cross-connects',
                    'Controlled environment — no weatherproofing',
                    'Compliance with NEBS and carrier CO standards',
                    'Integration with switching and DSLAM equipment',
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
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-5">Common Telecom Splicing Services</h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              Telecom splice contractors handle the full range of outside plant and inside plant work that
              keeps carrier networks running. The following service categories represent the most frequently
              requested work booked through SpliceList:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'OSP Cable Plant Construction',
                'Central Office Splicing',
                'DSLAM / FTTN Connection',
                'Aerial Cable Splicing',
                'Buried Cable Repair',
                'Manhole and Vault Splicing',
                'Pedestal Termination',
                'Cross-Box and SAI Work',
                'Emergency OSP Repair',
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
              When Do You Need a Telecom Splicing Contractor?
            </h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              OSP splicing is one of the most specialized trades in telecommunications. Most organizations —
              including many carriers — rely on outside contractors for all or part of their splice work.
              Here are the most common situations:
            </p>
            <ul className="space-y-4">
              {[
                {
                  title: 'New Cable Plant Construction',
                  desc: 'When a carrier or municipality builds out a new fiber or copper network, splice crews follow the cable installation teams to build out all splice points, terminals, and closures per the engineering design package.',
                },
                {
                  title: 'DSLAM and Remote Terminal Installation',
                  desc: 'Installing a new DSLAM (Digital Subscriber Line Access Multiplexer) or remote terminal requires splicing into the existing feeder cable and building new distribution pairs — work that must be done by an experienced OSP splicer to avoid disrupting active service.',
                },
                {
                  title: 'Cable Break and Emergency Repair',
                  desc: 'A construction crew, storm, or vehicle accident can sever a buried or aerial cable carrying hundreds of active pairs. Emergency splice crews respond around the clock to locate, excavate, and restore service using temporary and permanent splice methods.',
                },
                {
                  title: 'Pair Gain and Network Reconfiguration',
                  desc: 'Splitting a feeder, adding capacity to a cable section, or rerouting service from one terminal to another all require splice work in the outside plant — often under traffic, in pedestals, or inside buried vaults.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 bg-white border border-[#e8e8e8] rounded-xl p-4">
                  <span className="text-blue-400 mt-0.5 shrink-0">&#8594;</span>
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
              What to Look for in a Telecom Splicing Contractor
            </h2>
            <p className="text-[#555555] leading-relaxed mb-5">
              OSP splicing is not a skill learned from a YouTube tutorial. Qualified telecom splice contractors
              have years of hands-on experience, carrier-specific training, and the equipment and tools to
              work safely in manholes, on aerial strand, and in buried cable environments. Verify these
              qualifications before awarding a contract:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'Carrier-Specific Training and Qualifications',
                  desc: 'Major carriers like AT&T, Lumen, and Frontier have their own splice standards and qualify contractors before allowing them to touch the network. Ask for carrier qualification letters or approval documentation.',
                },
                {
                  title: 'OSHA and Confined Space Certification',
                  desc: 'Manhole and vault work requires OSHA confined space entry certification. Aerial work requires fall protection training. Verify that the crew holds current certifications for the work environment.',
                },
                {
                  title: 'BICSI OSP Practitioner Credential',
                  desc: 'BICSI\'s OSP Installer 2 or Technician credentials indicate training in outside plant cabling practices, cable handling, and splicing standards specific to telecom infrastructure.',
                },
                {
                  title: 'Proper Tooling and Materials',
                  desc: 'OSP splice work requires closure systems, bonding and grounding materials, cable pressure testing equipment, and — for fiber — OTDR and fusion splicer gear. Contractors who show up with inadequate tooling will produce inadequate results.',
                },
                {
                  title: 'Documentation and As-Built Records',
                  desc: 'A professional OSP splice contractor provides splice records, bonding diagrams, and as-built documentation that the network owner can use for future maintenance and troubleshooting.',
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 bg-white border border-[#e8e8e8] rounded-xl p-4"
                >
                  <span className="text-blue-400 mt-0.5 shrink-0">&#10003;</span>
                  <div>
                    <div className="text-[#1f1f1f] font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-[#555555] text-sm">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What certifications should a telecom OSP splice contractor have?',
                  a: 'Key credentials include BICSI OSP Installer or Technician, OSHA 10 or OSHA 30 for general industry, and confined space entry certification for manhole and vault work. Carrier-specific qualifications (AT&T, Lumen, etc.) are required for work on those networks.',
                },
                {
                  q: 'How long does OSP splice work take?',
                  a: 'A simple pedestal add or pair reassignment might take 1–2 hours. A full manhole splice closure with dozens of pairs takes 4–8 hours. Emergency cable restoration depends on locate and excavation time — a buried cable repair typically requires a full day from dispatch to service restoration.',
                },
                {
                  q: 'What is the difference between a feeder cable and a distribution cable?',
                  a: 'Feeder cables carry a large number of pairs (often 100–2400 pair) from the central office to a remote terminal or cross-box. Distribution cables are smaller cables (25–200 pair) that branch from the terminal to the customer premises. Splicers work at the boundary between feeder and distribution — the SAI (Serving Area Interface) or cross-box — to assign pairs to specific customers.',
                },
                {
                  q: 'Can a telecom splice crew work on both copper and fiber?',
                  a: 'Many experienced OSP splice crews are proficient in both copper and fiber work, since modern cable plants often mix fiber feeder with copper distribution (FTTN/VDSL architecture). However, fiber splicing requires additional equipment — confirm that the contractor has a fusion splicer and OTDR before booking fiber work.',
                },
                {
                  q: 'What is a DSLAM and why does it require splicing?',
                  a: 'A DSLAM (Digital Subscriber Line Access Multiplexer) is a device that aggregates DSL connections from multiple customers onto a high-speed backbone. Installing a new DSLAM cabinet in the field requires cutting into the feeder cable, building a new splice point, and distributing pairs from the DSLAM to the distribution plant — all of which is OSP splice work.',
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
          <section className="bg-gradient-to-r from-blue-900/20 to-[#0b5cff]/10 border border-blue-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">
              Need a Telecom Splice Crew for Your Project?
            </h2>
            <p className="text-[#555555] mb-6 max-w-lg mx-auto">
              Search SpliceList for verified outside plant telecom splicing contractors in your area. Filter
              by service type, emergency availability, and location.
            </p>
            <Link
              href="/search?category=TELECOM"
              className="inline-flex items-center gap-2 bg-[#0b5cff] hover:bg-[#0946cc] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Search Telecom Contractors
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
                href="/copper-cable-splicing"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:border-amber-500/40 hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Copper Cable Splicing &#8594;
              </Link>
              <Link
                href="/search"
                className="bg-white border border-[#e8e8e8] text-[#555555] hover:border-blue-500/40 hover:text-blue-400 px-4 py-2 rounded-lg text-sm transition-all"
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
