import { NextRequest } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  listingId: z.string().min(1),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { listingId, name, email, phone, message } = parsed.data

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
      const { prisma } = await import('@/lib/prisma')

      // Basic rate limit: one lead per email+listing per 24h
      const recent = await prisma.lead.findFirst({
        where: {
          listingId,
          email,
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      })
      if (recent) {
        return Response.json({ error: 'Already submitted recently' }, { status: 429 })
      }

      await prisma.lead.create({ data: { listingId, name, email, phone, message } })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
