const steps = [
  {
    num: '1',
    title: 'Choose Your Water',
    desc: 'Select purified or alkaline water and your bottle size. Tell us roughly how much you think you\'ll need.',
  },
  {
    num: '2',
    title: 'We Set Up Your Schedule',
    desc: 'All new customers start on a delivery every 2 weeks — the most popular option. We adjust from there as your needs grow.',
  },
  {
    num: '3',
    title: 'We Deliver to You',
    desc: 'Fresh bottles delivered to your door. We pick up empties at no extra charge.',
  },
  {
    num: '4',
    title: 'We Grow With You',
    desc: 'Need more water over time? Just call us. We\'ll adjust your delivery size and frequency together — no forms, no hassle.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-sky mb-4">Simple Process</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get Started in Minutes
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
            No contracts, no commitment — just great water delivered on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-ice via-border to-ice" />

          {steps.map((step) => (
            <div key={step.num} className="text-center relative z-10">
              <div className="w-14 h-14 rounded-full border-2 border-sky text-sky text-xl font-bold flex items-center justify-center mx-auto mb-5 bg-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                {step.num}
              </div>
              <h3 className="font-bold text-navy text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
