import type { Metadata } from 'next'
import SearchResults from '@/components/search/SearchResults'

export const metadata: Metadata = {
  title: 'Search Cable Splicing Contractors',
  description:
    'Search for verified telecom, fiber optic, and copper cable splicing contractors by city, state, and service type.',
  robots: { index: false, follow: true },
}

interface Props {
  searchParams: Promise<{ city?: string; state?: string; category?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1f1f1f] mb-2">
            {params.category
              ? `${
                  params.category === 'FIBER'
                    ? 'Fiber Optic'
                    : params.category === 'COPPER'
                    ? 'Copper Cable'
                    : 'Telecom'
                } Splicing Contractors`
              : 'Cable Splicing Contractors'}
            {params.city ? ` in ${params.city}` : ''}
            {params.state ? `, ${params.state}` : ''}
          </h1>
          <p className="text-[#555555]">Browse verified contractors and request quotes.</p>
        </div>
        <SearchResults
          city={params.city}
          state={params.state}
          category={params.category}
          page={params.page ? parseInt(params.page) : 1}
        />
      </div>
    </div>
  )
}
