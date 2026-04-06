'use client'

import { useState } from 'react'

type FAQItem = { q: string; a: string }

export default function ServiceFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all ${open === i ? 'border-[#1e90d6]' : 'border-[#d0e4ef]'}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
          >
            <span className="font-semibold text-[#0d2b4e] text-sm leading-snug">{item.q}</span>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#d0e4ef] flex items-center justify-center text-[#1e90d6] text-xs transition-transform ${open === i ? 'rotate-45 bg-[#e8f6fb]' : ''}`}>
              +
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 pt-0">
              <p className="text-[#5a7080] text-sm leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
