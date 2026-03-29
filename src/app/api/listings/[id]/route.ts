import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
      const { prisma } = await import('@/lib/prisma')
      const listing = await prisma.listing.findFirst({
        where: { OR: [{ id }, { slug: id }], published: true },
        include: { reviews: { orderBy: { createdAt: 'desc' }, take: 10 } },
      })
      if (!listing) return Response.json({ error: 'Not found' }, { status: 404 })
      return Response.json(listing)
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
