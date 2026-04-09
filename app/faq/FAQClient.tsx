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
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-sky' : 'border-border'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="font-semibold text-navy text-sm leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-sky text-xs transition-transform ${open ? 'rotate-45 bg-ice' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-muted text-sm leading-relaxed">{a}</p>
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
                  ? 'bg-navy text-white'
                  : 'bg-gray text-muted hover:bg-ice hover:text-navy'
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
