'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const SERVICE_ZIPS = [
  // Ventura County
  '93010','93011','93012',
  '93015','93016',
  '93020','93021',
  '91319','91320',
  '91377',
  '93022',
  '93023','93024',
  '93030','93031','93032','93033','93034','93035','93036',
  '93040',
  '93041','93044',
  '93060','93061',
  '93062','93063','93065','93093','93094',
  '93066',
  '91358','91359','91360','91361','91362',
  '93001','93002','93003','93004','93005','93006','93007','93009',
  // Santa Clarita
  '91350','91380','91382','91383','91390',
  '91351','91387','91321',
  '91354','91355',
  // Antelope Valley
  '93534','93535','93536','93539','93584',
  '93550','93551','93552','93590','93591','93599',
  '93510','93532','93543','93544','93560','93561','93531',
  '93501','93505','93516','93523','93524',
]

export default function Hero() {
  const [zip, setZip] = useState('')
  const [zipResult, setZipResult] = useState<null | 'yes' | 'no'>(null)

  const checkZip = () => {
    if (zip.length !== 5 || !/^\d+$/.test(zip)) return
    setZipResult(SERVICE_ZIPS.includes(zip) ? 'yes' : 'no')
  }

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden pt-16">
      {/* Background image */}
      <Image
        src="/pure-o-water-bottles.png"
        alt="Pure O Water delivery"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#00c9e4]/10 border border-[#00c9e4]/30 text-[#00c9e4] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c9e4] animate-pulse" />
            Serving Southern California for Over 20 Years
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Premium Water<br />
            Delivered to<br />
            Your <span className="text-[#00c9e4]">Door.</span>
          </h1>

          <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-lg">
            Alkaline and Purified water for homes, offices, and businesses
            across Ventura County, Santa Clarita, and the Antelope Valley.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#order"
              className="inline-flex items-center gap-2 bg-[#00c9e4] text-[#0d2b4e] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#00dff8] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]"
            >
              Start My Delivery →
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-4 rounded-lg font-medium text-base hover:bg-white/10 hover:border-white/50 transition-all"
            >
              View Products
            </a>
          </div>
        </div>
      </div>

      {/* Frosted stats + zip bar */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Stats */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <CheckCircle2 size={18} className="text-[#00c9e4]" />
            <span className="text-white font-bold text-sm">6,000+</span>
            <span className="text-white/60 text-sm">Happy customers</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/20 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <CheckCircle2 size={18} className="text-[#00c9e4]" />
            <span className="text-white font-bold text-sm">20 years</span>
            <span className="text-white/60 text-sm">In business</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/20 flex-shrink-0" />

          {/* Zip checker — fills remaining space */}
          <div className="flex-1 w-full">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your zip code to check delivery area"
                maxLength={5}
                value={zip}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setZipResult(null) }}
                onKeyDown={(e) => e.key === 'Enter' && checkZip()}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 text-sm outline-none focus:border-[#00c9e4] transition-colors min-w-0"
              />
              <button
                onClick={checkZip}
                className="bg-[#00c9e4] text-[#0d2b4e] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#00dff8] transition-colors whitespace-nowrap flex-shrink-0"
              >
                Check →
              </button>
            </div>
            {zipResult === 'yes' && (
              <p className="mt-1.5 text-emerald-400 text-xs font-medium flex items-center gap-1"><CheckCircle2 size={13} /> Great news — we deliver to {zip}!</p>
            )}
            {zipResult === 'no' && (
              <p className="mt-1.5 text-white/50 text-xs">We don&apos;t currently deliver to {zip}, but fill out the form and we&apos;ll let you know when we expand.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
