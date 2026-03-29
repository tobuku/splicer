import { NextResponse } from 'next/server'

export async function POST() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')
      const result = await prisma.listing.updateMany({
        where: { published: false },
        data: { published: true },
      })
      return NextResponse.json({ success: true, published: result.count })
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 500 })
    }
  }
  return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
}
