import { NextResponse } from 'next/server'

export async function GET() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')
      const [total, published, leads] = await Promise.all([
        prisma.listing.count(),
        prisma.listing.count({ where: { published: true } }),
        prisma.lead.count(),
      ])
      return NextResponse.json({ total, published, pending: total - published, leads })
    } catch {
      return NextResponse.json({ total: 0, published: 0, pending: 0, leads: 0 })
    }
  }
  return NextResponse.json({ total: 6, published: 4, pending: 2, leads: 0 })
}
