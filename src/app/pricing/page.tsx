import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing | SpliceList — Cable Splicing Contractor Directory',
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
      'Featured placement in search',
      'Lead notification emails',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'Stand out from the competition with featured placement and a fully enhanced profile.',
    highlight: true,
    cta: 'Get Started with Pro',
    href: '/list-your-business?plan=pro',
    features: [
      'Everything in Free',
      'Featured badge on your listing',
      'Priority placement in search results',
      'Enhanced profile with photos and logo',
      'Lead notification emails',
      'Direct inquiry form on your profile',
      'Monthly performance summary',
      'Verified contractor badge',
    ],
    notIncluded: [
      'Analytics dashboard',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Enterprise',
    price: '$149',
    period: 'per month',
    description: 'Maximum visibility for high-volume contractors and multi-crew operations.',
    highlight: false,
    cta: 'Contact Sales',
    href: 'mailto:hello@splicelist.com?subject=Enterprise%20Plan%20Inquiry',
    features: [
      'Everything in Pro',
      'Top placement in category and city pages',
      'Full analytics dashboard with lead tracking',
      'Instant lead notifications via email and SMS',
      'Multiple service area listings under one account',
      'Dedicated account manager',
      'Custom profile URL',
      'Early access to new features',
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
    a: 'Annual billing discounts are coming soon. Email hello@splicelist.com to inquire about early access to annual pricing.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Get your cable splicing operation in front of the contractors who need you.
            Start free — upgrade when you want more visibility.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? 'bg-[#0ea5e9]/10 border-[#0ea5e9] shadow-[0_0_40px_rgba(14,165,233,0.15)]'
                  : 'bg-[#0f172a] border-slate-800'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0ea5e9] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-white font-bold text-xl mb-1">{tier.name}</h2>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  <span className="text-slate-400 text-sm mb-1">/{tier.period}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <Link
                href={tier.href}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors mb-8 ${
                  tier.highlight
                    ? 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {tier.cta}
              </Link>

              <div className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <section className="border-y border-slate-800 bg-[#0f172a] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-black text-[#0ea5e9] mb-1">No Ads</div>
            <p className="text-slate-400 text-sm">Every result is a real contractor profile — not a sponsored placement.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0ea5e9] mb-1">Industry-Specific</div>
            <p className="text-slate-400 text-sm">Built for fiber, copper, and telecom splicing — not a generic contractor directory.</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0ea5e9] mb-1">Cancel Anytime</div>
            <p className="text-slate-400 text-sm">Month-to-month billing. No contracts, no cancellation fees.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get listed?</h2>
          <p className="text-slate-400 mb-6 text-sm">It takes less than 5 minutes to create your free listing.</p>
          <Link
            href="/list-your-business"
            className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Create Your Free Listing
          </Link>
        </div>
      </section>
    </div>
  )
}
