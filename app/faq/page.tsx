'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { Zap, Droplets, Truck, CreditCard, Phone } from 'lucide-react'

const categories = [
  {
    label: 'Getting Started',
    icon: Zap,
    items: [
      {
        q: 'How do I start my water delivery service?',
        a: 'Simply fill out our order form on the homepage. Tell us your address, how many bottles you need, and how often you want delivery. We\'ll confirm your first delivery within 1 business day.',
      },
      {
        q: 'Is there a contract or minimum commitment?',
        a: 'No contracts, ever. We operate on a month-to-month basis. You can pause, change, or cancel your delivery at any time with no fees or penalties.',
      },
      {
        q: 'How much does delivery cost?',
        a: 'Delivery is included in the price of your water — there\'s no separate delivery fee. Contact us for current pricing.',
      },
      {
        q: 'Do I need a water cooler to get started?',
        a: 'You can use your own existing cooler, or we can include a cooler rental as part of your service. Just let us know when you fill out the order form.',
      },
    ],
  },
  {
    label: 'Products & Water Quality',
    icon: Droplets,
    items: [
      {
        q: 'What\'s the difference between purified and alkaline water?',
        a: 'Our purified water goes through a 10-stage filtration process that removes 99.9% of contaminants, resulting in clean, pure water. Our alkaline water starts as the same purified water, then is remineralized with an organic mineral blend to reach pH 9.5. Alkaline water offers additional hydration benefits and helps balance body pH.',
      },
      {
        q: 'What bottle sizes do you offer?',
        a: 'We offer both 3-gallon and 5-gallon bottles. The 5-gallon is our most popular size and works with any standard cooler. The 3-gallon is great for smaller households or tight spaces. Both are BPA-free and food-grade.',
      },
      {
        q: 'Are your bottles BPA-free?',
        a: 'Yes. All of our water bottles are made from food-grade, BPA-free plastic and are cleaned and sanitized before every refill.',
      },
      {
        q: 'Can I order both purified and alkaline water in the same delivery?',
        a: 'Absolutely. Many of our customers get a mix of both types. Just let us know your preference when you order and we\'ll accommodate it.',
      },
      {
        q: 'Where is your water sourced and purified?',
        a: 'Our water is locally sourced and purified at our facility right here in Ventura County using a 10-stage filtration process that includes sediment filters, carbon blocks, reverse osmosis, and UV sterilization.',
      },
    ],
  },
  {
    label: 'Delivery & Service',
    icon: Truck,
    items: [
      {
        q: 'How often will you deliver?',
        a: 'You choose your delivery frequency: weekly, every 2 weeks, or monthly. If you run low between scheduled deliveries, just give us a call and we can arrange an extra delivery.',
      },
      {
        q: 'What happens to my empty bottles?',
        a: 'Leave your empty bottles at the same spot as your delivery (doorstep, office entrance, etc.) and we\'ll pick them up at no charge during your next delivery.',
      },
      {
        q: 'What areas do you deliver to?',
        a: 'We currently deliver to Oxnard, Ventura, Santa Clarita, the Antelope Valley (Palmdale & Lancaster), Thousand Oaks, Simi Valley, and surrounding areas. Use the zip code checker on our homepage to confirm delivery to your address.',
      },
      {
        q: 'What if I\'m not home during delivery?',
        a: 'No problem. We can deliver to a designated spot — your front door, a covered porch, office lobby, etc. Just let us know a safe drop-off location and we\'ll take care of the rest.',
      },
      {
        q: 'Can I change my delivery schedule or quantity?',
        a: 'Yes, anytime. Just call us at (805) 522-7002 or send us an email and we\'ll update your schedule or quantity for your next delivery.',
      },
    ],
  },
  {
    label: 'Billing & Payments',
    icon: CreditCard,
    items: [
      {
        q: 'How does billing work?',
        a: 'We bill per delivery — you pay for the bottles delivered each time. There are no monthly membership fees, setup fees, or hidden charges.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash, check, and major credit cards. You can also pay online — contact us to set up electronic billing.',
      },
      {
        q: 'Is there a setup fee to get started?',
        a: 'No setup fees, no hidden charges. We bill per delivery — you pay for the bottles delivered each time.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-[#1e90d6]' : 'border-[#d0e4ef]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="font-semibold text-[#0d2b4e] text-sm leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#d0e4ef] flex items-center justify-center text-[#1e90d6] text-xs transition-transform ${open ? 'rotate-45 bg-[#e8f6fb]' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-[#5a7080] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const current = categories[activeCategory]

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          badge="Help Center"
          title="Frequently Asked"
          titleAccent="Questions"
          subtitle="Everything you need to know about Pure O Water delivery. Can't find your answer? Call us at (805) 522-7002."
          breadcrumbs={[{ label: 'FAQ', href: '#' }]}
          compact
        />

        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeCategory === i
                        ? 'bg-[#0d2b4e] text-white'
                        : 'bg-[#f4f7fa] text-[#5a7080] hover:bg-[#e8f6fb] hover:text-[#0d2b4e]'
                    }`}
                  >
                    <Icon size={15} />
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {current.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-14 bg-[#f4f7fa] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#0d2b4e] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                Still have questions?
              </h3>
              <p className="text-[#5a7080] mb-6">We&apos;re happy to help. Reach out and we&apos;ll get back to you the same business day.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:+18055227002" className="inline-flex items-center gap-2 bg-[#0d2b4e] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#1565c0] transition-all">
                  <Phone size={15} />
                  Call (805) 522-7002
                </a>
                <a href="/contact" className="border border-[#d0e4ef] text-[#0d2b4e] px-6 py-3 rounded-lg font-semibold text-sm hover:border-[#1e90d6] hover:text-[#1e90d6] transition-all">
                  Send a Message →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
