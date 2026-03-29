import { NextRequest } from 'next/server'

interface SubmitBody {
  businessName: string
  phone: string
  website?: string
  email: string
  city: string
  state: string
  zip: string
  services: string[]
  category: 'FIBER' | 'TELECOM' | 'COPPER'
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
    typeof b.category === 'string' && ['FIBER', 'TELECOM', 'COPPER'].includes(b.category) &&
    typeof b.description === 'string' && b.description.trim().length >= 50 &&
    Array.isArray(b.services)
  )
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

    // If a real DB is configured, persist via Prisma
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
      const { prisma } = await import('@/lib/prisma')
      await prisma.listing.create({
        data: {
          businessName: body.businessName.trim(),
          phone: body.phone.trim(),
          website: body.website?.trim() ?? null,
          email: body.email.trim(),
          city: body.city.trim(),
          state: body.state.trim(),
          zip: body.zip.trim(),
          services: body.services,
          category: [body.category],
          description: body.description.trim(),
          certifications: body.certifications
            ? body.certifications.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [],
          published: false,
          verified: false,
          rating: 0,
          reviewCount: 0,
          emergencyService: body.services.includes('emergency-service'),
          slug: `${body.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${body.city.toLowerCase().replace(/\s+/g, '-')}`,
        },
      })

      return Response.json({ success: true }, { status: 201 })
    }

    // No DB — log to console in dev so submission is not silently dropped
    console.log('[listings/submit] New submission received (no DB configured):', {
      businessName: body.businessName,
      email: body.email,
      city: body.city,
      state: body.state,
      category: body.category,
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('[listings/submit] Error:', error)
    return Response.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}
