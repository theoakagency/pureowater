const footerLinks = {
  Products: ['Purified Water', 'Alkaline Water', 'Water Cooler Rental', 'Office Delivery', 'Restaurant Service'],
  'Service Areas': ['Oxnard', 'Ventura', 'Santa Clarita', 'Antelope Valley', 'Thousand Oaks'],
  Company: ['About Us', 'Current Offers', 'FAQ', 'Contact', 'Admin Login'],
}

import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#061c35] text-white/60 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image src="/logo.png" alt="Pure O Water" width={140} height={48} className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium purified and alkaline water delivered to homes, offices, and businesses across Southern California.
            </p>
            <a href="tel:+18055227002" className="flex items-center gap-2 mt-5 text-[#00c9e4] font-bold text-lg hover:text-[#00dff8] transition-colors">
              <Phone size={18} />
              (805) 522-7002
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Admin Login' ? '/admin' : '#'}
                      className="text-white/55 hover:text-[#00c9e4] text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/08 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© 2025 Pure O Water. All rights reserved.</span>
          <span>Ventura County · Santa Clarita · Antelope Valley</span>
        </div>
      </div>
    </footer>
  )
}
