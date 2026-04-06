import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Current Offers | Pure O Water',
  description: 'Pure O Water current promotions — first delivery free for new customers, referral discounts, and office bundle pricing.',
}

const offers = [
  {
    badge: 'New Customers',
    title: 'First Delivery Free',
    desc: 'Brand new to Pure O Water? Your very first delivery is completely on us. No credit card required upfront, no catch.',
    details: ['Applies to all water types and bottle sizes', 'Valid for residential and commercial accounts', 'One per household or business address', 'No promo code needed — just mention it when you sign up'],
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
                    ? 'border-[#00c9e4] bg-gradient-to-r from-[#e8f6fb] to-white'
                    : 'border-[#d0e4ef] bg-white'
                }`}
              >
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <span className="inline-block text-xs font-bold text-[#1e90d6] bg-[#e8f6fb] px-3 py-1 rounded-full mb-3">
                      {offer.badge}
                    </span>
                    <h2 className="text-2xl font-bold text-[#0d2b4e] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {offer.title}
                    </h2>
                    <p className="text-[#5a7080] leading-relaxed mb-5">{offer.desc}</p>
                    <ul className="space-y-2">
                      {offer.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#1a2a3a]">
                          <Check size={14} className="text-[#00c9e4] flex-shrink-0 mt-0.5" />
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
                          ? 'bg-[#00c9e4] text-[#0d2b4e] hover:bg-[#00dff8] hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]'
                          : 'bg-[#0d2b4e] text-white hover:bg-[#1565c0]'
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

        {/* Pricing table */}
        <section className="py-20 px-6 bg-[#f4f7fa]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-3">Transparent Pricing</p>
              <h2 className="text-3xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Simple, Straightforward Pricing
              </h2>
              <p className="text-[#5a7080] mt-3">No hidden fees. No delivery charges. No surprises.</p>
            </div>

            <div className="bg-white rounded-2xl border border-[#d0e4ef] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0d2b4e] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Product</th>
                    <th className="px-6 py-4 text-left font-semibold">Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Price per Bottle</th>
                    <th className="px-6 py-4 text-left font-semibold">Delivery Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4f7fa]">
                  {[
                    { product: 'Purified Water', size: '5 Gallon', price: '$6.99', delivery: 'Included' },
                    { product: 'Purified Water', size: '3 Gallon', price: '$5.99', delivery: 'Included' },
                    { product: 'Alkaline Water (pH 9.5)', size: '5 Gallon', price: '$8.99', delivery: 'Included' },
                    { product: 'Alkaline Water (pH 9.5)', size: '3 Gallon', price: '$7.99', delivery: 'Included' },
                    { product: 'Cooler Rental', size: 'All sizes', price: 'Ask us', delivery: 'Included' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f7fa]'}>
                      <td className="px-6 py-4 font-medium text-[#0d2b4e]">{row.product}</td>
                      <td className="px-6 py-4 text-[#5a7080]">{row.size}</td>
                      <td className="px-6 py-4 font-bold text-[#0d2b4e]">{row.price}</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">{row.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-[#5a7080] text-sm mt-5">
              Volume discounts available for 6+ bottles per delivery.{' '}
              <a href="/contact" className="text-[#1e90d6] font-semibold hover:underline">Contact us for a quote.</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
