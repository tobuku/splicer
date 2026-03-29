import { NextRequest } from 'next/server'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const BLACKLIST: string[] = [
  'roofing',
  'plumbing',
  'hvac',
  'restaurant',
  'pizza',
  'diner',
  'cafe',
  'bakery',
  'salon',
  'spa',
  'dental',
  'medical',
  'clinic',
  'hospital',
  'pharmacy',
  'grocery',
  'landscaping',
  'pest control',
  'cleaning service',
  'moving company',
  'painting',
  'flooring',
  'carpet',
  'drywall',
  'concrete',
  'masonry',
  'welding',
  'fencing',
  'pool',
  'solar',
  'insurance',
  'accounting',
  'attorney',
  'law firm',
  'real estate',
  'mortgage',
  'hotel',
  'motel',
  'auto repair',
  'tire',
  'car wash',
  'towing',
  'trucking',
  'delivery',
  'catering',
  'childcare',
  'daycare',
  'gym',
  'fitness',
  'yoga',
  'tattoo',
  'barbershop',
  'liquor',
  'dispensary',
  'church',
  'school',
  'university',
]

function isBlacklisted(businessName: string): boolean {
  const nameLower = businessName.toLowerCase()
  return BLACKLIST.some(keyword => nameLower.includes(keyword))
}

const recordSchema = z.object({
  business_name: z.string().min(1),
  phone: z.string().nullish(),
  website: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  category: z.array(z.enum(['TELECOM', 'FIBER', 'COPPER'])).min(1),
  services: z.array(z.string()).nullish(),
  description: z.string().nullish(),
  rating: z.number().nullish(),
  reviews_count: z.number().nullish(),
})

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let records: unknown[]
  try {
    records = await req.json()
    if (!Array.isArray(records)) throw new Error('Expected array')
  } catch {
    return Response.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  let imported = 0
  let skipped = 0
  let errors = 0
  const errorDetails: string[] = []

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    const { prisma } = await import('@/lib/prisma')

    for (const record of records) {
      const parsed = recordSchema.safeParse(record)
      if (!parsed.success) {
        errors++
        errorDetails.push(`Validation: ${JSON.stringify(parsed.error.flatten())}`)
        continue
      }

      const d = parsed.data

      // Blacklist check — skip non-splicing businesses silently
      if (isBlacklisted(d.business_name)) {
        skipped++
        continue
      }

      // Deduplicate
      const existing = await prisma.listing.findFirst({
        where: {
          OR: [
            { businessName: d.business_name, city: d.city },
            ...(d.phone ? [{ phone: d.phone }] : []),
          ],
        },
      })

      if (existing) { skipped++; continue }

      try {
        const slug = await (async () => {
          const base = slugify(`${d.business_name}-${d.city}-${d.state}`)
          let candidate = base
          let i = 1
          while (await prisma.listing.findUnique({ where: { slug: candidate } })) {
            candidate = `${base}-${i++}`
          }
          return candidate
        })()

        await prisma.listing.create({
          data: {
            slug,
            businessName: d.business_name,
            description: d.description,
            category: d.category,
            services: d.services || [],
            phone: d.phone,
            website: d.website,
            address: d.address,
            city: d.city,
            state: d.state,
            zip: d.zip,
            latitude: d.latitude,
            longitude: d.longitude,
            certifications: [],
            rating: d.rating,
            reviewCount: d.reviews_count || 0,
            published: false,
            importSource: 'api-import',
          },
        })
        imported++
      } catch (err) {
        errors++
        errorDetails.push(String(err))
      }
    }

    await prisma.importLog.create({
      data: {
        source: 'api-import',
        total: records.length,
        imported,
        skipped,
        errors,
      },
    })
  } else {
    return Response.json({ error: 'Database not configured' }, { status: 503 })
  }

  return Response.json({ success: true, imported, skipped, errors, errorDetails })
}
