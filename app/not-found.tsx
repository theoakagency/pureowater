import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br from-[#061c35] to-[#0d2b4e]">
        <div className="text-center max-w-lg">
          <div className="text-7xl mb-6">💧</div>
          <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>404</h1>
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Page Not Found
          </h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Looks like this page has dried up. Let&apos;s get you back to fresh water.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#00c9e4] text-[#0d2b4e] px-8 py-4 rounded-lg font-bold hover:bg-[#00dff8] transition-all"
            >
              Go Home
            </Link>
            <Link
              href="/#order"
              className="border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/05 transition-all"
            >
              Start My Delivery
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
