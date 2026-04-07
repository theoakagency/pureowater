import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Heart, Gem, Clock, Users } from 'lucide-react'
import OrderForm from '@/components/OrderForm'

export const metadata: Metadata = {
  title: 'About Us | Pure O Water',
  description: 'Pure O Water has been delivering premium purified and alkaline water across Ventura County and surrounding areas since 2005. A local, family-owned business that cares.',
}

const values = [
  { icon: Heart, title: 'Local & Family Owned', desc: 'We\'re a small local business — not a national chain. That means you get personal service and a team that actually cares about your experience.' },
  { icon: Gem,   title: 'Quality Without Compromise', desc: 'Every bottle goes through our 10-stage filtration process. We never cut corners on water quality, because your health depends on it.' },
  { icon: Clock, title: 'Reliable & Consistent', desc: 'We show up when we say we will. Our delivery team has served many customers for years because consistency matters more than anything.' },
  { icon: Users, title: 'Community First', desc: 'We live and work in the same communities we deliver to. Supporting Pure O Water means supporting a local family and the local economy.' },
]

const timeline = [
  { year: '2005', title: 'Founded in Ventura County', desc: 'Pure O Water started with a single delivery route and a commitment to bringing better water to local families.' },
  { year: '2008', title: 'Expanded to Offices & Business', desc: 'Demand from local businesses led us to expand our commercial delivery service, serving offices, restaurants, and gyms.' },
  { year: '2012', title: 'Alkaline Water Added', desc: 'We added our pH 9.5 alkaline water line in response to growing customer interest in the health benefits of alkaline hydration.' },
  { year: '2018', title: 'Santa Clarita & Antelope Valley', desc: 'Expanded delivery routes to serve Santa Clarita, Palmdale, Lancaster, and surrounding communities.' },
  { year: '2025', title: 'Serving 6,000+ Customers', desc: 'Today we proudly serve thousands of homes, offices, and businesses across Southern California.' },
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
          subtitle="Pure O Water has been a trusted name in Southern California water delivery since 2005. We're a local, family-owned business built on quality, reliability, and personal service."
          breadcrumbs={[{ label: 'About Us', href: '#' }]}
        />

        {/* Mission */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Our Mission</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e] leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Better Water for Every Home and Business in Southern California
              </h2>
              <p className="text-[#5a7080] text-lg leading-relaxed mb-5">
                We started Pure O Water because we believed our community deserved access to truly clean, high-quality water — without having to pay big-brand prices or sacrifice on service.
              </p>
              <p className="text-[#5a7080] text-lg leading-relaxed mb-8">
                Twenty years later, that belief hasn&apos;t changed. We still personally oversee every batch of water, know many of our customers by name, and treat every delivery like it matters — because it does.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#d0e4ef]">
                {[
                  { num: '20+', label: 'Years in business' },
                  { num: '6,000+', label: 'Active customers' },
                  { num: '6', label: 'Cities served' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>{s.num}</div>
                    <div className="text-sm text-[#5a7080] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner card */}
            <div className="bg-gradient-to-br from-[#0d2b4e] to-[#1565c0] rounded-3xl p-10 text-white">
              <div className="w-20 h-20 rounded-full bg-[#00c9e4] text-[#0d2b4e] text-3xl font-bold flex items-center justify-center mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                J
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Joseph</h3>
              <p className="text-[#00c9e4] text-sm font-semibold mb-5">Founder & Owner, Pure O Water</p>
              <blockquote className="text-white/80 text-base leading-relaxed italic border-l-2 border-[#00c9e4] pl-4">
                &ldquo;I started this business because I wanted my neighbors to have access to the same quality water I&apos;d want for my own family. That hasn&apos;t changed in 20 years — and it never will.&rdquo;
              </blockquote>
              <div className="mt-6 pt-6 border-t border-white/15">
                <p className="text-white/50 text-sm">Direct line: <a href="tel:+18055227002" className="text-[#00c9e4] font-semibold hover:underline">(805) 522-7002</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-[#f4f7fa]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-3">What We Stand For</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="bg-white rounded-2xl p-7 border border-[#d0e4ef]">
                    <div className="w-11 h-11 rounded-xl bg-[#e8f6fb] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[#1e90d6]" />
                    </div>
                    <h3 className="font-bold text-[#0d2b4e] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{v.title}</h3>
                    <p className="text-[#5a7080] text-sm leading-relaxed">{v.desc}</p>
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
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-3">Our Journey</p>
              <h2 className="text-4xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>20 Years of Growth</h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-16 top-0 bottom-0 w-px bg-[#d0e4ef]" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 w-32 text-right">
                      <span className="inline-block bg-[#0d2b4e] text-[#00c9e4] text-sm font-bold px-3 py-1.5 rounded-lg">
                        {item.year}
                      </span>
                    </div>
                    <div className="relative flex-1 pb-8">
                      {/* Dot on timeline */}
                      <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-[#00c9e4] border-2 border-white ring-2 ring-[#00c9e4]/30" />
                      <h3 className="font-bold text-[#0d2b4e] mb-1">{item.title}</h3>
                      <p className="text-[#5a7080] text-sm leading-relaxed">{item.desc}</p>
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
