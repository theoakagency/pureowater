'use client'

import { useRef, useEffect, useState } from 'react'

export default function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      setOffset(scrolled * 0.25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="relative h-[420px] overflow-hidden"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 w-full"
        style={{
          backgroundImage: 'url(/pure-o-water.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset}px)`,
          top: '-80px',
          bottom: '-80px',
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(13,43,78,0.72) 0%, rgba(13,43,78,0.55) 50%, rgba(13,43,78,0.35) 100%)' }} />

      {/* Content centered over the image */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#00c9e4] text-xs font-bold tracking-[0.15em] uppercase mb-4">
          Pure. Clean. Refreshing.
        </p>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight mb-6"
          style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
        >
          Water the Way Nature<br />Intended It.
        </h2>
        <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
          Every bottle goes through our 10-stage filtration process — removing 99.9% of contaminants and leaving only pure, perfect water.
        </p>
        <a
          href="/#order"
          className="inline-flex items-center gap-2 bg-[#00c9e4] text-[#0d2b4e] px-8 py-4 rounded-lg font-bold hover:bg-[#00dff8] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]"
        >
          Start My Delivery →
        </a>
      </div>
    </div>
  )
}
