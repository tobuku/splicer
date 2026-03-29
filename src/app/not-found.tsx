import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-black text-[#0ea5e9]/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          That page doesn&apos;t exist. Try searching for a contractor or browse by service type.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-[#0ea5e9] text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
            Home
          </Link>
          <Link href="/search" className="bg-[#0f172a] border border-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-semibold">
            Search Contractors
          </Link>
          <Link href="/fiber-optic-splicing" className="bg-[#0f172a] border border-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-semibold">
            Fiber Optic
          </Link>
        </div>
      </div>
    </div>
  )
}
