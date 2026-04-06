'use client'

import { useState } from 'react'

const SERVICE_ZIPS = [
  '93001','93003','93004','93010','93012','93015','93021','93030','93033',
  '93035','93036','93040','93041','93060','93063','93065','93066',
  '91321','91350','91351','91354','91355','91381','91384','91390',
  '93510','93534','93535','93536','93543','93544','93550','93551','93552','93553',
]

export default function Hero() {
  const [zip, setZip] = useState('')
  const [zipResult, setZipResult] = useState<null | 'yes' | 'no'>(null)

  const checkZip = () => {
    if (zip.length !== 5 || !/^\d+$/.test(zip)) return
    setZipResult(SERVICE_ZIPS.includes(zip) ? 'yes' : 'no')
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#061c35] via-[#0d2b4e] to-[#0f4a7a] flex items-center relative overflow-hidden pt-16">
      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(0,201,228,0.1) 0%, transparent 65%)' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(30,144,214,0.12) 0%, transparent 60%)' }} />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { size: 18, left: '12%', delay: '0s',  duration: '9s'  },
          { size: 10, left: '28%', delay: '2s',  duration: '7s'  },
          { size: 24, left: '55%', delay: '1s',  duration: '11s' },
          { size: 14, left: '70%', delay: '4s',  duration: '8s'  },
          { size: 8,  left: '85%', delay: '3s',  duration: '6s'  },
          { size: 20, left: '40%', delay: '5s',  duration: '10s' },
        ].map((b, i) => (
          <div
            key={i}
            className="bubble"
            style={{ width: b.size, height: b.size, left: b.left, bottom: '-30px', animationDelay: b.delay, animationDuration: b.duration }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left — copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00c9e4]/10 border border-[#00c9e4]/30 text-[#00c9e4] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c9e4] animate-pulse" />
            Serving Southern California Since 2005
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Premium Water<br />
            Delivered to<br />
            Your <span className="text-[#00c9e4]">Door.</span>
          </h1>

          <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-md">
            Pure alkaline and purified water for homes, offices, and businesses
            across Ventura County, Santa Clarita, and the Antelope Valley.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#order"
              className="inline-flex items-center gap-2 bg-[#00c9e4] text-[#0d2b4e] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#00dff8] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]"
            >
              Start My Delivery →
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-4 rounded-lg font-medium text-base hover:bg-white/5 hover:border-white/40 transition-all"
            >
              View Products
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-white/10">
            {[
              { num: '2,400+', label: 'Happy customers' },
              { num: '20 yr',  label: 'In business' },
              { num: 'pH 9.5', label: 'Alkaline grade' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>{s.num}</div>
                <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product cards + zip checker */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '💧', name: 'Purified Water',  tag: '10-Stage Filter', desc: 'Ultra-filtered for perfect purity and taste', featured: true },
              { emoji: '⚗️', name: 'Alkaline Water',  tag: 'pH 9.5',          desc: 'Remineralized with organic minerals', featured: false },
            ].map((card) => (
              <div
                key={card.name}
                className={`rounded-2xl p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer ${
                  card.featured
                    ? 'bg-[#00c9e4]/07 border border-[#00c9e4]/35'
                    : 'bg-white/05 border border-white/12 hover:border-[#00c9e4]/40'
                }`}
              >
                <div className="text-4xl mb-3">{card.emoji}</div>
                <div className="text-white font-bold text-base mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{card.name}</div>
                <span className="inline-block bg-[#00c9e4]/20 text-[#00c9e4] text-xs font-semibold px-3 py-1 rounded-full mb-2">{card.tag}</span>
                <p className="text-white/50 text-sm leading-snug">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Zip checker */}
          <div className="bg-white/06 border border-white/12 rounded-xl p-5">
            <span className="text-white/40 text-xs block mb-3">Check your delivery area</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your zip code"
                maxLength={5}
                value={zip}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setZipResult(null) }}
                onKeyDown={(e) => e.key === 'Enter' && checkZip()}
                className="flex-1 bg-white/08 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/35 text-sm outline-none focus:border-[#00c9e4] transition-colors"
              />
              <button
                onClick={checkZip}
                className="bg-[#00c9e4] text-[#0d2b4e] px-5 py-3 rounded-lg font-bold text-sm hover:bg-[#00dff8] transition-colors whitespace-nowrap"
              >
                Check →
              </button>
            </div>
            {zipResult === 'yes' && (
              <p className="mt-2 text-emerald-400 text-sm font-medium">✓ Great news — we deliver to {zip}!</p>
            )}
            {zipResult === 'no' && (
              <p className="mt-2 text-white/50 text-sm">We don&apos;t currently deliver to {zip}, but fill out the form and we&apos;ll let you know when we expand.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
