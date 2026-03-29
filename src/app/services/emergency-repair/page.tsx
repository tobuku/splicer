import type { Metadata } from 'next'
import Link from 'next/link'
import ListingSearchWidget from '@/components/search/ListingSearchWidget'
import SchemaScript from '@/components/seo/SchemaScript'

export const metadata: Metadata = {
  title: 'Emergency Cable & Fiber Optic Repair | 24/7 Response',
  description: 'Find contractors for emergency fiber optic and cable repair. Fast response for fiber cuts, storm damage, excavation strikes, and downed lines. 24/7 coverage.',
  keywords: ['emergency fiber optic repair', 'emergency cable repair', 'fiber cut repair', '24/7 cable splicing', 'emergency telecom repair'],
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'EmergencyService',
  name: 'Emergency Cable & Fiber Optic Repair',
  description: '24/7 emergency fiber optic and cable splicing contractor directory.',
  url: 'https://splicelist.com/services/emergency-repair',
  areaServed: { '@type': 'Country', name: 'United States' },
}

const emergencyTypes = [
  { title: 'Fiber Cable Cut', desc: 'Accidental excavation strike, vehicle damage, or vandalism severing a fiber span.' },
  { title: 'Storm & Wind Damage', desc: 'Downed aerial strands, damaged closures, water intrusion in underground splice points.' },
  { title: 'Flood Damage', desc: 'Saturated conduit, flooded vaults, water-damaged splice closures requiring immediate remediation.' },
  { title: 'Copper Cable Break', desc: 'Telephone or DSL service outage from buried cable damage or aerial wire failure.' },
  { title: 'Vehicle Strike', desc: 'Utility poles, pedestal cabinets, or aerial plant damaged by vehicle accidents.' },
  { title: 'Equipment Failure', desc: 'Splice closure seal failure, enclosure damage, or degraded splices causing signal loss.' },
]

export default function EmergencyRepairPage() {
  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20 min-h-screen">

        {/* Hero */}
        <div className="bg-gradient-to-b from-amber-900/20 to-transparent border-b border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              24/7 Emergency Response
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Emergency Cable &amp; Fiber Optic Repair Services
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Cable cuts, storm damage, and downed lines cannot wait. SpliceList connects you with contractors who carry emergency response capabilities and can mobilize fast to restore your service.
            </p>
            <ListingSearchWidget defaultCategory="" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* Emergency types */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Types of Cable Emergencies We Cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyTypes.map((item) => (
                <div key={item.title} className="bg-[#0f172a] border border-amber-500/20 rounded-xl p-5">
                  <h3 className="text-amber-400 font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What counts as an emergency */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Qualifies as a Cable Emergency?</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              A cable emergency is any failure that causes immediate service disruption, financial loss, or public safety risk. In practice, this means any event where waiting for a standard work order — which could take days — is not an option.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              Common emergency triggers include: carrier or enterprise fiber cuts that take circuits offline, storm damage that leaves aerial plant down in a roadway, excavation strikes that sever a buried cable feeding a neighborhood or business park, and vault flooding that threatens active splice closures. If your service is down or at imminent risk and the cause is physical cable damage, that is an emergency.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Emergency splicing differs from scheduled work in cost, response time expectation, and crew readiness. Contractors who respond to emergencies typically carry equipment in their vehicle at all times, are available after hours, and can make a binding commitment to an on-site arrival time — usually 2–4 hours within their coverage area.
            </p>
          </section>

          {/* How to get help */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-5">How to Get Emergency Cable Repair Fast</h2>
            <div className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Search Your Location',
                  desc: 'Enter your city or zip code and filter for emergency-available contractors.',
                },
                {
                  num: '2',
                  title: 'Call Directly',
                  desc: 'Use the click-to-call button on any contractor listing. Emergency jobs should always start with a phone call, not a form.',
                },
                {
                  num: '3',
                  title: 'Describe the Damage',
                  desc: 'Tell the contractor: cable type (fiber or copper), approximate length of outage, access requirements, and whether service is down.',
                },
                {
                  num: '4',
                  title: 'Confirm Mobilization',
                  desc: 'Verify ETA, confirm they have the right equipment for your fiber type or cable gauge, and get a confirmation of dispatch.',
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-4">
                  <span className="text-3xl font-black text-amber-500/30 leading-none w-8 shrink-0">{step.num}</span>
                  <div>
                    <div className="text-white font-semibold mb-1">{step.title}</div>
                    <div className="text-slate-400 text-sm">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What to tell the contractor */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What to Tell the Contractor</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Getting accurate information to the contractor upfront saves time and ensures they arrive with the right tools. Before you call, gather as much of the following as possible:
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Cable type', detail: 'Single-mode fiber, multi-mode fiber, copper telephone, coax, or other. If you do not know, describe the cable jacket color and size.' },
                { label: 'Fiber count or pair count', detail: 'How many fibers or pairs are in the damaged cable. Even an estimate helps the contractor know how long the splice will take.' },
                { label: 'Location and access', detail: 'Is the damage aerial, buried, in a vault, or in a conduit? Is the site accessible by vehicle? Is a traffic control plan needed?' },
                { label: 'Services affected', detail: 'What is down — internet, telephone, carrier circuits? Are any public safety or critical systems involved?' },
                { label: 'Cause of damage', detail: 'Excavation strike, vehicle accident, storm damage, or unknown. This helps the contractor know what they may be walking into.' },
              ].map((item) => (
                <li key={item.label} className="flex gap-4 bg-[#0f172a] border border-slate-800 rounded-xl p-4">
                  <span className="text-amber-400 mt-0.5 shrink-0 font-bold">&#8594;</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                    <div className="text-slate-400 text-sm">{item.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Internal links */}
          <section className="border-t border-slate-800 pt-10">
            <h3 className="text-white font-semibold mb-4">Related Services</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/fiber-optic-splicing"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:text-emerald-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Fiber Optic Splicing
              </Link>
              <Link
                href="/copper-cable-splicing"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Copper Cable Splicing
              </Link>
              <Link
                href="/telecom-cable-splicing"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:text-blue-400 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Telecom Splicing
              </Link>
              <Link
                href="/search"
                className="bg-[#0f172a] border border-slate-700 text-slate-300 hover:text-[#0ea5e9] px-4 py-2 rounded-lg text-sm transition-all"
              >
                Search All Contractors
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
