'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { COMPANY_NAME, IMAGES } from '@/lib/config'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deeper to-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image src={IMAGES.logo} alt={COMPANY_NAME} width={160} height={54} className="h-12 w-auto brightness-0 invert mx-auto" />
          <p className="text-white/50 text-sm mt-4">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <h1 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
            Sign In
          </h1>
          <p className="text-muted text-sm mb-6">Access the order management dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                autoComplete="username"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                autoComplete="current-password"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy hover:bg-blue text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          &copy; {new Date().getFullYear()} {COMPANY_NAME} — Admin Access Only
        </p>
      </div>
    </div>
  )
}
