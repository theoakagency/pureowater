import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import OrderForm from '@/components/OrderForm'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | Pure O Water',
  description:
    'Get in touch with Pure O Water — call us toll-free at (844) 522-7000, or send a message online. We serve Ventura County, Santa Clarita, and the Antelope Valley.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          badge="Get in Touch"
          title="We'd Love to"
          titleAccent="Hear from You."
          subtitle="Questions, new orders, schedule changes — we're here for all of it. Reach out and we'll get back to you the same business day."
          breadcrumbs={[{ label: 'Contact', href: '#' }]}
          compact
        />

        <ContactClient />

        {/* Order Form */}
        <div id="order-form">
          <OrderForm />
        </div>

        {/* Map embed */}
        <section className="bg-[#f4f7fa] px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-[#0d2b4e] mb-5 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Service Area
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#d0e4ef] h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192!3d34.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e81da9f908d63f%3A0x93b72d71b2ea8c5a!2sVentura%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
