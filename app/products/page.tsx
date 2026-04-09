import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Microscope, Gem, Smile, Plug, FlaskConical, Leaf, BarChart2, Zap, Shield, Scale, Droplets } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { COMPANY_NAME, BASE_URL, PRICING } from '@/lib/config'

export const metadata: Metadata = {
  title: `Our Products | ${COMPANY_NAME}`,
  description: 'Premium purified water and alkaline water (pH 9.5) delivered to your home or office. 10-stage filtration, organic mineral blend, available in 3 and 5 gallon bottles.',
  alternates: {
    canonical: '/products',
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'Purified Drinking Water',
      description:
        '10-stage ultra-filtered purified water. Removes 99.9% of contaminants. Available in 3 and 5 gallon BPA-free bottles.',
      brand: { '@type': 'Brand', name: COMPANY_NAME },
      offers: {
        '@type': 'Offer',
        price: String(PRICING.purified),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'LocalBusiness', name: COMPANY_NAME },
      },
      url: `${BASE_URL}/products`,
    },
    {
      '@type': 'Product',
      name: 'Alkaline Water pH 9.5',
      description:
        'Purified and remineralized alkaline water at pH 9.5. Organic mineral blend with calcium, magnesium, and potassium. Available in 3 and 5 gallon BPA-free bottles.',
      brand: { '@type': 'Brand', name: COMPANY_NAME },
      offers: {
        '@type': 'Offer',
        price: String(PRICING.alkaline),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'LocalBusiness', name: COMPANY_NAME },
      },
      url: `${BASE_URL}/products`,
    },
    {
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
          name: 'Products',
          item: `${BASE_URL}/products`,
        },
      ],
    },
  ],
}

const purifiedFeatures = [
  { icon: Microscope,   title: '10-Stage Filtration', desc: 'Water passes through ten distinct filtration stages including sediment, carbon block, reverse osmosis, and UV sterilization.' },
  { icon: Gem,          title: 'Perfect Purity', desc: 'Removes 99.9% of contaminants, chlorine, heavy metals, bacteria, and dissolved solids leaving only pure H₂O.' },
  { icon: Smile,        title: 'Perfect Taste', desc: 'No aftertaste, no odor — just clean, crisp water exactly as nature intended.' },
  { icon: Plug,         title: 'Universal Fit', desc: 'Compatible with every standard water cooler dispenser. Works for homes, offices, gyms, and restaurants.' },
]

const alkalineFeatures = [
  { icon: FlaskConical, title: 'Purified First', desc: 'Starts as our same 10-stage purified water — completely clean before the mineral process begins.' },
  { icon: Leaf,         title: 'Organic Mineral Blend', desc: 'Remineralized with a proprietary blend of organic minerals including calcium, magnesium, and potassium.' },
  { icon: BarChart2,    title: 'pH 9.5', desc: 'Precisely balanced to pH 9.5 — the optimal alkaline level for neutralizing acidity in the body.' },
  { icon: Zap,          title: 'Superior Hydration', desc: 'Smaller water molecule clusters allow for faster cellular absorption and better hydration than regular water.' },
  { icon: Shield,       title: 'Antioxidant Properties', desc: 'Negative ORP (Oxidation Reduction Potential) helps neutralize free radicals and reduce oxidative stress.' },
  { icon: Scale,        title: 'Balances Body pH', desc: 'Helps counter the acidic effects of modern diets, coffee, stress, and environmental factors.' },
]

const bottles = [
  { size: '5 Gallon', best: 'Offices, families, high-volume use', dimensions: '11" W × 19" H', weight: '42 lbs (full)', compatible: 'All standard top-load & bottom-load coolers' },
  { size: '3 Gallon', best: 'Small households, tight spaces, seniors', dimensions: '9" W × 14" H', weight: '25 lbs (full)', compatible: 'All standard top-load & bottom-load coolers' },
]

const faqs = [
  { q: 'How often will bottles be delivered?', a: 'You choose — weekly, every 2 weeks, or monthly. We can also do on-demand delivery if you run low between scheduled dates.' },
  { q: 'Do I need a water cooler?', a: 'Not necessarily. We can rent you a cooler as part of your service, or you can use your own existing cooler. Both options work great.' },
  { q: 'Can I switch between water types?', a: 'Absolutely. You can order both purified and alkaline water, or switch at any time — just let us know.' },
  { q: 'What do I do with empty bottles?', a: 'Leave them at your door. We pick them up at no charge during your next delivery.' },
]

export default function ProductsPage() {
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main>
        <PageHero
          badge={`${COMPANY_NAME} Products`}
          title="Two Choices."
          titleAccent="One Standard of Excellence."
          subtitle="Every bottle is produced through a rigorous 10-stage filtration process at our local facility before it reaches your door."
          breadcrumbs={[{ label: 'Products', href: '#' }]}
        />

        {/* Purified Water */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy to-blue flex items-center justify-center mb-6">
                  <Droplets size={36} className="text-white" />
                </div>
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-3">Product 01</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Purified Drinking Water
                </h2>
                <p className="text-muted text-lg leading-relaxed mb-8">
                  Our purified water is processed through an advanced 10-stage filtration system at our local facility. The result is water so clean and pure, it speaks for itself — no chemicals, no contaminants, just perfect water.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-gray text-muted text-sm font-medium px-4 py-2 rounded-full">3 & 5 gallon available</span>
                </div>
                <a href="#order" className="inline-flex items-center gap-2 bg-navy hover:bg-blue text-white px-7 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5">
                  Order Purified Drinking Water →
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {purifiedFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="bg-gray rounded-2xl p-5">
                      <div className="w-9 h-9 rounded-lg bg-ice flex items-center justify-center mb-3">
                        <Icon size={18} className="text-sky" />
                      </div>
                      <h3 className="font-bold text-navy mb-2 text-sm">{f.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-16" />

        {/* Alkaline Water */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alkalineFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="bg-gray rounded-2xl p-5">
                      <div className="w-9 h-9 rounded-lg bg-ice flex items-center justify-center mb-3">
                        <Icon size={18} className="text-sky" />
                      </div>
                      <h3 className="font-bold text-navy mb-2 text-sm">{f.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#062244] to-[#00b4d8] flex items-center justify-center mb-6">
                  <FlaskConical size={36} className="text-white" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky">Product 02</p>
                  <span className="bg-aqua/20 text-[#007a8a] text-xs font-bold px-3 py-1 rounded-full">pH 9.5</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Alkaline Water
                </h2>
                <p className="text-muted text-lg leading-relaxed mb-8">
                  Our alkaline water starts as purified water, then goes through a remineralization process using a proprietary organic mineral blend. The result is water at pH 9.5 — perfectly balanced for superior hydration and health benefits.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-gray text-muted text-sm font-medium px-4 py-2 rounded-full">3 & 5 gallon available</span>
                </div>
                <a href="#order" className="inline-flex items-center gap-2 bg-aqua hover:bg-aqua-light text-navy px-7 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5">
                  Order Alkaline Water →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottle sizes */}
        <section className="py-20 px-6 bg-gray">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-3">Sizing Options</p>
              <h2 className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>Choose Your Bottle Size</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {bottles.map((b) => (
                <div key={b.size} className="bg-white border-2 border-border rounded-2xl p-8 hover:border-sky transition-all">
                  <div className="w-10 h-10 rounded-xl bg-ice flex items-center justify-center mb-4">
                    <Droplets size={22} className="text-sky" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{b.size}</h3>
                  <p className="text-sm font-medium text-sky mb-5">Best for: {b.best}</p>
                  <dl className="space-y-2">
                    {[
                      ['Dimensions', b.dimensions],
                      ['Weight', b.weight],
                      ['Compatible with', b.compatible],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3 text-sm">
                        <dt className="text-muted w-28 flex-shrink-0">{k}</dt>
                        <dd className="text-dark font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cooler rental CTA */}
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                Need a Water Cooler?
              </h2>
              <p className="text-white/60 text-lg">
                We offer cooler rentals as part of your delivery service — hot and cold dispensers available for home and office.
              </p>
            </div>
            <a href="/#order" className="flex-shrink-0 bg-aqua text-navy px-8 py-4 rounded-lg font-bold hover:bg-aqua-light transition-all whitespace-nowrap">
              Ask About Cooler Rental →
            </a>
          </div>
        </section>

        {/* Mini FAQ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-3">Quick Answers</p>
              <h2 className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>Product Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="border border-border rounded-xl p-6">
                  <h3 className="font-bold text-navy mb-2 text-sm">{item.q}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/faq" className="text-sky font-semibold hover:underline text-sm">View all FAQs →</a>
            </div>
          </div>
        </section>

        {/* Order Form */}
        <div id="order">
          <OrderForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
