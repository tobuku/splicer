import { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const REPORTS_FILE = path.join(process.cwd(), 'data', 'reports.json')

export async function POST(req: NextRequest) {
  let body: { listingId?: unknown; reason?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listingId, reason } = body

  if (!listingId || typeof listingId !== 'string') {
    return Response.json({ error: 'listingId is required' }, { status: 400 })
  }
  if (!reason || typeof reason !== 'string') {
    return Response.json({ error: 'reason is required' }, { status: 400 })
  }

  const entry = {
    id: crypto.randomUUID(),
    listingId,
    reason,
    createdAt: new Date().toISOString(),
  }

  // Read existing reports, append, write back
  let reports: typeof entry[] = []
  try {
    const raw = await fs.readFile(REPORTS_FILE, 'utf-8')
    reports = JSON.parse(raw)
    if (!Array.isArray(reports)) reports = []
  } catch {
    // File doesn't exist yet or is malformed — start fresh
    reports = []
  }

  reports.push(entry)

  try {
    await fs.mkdir(path.dirname(REPORTS_FILE), { recursive: true })
    await fs.writeFile(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write reports.json:', err)
    return Response.json({ error: 'Failed to save report' }, { status: 500 })
  }

  return Response.json({ success: true })
}
