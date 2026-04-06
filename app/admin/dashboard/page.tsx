'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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

const STATUS_COLORS: Record<string, string> = {
  new:       'bg-[#e8f6fb] text-[#0d2b4e] border-[#00c9e4]/30',
  confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
  active:    'bg-emerald-50 text-emerald-800 border-emerald-200',
  paused:    'bg-amber-50 text-amber-800 border-amber-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const STATUSES = ['new', 'confirmed', 'active', 'paused', 'cancelled']

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders]         = useState<Order[]>([])
  const [loading, setLoading]       = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch]         = useState('')
  const [expanded, setExpanded]     = useState<number | null>(null)
  const [notesDraft, setNotesDraft] = useState<Record<number, string>>({})
  const [saving, setSaving]         = useState<number | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (search) params.set('search', search)
    const res = await fetch(`/api/orders?${params}`)
    if (res.status === 401) { router.push('/admin'); return }
    const data = await res.json()
    setOrders(data)
    setLoading(false)
  }, [statusFilter, search, router])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }

  const saveNotes = async (id: number) => {
    setSaving(id)
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notesDraft[id] ?? '' }),
    })
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, notes: notesDraft[id] ?? '' } : o))
    setSaving(null)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  const exportCSV = () => {
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    window.open(`/api/admin/export?${params}`, '_blank')
  }

  // Stats
  const stats = {
    total:     orders.length,
    new:       orders.filter((o) => o.status === 'new').length,
    active:    orders.filter((o) => o.status === 'active').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      {/* Top nav */}
      <header className="bg-[#0d2b4e] text-white px-6 py-0 h-14 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
            Pure<span className="text-[#00c9e4]">O</span>
          </span>
          <span className="text-white/30 text-sm">|</span>
          <span className="text-white/70 text-sm font-medium">Order Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-white/50 hover:text-white text-sm transition-colors">
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders',   value: stats.total,     color: 'text-[#0d2b4e]' },
            { label: 'New',            value: stats.new,        color: 'text-[#00c9e4]' },
            { label: 'Confirmed',      value: stats.confirmed,  color: 'text-blue-600'  },
            { label: 'Active',         value: stats.active,     color: 'text-emerald-600'},
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#d0e4ef] p-5">
              <div className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: 'var(--font-playfair)' }}>
                {s.value}
              </div>
              <div className="text-[#5a7080] text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-[#d0e4ef] p-4 mb-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search name, city, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#d0e4ef] rounded-lg px-3.5 py-2 text-sm outline-none focus:border-[#1e90d6] w-56"
            />

            {/* Status filter */}
            <div className="flex gap-1.5 flex-wrap">
              {['all', ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === s
                      ? 'bg-[#0d2b4e] text-white'
                      : 'bg-[#f4f7fa] text-[#5a7080] hover:bg-[#e8f6fb]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-[#e8f6fb] hover:bg-[#d0e4ef] text-[#0d2b4e] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            ⬇ Export CSV
          </button>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-xl border border-[#d0e4ef] overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-[#5a7080] text-sm">Loading orders…</div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-[#5a7080] font-medium">No orders found</p>
              <p className="text-[#5a7080] text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f4f7fa] border-b border-[#d0e4ef]">
                  {['ID', 'Date', 'Customer', 'Location', 'Order', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-[#5a7080] uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4f7fa]">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-[#f4f7fa] transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    >
                      <td className="px-4 py-3 text-[#5a7080] font-mono text-xs">#{order.id}</td>
                      <td className="px-4 py-3 text-[#5a7080] whitespace-nowrap text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#0d2b4e]">{order.firstName} {order.lastName}</div>
                        <div className="text-[#5a7080] text-xs">{order.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[#1a2a3a]">{order.city}</div>
                        <div className="text-[#5a7080] text-xs">{order.zip}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[#1a2a3a]">{order.waterType}</div>
                        <div className="text-[#5a7080] text-xs">{order.bottleSize} · {order.bottlesPerDelivery}</div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border capitalize outline-none cursor-pointer ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`mailto:${order.email}`}
                            className="text-[#1e90d6] hover:underline text-xs font-medium"
                          >
                            Email
                          </a>
                          <span className="text-[#d0e4ef]">|</span>
                          <a
                            href={`tel:${order.phone}`}
                            className="text-[#1e90d6] hover:underline text-xs font-medium"
                          >
                            Call
                          </a>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expanded === order.id && (
                      <tr key={`${order.id}-detail`} className="bg-[#f4f7fa]">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Contact */}
                            <div>
                              <h4 className="text-xs font-bold text-[#5a7080] uppercase tracking-wide mb-2">Contact</h4>
                              <p className="text-sm text-[#1a2a3a] mb-1">{order.firstName} {order.lastName}</p>
                              <a href={`tel:${order.phone}`} className="block text-sm text-[#1e90d6] mb-1">{order.phone}</a>
                              <a href={`mailto:${order.email}`} className="block text-sm text-[#1e90d6] mb-1">{order.email}</a>
                              <p className="text-sm text-[#5a7080]">{order.address}, {order.city}, CA {order.zip}</p>
                            </div>

                            {/* Order detail */}
                            <div>
                              <h4 className="text-xs font-bold text-[#5a7080] uppercase tracking-wide mb-2">Order Details</h4>
                              <dl className="space-y-1 text-sm">
                                {[
                                  ['Water', order.waterType],
                                  ['Size', order.bottleSize],
                                  ['Quantity', order.bottlesPerDelivery],
                                  ['Frequency', order.frequency],
                                  ['Cooler', order.needsCooler],
                                ].map(([k, v]) => (
                                  <div key={k} className="flex gap-2">
                                    <dt className="text-[#5a7080] w-20 flex-shrink-0">{k}</dt>
                                    <dd className="text-[#1a2a3a] font-medium">{v}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            {/* Notes */}
                            <div>
                              <h4 className="text-xs font-bold text-[#5a7080] uppercase tracking-wide mb-2">Notes</h4>
                              <textarea
                                rows={3}
                                placeholder="Add internal notes…"
                                defaultValue={order.notes}
                                onChange={(e) => setNotesDraft((prev) => ({ ...prev, [order.id]: e.target.value }))}
                                className="w-full border border-[#d0e4ef] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1e90d6] resize-none bg-white"
                              />
                              <button
                                onClick={() => saveNotes(order.id)}
                                disabled={saving === order.id}
                                className="mt-2 bg-[#0d2b4e] hover:bg-[#1565c0] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                              >
                                {saving === order.id ? 'Saving…' : 'Save Notes'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-[#5a7080] text-xs mt-4 text-center">
          {orders.length} order{orders.length !== 1 ? 's' : ''} · Click any row to expand details
        </p>
      </div>
    </div>
  )
}
