import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, getServiceBySlug } from '@/lib/services'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceFAQ from '@/components/ServiceFAQ'
import Link from 'next/link'
import Script from 'next/script'
import { Check } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import {
  Droplets, DollarSign, Clock, Package,
  Coffee, Users, RefreshCw, ShieldCheck,
  ShoppingCart, Trash2, Zap, Star,
  LucideIcon,
} from 'lucide-react'

// Map icon string names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Droplets, DollarSign, Clock, Package,
  Coffee, Users, RefreshCw, ShieldCheck,
  ShoppingCart, Trash2, Zap, Star,
}

export async function generateStaticParams() {
  return services.map((s) => ({ type: s.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ type: string }> }
): Promise<Metadata> {
  const { type } = await params
  const service = getServiceBySlug(type)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDesc,
    alternates: {
      canonical: `/services/${type}`,
    },
  }
}

export default async function ServicePage(
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params
  const service = getServiceBySlug(type)
  if (!service) notFound()

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pureowater.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.headline,
    description: service.heroDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Pure O Water',
      telephone: '+18445227000',
      url: BASE_URL,
    },
    url: `${BASE_URL}/services/${service.slug}`,
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
        name: 'Services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `${BASE_URL}/services/${service.slug}`,
      },
    ],
  }

  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <Script
        id={`service-schema-${service.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id={`breadcrumb-schema-${service.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="min-h-[60vh] bg-gradient-to-br from-[#061c35] via-[#0d2b4e] to-[#0f4a7a] flex items-center pt-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 right-1/4 -translate-y-1/2"
              style={{ background: 'radial-gradient(circle, rgba(0,201,228,0.08) 0%, transparent 65%)' }} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto w-full py-20">
            <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">Services</span>
              <span>/</span>
              <span className="text-white/60">{service.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#00c9e4]/10 border border-[#00c9e4]/30 text-[#00c9e4] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9e4] animate-pulse" />
              {service.name} Delivery
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              {service.headline}
            </h1>
            <p className="text-xl text-[#00c9e4] font-medium mb-5">{service.subheadline}</p>
            <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-10">{service.heroDesc}</p>

            <div className="flex flex-wrap gap-4">
              <a href="/#order" className="bg-[#00c9e4] text-[#0d2b4e] px-8 py-4 rounded-lg font-bold hover:bg-[#00dff8] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]">
                Start My Delivery →
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-4 rounded-lg font-medium hover:bg-white/05 hover:border-white/40 transition-all">
                Contact Us →
              </a>
            </div>
          </div>
        </section>

        {/* ── Pain Points ── */}
        <section className="py-20 px-6 bg-[#f4f7fa]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-3">We Get It</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Sound Familiar?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.painPoints.map((point) => {
                const Icon = ICON_MAP[point.icon] ?? Droplets
                return (
                  <div key={point.title} className="bg-white rounded-2xl p-6 border border-[#d0e4ef]">
                    <div className="w-11 h-11 rounded-xl bg-[#e8f6fb] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#1e90d6]" />
                    </div>
                    <h3 className="font-bold text-[#0d2b4e] mb-2 text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {point.title}
                    </h3>
                    <p className="text-[#5a7080] text-sm leading-relaxed">{point.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Benefits + Typical Order ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Benefits */}
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">What You Get</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e] mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Everything Your {service.name} Needs
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#e8f6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#1e90d6]" />
                    </div>
                    <span className="text-[#1a2a3a] text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical order card */}
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Example Setup</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e] mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Typical Order for a {service.name}
              </h2>
              <div className="bg-gradient-to-br from-[#0d2b4e] to-[#1565c0] rounded-2xl p-8 text-white">
                <dl className="space-y-5">
                  {[
                    { label: 'Bottles per delivery', value: service.typicalOrder.bottles },
                    { label: 'Bottle size',          value: service.typicalOrder.size },
                    { label: 'Frequency',             value: service.typicalOrder.frequency },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <dt className="text-white/60 text-sm">{label}</dt>
                      <dd className="font-bold text-white text-base">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs">No contracts. Cancel or adjust anytime.</p>
                </div>
              </div>
              <a
                href="/#order"
                className="mt-5 w-full block text-center bg-[#00c9e4] text-[#0d2b4e] py-4 rounded-xl font-bold text-base hover:bg-[#00dff8] transition-all hover:-translate-y-0.5"
              >
                Set Up My {service.name} Delivery →
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="py-20 px-6 bg-[#0d2b4e]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#f0a500] text-2xl tracking-widest mb-6">★★★★★</div>
            <blockquote className="text-2xl text-white font-light leading-relaxed italic mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              &ldquo;{service.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00c9e4] text-[#0d2b4e] font-bold flex items-center justify-center text-sm">
                {service.testimonial.initials}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{service.testimonial.name}</div>
                <div className="text-white/50 text-sm">{service.testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-3">Questions</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Common Questions About {service.name} Delivery
              </h2>
            </div>
            <ServiceFAQ items={service.faq} />
            <div className="mt-8 text-center">
              <a href="/faq" className="text-[#1e90d6] font-semibold hover:underline text-sm">View all FAQs →</a>
            </div>
          </div>
        </section>

        {/* ── Order Form ── */}
        <div id="order-form">
          <OrderForm />
        </div>

        {/* ── Other Services ── */}
        <section className="py-16 px-6 bg-[#f4f7fa]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-[#0d2b4e] mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
              We Also Serve
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-white border-2 border-[#d0e4ef] rounded-2xl p-6 hover:border-[#1e90d6] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(21,101,192,0.1)] transition-all group"
                >
                  <h4 className="font-bold text-[#0d2b4e] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{s.name}</h4>
                  <p className="text-[#5a7080] text-sm leading-relaxed mb-3">{s.subheadline}</p>
                  <span className="text-[#1e90d6] text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                    Learn more →
                  </span>
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
