import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-black text-[#0b5cff]/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#1f1f1f] mb-3">Page Not Found</h1>
        <p className="text-[#555555] mb-8">
          That page doesn&apos;t exist. Try searching for a contractor or browse by service type.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-[#0b5cff] text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
            Home
          </Link>
          <Link href="/search" className="bg-white border border-[#e8e8e8] text-[#555555] px-5 py-2.5 rounded-xl text-sm font-semibold">
            Search Contractors
          </Link>
          <Link href="/fiber-optic-splicing" className="bg-white border border-[#e8e8e8] text-[#555555] px-5 py-2.5 rounded-xl text-sm font-semibold">
            Fiber Optic
          </Link>
        </div>
      </div>
    </div>
  )
}
