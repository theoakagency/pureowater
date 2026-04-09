import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Check } from 'lucide-react'
import OrderForm from '@/components/OrderForm'
import { COMPANY_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `Current Offers | ${COMPANY_NAME}`,
  description: `${COMPANY_NAME} current promotions — referral discounts, office bundle pricing, and more.`,
}

const offers = [
  {
    badge: 'Homes & Small Businesses',
    title: 'Hot & Cold Dispenser + 2 Bottles — $30 Delivered',
    desc: `Try ${COMPANY_NAME} with zero risk. Get a hot and cold water dispenser plus 2 bottles of your choice delivered to your door for just $30. No contracts, no commitment — just great water.`,
    details: [
      'Includes a hot & cold water dispenser',
      'Choose any 2 bottles — purified or alkaline (pH 9.5)',
      'Delivered straight to your home or business',
      'Flat $30 introductory price — no hidden fees',
      'No contracts and no obligation to continue',
      'Perfect for homes, small offices, and first-time customers',
    ],
    cta: 'Claim This Offer',
    href: '/#order',
    highlight: true,
  },
  {
    badge: 'Referral Program',
    title: 'Refer a Friend, Get a Free Delivery',
    desc: 'When you refer a friend, neighbor, or colleague who becomes an active customer, both of you get a free delivery.',
    details: ['Refer as many people as you like', 'Credit applied automatically to your next delivery', 'Friend must stay active for 2+ deliveries to qualify', 'Call us to register your referral'],
    cta: 'Learn More',
    href: '/contact',
    highlight: false,
  },
  {
    badge: 'Businesses',
    title: 'Office & Commercial Bundle Pricing',
    desc: 'Businesses ordering 6+ bottles per delivery qualify for volume discounts and priority scheduling.',
    details: ['Discounted per-bottle pricing at 6+ bottles', 'Priority scheduling on delivery days', 'Dedicated account manager', 'Monthly invoicing available'],
    cta: 'Get a Custom Quote',
    href: '/contact',
    highlight: false,
  },
]

export default function OffersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          badge="Promotions"
          title="Current Offers &"
          titleAccent="Promotions"
          subtitle="We believe great water should be accessible. Here are our current deals for new and existing customers."
          breadcrumbs={[{ label: 'Current Offers', href: '#' }]}
          compact
        />

        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto space-y-6">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className={`rounded-2xl border-2 overflow-hidden ${
                  offer.highlight
                    ? 'border-aqua bg-gradient-to-r from-ice to-white'
                    : 'border-border bg-white'
                }`}
              >
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <span className="inline-block text-xs font-bold text-sky bg-ice px-3 py-1 rounded-full mb-3">
                      {offer.badge}
                    </span>
                    <h2 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {offer.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-5">{offer.desc}</p>
                    <ul className="space-y-2">
                      {offer.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-dark">
                          <Check size={14} className="text-aqua flex-shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center lg:text-right">
                    <a
                      href={offer.href}
                      className={`inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                        offer.highlight
                          ? 'bg-aqua text-navy hover:bg-aqua-light hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]'
                          : 'bg-navy text-white hover:bg-blue'
                      }`}
                    >
                      {offer.cta} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <OrderForm />

      </main>
      <Footer />
    </>
  )
}
