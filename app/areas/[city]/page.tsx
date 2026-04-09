import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cities, getCityBySlug } from '@/lib/cities'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'
import { Truck, ShieldCheck, CalendarX2, Check, Droplets, FlaskConical } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { COMPANY_NAME, BASE_URL, PHONES, FOUNDING_YEAR } from '@/lib/config'

// Generate static params for all cities
export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

// Dynamic SEO metadata per city
export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> }
): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return {}

  return {
    title: `Water Delivery in ${city.name}, CA | ${COMPANY_NAME}`,
    description: `Premium purified and alkaline water delivery in ${city.name}, ${city.county}. ${city.heroDesc} Start your delivery today.`,
    keywords: `water delivery ${city.name}, alkaline water ${city.name}, purified water delivery ${city.county}, ${city.name} water service`,
    alternates: {
      canonical: `/areas/${citySlug}`,
    },
  }
}

export default async function CityPage(
  { params }: { params: Promise<{ city: string }> }
) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const citySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Water Delivery in ${city.name}, CA`,
    description: city.heroDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY_NAME,
      telephone: PHONES.tollFree.intl,
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    url: `${BASE_URL}/areas/${city.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${BASE_URL}/#areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `${BASE_URL}/areas/${city.slug}`,
      },
    ],
  }

  const trustItems = [
    { icon: Truck,      label: `Delivering to ${city.name} since ${FOUNDING_YEAR}` },
    { icon: ShieldCheck, label: 'Locally Owned Business' },
    { icon: CalendarX2, label: 'No Long-Term Contract' },
  ]

  const products = [
    { icon: Droplets,    name: 'Purified Drinking Water', features: ['10-stage ultra filtration', 'Perfect, clean taste', '3 & 5 gallon bottles', 'Works with any cooler'], accent: false },
    { icon: FlaskConical,name: 'Alkaline Water pH 9.5',   features: ['Purified + remineralized', 'Organic mineral blend', 'Balances body pH', 'Superior hydration'], accent: true },
  ]

  return (
    <>
      <Script
        id={`city-schema-${city.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <Script
        id={`breadcrumb-schema-${city.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="min-h-[60vh] bg-gradient-to-br from-deeper via-navy to-ocean flex items-center pt-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 right-1/4 -translate-y-1/2"
              style={{ background: 'radial-gradient(circle, rgba(0,201,228,0.08) 0%, transparent 65%)' }} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto w-full py-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#areas" className="hover:text-white/70 transition-colors">Service Areas</Link>
              <span>/</span>
              <span className="text-white/60">{city.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-aqua/10 border border-aqua/30 text-aqua text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
              {city.county}
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Water Delivery<br />in <span className="text-aqua">{city.name}, CA</span>
            </h1>

            <p className="text-lg text-white/65 max-w-xl leading-relaxed mb-10">
              {city.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#order-form" className="bg-aqua text-navy px-8 py-4 rounded-lg font-bold hover:bg-aqua-light transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]">
                Start My Delivery in {city.name} →
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-4 rounded-lg font-medium hover:bg-white/05 hover:border-white/40 transition-all">
                Contact Us →
              </a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-ice border-y border-border py-5 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-5">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-navy">
                  <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-white" />
                  </div>
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Service area detail */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Coverage Area</p>
              <h2 className="text-4xl font-bold text-navy mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Neighborhoods We Serve in {city.name}
              </h2>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {city.neighborhoods.map((n) => (
                  <div key={n} className="flex items-center gap-2 text-sm text-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0" />
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Don&apos;t see your neighborhood? We likely still deliver to you.{' '}
                <a href="#order-form" className="text-sky font-semibold hover:underline">
                  Fill out our form
                </a>{' '}
                and we&apos;ll confirm delivery availability within 1 business day.
              </p>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted mb-3">Zip Codes We Serve</p>
                <div className="flex flex-wrap gap-2">
                  {city.zips.map((zip) => (
                    <span key={zip} className="bg-gray border border-border text-muted text-xs font-mono px-2.5 py-1 rounded-lg">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Who We Serve</p>
              <h2 className="text-4xl font-bold text-navy mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Water Delivery for Every Customer
              </h2>
              <div className="space-y-3">
                {city.customerTypes.map((type) => (
                  <div key={type} className="flex items-center gap-3 bg-gray rounded-xl px-4 py-3.5">
                    <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-aqua" />
                    </div>
                    <span className="text-sm font-medium text-dark">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 px-6 bg-gray">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Our Products</p>
              <h2 className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>
                Two Types of Premium Water
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.name} className={`bg-white rounded-2xl p-8 border-2 ${p.accent ? 'border-aqua/40' : 'border-border'}`}>
                    <div className="w-12 h-12 rounded-xl bg-ice flex items-center justify-center mb-4">
                      <Icon size={24} className="text-sky" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{p.name}</h3>
                    <ul className="space-y-2 mb-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-dark">
                          <Check size={14} className="text-sky flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#order-form" className="inline-flex items-center gap-2 bg-navy hover:bg-blue text-white px-5 py-3 rounded-lg font-bold text-sm transition-all">
                      Order in {city.name} →
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-gold text-2xl tracking-widest mb-6">★★★★★</div>
            <blockquote className="text-2xl text-white font-light leading-relaxed italic mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              &ldquo;{city.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aqua text-navy font-bold flex items-center justify-center">
                {city.testimonial.initials}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{city.testimonial.name}</div>
                <div className="text-white/50 text-sm">{city.testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Order form */}
        <div id="order-form">
          <OrderForm />
        </div>

        {/* Other cities */}
        <section className="py-16 px-6 bg-gray">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-navy mb-6 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
              Also Delivering To
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/areas/${c.slug}`}
                    className="bg-white border border-border text-navy px-5 py-2.5 rounded-full text-sm font-medium hover:border-sky hover:text-sky transition-all"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
