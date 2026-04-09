import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Heart, Gem, Clock, Users } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { COMPANY_NAME, FOUNDING_YEAR, STATS, REGIONS, REGION_SHORT } from '@/lib/config'

export const metadata: Metadata = {
  title: `About Us | ${COMPANY_NAME}`,
  description: `${COMPANY_NAME} has been delivering premium purified and alkaline water across ${REGIONS[0]} and surrounding areas since ${FOUNDING_YEAR}. A locally owned business built on quality and reliability.`,
}

const values = [
  { icon: Heart, title: 'Locally Owned', desc: `We are a local business rooted in the communities we serve. When you choose ${COMPANY_NAME}, you are supporting local.` },
  { icon: Gem,   title: 'Quality Without Compromise', desc: 'Every bottle goes through our 10-stage filtration process. We never cut corners on water quality, because your health depends on it.' },
  { icon: Clock, title: 'Reliable & Consistent', desc: 'We show up when we say we will. Our delivery team has served many customers for years because consistency matters more than anything.' },
  { icon: Users, title: 'Community First', desc: `We live and work in the same communities we deliver to. Supporting ${COMPANY_NAME} means supporting local.` },
]

const timeline = [
  { year: String(FOUNDING_YEAR), title: `Founded in ${REGIONS[0]}`, desc: `${COMPANY_NAME} started with a single delivery route and a commitment to bringing better water to local families.` },
  { year: '2008', title: 'Expanded to Offices & Business', desc: 'Demand from local businesses led us to expand our commercial delivery service, serving offices, restaurants, and gyms.' },
  { year: '2012', title: 'Alkaline Water Added', desc: 'We added our pH 9.5 alkaline water line in response to growing customer interest in the health benefits of alkaline hydration.' },
  { year: '2018', title: 'Santa Clarita & Antelope Valley', desc: 'Expanded delivery routes to serve Santa Clarita, Palmdale, Lancaster, and surrounding communities.' },
  { year: String(new Date().getFullYear()), title: `Serving ${STATS.customers} Customers`, desc: `Today we proudly serve thousands of homes, offices, and businesses across ${REGION_SHORT}.` },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          badge="Our Story"
          title="Small Enough to Care."
          titleAccent="Big Enough to Deliver."
          subtitle={`${COMPANY_NAME} has been a trusted name in ${REGION_SHORT} water delivery since ${FOUNDING_YEAR}. A locally owned business built on quality, reliability, and personal service.`}
          breadcrumbs={[{ label: 'About Us', href: '#' }]}
        />

        {/* Mission */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Our Mission</p>
              <h2 className="text-4xl font-bold text-navy leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Better Water for Every Home and Business in Southern California
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-5">
                We started {COMPANY_NAME} because we believed our community deserved access to truly clean, high-quality water — without having to pay big-brand prices or sacrifice on service.
              </p>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Twenty years later, that belief hasn&apos;t changed. We still personally oversee every batch of water, know many of our customers by name, and treat every delivery like it matters — because it does.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                {[
                  { num: STATS.yearsInBusiness, label: 'Years in business' },
                  { num: STATS.customers, label: 'Active customers' },
                  { num: STATS.communities, label: 'Communities served' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>{s.num}</div>
                    <div className="text-sm text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-gray">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-3">What We Stand For</p>
              <h2 className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="bg-white rounded-2xl p-7 border border-border">
                    <div className="w-11 h-11 rounded-xl bg-ice flex items-center justify-center mb-4">
                      <Icon size={20} className="text-sky" />
                    </div>
                    <h3 className="font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{v.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-3">Our Journey</p>
              <h2 className="text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>20 Years of Growth</h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 w-32 text-right">
                      <span className="inline-block bg-navy text-aqua text-sm font-bold px-3 py-1.5 rounded-lg">
                        {item.year}
                      </span>
                    </div>
                    <div className="relative flex-1 pb-8">
                      {/* Dot on timeline */}
                      <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-aqua border-2 border-white ring-2 ring-aqua/30" />
                      <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <OrderForm />
      </main>
      <Footer />
    </>
  )
}
