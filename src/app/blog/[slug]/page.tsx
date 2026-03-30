import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SchemaScript from '@/components/seo/SchemaScript'

interface Props { params: Promise<{ slug: string }> }

interface Article {
  slug: string
  title: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  description: string
  content: React.ReactNode
}

const articles: Record<string, Omit<Article, 'slug'>> = {
  'fiber-optic-splicing-cost': {
    title: 'Fiber Optic Splicing Cost Per Splice (2025 Guide)',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    date: 'March 2025',
    readTime: '6 min read',
    description: 'Fusion splicing typically runs $50–$150 per splice point. Full breakdown of what drives cost — fiber type, access, contractor overhead, and testing.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          Fiber optic splicing costs vary widely depending on project size, location, fiber type, and site conditions. For most commercial projects, expect to pay $50–$150 per fusion splice point — but that number can swing in either direction based on the factors below.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Fusion Splicing Cost Per Splice: 2025 Benchmarks</h2>
          <p className="mb-5">
            The &quot;per splice&quot; rate is the most common pricing unit contractors quote for fiber work. It covers the actual splicing labor at each splice point and generally includes OTDR verification of each joint. It does not typically include mobilization, material (closures, trays), or project management.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#e8e8e8]">
                  <th className="text-left text-[#1f1f1f] font-semibold py-3 pr-4">Scenario</th>
                  <th className="text-left text-[#1f1f1f] font-semibold py-3 pr-4">Cost Range Per Splice</th>
                  <th className="text-left text-[#1f1f1f] font-semibold py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Standard single-mode, accessible site', '$50–$85', 'Conduit or aerial, good access'],
                  ['Underground vault work', '$80–$130', 'Confined space, extra setup time'],
                  ['Ribbon fiber (mass fusion)', '$15–$40 per ribbon', '12-fiber ribbon — fast but specialized'],
                  ['Emergency / after-hours', '$150–$300+', 'Overtime rates, rapid mobilization'],
                  ['Remote / rural location', '$100–$200+', 'Travel premium, lodging may apply'],
                  ['OTDR acceptance testing only', '$75–$150/hr', 'Per hour, not per splice'],
                ].map(([scenario, cost, notes]) => (
                  <tr key={scenario} className="text-[#555555]">
                    <td className="py-3 pr-4">{scenario}</td>
                    <td className="py-3 pr-4 text-emerald-400 font-medium">{cost}</td>
                    <td className="py-3 text-[#777777]">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">What Drives Fiber Splicing Cost</h2>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">1. Fiber Count</h3>
          <p className="mb-4">
            A 12-fiber cable has 12 splice points per closure. A 144-fiber cable has 144. Large fiber counts on a single project drive the per-splice rate down through volume pricing — a contractor who quotes $100/splice for a 24-fiber job may quote $55/splice for a 288-fiber build. Always ask about volume pricing on large projects.
          </p>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">2. Access and Site Conditions</h3>
          <p className="mb-4">
            Aerial splicing from a bucket truck in a clear suburban street is faster and cheaper than underground vault work in a busy downtown intersection requiring traffic control. Confined space entry (vaults classified as permit-required) adds safety overhead, equipment requirements, and often a second crew member as standby — all of which increase cost.
          </p>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">3. Fiber Type</h3>
          <p className="mb-4">
            Standard OS2 single-mode fiber (the most common OSP plant) is straightforward. Ribbon fiber requires a mass fusion splicer — not all contractors own one. Bend-insensitive fiber (like Corning ClearCurve) and specialty fiber types may require different cleave settings and technique. Always confirm the contractor has experience with your specific fiber.
          </p>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">4. Mobilization and Travel</h3>
          <p className="mb-4">
            Most contractors charge a mobilization fee separate from the per-splice rate. This covers travel time, fuel, and setup. Typical mobilization fees run $150–$500 for local work. Rural or remote sites where the contractor must travel 2+ hours or stay overnight will add significantly to the total.
          </p>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">5. Materials</h3>
          <p className="mb-4">
            Splice closures, enclosures, splice trays, and fiber protection sleeves are not labor — they are materials billed separately. A single inline closure can cost $80–$300 in material depending on type and capacity. Dome closures for buried applications, wall-mount enclosures for buildings, and aerial splice cases all have different price points. Confirm whether your quote includes materials or is labor only.
          </p>

          <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">6. Testing and Documentation</h3>
          <p className="mb-4">
            OTDR testing is sometimes included in the per-splice rate and sometimes billed separately at $75–$150/hour. End-to-end loss testing with a light source and power meter may be an additional line item. If you need a formal OTDR trace report for turnover documentation, confirm this is included and ask what format the traces are delivered in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">How to Get an Accurate Quote</h2>
          <p className="mb-4">
            Fiber splicing quotes are most accurate when you can provide: total fiber count, cable type and manufacturer if known, number of splice points (closures), site access conditions, and whether OTDR documentation is required for turnover. A good contractor can quote based on a cable plant drawing or a simple verbal description of the job.
          </p>
          <p>
            For projects with fewer than 50 splice points, most contractors will quote a flat price for the whole job rather than a per-splice rate. For large builds, expect time-and-material or unit-price contracts with per-splice line items.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Red Flags in a Splicing Quote</h2>
          <ul className="space-y-3">
            {[
              'No mention of OTDR testing — corners are being cut.',
              'Quote is verbal only with no written scope — no protection if there is a dispute.',
              'Extremely low per-splice rate with no experience verification — quality will suffer.',
              'No itemization of materials vs. labor — hard to compare bids accurately.',
              'No warranty on splice loss — professional splicers stand behind their work.',
            ].map((flag) => (
              <li key={flag} className="flex items-start gap-3 bg-white border border-[#e8e8e8] rounded-xl p-4">
                <span className="text-red-400 shrink-0 mt-0.5">&#9888;</span>
                <span className="text-sm">{flag}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    ),
  },

  'how-to-choose-cable-splicing-contractor': {
    title: 'How to Choose a Cable Splicing Contractor',
    category: 'Hiring Guide',
    categoryColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    date: 'February 2025',
    readTime: '8 min read',
    description: 'Certifications, equipment, and local experience are the top factors. This guide walks through exactly what to verify before hiring a splice crew.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          Fiber optic splicing is skilled trade work where the quality of the result is not always visible until a problem shows up — sometimes weeks or months later, after a system goes live. Choosing the wrong contractor means failed OTDR tests, intermittent outages, and expensive remediation. Here is what separates a qualified splice crew from a cheap one.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Step 1: Verify Certifications</h2>
          <p className="mb-4">
            The two most recognized credentials in fiber splicing are issued by the Fiber Optic Association (FOA) and BICSI. The FOA&apos;s CFOT (Certified Fiber Optic Technician) credential covers fiber handling, splicing, testing, and safety. BICSI&apos;s RCDD and ITS Installer credentials are more common in the structured cabling and enterprise space but are respected across the industry.
          </p>
          <p className="mb-4">
            For telecom and OSP work, contractors may also hold Telcordia (formerly Bellcore) training certificates or manufacturer-specific credentials from companies like Corning, CommScope, or OFS. These are not industry-standard certifications but do indicate formal product training.
          </p>
          <p>
            Certifications matter most when you are dealing with carrier-grade work, warranty requirements, or contract specifications that mandate credentialed technicians. For smaller commercial jobs, field experience and a portfolio of OTDR traces may be more meaningful than a certificate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Step 2: Ask About Equipment</h2>
          <p className="mb-4">
            Fusion splicer quality varies significantly. Professional-grade units from Fujikura (70S+, 90S+), Sumitomo (Z1C, T-502), and Fitel (S179A) produce consistent, low-loss splices and include automated alignment using core or cladding alignment systems. Inexpensive splicers — especially unbranded units from overseas — produce higher-loss splices and are more prone to failure in field conditions.
          </p>
          <p className="mb-4">
            Ask what fusion splicer model the contractor uses. If they cannot name the model, that is a yellow flag. Also ask about their OTDR — brand, wavelength capability (1310nm and 1550nm minimum for single-mode work), and whether they can export trace files in a standard format (SOR or .trc) for your records.
          </p>
          <p>
            For ribbon fiber or mass fusion work, confirm the contractor has a dedicated ribbon splicer. Standard single-fiber units cannot mass-splice ribbon.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Step 3: Check Local Experience</h2>
          <p className="mb-4">
            A contractor who regularly works in your area knows the local underground infrastructure, conduit routing, and right-of-way requirements. They are familiar with local permit requirements and have relationships with utilities and municipalities. This reduces delays and surprises on the job.
          </p>
          <p>
            Ask for references from similar projects in your area. A contractor who can name specific local jobs — a downtown conduit system, a campus fiber build, a carrier ring segment — has demonstrable local experience. Be skeptical of contractors who fly crews in from out of state for routine commercial work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Step 4: Require Written Documentation</h2>
          <p className="mb-4">
            Before awarding work, get a written quote with a scope of work that specifies: fiber count, number of closures, splice loss specification (e.g., &lt;0.1 dB average per splice), OTDR testing at two wavelengths, and documentation deliverables (trace files, splice tray diagrams, as-built records).
          </p>
          <p>
            A contractor who resists putting details in writing is a contractor who plans to be hard to hold accountable. Professional splice crews are accustomed to working under written scope — it protects both parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Step 5: Understand the Warranty</h2>
          <p>
            Quality splice contractors will warranty their work for a defined period — typically 1 year on labor for field splices. This means if a splice fails OTDR testing after turnover, or if a sealed closure develops a problem attributable to workmanship, they will return and correct it at no charge. Get the warranty terms in writing as part of your contract.
          </p>
        </section>
      </div>
    ),
  },

  'copper-vs-fiber-cable-repair': {
    title: 'Copper vs Fiber Cable Repair: Key Differences',
    category: 'Copper Cable',
    categoryColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    date: 'February 2025',
    readTime: '5 min read',
    description: 'Different tools, techniques, and technician skills. Understanding the gap between copper and fiber repair saves time and prevents costly mistakes.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          Fiber and copper cable repair both require trained splicers, but the tools, techniques, and failure modes are completely different. Sending a fiber splicer to repair a copper cable — or vice versa — wastes time and risks making the damage worse. Here is what you need to know before you call for help.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">The Core Difference: Light vs. Electricity</h2>
          <p className="mb-4">
            Fiber optic cables transmit data as pulses of light through glass strands with cores smaller than a human hair. Copper cables transmit electrical signals through twisted pairs of copper conductors. The physics are different, the failure modes are different, and the repair techniques are completely different.
          </p>
          <p>
            Mixing up the two is common among project owners who are not in the industry. When you call for repair help, knowing which type of cable is damaged will get you the right crew faster and avoid dispatch of a technician who cannot do the work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Fiber Optic Cable Repair</h2>
          <p className="mb-4">
            Fiber repair requires a fusion splicer, fiber cleaver, OTDR, and splice closure hardware. The damaged section is located using the OTDR, the cable is cut back on both sides of the damage to expose clean fiber, the individual strands are fusion-spliced together, and the joint is sealed in an appropriate closure for the environment (buried, aerial, or in-building).
          </p>
          <p>
            Fiber repair is precise, clean work. The fiber ends must be cleaved flat and free of contamination — a single fingerprint or dust particle on a fiber end will cause elevated splice loss. Experienced fiber splicers work in a controlled environment even in the field, using a splice trailer or clean workspace inside a service vehicle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Copper Cable Repair</h2>
          <p className="mb-4">
            Copper telephone and data cable repair uses a different set of tools: wire maps, TDR (Time Domain Reflectometer for copper), punch-down tools, and cable-specific splice connectors. Buried copper cable is commonly repaired using UY or B-wire connectors with gel fill, or direct-burial splice cases with moisture-blocking compound.
          </p>
          <p className="mb-4">
            Copper repair is faster per-pair than fiber per-strand but scales differently — a 100-pair copper cable has 200 individual conductors to splice, each requiring an individual connection. High-pair-count copper repairs are labor-intensive and time-consuming.
          </p>
          <p>
            Copper splicers also test differently — pair-by-pair continuity, resistance, and capacitance testing rather than optical power loss. TDR testing locates faults by sending a pulse down the cable and measuring the reflection time from a break or short.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Which Type Do You Have?</h2>
          <p className="mb-4">
            If you are not sure what type of cable is damaged, look at the cable jacket. Fiber optic cables are typically labeled with &quot;FIBER OPTIC,&quot; &quot;SM&quot; (single-mode), or &quot;MM&quot; (multi-mode) and are usually smaller in diameter. Copper telephone cable is heavier, and the jacket often says &quot;Telephone Cable&quot; or a pair count like &quot;25 PR.&quot;
          </p>
          <p>
            If the cable feeds data circuits or internet service, it is more likely fiber. If it feeds telephone service, DSL, or analog systems, it may be copper. If you genuinely cannot tell, describe what you are looking at to the contractor before they dispatch.
          </p>
        </section>
      </div>
    ),
  },

  'what-is-otdr-testing': {
    title: 'What Is OTDR Testing and Why It Matters',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    date: 'January 2025',
    readTime: '7 min read',
    description: 'OTDR testing verifies every splice and finds faults in a fiber run. Learn when to require it and what to expect in the results.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          An OTDR — Optical Time Domain Reflectometer — is the primary quality-assurance tool in fiber optic splicing. It sends a pulse of light down the fiber and measures how long it takes for reflections to return, allowing the technician to map every event on the fiber with precise distance and loss values.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">How OTDR Testing Works</h2>
          <p className="mb-4">
            The OTDR injects a short pulse of laser light into the fiber and listens for backscattered light returning to the instrument. Different events on the fiber — splices, connectors, bends, and breaks — each produce a characteristic reflection signature. The OTDR plots these events on a trace showing distance (horizontal axis) and optical power (vertical axis).
          </p>
          <p>
            Each splice point appears on the trace as a drop in the signal level. The size of that drop — measured in decibels — is the splice loss. A good fusion splice shows less than 0.1 dB of loss. A bad splice, a contaminated connector, or a tight bend shows a larger drop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">What OTDR Results Tell You</h2>
          <ul className="space-y-3">
            {[
              { term: 'Splice loss', def: 'Loss at each splice point in dB. Industry standard is <0.1 dB for fusion splices.' },
              { term: 'Connector loss', def: 'Loss at mated connectors. Typically 0.3–0.5 dB. Higher values indicate dirty or damaged connectors.' },
              { term: 'Total link loss', def: 'End-to-end loss budget. Compared against the optical loss budget for the system to verify it will work.' },
              { term: 'Cable length', def: 'Precise physical distance of each cable segment, useful for as-built documentation.' },
              { term: 'Fault location', def: 'In a break or high-loss event, the OTDR pinpoints the location to within a meter.' },
            ].map((item) => (
              <li key={item.term} className="bg-white border border-[#e8e8e8] rounded-xl p-4">
                <span className="text-[#1f1f1f] font-semibold">{item.term}: </span>
                <span className="text-sm">{item.def}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">When to Require OTDR Testing</h2>
          <p className="mb-4">
            OTDR testing should be required on every fiber installation and every splice repair. The only exception is very short indoor runs (typically under 100 meters) where the OTDR dead zone is longer than the cable itself — in those cases, end-to-end insertion loss testing with a light source and power meter is the appropriate method.
          </p>
          <p>
            Always require OTDR traces as part of turnover documentation for new cable plant. These traces become the baseline record — if a problem develops later, the contractor or carrier can re-test and compare to the original baseline to identify what changed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">OTDR Test at Two Wavelengths</h2>
          <p>
            Single-mode fiber should be tested at both 1310nm and 1550nm. Some fiber defects and splice problems show up at one wavelength but not the other. Testing at 1550nm is also more sensitive to macro-bending (tight bends in the fiber) than 1310nm. A contractor who tests at only one wavelength is not providing a complete acceptance test.
          </p>
        </section>
      </div>
    ),
  },

  'fusion-splicing-vs-mechanical-splicing': {
    title: 'Fusion Splicing vs Mechanical Splicing: Which Do You Need?',
    category: 'Fiber Optic',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    date: 'January 2025',
    readTime: '6 min read',
    description: 'Fusion splicing delivers lower loss and better long-term performance. Mechanical is faster for certain applications. Here is when to use each.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          There are two ways to permanently join fiber optic cables: fusion splicing and mechanical splicing. Both create a joint, but they differ significantly in loss performance, cost, required equipment, and appropriate use cases.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Fusion Splicing</h2>
          <p className="mb-4">
            Fusion splicing uses an electric arc to melt and weld two prepared fiber ends together. The fusion splicer automatically aligns the fibers using core or cladding alignment optics, fires the arc, and then displays the estimated splice loss. The process takes 60–90 seconds per fiber and produces a joint with typical losses of 0.01–0.1 dB.
          </p>
          <p className="mb-4">
            Fusion splices are permanent, mechanically stable, and have essentially indefinite service life under normal conditions. They are the industry standard for all outside plant work, carrier networks, long-haul fiber, and any application where low loss and reliability are non-negotiable.
          </p>
          <p>
            The downside of fusion splicing is equipment cost. A professional fusion splicer costs $3,000–$15,000 depending on capability. This is why hiring a qualified contractor is far more economical for most projects than purchasing equipment for occasional use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Mechanical Splicing</h2>
          <p className="mb-4">
            Mechanical splicing uses a pre-fabricated alignment sleeve filled with index-matching gel to hold two prepared fiber ends in alignment. No electricity or fusion is involved. The splice takes about 5 minutes to complete and requires only a fiber cleaver and the mechanical splice connector — no fusion splicer.
          </p>
          <p className="mb-4">
            Typical mechanical splice loss is 0.2–0.5 dB, compared to 0.01–0.1 dB for fusion. This higher loss limits their use to shorter runs and lower-bandwidth applications. Mechanical splices are also less durable over time — the index gel can dry out, and the splice is susceptible to moisture ingress.
          </p>
          <p>
            Mechanical splices are most useful for emergency temporary repairs (to restore service while permanent fusion splicing is arranged), very short indoor runs, and situations where a fusion splicer is not available.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Which Should You Specify?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Use Fusion', items: ['All OSP and long-haul plant', 'Any run over 500 meters', 'Carrier or enterprise grade networks', 'FTTX/FTTH deployments', 'Permanent installations'] },
              { label: 'Mechanical May Work', items: ['Emergency temporary repair', 'Short indoor runs under 100m', 'Low-bandwidth applications', 'Single-strand test or tap point', 'Where no fusion splicer is available'] },
            ].map((col) => (
              <div key={col.label} className="bg-white border border-[#e8e8e8] rounded-xl p-5">
                <h3 className="text-[#1f1f1f] font-semibold mb-3">{col.label}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">&#8594;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
  },

  'osp-cable-splicing-basics': {
    title: 'Outside Plant Cable Splicing: What Contractors Need to Know',
    category: 'Telecom',
    categoryColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    date: 'December 2024',
    readTime: '9 min read',
    description: 'OSP splicing covers aerial, buried, and direct-buried plant environments. Tools, training, and safety requirements for OSP splicers.',
    content: (
      <div className="space-y-8 text-[#555555] leading-relaxed">
        <p className="text-lg text-[#555555]">
          Outside plant (OSP) cable splicing is the work done on telecommunications cables that run through conduit, direct-buried, or aerial strand outside of buildings. It is physically demanding, weather-dependent, and technically demanding — and it is the core of what most professional cable splicers do.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">OSP Environments</h2>
          <p className="mb-4">
            Outside plant infrastructure runs in three basic configurations, each with distinct splicing requirements:
          </p>
          <ul className="space-y-3">
            {[
              { type: 'Aerial', desc: 'Cable suspended from a messenger strand between utility poles. Splicing is done from a bucket truck or a ladder. Exposure to weather, wind, and traffic are constant concerns. Aerial splice closures must be weatherproof and UV-resistant.' },
              { type: 'Underground / Conduit', desc: 'Cable pulled through buried conduit and accessed via manholes and handholes. Vault entry often requires confined space entry procedures. Conduit routes in urban areas can be complex with multiple cables in the same path.' },
              { type: 'Direct Buried', desc: 'Cable buried directly in the ground without conduit, accessed by excavation. Common in residential and rural areas. Damage often comes from landscaping or excavation. Direct-buried splice closures must handle ground moisture and soil pressure.' },
            ].map((env) => (
              <li key={env.type} className="bg-white border border-[#e8e8e8] rounded-xl p-4">
                <div className="text-[#1f1f1f] font-semibold mb-1">{env.type}</div>
                <div className="text-sm">{env.desc}</div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Tools of the OSP Splicer</h2>
          <p className="mb-4">
            A professional OSP splicer carries a significant equipment load. Beyond the fusion splicer and OTDR, an experienced crew travels with: fiber cleavers, fiber holders and prep tools, splice trays and closure hardware, cable cutting and jacket stripping tools, a laptop or tablet for trace analysis, and a service vehicle configured as a mobile workspace.
          </p>
          <p>
            For copper OSP work, the kit includes a TDR, pair-gain test set, cable locator, tone generator, and a selection of splice connectors for both standard and gel-filled applications. High-pair-count copper splicers often work in pairs — one splicing, one running wire from the cable count.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">Safety in OSP Work</h2>
          <p className="mb-4">
            OSP splicing involves real hazards that desk-based workers do not encounter. Traffic control is required for any work in or adjacent to a roadway. Aerial work from a bucket truck requires a qualified operator and awareness of overhead power lines — accidental contact with an energized line is a fatal hazard. Underground vault entry requires confined space entry procedures when the space meets OSHA&apos;s permit-required criteria.
          </p>
          <p>
            Experienced OSP contractors maintain OSHA 10 or OSHA 30 certifications, confined space entry training, and first aid/CPR. When hiring a contractor for OSP work, ask about their safety program and whether they carry the appropriate insurance for the work environment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4">OSP Splice Closure Selection</h2>
          <p>
            The choice of splice closure depends on environment and cable type. Dome closures are the standard for buried and underground applications — they provide good moisture protection and accommodate a range of cable diameters. Aerial splice cases are designed for strand lashing and must handle UV, temperature cycling, and wind vibration. In-line closures are used where cables enter buildings or transition from outdoor to indoor-rated cable. Matching the closure type to the environment is as important as the splice quality inside it.
          </p>
        </section>
      </div>
    ),
  },
}

const relatedPosts: Record<string, string[]> = {
  'fiber-optic-splicing-cost': ['how-to-choose-cable-splicing-contractor', 'fusion-splicing-vs-mechanical-splicing'],
  'how-to-choose-cable-splicing-contractor': ['fiber-optic-splicing-cost', 'what-is-otdr-testing'],
  'copper-vs-fiber-cable-repair': ['osp-cable-splicing-basics', 'how-to-choose-cable-splicing-contractor'],
  'what-is-otdr-testing': ['fusion-splicing-vs-mechanical-splicing', 'fiber-optic-splicing-cost'],
  'fusion-splicing-vs-mechanical-splicing': ['what-is-otdr-testing', 'fiber-optic-splicing-cost'],
  'osp-cable-splicing-basics': ['copper-vs-fiber-cable-repair', 'how-to-choose-cable-splicing-contractor'],
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()

  const related = (relatedPosts[slug] ?? [])
    .map((s) => ({ slug: s, ...articles[s] }))
    .filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'SpliceList' },
    publisher: { '@type': 'Organization', name: 'SpliceList', url: 'https://splicelist.com' },
  }

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#777777] mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#555555]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#555555]">Blog</Link>
            <span>/</span>
            <span className="text-[#555555] truncate">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${article.categoryColor} mb-5`}>
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#777777]">
              <span>{article.date}</span>
              <span>&bull;</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* Body */}
          <article>
            {article.content}
          </article>

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-r from-[#0b5cff]/10 to-[#fafafa] border border-[#0b5cff]/20 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-[#1f1f1f] mb-3">Find a Splice Contractor Near You</h2>
            <p className="text-[#555555] text-sm mb-5 max-w-md mx-auto">
              Browse verified fiber optic and cable splicing contractors across the country. Filter by service type and location.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[#0b5cff] hover:bg-[#0946cc] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Search Contractors
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-14 border-t border-[#e8e8e8] pt-10">
              <h3 className="text-[#1f1f1f] font-bold text-xl mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white border border-[#e8e8e8] hover:border-[#e0e0e0] rounded-xl p-5 transition-all"
                  >
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${post.categoryColor} mb-3`}>
                      {post.category}
                    </span>
                    <h4 className="text-[#1f1f1f] text-sm font-semibold leading-snug group-hover:text-[#0b5cff] transition-colors">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
