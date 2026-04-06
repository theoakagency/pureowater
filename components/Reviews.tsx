import { Award, ShieldCheck, RefreshCw, DollarSign, Truck } from 'lucide-react'

const trustItems = [
  { icon: Award,       label: 'Shop Local Guarantee' },
  { icon: ShieldCheck, label: 'NSF Certified' },
  { icon: RefreshCw,   label: 'Flexible Scheduling' },
  { icon: DollarSign,  label: 'Under $1/day' },
  { icon: Truck,       label: 'Delivered Every 2 Weeks' },
]

const reviews = [
  {
    stars: 5,
    text: "We've been getting Pure O Water delivered to our office for 3 years. The alkaline water is incredible — our whole team drinks more water now. Delivery is always on time and the guys are super friendly.",
    name: 'Maria Rodriguez',
    role: 'Office Manager · Oxnard, CA',
    initials: 'MR',
  },
  {
    stars: 5,
    text: "Switched from a big national brand and I'm so glad I did. The water tastes better, it's cheaper, and I'm supporting a local business. Can't ask for more than that.",
    name: 'David Kim',
    role: 'Homeowner · Santa Clarita, CA',
    initials: 'DK',
  },
  {
    stars: 5,
    text: "Our restaurant uses Pure O for all our cooking water and customer service. The consistent quality makes a real difference in our food and beverages. Highly recommend for any food business.",
    name: 'Ana Lopez',
    role: 'Restaurant Owner · Ventura, CA',
    initials: 'AL',
  },
]

export function TrustBar() {
  return (
    <div className="bg-[#e8f6fb] border-y border-[#d0e4ef] py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-5">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-[#0d2b4e]">
              <div className="w-8 h-8 rounded-full bg-[#1565c0] text-white flex items-center justify-center flex-shrink-0">
                <Icon size={15} />
              </div>
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Reviews() {
  return (
    <section className="py-24 px-6 bg-[#e8f6fb]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e90d6] mb-4">Customer Reviews</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d2b4e]" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white border border-[#d0e4ef] rounded-2xl p-7">
              <div className="text-[#f0a500] text-lg tracking-widest mb-4">{'★'.repeat(r.stars)}</div>
              <p className="text-[#1a2a3a] text-sm leading-relaxed italic mb-6">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0d2b4e] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0d2b4e]">{r.name}</div>
                  <div className="text-xs text-[#5a7080]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
