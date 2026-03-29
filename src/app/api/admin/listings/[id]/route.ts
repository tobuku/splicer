import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')
      const listing = await prisma.listing.update({ where: { id }, data: body })
      return NextResponse.json(listing)
    } catch {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  }
  return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
    try {
      const { prisma } = await import('@/lib/prisma')
      await prisma.listing.delete({ where: { id } })
      return NextResponse.json({ success: true })
    } catch {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  }
  return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
}
