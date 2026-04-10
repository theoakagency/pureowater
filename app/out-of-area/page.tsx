'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PartyPopper, CheckCircle2 } from 'lucide-react'

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
  website: string
}

const INITIAL: FormData = {
  firstName: '', lastName: '', phone: '', email: '',
  address: '', city: '', zip: '',
  waterType: 'Purified Drinking Water',
  bottleSize: '5 Gallon',
  website: '',
}

function OutOfAreaForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<FormData>({ ...INITIAL, zip: searchParams.get('zip') ?? '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    const zip = searchParams.get('zip')
    if (zip) setForm((prev) => ({ ...prev, zip }))
  }, [searchParams])

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
    if (form.zip.length !== 5)  e.zip       = 'Enter a valid 5-digit zip'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/out-of-area', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
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

  if (status === 'success') {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 rounded-full bg-[#e8f6fb] flex items-center justify-center mx-auto mb-6">
          <PartyPopper size={40} className="text-[#1e90d6]" />
        </div>
        <h2 className="text-3xl font-bold text-[#0d2b4e] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          You&apos;re all set!
        </h2>
        <p className="text-[#5a7080] leading-relaxed max-w-md mx-auto">
          We&apos;ve received your information and will connect you with a trusted provider in your area within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
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
      <div>
        <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Phone Number</label>
        <input type="tel" placeholder="(805) 555-0100" value={form.phone} onChange={set('phone')} className={inputClass('phone')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Email Address</label>
        <input type="email" placeholder="maria@example.com" value={form.email} onChange={set('email')} className={inputClass('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Street Address <span className="text-[#5a7080] font-normal">(optional)</span></label>
        <input type="text" placeholder="123 Main St" value={form.address} onChange={set('address')} className={inputClass('address')} />
      </div>

      {/* City + Zip */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">City <span className="text-[#5a7080] font-normal">(optional)</span></label>
          <input type="text" placeholder="Burbank" value={form.city} onChange={set('city')} className={inputClass('city')} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Zip Code</label>
          <input type="text" placeholder="91505" maxLength={5} value={form.zip} onChange={set('zip')} className={inputClass('zip')} />
          {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
        </div>
      </div>

      {/* Water preferences */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Water Type</label>
          <select value={form.waterType} onChange={set('waterType')} className={inputClass('waterType')}>
            <option>Purified Drinking Water</option>
            <option>Alkaline Water (pH 9.5)</option>
            <option>Both</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0d2b4e] mb-1.5">Bottle Size</label>
          <select value={form.bottleSize} onChange={set('bottleSize')} className={inputClass('bottleSize')}>
            <option>5 Gallon</option>
            <option>3 Gallon</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again or <a href="/contact" className="underline">contact us</a>.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#1e90d6] hover:bg-[#1565c0] text-white py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(21,101,192,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting…' : 'Connect Me With a Local Provider →'}
      </button>

      <p className="text-[#5a7080] text-xs text-center leading-relaxed">
        By submitting, you agree to be contacted by Pure O Water or a trusted partner. No spam, ever.
      </p>
    </form>
  )
}

export default function OutOfAreaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f7fa]">
        <div className="max-w-2xl mx-auto px-6 py-20">

          {/* Message */}
          <div className="bg-white rounded-2xl border-2 border-[#00c9e4]/40 p-8 mb-8 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#e8f6fb] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-[#1e90d6]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0d2b4e] mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Good News!
            </h1>
            <p className="text-[#1a2a3a] leading-relaxed text-base">
              Your ZIP Code is covered by one of our trusted sister companies in our network of independent bottled water providers. Simply fill out the form below, and they&apos;ll reach out to you within one business day.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-[#d0e4ef] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0d2b4e] mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              Tell Us About Your Needs
            </h2>
            <p className="text-[#5a7080] text-sm mb-6">Takes less than 2 minutes</p>
            <Suspense fallback={null}>
              <OutOfAreaForm />
            </Suspense>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
