'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d2b4e]/97 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Pure O Water" width={140} height={48} className="h-10 w-auto" priority />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: 'Products', href: '/products' },
            { label: 'Service Areas', href: '/#areas' },
            { label: 'Offers', href: '/offers' },
            { label: 'FAQ', href: '/faq' },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-white/75 hover:text-[#00c9e4] text-sm font-medium tracking-wide transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#order"
              className="bg-[#00c9e4] text-[#0d2b4e] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#00dff8] transition-all hover:-translate-y-0.5"
            >
              Start My Delivery →
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a2240] border-t border-white/10 px-6 py-4 space-y-3">
          {['Products', 'Service Areas', 'Offers', 'FAQ'].map((item) => (
            <a
              key={item}
              href={item === 'Service Areas' ? '/#areas' : `/${item.toLowerCase().replace(/ /g, '-')}`}
              className="block text-white/75 py-2 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            className="block bg-[#00c9e4] text-[#0d2b4e] text-center py-3 rounded-lg font-bold text-sm mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Start My Delivery →
          </a>
        </div>
      )}
    </nav>
  )
}
