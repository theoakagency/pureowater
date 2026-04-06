const footerLinks = {
  Products: ['Purified Water', 'Alkaline Water', 'Water Cooler Rental', 'Office Delivery', 'Restaurant Service'],
  'Service Areas': ['Oxnard', 'Ventura', 'Santa Clarita', 'Antelope Valley', 'Thousand Oaks'],
  Company: ['About Us', 'Current Offers', 'FAQ', 'Contact', 'Admin Login'],
}

export default function Footer() {
  return (
    <footer className="bg-[#061c35] text-white/60 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                Pure<span className="text-[#00c9e4]">O</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-[#00c9e4] uppercase -mt-0.5">Water</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium purified and alkaline water delivered to homes, offices, and businesses across Southern California.
            </p>
            <a href="tel:+18055227002" className="flex items-center gap-2 mt-5 text-[#00c9e4] font-bold text-lg hover:text-[#00dff8] transition-colors">
              📞 (805) 522-7002
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Admin Login' ? '/admin' : '#'}
                      className="text-white/55 hover:text-[#00c9e4] text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/08 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© 2025 Pure O Water. All rights reserved.</span>
          <span>Ventura County · Santa Clarita · Antelope Valley</span>
        </div>
      </div>
    </footer>
  )
}
