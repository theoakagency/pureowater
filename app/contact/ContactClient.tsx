'use client'

import { useState } from 'react'
import { Phone, CheckCircle2 } from 'lucide-react'
import { PHONES, ADDRESSES, HOURS } from '@/lib/config'

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' })
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
      setForm({ name: '', email: '', phone: '', subject: '', message: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-border rounded-lg px-4 py-3 text-sm text-dark outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all'

  const contactDetails = [
    {
      icon: Phone,
      label: PHONES.primary.label,
      value: PHONES.primary.display,
      href: PHONES.primary.href,
      sub: ADDRESSES.ventura.full,
    },
    {
      icon: Phone,
      label: PHONES.secondary.label,
      value: PHONES.secondary.display,
      href: PHONES.secondary.href,
      sub: ADDRESSES.antelope.full,
    },
    {
      icon: Phone,
      label: PHONES.tollFree.label,
      value: PHONES.tollFree.display,
      href: PHONES.tollFree.href,
      sub: null,
    },
  ]

  const hours = HOURS.map((h) => ({ day: h.day, hours: h.hours }))

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Left sidebar — contact info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick contact */}
          <div className="bg-gray rounded-2xl p-7">
            <h3 className="font-bold text-navy text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
              Contact Info
            </h3>
            <div className="space-y-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <a
                      href={item.href ?? undefined}
                      className="text-navy font-semibold text-sm hover:text-sky transition-colors block"
                    >
                      {item.value}
                    </a>
                    {item.sub && (
                      <p className="text-muted text-xs mt-1 leading-relaxed">
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
          <div className="bg-gray rounded-2xl p-7">
            <h3 className="font-bold text-navy text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
              Business Hours
            </h3>
            <div className="space-y-3">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between items-center text-sm">
                  <span className="text-muted">{h.day}</span>
                  <span className={`font-semibold ${h.hours === 'Closed' ? 'text-muted' : 'text-navy'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-muted text-xs mt-4 leading-relaxed">
              For requests outside business hours, leave a voicemail and we&apos;ll get back to you the next business day.
            </p>
          </div>

          {/* Quick start CTA */}
          <div className="bg-gradient-to-br from-navy to-blue rounded-2xl p-7 text-white">
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready to Order?
            </h3>
            <p className="text-white/65 text-sm mb-5">
              Skip the message form and go straight to our order form below.
            </p>
            <a
              href="#order-form"
              className="block text-center bg-aqua text-navy py-3 rounded-lg font-bold text-sm hover:bg-aqua-light transition-all"
            >
              Start My Delivery →
            </a>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="lg:col-span-3">
          <div className="border-2 border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Send Us a Message
            </h2>
            <p className="text-muted text-sm mb-7">We respond to all messages within 1 business day.</p>

            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-ice flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-sky" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Message Sent!
                </h3>
                <p className="text-muted">We&apos;ll get back to you within 1 business day.</p>
                <button onClick={() => setStatus('idle')} className="mt-5 text-sky text-sm font-medium hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Your Name</label>
                    <input type="text" placeholder="Maria Garcia" value={form.name} onChange={set('name')} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="(805) 555-0100" value={form.phone} onChange={set('phone')} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">Email Address</label>
                  <input type="email" placeholder="maria@example.com" value={form.email} onChange={set('email')} required className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">Subject</label>
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
                  <label className="block text-xs font-semibold text-navy mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={set('message')}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Honeypot — hidden from real users, bots will fill it */}
                <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or call us at {PHONES.tollFree.display}.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-sky hover:bg-blue text-white py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
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
  )
}
