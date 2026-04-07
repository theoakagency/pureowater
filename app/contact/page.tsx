'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import OrderForm from '@/components/OrderForm'
import { Phone, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-[#d0e4ef] rounded-lg px-4 py-3 text-sm text-[#1a2a3a] outline-none focus:border-[#1e90d6] focus:ring-2 focus:ring-[#1e90d6]/10 transition-all'

  const contactDetails = [
    {
      icon: Phone,
      label: 'Ventura County',
      value: '(805) 991-7400',
      href: 'tel:+18059917400',
      sub: '4744 Telephone Rd, Suite 3257\nVentura, CA 93003',
    },
    {
      icon: Phone,
      label: 'Antelope Valley & Santa Clarita',
      value: '(661) 522-7002',
      href: 'tel:+16615227002',
      sub: '19425 Soledad Canyon Rd, Suite 205\nCanyon Country, CA 91351',
    },
    {
      icon: Phone,
      label: 'Toll-Free',
      value: '(844) 522-7000',
      href: 'tel:+18445227000',
      sub: null,
    },
  ]

  const hours = [
    { day: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Saturday',        hours: '8:00 AM – 3:00 PM' },
    { day: 'Sunday',          hours: 'Closed' },
  ]

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

        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left sidebar — contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick contact */}
              <div className="bg-[#f4f7fa] rounded-2xl p-7">
                <h3 className="font-bold text-[#0d2b4e] text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Contact Info
                </h3>
                <div className="space-y-5">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0d2b4e] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#5a7080] uppercase tracking-wide mb-0.5">
                          {item.label}
                        </div>
                        <a
                          href={item.href ?? undefined}
                          className="text-[#0d2b4e] font-semibold text-sm hover:text-[#1e90d6] transition-colors block"
                        >
                          {item.value}
                        </a>
                        {item.sub && (
                          <p className="text-[#5a7080] text-xs mt-1 leading-relaxed">
                            {item.sub.split('\n').map((line, i) => (
                              <span key={i} className="block">{line}</span>
                            ))}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#f4f7fa] rounded-2xl p-7">
                <h3 className="font-bold text-[#0d2b4e] text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center text-sm">
                      <span className="text-[#5a7080]">{h.day}</span>
                      <span className={`font-semibold ${h.hours === 'Closed' ? 'text-[#5a7080]' : 'text-[#0d2b4e]'}`}>
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[#5a7080] text-xs mt-4 leading-relaxed">
                  For urgent requests outside business hours, leave a voicemail and we&apos;ll call you back first thing.
                </p>
              </div>

              {/* Quick start CTA */}
              <div className="bg-gradient-to-br from-[#0d2b4e] to-[#1565c0] rounded-2xl p-7 text-white">
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Ready to Order?
                </h3>
                <p className="text-white/65 text-sm mb-5">
                  Skip the message form and go straight to our order form below.
                </p>
                <a
                  href="#order-form"
                  className="block text-center bg-[#00c9e4] text-[#0d2b4e] py-3 rounded-lg font-bold text-sm hover:bg-[#00dff8] transition-all"
                >
                  Start My Delivery →
                </a>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="lg:col-span-3">
              <div className="border-2 border-[#d0e4ef] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#0d2b4e] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Send Us a Message
                </h2>
                <p className="text-[#5a7080] text-sm mb-7">We respond to all messages within 1 business day.</p>

                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#e8f6fb] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-[#1e90d6]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0d2b4e] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                      Message Sent!
                    </h3>
                    <p className="text-[#5a7080]">We&apos;ll get back to you within 1 business day.</p>
                    <button onClick={() => setStatus('idle')} className="mt-5 text-[#1e90d6] text-sm font-medium hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Your Name</label>
                        <input type="text" placeholder="Maria Garcia" value={form.name} onChange={set('name')} required className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Phone Number</label>
                        <input type="tel" placeholder="(805) 555-0100" value={form.phone} onChange={set('phone')} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Email Address</label>
                      <input type="email" placeholder="maria@example.com" value={form.email} onChange={set('email')} required className={inputClass} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Subject</label>
                      <select value={form.subject} onChange={set('subject')} className={inputClass}>
                        <option value="">Select a topic…</option>
                        <option>New delivery inquiry</option>
                        <option>Change my delivery</option>
                        <option>Billing question</option>
                        <option>Water quality question</option>
                        <option>Cooler rental</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help…"
                        value={form.message}
                        onChange={set('message')}
                        required
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again or call us at (844) 522-7000.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#1e90d6] hover:bg-[#1565c0] text-white py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

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
