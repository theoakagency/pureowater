'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Inbox, Download, Trash2, Printer } from 'lucide-react'
import Image from 'next/image'
import { COMPANY_NAME, IMAGES } from '@/lib/config'

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
  new:       'bg-ice text-navy border-aqua/30',
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
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

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

  const deleteOrder = async (id: number) => {
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    setOrders((prev) => prev.filter((o) => o.id !== id))
    if (expanded === id) setExpanded(null)
    setConfirmDelete(null)
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
    <div className="min-h-screen bg-gray">
      {/* Top nav */}
      <header className="bg-navy text-white px-6 py-0 h-14 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image src={IMAGES.logo} alt={COMPANY_NAME} width={120} height={40} className="h-7 w-auto brightness-0 invert" />
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
            { label: 'Total Orders',   value: stats.total,     color: 'text-navy' },
            { label: 'New',            value: stats.new,        color: 'text-aqua' },
            { label: 'Confirmed',      value: stats.confirmed,  color: 'text-blue-600'  },
            { label: 'Active',         value: stats.active,     color: 'text-emerald-600'},
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-5">
              <div className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: 'var(--font-playfair)' }}>
                {s.value}
              </div>
              <div className="text-muted text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-border p-4 mb-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search name, city, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-border rounded-lg px-3.5 py-2 text-sm outline-none focus:border-sky w-56"
            />

            {/* Status filter */}
            <div className="flex gap-1.5 flex-wrap">
              {['all', ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === s
                      ? 'bg-navy text-white'
                      : 'bg-gray text-muted hover:bg-ice'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-ice hover:bg-border text-navy px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-muted text-sm">Loading orders…</div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-14 h-14 rounded-full bg-gray flex items-center justify-center mx-auto mb-3">
                <Inbox size={28} className="text-muted" />
              </div>
              <p className="text-muted font-medium">No orders found</p>
              <p className="text-muted text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Customer</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Location</th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Order</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-gray transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    >
                      <td className="px-4 py-3 text-muted font-mono text-xs">#{order.id}</td>
                      <td className="px-4 py-3 text-muted whitespace-nowrap text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-navy">{order.firstName} {order.lastName}</div>
                        <div className="text-muted text-xs">{order.phone}</div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3">
                        <div className="text-dark">{order.city}</div>
                        <div className="text-muted text-xs">{order.zip}</div>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3">
                        <div className="text-dark">{order.waterType}</div>
                        <div className="text-muted text-xs">{order.bottleSize} · {order.bottlesPerDelivery}</div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3">
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
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`/admin/orders/${order.id}/print`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-navy transition-colors"
                            title="Print order"
                          >
                            <Printer size={14} />
                          </a>
                          <button
                            onClick={() => setConfirmDelete(order.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                            title="Delete order"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expanded === order.id && (
                      <tr key={`${order.id}-detail`} className="bg-gray">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Contact */}
                            <div>
                              <h4 className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Contact</h4>
                              <p className="text-sm text-dark mb-1">{order.firstName} {order.lastName}</p>
                              <a href={`tel:${order.phone}`} className="block text-sm text-sky mb-1">{order.phone}</a>
                              <a href={`mailto:${order.email}`} className="block text-sm text-sky mb-1">{order.email}</a>
                              <p className="text-sm text-muted">{order.address}, {order.city}, CA {order.zip}</p>
                            </div>

                            {/* Order detail */}
                            <div>
                              <h4 className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Order Details</h4>
                              <dl className="space-y-1 text-sm">
                                {[
                                  ['Water', order.waterType],
                                  ['Size', order.bottleSize],
                                  ['Quantity', order.bottlesPerDelivery],
                                  ['Frequency', order.frequency],
                                  ['Cooler', order.needsCooler],
                                ].map(([k, v]) => (
                                  <div key={k} className="flex gap-2">
                                    <dt className="text-muted w-20 flex-shrink-0">{k}</dt>
                                    <dd className="text-dark font-medium">{v}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            {/* Notes */}
                            <div>
                              <h4 className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Notes</h4>
                              <textarea
                                rows={3}
                                placeholder="Add internal notes…"
                                defaultValue={order.notes}
                                onChange={(e) => setNotesDraft((prev) => ({ ...prev, [order.id]: e.target.value }))}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-sky resize-none bg-white"
                              />
                              <button
                                onClick={() => saveNotes(order.id)}
                                disabled={saving === order.id}
                                className="mt-2 bg-navy hover:bg-blue text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
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

        <p className="text-muted text-xs mt-4 text-center">
          {orders.length} order{orders.length !== 1 ? 's' : ''} · Click any row to expand details
        </p>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="bg-navy px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <Trash2 size={15} className="text-red-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Delete Order #{confirmDelete}</p>
                <p className="text-white/50 text-xs">{COMPANY_NAME} Admin</p>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-dark text-sm leading-relaxed">
                Are you sure you want to delete order <span className="font-bold">#{confirmDelete}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 border border-border text-muted hover:bg-gray py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteOrder(confirmDelete)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
