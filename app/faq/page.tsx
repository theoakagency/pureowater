import type { Metadata } from 'next'
import Script from 'next/script'
import { COMPANY_NAME, PRICING } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import OrderForm from '@/components/OrderForm'
import FAQClient from './FAQClient'
import { Zap, Droplets, Truck, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${COMPANY_NAME}`,
  description:
    `Find answers to common questions about ${COMPANY_NAME} delivery service — pricing, delivery schedule, water quality, bottle sizes, billing, and more.`,
  alternates: {
    canonical: '/faq',
  },
}

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
        a: `There is a flat $${PRICING.deliveryFee} delivery fee per delivery, plus the cost of your bottles and any cooler rental. There are no hidden charges or monthly membership fees.`,
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
        a: 'Yes, anytime. Just call us or send us a message through our contact page and we\'ll update your schedule or quantity for your next delivery.',
      },
    ],
  },
  {
    label: 'Billing & Payments',
    icon: CreditCard,
    items: [
      {
        q: 'How does billing work?',
        a: `You pay for the bottles delivered each time, plus a flat $${PRICING.deliveryFee} delivery fee per delivery and any cooler rental. There are no monthly membership fees, setup fees, or hidden charges.`,
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash, check, and major credit cards including Visa, Mastercard, and American Express.',
      },
      {
        q: 'Is there a setup fee to get started?',
        a: 'No setup fees, no hidden charges. We bill per delivery — you pay for the bottles delivered each time.',
      },
    ],
  },
]

// Build FAQPage schema for Google rich results
const allFaqItems = categories.flatMap((cat) => cat.items)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <PageHero
          badge="Help Center"
          title="Frequently Asked"
          titleAccent="Questions"
          subtitle={`Everything you need to know about ${COMPANY_NAME} delivery. Can't find your answer? Visit our contact page.`}
          breadcrumbs={[{ label: 'FAQ', href: '#' }]}
          compact
        />

        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FAQClient categories={categories} />

            {/* Still have questions */}
            <div className="mt-14 bg-gray rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                Still have questions?
              </h3>
              <p className="text-muted mb-6">We&apos;re happy to help. Reach out and we&apos;ll get back to you the same business day.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/contact" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue transition-all">
                  Contact Us →
                </a>
                <a href="/contact" className="border border-border text-navy px-6 py-3 rounded-lg font-semibold text-sm hover:border-sky hover:text-sky transition-all">
                  Send a Message →
                </a>
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
