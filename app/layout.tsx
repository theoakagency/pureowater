import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pureowater.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Pure O Water – Premium Water Delivery | Ventura County',
    template: '%s | Pure O Water',
  },
  description:
    'Premium purified and alkaline water delivery for homes, offices, and businesses across Ventura County, Santa Clarita, and the Antelope Valley. First delivery free.',
  keywords: [
    'water delivery',
    'alkaline water delivery',
    'purified water delivery',
    'Ventura County water delivery',
    'Santa Clarita water delivery',
    'Antelope Valley water delivery',
    'office water delivery',
    'pH 9.5 alkaline water',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Pure O Water',
    title: 'Pure O Water – Premium Water Delivery | Ventura County',
    description:
      'Premium purified and alkaline water delivery for homes and businesses across Southern California. First delivery free.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pure O Water – Premium Water Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pure O Water – Premium Water Delivery',
    description: 'Purified & alkaline water delivered to your door. First delivery free.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    // Add your Google Search Console verification token here
    google: 'your-google-verification-token',
  },
}

// JSON-LD local business schema for Google rich results
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Pure O Water',
  description:
    'Premium purified and alkaline water delivery for homes, offices, and businesses across Southern California.',
  url: BASE_URL,
  telephone: '+18055227002',
  email: 'hello@pureowater.com',
  foundingDate: '2005',
  priceRange: '$$',
  servesCuisine: null,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Oxnard',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.1975,
    longitude: -119.1771,
  },
  areaServed: [
    { '@type': 'City', name: 'Oxnard' },
    { '@type': 'City', name: 'Ventura' },
    { '@type': 'City', name: 'Santa Clarita' },
    { '@type': 'City', name: 'Palmdale' },
    { '@type': 'City', name: 'Lancaster' },
    { '@type': 'City', name: 'Thousand Oaks' },
    { '@type': 'City', name: 'Simi Valley' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '15:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Water Delivery Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Purified Water Delivery',
          description: '10-stage ultra-filtered purified water, 3 and 5 gallon bottles.',
        },
        price: '6.99',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Alkaline Water Delivery (pH 9.5)',
          description: 'Purified and remineralized alkaline water at pH 9.5.',
        },
        price: '8.99',
        priceCurrency: 'USD',
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/pureowater',
    'https://www.instagram.com/pureowater',
    'https://www.yelp.com/biz/pure-o-water',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className={dmSans.className}>
        {children}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
