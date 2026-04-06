const products = [
  {
    emoji: '💧',
    name: 'Purified Water',
    gradient: 'from-[#0d2b4e] to-[#1565c0]',
    tag: null,
    features: [
      'Ultra filtration — 10-stage process',
      'Perfect taste, zero aftertaste',
      'Available in 3 and 5 gallon bottles',
      'Compatible with all standard coolers',
      'Ideal for home & office use',
    ],
    price: '$6.99',
    cta: 'Order Purified Water',
    ctaColor: 'bg-[#1e90d6] hover:bg-[#1565c0]',
  },
  {
    emoji: '⚗️',
    name: 'Alkaline Water',
    gradient: 'from-[#062244] via-[#0078b4] to-[#00b4d8]',
    tag: 'pH 9.5',
    features: [
      'Purified then remineralized',
      'Organic mineral blend for pH 9.5',
      'Balances body pH naturally',
      'Powerful antioxidant properties',
      'Superior hydration vs. tap water',
    ],
    price: '$8.99',
    cta: 'Order Alkaline Water',
    ctaColor: 'bg-[#00c9e4] hover:bg-[#00dff8] !text-[#0d2b4e]',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Our Products</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0d2b4e] leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Two Waters.<br />One Standard of Excellence.
            </h2>
          </div>
          <p className="text-[#5a7080] text-lg max-w-sm leading-relaxed">
            Every bottle goes through a rigorous 10-stage filtration process before it reaches your door.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {products.map((p) => (
            <div key={p.name} className="border-2 border-[#d0e4ef] rounded-2xl overflow-hidden hover:border-[#1e90d6] hover:shadow-[0_16px_48px_rgba(21,101,192,0.1)] hover:-translate-y-1 transition-all duration-300">
              {/* Card header */}
              <div className={`bg-gradient-to-br ${p.gradient} p-10 text-center relative overflow-hidden`}>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/05" />
                <div className="text-6xl mb-4 relative z-10">{p.emoji}</div>
                <h3 className="text-3xl font-bold text-white relative z-10" style={{ fontFamily: 'var(--font-playfair)' }}>{p.name}</h3>
                {p.tag && (
                  <span className="inline-block mt-2 bg-[#00c9e4]/25 text-[#00c9e4] text-sm font-bold px-4 py-1 rounded-full relative z-10">{p.tag}</span>
                )}
              </div>

              {/* Card body */}
              <div className="p-10">
                <ul className="mb-7 divide-y divide-[#d0e4ef]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 py-3 text-sm text-[#1a2a3a]">
                      <div className="w-5 h-5 rounded-full bg-[#e8f6fb] text-[#1e90d6] flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#5a7080] mb-4">
                  Starting at <span className="text-xl font-bold text-[#0d2b4e]">{p.price}/bottle</span>
                </p>
                <a
                  href="#order"
                  className={`inline-flex items-center gap-2 ${p.ctaColor} text-white px-6 py-3.5 rounded-lg font-bold text-sm transition-all hover:-translate-y-0.5`}
                >
                  {p.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
