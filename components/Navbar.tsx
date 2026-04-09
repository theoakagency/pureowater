'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { COMPANY_NAME, IMAGES } from '@/lib/config'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src={IMAGES.logo} alt={COMPANY_NAME} width={160} height={56} className="h-12 w-auto" priority />
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
                className="text-navy hover:text-sky text-sm font-medium tracking-wide transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#order"
              className="bg-aqua text-navy px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-aqua-light transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Start My Delivery →
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-navy p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-navy transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-navy transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-navy transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {['Products', 'Service Areas', 'Offers', 'FAQ'].map((item) => (
            <a
              key={item}
              href={item === 'Service Areas' ? '/#areas' : `/${item.toLowerCase().replace(/ /g, '-')}`}
              className="block text-navy py-2 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            className="block bg-aqua text-navy text-center py-3 rounded-lg font-bold text-sm mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Start My Delivery →
          </a>
        </div>
      )}
    </nav>
  )
}
