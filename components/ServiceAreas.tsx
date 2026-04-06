const areas = [
  { icon: '🌴', name: 'Oxnard',           desc: 'Home, office & industrial delivery throughout Oxnard and Port Hueneme.' },
  { icon: '🏘️', name: 'Ventura',           desc: 'Serving all of Ventura city with bi-weekly and weekly delivery options.' },
  { icon: '🏔️', name: 'Santa Clarita',     desc: 'Valencia, Saugus, Newhall, and Canyon Country covered.' },
  { icon: '🌾', name: 'Antelope Valley',   desc: 'Palmdale, Lancaster, and surrounding Antelope Valley communities.' },
  { icon: '🏢', name: 'Thousand Oaks',     desc: 'Newbury Park, Westlake Village, and Agoura Hills included.' },
  { icon: '📍', name: "Don't see your city?", desc: 'Enter your zip above — we may still deliver to you.' },
]

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-24 px-6 bg-[#f4f7fa]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Where We Deliver</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d2b4e] leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            We Deliver Across<br />Southern California
          </h2>
          <p className="text-[#5a7080] text-lg max-w-sm">
            Click your city for local delivery info, pricing, and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area, i) => (
            <a
              key={area.name}
              href={i === areas.length - 1 ? '#order' : `/areas/${area.name.toLowerCase().replace(/ /g, '-')}`}
              className={`group flex flex-col bg-white border-2 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#1e90d6] hover:shadow-[0_8px_28px_rgba(21,101,192,0.12)] no-underline ${
                i === areas.length - 1 ? 'border-dashed border-[#d0e4ef] bg-[#e8f6fb]' : 'border-[#d0e4ef]'
              }`}
            >
              <div className="text-3xl mb-3">{area.icon}</div>
              <h3 className="font-bold text-[#0d2b4e] text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{area.name}</h3>
              <p className="text-[#5a7080] text-sm leading-relaxed flex-1 mb-4">{area.desc}</p>
              <span className="text-[#1e90d6] text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                {i === areas.length - 1 ? 'Check my zip →' : 'View delivery info →'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
