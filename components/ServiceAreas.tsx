import { MapPin, Home, Mountain, Wind, Building2, Waves, Leaf, Sun } from 'lucide-react'

const areas = [
  { icon: Waves,     name: 'Oxnard',              desc: 'Home, office & industrial delivery throughout Oxnard and Port Hueneme.',   href: '/areas/oxnard' },
  { icon: Home,      name: 'Ventura',              desc: 'Serving all of Ventura city with bi-weekly delivery options.',             href: '/areas/ventura' },
  { icon: Building2, name: 'Camarillo',            desc: 'Camarillo and surrounding Ventura County communities.',                    href: '/areas/camarillo' },
  { icon: Building2, name: 'Thousand Oaks',        desc: 'Newbury Park, Westlake Village, and Oak Park included.',                  href: '/areas/thousand-oaks' },
  { icon: Home,      name: 'Simi Valley',          desc: 'Wood Ranch, Big Sky, and all Simi Valley neighborhoods.',                 href: '/areas/simi-valley' },
  { icon: Leaf,      name: 'Moorpark',             desc: 'Moorpark and Tierra Rejada Valley homes and businesses.',                 href: '/areas/moorpark' },
  { icon: Sun,       name: 'Ojai',                 desc: 'Ojai Valley, Oak View, Meiners Oaks, and Casitas Springs.',              href: '/areas/ojai' },
  { icon: Leaf,      name: 'Fillmore',             desc: 'Fillmore, Piru, and surrounding communities.',                            href: '/areas/fillmore' },
  { icon: Leaf,      name: 'Santa Paula',          desc: 'Santa Paula and surrounding agricultural communities.',                   href: '/areas/santa-paula' },
  { icon: Mountain,  name: 'Santa Clarita',        desc: 'Valencia, Saugus, Newhall, and Canyon Country covered.',                 href: '/areas/santa-clarita' },
  { icon: Wind,      name: 'Antelope Valley',      desc: 'Palmdale, Lancaster, Rosamond, and surrounding communities.',            href: '/areas/antelope-valley' },
  { icon: MapPin,    name: "Don't see your city?", desc: 'Enter your zip above — we may still deliver to you.',                    href: '/#order' },
]

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-24 px-6 bg-gray">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Where We Deliver</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            We Deliver Across<br />Southern California
          </h2>
          <p className="text-muted text-lg max-w-sm">
            Click your city for local delivery info, pricing, and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <a
                key={area.name}
                href={area.href}
                className={`group flex flex-col bg-white border-2 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky hover:shadow-[0_8px_28px_rgba(21,101,192,0.12)] no-underline ${
                  i === areas.length - 1 ? 'border-dashed border-border bg-ice' : 'border-border'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-ice flex items-center justify-center mb-4">
                  <Icon size={20} className="text-sky" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{area.name}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{area.desc}</p>
                <span className="text-sky text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                  {i === areas.length - 1 ? 'Check my zip →' : 'View delivery info →'}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
