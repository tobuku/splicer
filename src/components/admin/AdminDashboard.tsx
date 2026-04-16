'use client'
import { useState, useEffect } from 'react'

interface Stats {
  total: number
  published: number
  pending: number
  leads: number
}

interface AdminListing {
  id: string
  businessName: string
  city: string
  state: string
  category: string[]
  published: boolean
  verified: boolean
  createdAt: string
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [listings, setListings] = useState<AdminListing[]>([])
  const [queue, setQueue] = useState<AdminListing[]>([])
  const [importJson, setImportJson] = useState('')
  const [importResult, setImportResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [queueLoading, setQueueLoading] = useState(false)

  const ADMIN_PASS = 'splice2025'

  useEffect(() => {
    if (sessionStorage.getItem('ADMIN_AUTHED') === 'true') {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (!authed) return
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {})
    fetch('/api/admin/listings').then(r => r.json()).then(d => setListings(d.listings || [])).catch(() => {})
    loadQueue()
  }, [authed])

  function loadQueue() {
    setQueueLoading(true)
    fetch('/api/admin/listings?published=false')
      .then(r => r.json())
      .then(d => setQueue(d.listings || []))
      .catch(() => {})
      .finally(() => setQueueLoading(false))
  }

  function login(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      sessionStorage.setItem('ADMIN_AUTHED', 'true')
      setAuthed(true)
    } else {
      alert('Incorrect password')
    }
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/admin/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    })
    setListings(prev => prev.map(l => l.id === id ? { ...l, published: !published } : l))
  }

  async function deleteListing(id: string) {
    if (!confirm('Delete this listing?')) return
    await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' })
    setListings(prev => prev.filter(l => l.id !== id))
  }

  // Review queue actions
  async function publishFromQueue(id: string) {
    await fetch(`/api/admin/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: true }),
    })
    setQueue(prev => prev.filter(l => l.id !== id))
    // Refresh main listings and stats
    fetch('/api/admin/listings').then(r => r.json()).then(d => setListings(d.listings || [])).catch(() => {})
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {})
  }

  async function rejectFromQueue(id: string) {
    if (!confirm('Delete this listing permanently?')) return
    await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' })
    setQueue(prev => prev.filter(l => l.id !== id))
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {})
  }

  async function runImport() {
    setLoading(true)
    setImportResult('')
    try {
      const data = JSON.parse(importJson)
      const res = await fetch('/api/import/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'splice2025'}`,
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setImportResult(JSON.stringify(result, null, 2))
      // Refresh queue after import since new records come in as unpublished
      loadQueue()
      fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {})
    } catch (e) {
      setImportResult('Error: ' + String(e))
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <form onSubmit={login} className="bg-white border border-[#e8e8e8] rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-[#1f1f1f] font-bold text-xl mb-6">Admin Access</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#1f1f1f] text-sm outline-none mb-4"
          />
          <button type="submit" className="w-full bg-[#0b5cff] text-white py-3 rounded-xl font-semibold">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-[#1f1f1f]">Admin Dashboard</h1>
          <button
            onClick={() => { sessionStorage.removeItem('ADMIN_AUTHED'); setAuthed(false) }}
            className="text-[#555555] hover:text-[#1f1f1f] text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Listings', value: stats.total },
              { label: 'Published', value: stats.published },
              { label: 'Pending Review', value: stats.pending },
              { label: 'Total Leads', value: stats.leads },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-[#e8e8e8] rounded-xl p-5">
                <div className="text-3xl font-bold text-[#0b5cff]">{s.value}</div>
                <div className="text-[#555555] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Review Queue */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-[#1f1f1f] font-semibold">Review Queue</h2>
              {queue.length > 0 && (
                <span className="text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full">
                  {queue.length} pending
                </span>
              )}
            </div>
            <button
              onClick={loadQueue}
              className="text-[#555555] hover:text-[#1f1f1f] text-xs transition-colors"
            >
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8]">
                  <th className="text-left text-[#555555] font-medium px-6 py-3">Business</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Location</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Category</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queueLoading ? (
                  <tr>
                    <td colSpan={4} className="text-[#777777] text-center py-8">Loading…</td>
                  </tr>
                ) : queue.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-[#777777] text-center py-8">Queue is empty — nothing to review</td>
                  </tr>
                ) : queue.map((l) => (
                  <tr key={l.id} className="border-b border-[#e8e8e8]/50 hover:bg-[#f5f5f5]">
                    <td className="px-6 py-3 text-[#1f1f1f] font-medium">{l.businessName}</td>
                    <td className="px-4 py-3 text-[#555555]">{l.city}, {l.state}</td>
                    <td className="px-4 py-3 text-[#555555]">{l.category.join(', ')}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => publishFromQueue(l.id)}
                          className="text-xs bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-600/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => rejectFromQueue(l.id)}
                          className="text-xs bg-red-900/20 hover:bg-red-900/40 border border-red-700/40 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Reject / Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Listings table */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
            <h2 className="text-[#1f1f1f] font-semibold">Listings</h2>
            <a href="/admin/listings" className="text-[#0b5cff] text-sm hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8]">
                  <th className="text-left text-[#555555] font-medium px-6 py-3">Business</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Location</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Category</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Status</th>
                  <th className="text-left text-[#555555] font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-[#777777] text-center py-8">No listings found</td>
                  </tr>
                ) : listings.map((l) => (
                  <tr key={l.id} className="border-b border-[#e8e8e8]/50 hover:bg-[#f5f5f5]">
                    <td className="px-6 py-3 text-[#1f1f1f] font-medium">{l.businessName}</td>
                    <td className="px-4 py-3 text-[#555555]">{l.city}, {l.state}</td>
                    <td className="px-4 py-3 text-[#555555]">{l.category.join(', ')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${l.published ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                        {l.published ? 'Published' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublish(l.id, l.published)}
                          className="text-xs bg-[#eeeeee] hover:bg-gray-300 text-[#1f1f1f] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {l.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deleteListing(l.id)}
                          className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Import section */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6">
          <h2 className="text-[#1f1f1f] font-semibold mb-2">Import Listings (JSON)</h2>
          <p className="text-[#555555] text-sm mb-4">
            Paste a JSON array of listings from Outscraper / Google Sheets export.
          </p>
          <textarea
            value={importJson}
            onChange={e => setImportJson(e.target.value)}
            rows={8}
            placeholder='[{"business_name": "...", "city": "...", "state": "...", "category": ["FIBER"], ...}]'
            className="w-full bg-[#f0f0f0] border border-[#e8e8e8] rounded-xl px-4 py-3 text-[#555555] font-mono text-xs outline-none mb-4 resize-none"
          />
          <button
            onClick={runImport}
            disabled={loading || !importJson.trim()}
            className="bg-[#0b5cff] hover:bg-[#0946cc] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            {loading ? 'Importing...' : 'Run Import'}
          </button>
          {importResult && (
            <pre className="mt-4 bg-[#f8f8f8] border border-[#e8e8e8] rounded-xl p-4 text-xs text-[#555555] overflow-auto max-h-48">
              {importResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
