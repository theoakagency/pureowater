import Image from 'next/image'
import { COMPANY_NAME, IMAGES, PHONES, REGIONS, REGION_SHORT } from '@/lib/config'

const footerLinks = {
  Products: [
    { label: 'Purified Drinking Water', href: '/products' },
    { label: 'Alkaline Water',     href: '/products' },
    { label: 'Office Delivery',    href: '/services/office' },
    { label: 'Restaurant Service', href: '/services/restaurant' },
    { label: 'Home Delivery',      href: '/services/home' },
    { label: 'Gym & Fitness',      href: '/services/gym' },
    { label: 'Catering & Craft',   href: '/services/catering' },
  ],
  'Service Areas': [
    { label: 'Oxnard',          href: '/areas/oxnard' },
    { label: 'Ventura',         href: '/areas/ventura' },
    { label: 'Camarillo',       href: '/areas/camarillo' },
    { label: 'Thousand Oaks',   href: '/areas/thousand-oaks' },
    { label: 'Simi Valley',     href: '/areas/simi-valley' },
    { label: 'Moorpark',        href: '/areas/moorpark' },
    { label: 'Ojai',            href: '/areas/ojai' },
    { label: 'Santa Paula',     href: '/areas/santa-paula' },
    { label: 'Fillmore',        href: '/areas/fillmore' },
    { label: 'Santa Clarita',   href: '/areas/santa-clarita' },
    { label: 'Antelope Valley', href: '/areas/antelope-valley' },
  ],
  Company: [
    { label: 'About Us',       href: '/about' },
    { label: 'Current Offers', href: '/offers' },
    { label: 'FAQ',            href: '/faq' },
    { label: 'Contact',        href: '/contact' },
    { label: 'Sitemap',        href: '/sitemap-page' },
    { label: 'Admin Login',    href: '/admin' },
  ],
}

const phoneList = [PHONES.primary, PHONES.secondary, PHONES.tollFree]

export default function Footer() {
  return (
    <footer className="bg-deeper text-white/60 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image src={IMAGES.logo} alt={COMPANY_NAME} width={140} height={48} className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium purified and alkaline water delivered to homes, offices, and businesses across {REGION_SHORT}.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              {phoneList.map((phone) => (
                <div key={phone.label}>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{phone.label}</div>
                  <a href={phone.href} className="text-aqua font-semibold hover:text-aqua-light transition-colors">{phone.display}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/55 hover:text-aqua text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/08 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
          <span>{REGIONS.join(' \u00B7 ')}</span>
        </div>
      </div>
    </footer>
  )
}
