import Link from 'next/link'

interface Crumb { label: string; href: string }

interface PageHeroProps {
  badge?: string
  title: string
  titleAccent?: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  cta?: { label: string; href: string }
  compact?: boolean
}

export default function PageHero({
  badge,
  title,
  titleAccent,
  subtitle,
  breadcrumbs,
  cta,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`bg-gradient-to-br from-deeper via-navy to-ocean flex items-center pt-16 px-6 relative overflow-hidden ${
        compact ? 'min-h-[44vh]' : 'min-h-[56vh]'
      }`}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-3/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,201,228,0.09) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full py-16">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span>/</span>
                {crumb.href === '#' ? (
                  <span className="text-white/60">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white/70 transition-colors">{crumb.label}</Link>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 bg-aqua/10 border border-aqua/30 text-aqua text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-aqua">{titleAccent}</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-white/65 max-w-xl leading-relaxed mb-8">{subtitle}</p>
        )}

        {/* CTA */}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 bg-aqua text-navy px-8 py-4 rounded-lg font-bold hover:bg-aqua-light transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,201,228,0.35)]"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  )
}
