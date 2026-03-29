import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { label: 'Telecom Cable Splicing', href: '/telecom-cable-splicing' },
  { label: 'Fiber Optic Splicing', href: '/fiber-optic-splicing' },
  { label: 'Copper Cable Splicing', href: '/copper-cable-splicing' },
  { label: 'Emergency Repair', href: '/services/emergency-repair' },
]

const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Ohio', 'Georgia', 'Washington']

export default function Footer() {
  return (
    <footer className="bg-[#060c18] border-t border-slate-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/splicelist_logo.jpg"
                alt="SpliceList"
                width={130}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold text-white">Splice<span className="text-[var(--blue)]">List</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The national directory for certified telecom, fiber optic, and copper cable splicing contractors.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-slate-400 hover:text-[var(--blue)] text-sm transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top States */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Top States</h3>
            <ul className="space-y-2">
              {states.map((s) => (
                <li key={s}>
                  <Link
                    href={`/locations/${s.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 hover:text-[var(--blue)] text-sm transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'List Your Business', href: '/listings/submit' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
                { label: 'Search', href: '/search' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-[var(--blue)] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} SpliceList. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            splicelist.com — The Cable Splicing Contractor Directory
          </p>
        </div>
      </div>
    </footer>
  )
}
