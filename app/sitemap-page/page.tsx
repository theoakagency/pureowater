import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { cities } from '@/lib/cities'
import { services } from '@/lib/services'
import { COMPANY_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `Sitemap | ${COMPANY_NAME}`,
  description: `Complete sitemap of all ${COMPANY_NAME} pages — service areas, products, and more.`,
}

const staticPages = [
  { label: 'Home',           href: '/' },
  { label: 'Products',       href: '/products' },
  { label: 'Current Offers', href: '/offers' },
  { label: 'About Us',       href: '/about' },
  { label: 'FAQ',            href: '/faq' },
  { label: 'Contact',        href: '/contact' },
]

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          badge="Site Navigation"
          title="Sitemap"
          subtitle={`A complete list of all pages on the ${COMPANY_NAME} website.`}
          breadcrumbs={[{ label: 'Sitemap', href: '#' }]}
          compact
        />

        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left column */}
            <div className="space-y-10">

              {/* Main pages */}
              <div>
                <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">
                  Main Pages
                </h2>
                <ul className="space-y-2">
                  {staticPages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="flex items-center gap-2 text-navy hover:text-sky transition-colors text-sm font-medium group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0 group-hover:scale-125 transition-transform" />
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">
                  Services
                </h2>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-2 text-navy hover:text-sky transition-colors text-sm font-medium group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0 group-hover:scale-125 transition-transform" />
                        {s.name} Water Delivery
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right column */}
            <div className="space-y-10">

              {/* Ventura County cities */}
              <div>
                <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">
                  Ventura County Service Areas
                </h2>
                <ul className="space-y-2">
                  {cities
                    .filter((c) => c.county === 'Ventura County')
                    .map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/areas/${city.slug}`}
                          className="flex items-center gap-2 text-navy hover:text-sky transition-colors text-sm font-medium group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0 group-hover:scale-125 transition-transform" />
                          Water Delivery in {city.name}, CA
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* LA County cities */}
              <div>
                <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">
                  Los Angeles County Service Areas
                </h2>
                <ul className="space-y-2">
                  {cities
                    .filter((c) => c.county === 'Los Angeles County')
                    .map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/areas/${city.slug}`}
                          className="flex items-center gap-2 text-navy hover:text-sky transition-colors text-sm font-medium group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0 group-hover:scale-125 transition-transform" />
                          Water Delivery in {city.name}, CA
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* XML sitemap note */}
        <section className="py-10 px-6 bg-gray border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm">
              Looking for the XML sitemap for search engines?
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              className="text-sky font-semibold text-sm hover:underline flex items-center gap-1"
            >
              View XML Sitemap →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
