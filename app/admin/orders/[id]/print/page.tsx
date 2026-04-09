'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Printer, ArrowLeft } from 'lucide-react'
import { COMPANY_NAME, IMAGES, PHONES, DOMAIN, REGION_SHORT, TAGLINE } from '@/lib/config'

type Order = {
  id: number
  createdAt: string
  status: string
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
  frequency: string
  needsCooler: string
  notes: string
}

const STATUS_LABELS: Record<string, string> = {
  new:       'New',
  confirmed: 'Confirmed',
  active:    'Active',
  paused:    'Paused',
  cancelled: 'Cancelled',
}

export default function PrintOrderPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError]   = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => {
        if (res.status === 401) { router.push('/admin'); return null }
        if (!res.ok) { setError(true); return null }
        return res.json()
      })
      .then((data) => { if (data) setOrder(data) })
      .catch(() => setError(true))
  }, [id, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray">
        <p className="text-muted">Order not found.</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray">
        <p className="text-muted text-sm">Loading…</p>
      </div>
    )
  }

  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const time = new Date(order.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })

  return (
    <div className="min-h-screen bg-gray print:bg-white">

      {/* Screen-only toolbar */}
      <div className="print:hidden sticky top-0 z-10 bg-navy text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Dashboard
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-aqua hover:bg-aqua-light text-navy px-5 py-2 rounded-lg text-sm font-bold transition-colors"
        >
          <Printer size={15} />
          Print
        </button>
      </div>

      {/* Printable content */}
      <div className="max-w-2xl mx-auto px-8 py-10 print:px-0 print:py-0 print:max-w-none">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-navy print:border-navy">
          <div>
            <Image
              src={IMAGES.logo}
              alt={COMPANY_NAME}
              width={160}
              height={54}
              className="h-10 w-auto mb-3"
            />
            <p className="text-muted text-sm">Order Confirmation Sheet</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-navy">#{order.id}</p>
            <p className="text-sm text-muted mt-1">{date}</p>
            <p className="text-xs text-muted">{time}</p>
            <span className={`inline-block mt-2 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${
              order.status === 'new'       ? 'bg-ice text-navy border-aqua/40' :
              order.status === 'confirmed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
              order.status === 'active'    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
              order.status === 'paused'    ? 'bg-amber-50 text-amber-800 border-amber-200' :
              order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
              'bg-gray-100 text-gray-700 border-gray-200'
            }`}>
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>
        </div>

        {/* Customer info */}
        <section className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky mb-3">Customer Information</h2>
          <div className="bg-white rounded-xl border border-border p-5 grid grid-cols-2 gap-x-8 gap-y-3 print:rounded-none print:border print:border-gray-300">
            <Field label="Name"    value={`${order.firstName} ${order.lastName}`} />
            <Field label="Phone"   value={order.phone} />
            <Field label="Email"   value={order.email} />
            <Field label="Address" value={`${order.address}, ${order.city}, CA ${order.zip}`} />
          </div>
        </section>

        {/* Order details */}
        <section className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky mb-3">Order Details</h2>
          <div className="bg-white rounded-xl border border-border p-5 grid grid-cols-2 gap-x-8 gap-y-3 print:rounded-none print:border print:border-gray-300">
            <Field label="Water Type"      value={order.waterType} />
            <Field label="Bottle Size"     value={order.bottleSize} />
            <Field label="First Delivery"  value={order.bottlesPerDelivery} />
            <Field label="Frequency"       value={order.frequency === 'every-2-weeks' ? 'Every 2 weeks' : order.frequency} />
            <Field label="Cooler"          value={order.needsCooler} />
          </div>
        </section>

        {/* Notes */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky mb-3">Internal Notes</h2>
          <div className="bg-white rounded-xl border border-border p-5 min-h-[80px] print:rounded-none print:border print:border-gray-300">
            {order.notes
              ? <p className="text-sm text-dark whitespace-pre-wrap leading-relaxed">{order.notes}</p>
              : <p className="text-sm text-[#b0bec5] italic">No notes added.</p>
            }
          </div>
        </section>

        {/* Signature / driver section */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky mb-3">Delivery</h2>
          <div className="bg-white rounded-xl border border-border p-5 grid grid-cols-2 gap-x-8 gap-y-6 print:rounded-none print:border print:border-gray-300">
            <div>
              <p className="text-xs text-muted mb-6">Driver / Delivered by</p>
              <div className="border-b border-navy h-px" />
              <p className="text-xs text-muted mt-1">Signature</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-6">Delivery date</p>
              <div className="border-b border-navy h-px" />
              <p className="text-xs text-muted mt-1">Date</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-5 text-center">
          <p className="text-xs text-muted">
            {COMPANY_NAME} · {PHONES.tollFree.display} · {DOMAIN} · {REGION_SHORT}
          </p>
          <p className="text-xs text-[#b0bec5] mt-1 italic">
            {TAGLINE}
          </p>
        </div>

      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted font-medium mb-0.5">{label}</p>
      <p className="text-sm text-dark font-semibold">{value}</p>
    </div>
  )
}
