import { MetadataRoute } from 'next'
import { MAJOR_CITIES } from '@/lib/cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://splicelist.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/fiber-optic-splicing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/telecom-cable-splicing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/copper-cable-splicing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
{ url: `${base}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ]

  const cityRoutes: MetadataRoute.Sitemap = MAJOR_CITIES.map((city) => ({
    url: `${base}/locations/${city.stateSlug}/${city.city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...cityRoutes]
}
