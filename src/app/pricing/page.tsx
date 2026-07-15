import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing, Cable Splicing Contractor Directory',
  description: 'Simple, transparent pricing for cable splicing contractors. Get listed free or upgrade for featured placement, lead notifications, and enhanced profiles.',
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get your business listed and discoverable by telecom contractors across the country.',
    highlight: false,
    cta: 'Create Free Listing',
    href: '/list-your-business',
    features: [
      'Basic listing with business name and location',
      'Category tagging (Fiber / Copper / Telecom)',
      'Services and certifications displayed',
      'Phone number and contact info',
      'Appear in search results',
      'Receive customer reviews',
    ],
    notIncluded: [
      'Featured badge and gold highlight',
      'Priority placement in search',
      'Lead notification emails',
      'Google rating and reviews displayed',
    ],
  },
  {
    name: 'Featured',
    price: '$29',
    period: 'per month',
    annualPrice: '$199',
    description: 'Stand out from the competition with featured placement and a fully enhanced profile.',
    highlight: true,
    cta: 'Get Featured — $29/mo',
    href: 'https://buy.stripe.com/3cI7sKeSEbbR3TG3VN04801',
    annualCta: 'Get Featured — $199/yr (Save $149)',
    annualHref: 'https://buy.stripe.com/5kQ9AS5i4bbReyk4ZR04802',
    features: [
      'Everything in Free',
      'Featured badge on your listing and search results',
      'Gold highlighted card in search results',
      'Priority placement above free listings',
      'Google rating and reviews displayed',
      'Enhanced profile with photos and logo',
      'Lead notification emails',
      'Verified contractor badge',
    ],
    notIncluded: [],
  },
]

const faqs = [
  {
    q: 'Is the free listing actually free — no credit card required?',
    a: 'Yes. The free tier requires no payment info. You create an account, submit your business details, and your listing goes live after a quick review. No trial period, no auto-upgrade.',
  },
  {
    q: 'What counts as a "lead"?',
    a: 'A lead is generated when a contractor or project manager uses the contact form on your listing page or clicks to call your number from a mobile device. Pro and Enterprise subscribers receive email notifications for each lead.',
  },
  {
    q: 'How does featured placement work?',
    a: 'Pro and Enterprise listings appear above free listings in search results and on category pages (Fiber, Copper, Telecom). Enterprise listings additionally receive pinned placement at the top of relevant city and state pages.',
  },
  {
    q: "What's the difference between listing pricing and ad pricing?",
    a: 'SpliceList does not sell banner ads or pay-per-click placements. Every listing on the site is a real business profile — not an ad unit. The Pro and Enterprise tiers improve your organic position within the directory, not through paid ad slots.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Pro and Enterprise are month-to-month. Cancel before your next billing date and your listing reverts to the free tier — your profile stays live, just without the featured placement and lead notifications.',
  },
  {
    q: 'Do you offer discounts for annual billing?',
    a: 'Yes. The Featured plan is $29/month billed monthly, or $199/year billed annually — saving you $149 per year.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-[#1f1f1f] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-[#555555] text-lg leading-relaxed">
            Get your cable splicing operation in front of the contractors who need you.
            Start free — upgrade when you want more visibility.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? 'bg-[#0b5cff]/10 border-[#0b5cff] shadow-[0_0_40px_rgba(14,165,233,0.15)]'
                  : 'bg-white border-[#e8e8e8]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0b5cff] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-[#1f1f1f] font-bold text-xl mb-1">{tier.name}</h2>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-black text-[#1f1f1f]">{tier.price}</span>
                  <span className="text-[#555555] text-sm mb-1">/{tier.period}</span>
                </div>
                <p className="text-[#555555] text-sm leading-relaxed">{tier.description}</p>
                {'annualPrice' in tier && tier.annualPrice && (
                  <p className="text-[#0b5cff] text-sm font-semibold mt-2">
                    or {tier.annualPrice}/year — save $149
                  </p>
                )}
              </div>

              {tier.highlight && 'annualHref' in tier ? (
                <div className="space-y-2.5 mb-8">
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors bg-[#0b5cff] hover:bg-[#0946cc] text-white"
                  >
                    {tier.cta}
                  </a>
                  <a
                    href={(tier as any).annualHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {(tier as any).annualCta}
                  </a>
                </div>
              ) : (
                <Link
                  href={tier.href}
                  className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors bg-[#eeeeee] hover:bg-gray-300 text-[#1f1f1f] mb-8"
                >
                  {tier.cta}
                </Link>
              )}

              <div className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#555555]">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#777777]">
                      <svg className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value prop strip */}
      <section className="border-y border-[#e8e8e8] bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-black text-[#0b5cff] mb-1">No Ads</div>
            <p className="text-[#555555] text-sm">Every result is a real contractor profile — not a sponsored placement.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0b5cff] mb-1">Industry-Specific</div>
            <p className="text-[#555555] text-sm">Built for fiber, copper, and telecom splicing — not a generic contractor directory.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0b5cff] mb-1">Cancel Anytime</div>
            <p className="text-[#555555] text-sm">Month-to-month billing. No contracts, no cancellation fees.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
                <h3 className="text-[#1f1f1f] font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-3">Ready to get listed?</h2>
          <p className="text-[#555555] mb-6 text-sm">It takes less than 5 minutes to create your free listing.</p>
          <Link
            href="/list-your-business"
            className="inline-block bg-[#0b5cff] hover:bg-[#0946cc] text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Create Your Free Listing
          </Link>
        </div>
      </section>
    </div>
  )
}
