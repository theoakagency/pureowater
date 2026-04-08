'use client'

export default function ServiceAreaMap() {
  const venturaCities = [
    { name: 'Oxnard', x: 120, y: 280 },
    { name: 'Ventura', x: 160, y: 250 },
    { name: 'Camarillo', x: 170, y: 290 },
    { name: 'Thousand Oaks', x: 230, y: 300 },
    { name: 'Simi Valley', x: 255, y: 270 },
    { name: 'Moorpark', x: 210, y: 275 },
    { name: 'Ojai', x: 155, y: 225 },
    { name: 'Fillmore', x: 185, y: 230 },
    { name: 'Santa Paula', x: 165, y: 245 },
  ]

  const laCities = [
    { name: 'Santa Clarita', x: 310, y: 280 },
    { name: 'Palmdale', x: 360, y: 200 },
    { name: 'Lancaster', x: 385, y: 170 },
  ]

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#d0e4ef] overflow-hidden p-6">
      <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4 text-center">
        Our Service Area
      </p>
      <svg
        viewBox="0 0 560 420"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background — surrounding region */}
        <rect x="0" y="0" width="560" height="380" fill="#f4f7fa" rx="12" />

        {/* Ocean — Pacific */}
        <rect x="0" y="180" width="80" height="200" fill="#dbeafe" rx="0" />
        <text x="30" y="300" fontSize="10" fill="#93c5fd" textAnchor="middle" fontFamily="Arial">Pacific</text>
        <text x="30" y="314" fontSize="10" fill="#93c5fd" textAnchor="middle" fontFamily="Arial">Ocean</text>

        {/* Ventura County region */}
        <path
          d="M80 180 L80 340 L280 340 L280 240 L240 200 L180 190 L130 180 Z"
          fill="#0d2b4e"
          fillOpacity="0.15"
          stroke="#00c9e4"
          strokeWidth="2"
        />
        <text x="155" y="175" fontSize="11" fill="#0d2b4e" textAnchor="middle" fontFamily="Arial" fontWeight="bold">
          Ventura County
        </text>

        {/* LA County service region — Santa Clarita + Antelope Valley */}
        <path
          d="M280 160 L280 340 L440 340 L440 140 L380 130 L320 140 Z"
          fill="#1e90d6"
          fillOpacity="0.15"
          stroke="#1e90d6"
          strokeWidth="2"
        />
        <text x="360" y="355" fontSize="11" fill="#1565c0" textAnchor="middle" fontFamily="Arial" fontWeight="bold">
          Santa Clarita &amp; Antelope Valley
        </text>

        {/* Ventura County city dots + labels */}
        {venturaCities.map((city) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r="5" fill="#00c9e4" stroke="#0d2b4e" strokeWidth="1.5" />
            <text
              x={city.x + 8}
              y={city.y + 4}
              fontSize="9.5"
              fill="#0d2b4e"
              fontFamily="Arial"
              fontWeight="500"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* LA County city dots + labels */}
        {laCities.map((city) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r="5" fill="#1e90d6" stroke="#0d2b4e" strokeWidth="1.5" />
            <text
              x={city.x + 8}
              y={city.y + 4}
              fontSize="9.5"
              fill="#0d2b4e"
              fontFamily="Arial"
              fontWeight="500"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* Compass rose */}
        <text x="510" y="50" fontSize="18" textAnchor="middle" fill="#5a7080">N</text>
        <line x1="510" y1="55" x2="510" y2="75" stroke="#5a7080" strokeWidth="1.5" />
        <polygon points="510,55 506,68 510,65 514,68" fill="#5a7080" />
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-sm text-[#0d2b4e]">
          <div className="w-4 h-4 rounded-sm bg-[#0d2b4e]/20 border-2 border-[#00c9e4]" />
          Ventura County
        </div>
        <div className="flex items-center gap-2 text-sm text-[#0d2b4e]">
          <div className="w-4 h-4 rounded-sm bg-[#1e90d6]/20 border-2 border-[#1e90d6]" />
          Santa Clarita &amp; Antelope Valley
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5a7080]">
          <div className="w-3 h-3 rounded-full bg-[#00c9e4]" />
          Service city
        </div>
      </div>
    </div>
  )
}
