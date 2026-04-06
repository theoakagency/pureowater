const steps = [
  { num: '1', title: 'Choose Your Water', desc: 'Select purified or alkaline, your bottle size, and how many you need per delivery.' },
  { num: '2', title: 'Pick Your Schedule', desc: 'Weekly, bi-weekly, or monthly. We deliver on your timetable, not ours.' },
  { num: '3', title: 'We Deliver to You', desc: 'Fresh bottles delivered to your door. We pick up empties at no extra charge.' },
  { num: '4', title: 'Enjoy & Repeat',    desc: 'Stay hydrated. Adjust, pause, or cancel your delivery any time — no fees.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Simple Process</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d2b4e] mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get Started in Minutes
          </h2>
          <p className="text-[#5a7080] text-lg max-w-md mx-auto leading-relaxed">
            No contracts, no commitment — just great water delivered on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#e8f6fb] via-[#d0e4ef] to-[#e8f6fb]" />

          {steps.map((step) => (
            <div key={step.num} className="text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#0d2b4e] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-5 ring-4 ring-[#d0e4ef] ring-offset-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {step.num}
              </div>
              <h3 className="font-bold text-[#0d2b4e] text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{step.title}</h3>
              <p className="text-[#5a7080] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
