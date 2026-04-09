import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import {
  COMPANY_NAME, BASE_URL, PHONES, EMAILS, IMAGES,
  FOUNDING_YEAR, PRICING, SOCIAL, GEO, REGIONS,
  SCHEMA_OPENING_HOURS, SCHEMA_AREAS_SERVED,
} from '@/lib/config'

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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${COMPANY_NAME} – Premium Water Delivery | ${REGIONS[0]}`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    `Premium purified and alkaline water delivery for homes, offices, and businesses across ${REGIONS.join(', ')}.`,
  keywords: [
    'water delivery',
    'alkaline water delivery',
    'purified water delivery',
    `${REGIONS[0]} water delivery`,
    `${REGIONS[1]} water delivery`,
    `${REGIONS[2]} water delivery`,
    'office water delivery',
    'pH 9.5 alkaline water',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} – Premium Water Delivery | ${REGIONS[0]}`,
    description:
      'Premium purified and alkaline water delivery for homes and businesses across Southern California.',
    images: [
      {
        url: IMAGES.ogImage,
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} – Premium Water Delivery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_NAME} – Premium Water Delivery`,
    description: 'Purified & alkaline water delivered to your door. No contracts, cancel anytime.',
    images: [IMAGES.ogImage],
  },
  icons: {
    icon: IMAGES.favicon,
    shortcut: IMAGES.favicon,
    apple: IMAGES.favicon,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// JSON-LD local business schema for Google rich results
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: COMPANY_NAME,
  description:
    'Premium purified and alkaline water delivery for homes, offices, and businesses across Southern California.',
  url: BASE_URL,
  telephone: PHONES.tollFree.intl,
  email: EMAILS.hello,
  foundingDate: String(FOUNDING_YEAR),
  priceRange: '$$',
  servesCuisine: null,
  address: {
    '@type': 'PostalAddress',
    addressLocality: GEO.primaryCity,
    addressRegion: GEO.state,
    addressCountry: GEO.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  areaServed: SCHEMA_AREAS_SERVED,
  openingHoursSpecification: SCHEMA_OPENING_HOURS,
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
        price: String(PRICING.purified),
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Alkaline Water Delivery (pH 9.5)',
          description: 'Purified and remineralized alkaline water at pH 9.5.',
        },
        price: String(PRICING.alkaline),
        priceCurrency: 'USD',
      },
    ],
  },
  sameAs: Object.values(SOCIAL),
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
