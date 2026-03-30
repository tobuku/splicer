import type { Metadata } from 'next'
import Link from 'next/link'
import SubmitListingForm from '@/components/listings/SubmitListingForm'

export const metadata: Metadata = {
  title: 'Submit a Contractor Listing | SpliceList',
  description: 'Add your cable splicing business to the SpliceList directory. Free listings for fiber optic, telecom, and copper cable splicing contractors.',
  robots: { index: false, follow: false },
}

export default function SubmitListingPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        <nav className="flex items-center gap-2 text-sm text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#555555]">Home</Link>
          <span>/</span>
          <span className="text-[#555555]">Submit Listing</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1f1f1f] mb-3">Submit Your Contractor Listing</h1>
          <p className="text-[#555555] leading-relaxed">
            Add your cable splicing business to the SpliceList directory. Listings are reviewed within 1–2 business days. All fields marked with <span className="text-red-400">*</span> are required.
          </p>
        </div>

        {/* Benefits strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { title: 'Free to List', desc: 'No cost to submit your basic listing.' },
            { title: 'Reviewed Manually', desc: 'Every listing is checked before going live.' },
            { title: 'Direct Contact', desc: 'Customers reach you directly — no middleman.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-center">
              <div className="text-[#1f1f1f] font-semibold text-sm mb-1">{item.title}</div>
              <div className="text-[#777777] text-xs">{item.desc}</div>
            </div>
          ))}
        </div>

        <SubmitListingForm />
      </div>
    </div>
  )
}
