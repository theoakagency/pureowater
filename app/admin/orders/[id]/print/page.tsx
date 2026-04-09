'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Printer, ArrowLeft } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa]">
        <p className="text-[#5a7080]">Order not found.</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa]">
        <p className="text-[#5a7080] text-sm">Loading…</p>
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
    <div className="min-h-screen bg-[#f4f7fa] print:bg-white">

      {/* Screen-only toolbar */}
      <div className="print:hidden sticky top-0 z-10 bg-[#0d2b4e] text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Dashboard
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#00c9e4] hover:bg-[#00dff8] text-[#0d2b4e] px-5 py-2 rounded-lg text-sm font-bold transition-colors"
        >
          <Printer size={15} />
          Print
        </button>
      </div>

      {/* Printable content */}
      <div className="max-w-2xl mx-auto px-8 py-10 print:px-0 print:py-0 print:max-w-none">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-[#0d2b4e] print:border-[#0d2b4e]">
          <div>
            <Image
              src="/logo.png"
              alt="Pure O Water"
              width={160}
              height={54}
              className="h-10 w-auto mb-3"
            />
            <p className="text-[#5a7080] text-sm">Order Confirmation Sheet</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#0d2b4e]">#{order.id}</p>
            <p className="text-sm text-[#5a7080] mt-1">{date}</p>
            <p className="text-xs text-[#5a7080]">{time}</p>
            <span className={`inline-block mt-2 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${
              order.status === 'new'       ? 'bg-[#e8f6fb] text-[#0d2b4e] border-[#00c9e4]/40' :
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1e90d6] mb-3">Customer Information</h2>
          <div className="bg-white rounded-xl border border-[#d0e4ef] p-5 grid grid-cols-2 gap-x-8 gap-y-3 print:rounded-none print:border print:border-gray-300">
            <Field label="Name"    value={`${order.firstName} ${order.lastName}`} />
            <Field label="Phone"   value={order.phone} />
            <Field label="Email"   value={order.email} />
            <Field label="Address" value={`${order.address}, ${order.city}, CA ${order.zip}`} />
          </div>
        </section>

        {/* Order details */}
        <section className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1e90d6] mb-3">Order Details</h2>
          <div className="bg-white rounded-xl border border-[#d0e4ef] p-5 grid grid-cols-2 gap-x-8 gap-y-3 print:rounded-none print:border print:border-gray-300">
            <Field label="Water Type"      value={order.waterType} />
            <Field label="Bottle Size"     value={order.bottleSize} />
            <Field label="First Delivery"  value={order.bottlesPerDelivery} />
            <Field label="Frequency"       value={order.frequency === 'every-2-weeks' ? 'Every 2 weeks' : order.frequency} />
            <Field label="Cooler"          value={order.needsCooler} />
          </div>
        </section>

        {/* Notes */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1e90d6] mb-3">Internal Notes</h2>
          <div className="bg-white rounded-xl border border-[#d0e4ef] p-5 min-h-[80px] print:rounded-none print:border print:border-gray-300">
            {order.notes
              ? <p className="text-sm text-[#1a2a3a] whitespace-pre-wrap leading-relaxed">{order.notes}</p>
              : <p className="text-sm text-[#b0bec5] italic">No notes added.</p>
            }
          </div>
        </section>

        {/* Signature / driver section */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1e90d6] mb-3">Delivery</h2>
          <div className="bg-white rounded-xl border border-[#d0e4ef] p-5 grid grid-cols-2 gap-x-8 gap-y-6 print:rounded-none print:border print:border-gray-300">
            <div>
              <p className="text-xs text-[#5a7080] mb-6">Driver / Delivered by</p>
              <div className="border-b border-[#0d2b4e] h-px" />
              <p className="text-xs text-[#5a7080] mt-1">Signature</p>
            </div>
            <div>
              <p className="text-xs text-[#5a7080] mb-6">Delivery date</p>
              <div className="border-b border-[#0d2b4e] h-px" />
              <p className="text-xs text-[#5a7080] mt-1">Date</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-[#d0e4ef] pt-5 text-center">
          <p className="text-xs text-[#5a7080]">
            Pure O Water · (844) 522-7000 · pureowater.com · Southern California
          </p>
          <p className="text-xs text-[#b0bec5] mt-1 italic">
            Small Enough To Care. Big Enough To Deliver.
          </p>
        </div>

      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#5a7080] font-medium mb-0.5">{label}</p>
      <p className="text-sm text-[#1a2a3a] font-semibold">{value}</p>
    </div>
  )
}
