import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')

      const publishedParam = req.nextUrl.searchParams.get('published')

      // Build where clause based on query param
      // ?published=false  → only unpublished
      // ?published=true   → only published
      // (no param)        → all listings
      let where: { published?: boolean } = {}
      if (publishedParam === 'false') {
        where = { published: false }
      } else if (publishedParam === 'true') {
        where = { published: true }
      }

      const listings = await prisma.listing.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 200,
      })
      return NextResponse.json({ listings })
    } catch {
      return NextResponse.json({ listings: [] })
    }
  }
  return NextResponse.json({ listings: [] })
}
