import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import HowItWorks from '@/components/home/HowItWorks'
import TrustBar from '@/components/home/TrustBar'
import BlogPreview from '@/components/home/BlogPreview'

export const metadata: Metadata = {
  title: 'Find Cable Splicing Contractors Near You',
  description: 'SpliceList connects you with certified telecom, fiber optic, and copper cable splicing contractors across the United States. Get quotes from verified splice crews today.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <HowItWorks />
      <BlogPreview />
    </>
  )
}
