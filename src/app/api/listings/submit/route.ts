import { NextRequest } from 'next/server'

// Normalize full state names submitted by the form to 2-letter abbreviations
const STATE_ABBR: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY',
}

// Normalize service slugs from the form to display labels stored in the DB
const SERVICE_LABELS: Record<string, string> = {
  'fusion-splicing': 'Fusion Splicing',
  'mechanical-splicing': 'Mechanical Splicing',
  'copper-splicing': 'Copper Splicing',
  'osp-splicing': 'OSP Splicing',
  'otdr-testing': 'OTDR Testing',
  'emergency-service': 'Emergency Service',
}

function normalizeState(state: string): string {
  const trimmed = state.trim()
  return STATE_ABBR[trimmed] ?? trimmed.toUpperCase().slice(0, 2)
}

function normalizeServices(services: string[]): string[] {
  return services.map((s) => SERVICE_LABELS[s] ?? s)
}

function categoryToArray(category: string): string[] {
  if (category === 'MULTIPLE') return ['FIBER', 'TELECOM', 'COPPER']
  return [category]
}

interface SubmitBody {
  businessName: string
  phone: string
  website?: string
  email: string
  city: string
  state: string
  zip: string
  services: string[]
  category: 'FIBER' | 'TELECOM' | 'COPPER' | 'MULTIPLE'
  description: string
  certifications?: string
}

function validateBody(body: unknown): body is SubmitBody {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.businessName === 'string' && b.businessName.trim().length > 0 &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.city === 'string' && b.city.trim().length > 0 &&
    typeof b.state === 'string' && b.state.trim().length > 0 &&
    typeof b.zip === 'string' && /^\d{5}(-\d{4})?$/.test(b.zip) &&
    typeof b.category === 'string' && ['FIBER', 'TELECOM', 'COPPER', 'MULTIPLE'].includes(b.category) &&
    typeof b.description === 'string' && b.description.trim().length >= 50 &&
    Array.isArray(b.services)
  )
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    if (!validateBody(body)) {
      return Response.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const state = normalizeState(body.state)
    const services = normalizeServices(body.services)
    const category = categoryToArray(body.category)
    const baseSlug = slugify(`${body.businessName.trim()}-${body.city.trim()}-${state}`)

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
      const { prisma } = await import('@/lib/prisma')

      // Deduplicate: reject if same business name + city already exists
      const existing = await prisma.listing.findFirst({
        where: { businessName: body.businessName.trim(), city: body.city.trim() },
      })
      if (existing) {
        return Response.json({ error: 'A listing for this business already exists.' }, { status: 409 })
      }

      // Ensure slug is unique
      let slug = baseSlug
      let i = 1
      while (await prisma.listing.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${i++}`
      }

      await prisma.listing.create({
        data: {
          slug,
          businessName: body.businessName.trim(),
          phone: body.phone.trim(),
          website: body.website?.trim() ?? null,
          email: body.email.trim(),
          city: body.city.trim(),
          state,
          zip: body.zip.trim(),
          services,
          category,
          description: body.description.trim(),
          certifications: body.certifications
            ? body.certifications.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [],
          published: false,
          verified: false,
          rating: 0,
          reviewCount: 0,
          emergencyService: services.includes('Emergency Service'),
        },
      })

      return Response.json({ success: true }, { status: 201 })
    }

    console.log('[listings/submit] New submission received (no DB configured):', {
      businessName: body.businessName,
      email: body.email,
      city: body.city,
      state,
      category,
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('[listings/submit] Error:', error)
    return Response.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}
