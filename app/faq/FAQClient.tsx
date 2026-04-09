'use client'

import { useState } from 'react'

export interface FAQItem {
  q: string
  a: string
}

export interface FAQCategory {
  label: string
  icon: React.ComponentType<{ size?: number }>
  items: FAQItem[]
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-[#1e90d6]' : 'border-[#d0e4ef]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="font-semibold text-[#0d2b4e] text-sm leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#d0e4ef] flex items-center justify-center text-[#1e90d6] text-xs transition-transform ${open ? 'rotate-45 bg-[#e8f6fb]' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-[#5a7080] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQClient({ categories }: { categories: FAQCategory[] }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const current = categories[activeCategory]

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === i
                  ? 'bg-[#0d2b4e] text-white'
                  : 'bg-[#f4f7fa] text-[#5a7080] hover:bg-[#e8f6fb] hover:text-[#0d2b4e]'
              }`}
            >
              <Icon size={15} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {current.items.map((item) => (
          <AccordionItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </>
  )
}
