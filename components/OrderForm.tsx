'use client'

import { useState } from 'react'
import { Clock, CalendarX2, Users, PartyPopper, CalendarDays } from 'lucide-react'

type FormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  waterType: string
  bottleSize: string
  bottlesPerDelivery: string
  needsCooler: string
}

const INITIAL: FormData = {
  firstName: '', lastName: '', phone: '', email: '',
  address: '', city: '', zip: '',
  waterType: 'Purified Drinking Water',
  bottleSize: '5 Gallon',
  bottlesPerDelivery: '2 Bottles',
  needsCooler: 'I have my own cooler',
}

const highlights = [
  { icon: Clock,      title: 'Serving SoCal 20+ Years', desc: 'A trusted local name in water delivery since 2005.' },
  { icon: CalendarX2, title: 'No Long-Term Contract',   desc: 'Month-to-month service. Pause or cancel anytime with zero fees.' },
  { icon: Users,      title: 'Locally Owned Business',  desc: 'Real people, real service. We know our customers by name.' },
]

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.phone.trim())     e.phone     = 'Required'
    if (!form.email.includes('@')) e.email  = 'Valid email required'
    if (!form.address.trim())   e.address   = 'Required'
    if (!form.city.trim())      e.city      = 'Required'
    if (form.zip.length !== 5)  e.zip       = 'Enter a valid 5-digit zip'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full border rounded-lg px-3.5 py-3 text-sm text-[#1a2a3a] outline-none transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-[#d0e4ef] focus:border-[#1e90d6] focus:ring-2 focus:ring-[#1e90d6]/10'
    }`

  return (
    <section id="order" className="py-24 px-6 bg-gradient-to-br from-[#061c35] to-[#0d2b4e] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,201,228,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#00c9e4] mb-4">Start Today</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ready for Better Water?
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Fill out the form and we&apos;ll contact you within 1 business day to confirm your first delivery.
          </p>

          <div className="space-y-6">
            {highlights.map((h) => {
              const Icon = h.icon
              return (
              <div key={h.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00c9e4]/12 border border-[#00c9e4]/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#00c9e4]" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold mb-1">{h.title}</strong>
                  <span className="text-white/50 text-sm leading-relaxed">{h.desc}</span>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        {/* Right — form card */}
        <div className="bg-white rounded-2xl p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#e8f6fb] flex items-center justify-center mx-auto mb-4">
                <PartyPopper size={32} className="text-[#1e90d6]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0d2b4e] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                You&apos;re all set!
              </h3>
              <p className="text-[#5a7080] leading-relaxed">
                We received your order request and will contact you within 1 business day to confirm your first delivery.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-[#1e90d6] text-sm font-medium hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-xl font-bold text-[#0d2b4e] mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                Start My Delivery
              </h3>
              <p className="text-[#5a7080] text-sm mb-5">Takes less than 2 minutes</p>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">First Name</label>
                  <input type="text" placeholder="Maria" value={form.firstName} onChange={set('firstName')} className={inputClass('firstName')} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Last Name</label>
                  <input type="text" placeholder="Garcia" value={form.lastName} onChange={set('lastName')} className={inputClass('lastName')} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Phone Number</label>
                <input type="tel" placeholder="(805) 555-0100" value={form.phone} onChange={set('phone')} className={inputClass('phone')} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Email Address</label>
                <input type="email" placeholder="maria@example.com" value={form.email} onChange={set('email')} className={inputClass('email')} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Street Address</label>
                <input type="text" placeholder="123 Main St" value={form.address} onChange={set('address')} className={inputClass('address')} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* City + Zip */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">City</label>
                  <input type="text" placeholder="Oxnard" value={form.city} onChange={set('city')} className={inputClass('city')} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Zip Code</label>
                  <input type="text" placeholder="93030" maxLength={5} value={form.zip} onChange={set('zip')} className={inputClass('zip')} />
                  {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                </div>
              </div>

              {/* Water type + Bottle size */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Water Type</label>
                  <select value={form.waterType} onChange={set('waterType')} className={inputClass('waterType')}>
                    <option>Purified Drinking Water</option>
                    <option>Alkaline Water (pH 9.5)</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Bottle Size</label>
                  <select value={form.bottleSize} onChange={set('bottleSize')} className={inputClass('bottleSize')}>
                    <option>5 Gallon</option>
                    <option>3 Gallon</option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Bottles for First Delivery <span className="text-[#5a7080] font-normal">(we&apos;ll confirm recurring qty with you)</span></label>
                <select value={form.bottlesPerDelivery} onChange={set('bottlesPerDelivery')} className={inputClass('bottlesPerDelivery')}>
                  <option>2 Bottles</option>
                  <option>4 Bottles</option>
                  <option>6 Bottles</option>
                  <option>8+ Bottles</option>
                </select>
                <p className="text-xs text-[#5a7080] mt-1.5">
                  We'll confirm your ongoing delivery quantity with you after the first drop-off.
                </p>
              </div>

              {/* Frequency note */}
              <div className="bg-[#f4f7fa] border border-[#d0e4ef] rounded-xl px-4 py-3.5 flex items-start gap-3 mb-4">
                <span className="text-[#1e90d6] mt-0.5 flex-shrink-0">
                  <CalendarDays size={16} />
                </span>
                <p className="text-sm text-[#5a7080] leading-relaxed">
                  All new deliveries are scheduled <strong className="text-[#0d2b4e]">every 2 weeks</strong>.
                  As your needs grow, we&apos;ll adjust your frequency together — just give us a call.
                </p>
              </div>

              {/* Cooler */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">
                  Do you need a water cooler? <span className="text-[#5a7080] font-normal">(optional)</span>
                </label>
                <select value={form.needsCooler} onChange={set('needsCooler')} className={inputClass('needsCooler')}>
                  <option>I have my own cooler</option>
                  <option>Yes, I need a cooler rental</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm mb-4">Something went wrong. Please try again or <a href="/contact" className="underline">contact us</a>.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1e90d6] hover:bg-[#1565c0] text-white py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(21,101,192,0.35)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Request My First Delivery →'
                )}
              </button>

              <p className="text-[#5a7080] text-xs text-center mt-3 leading-relaxed">
                By submitting, you agree to be contacted by Pure O Water. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
