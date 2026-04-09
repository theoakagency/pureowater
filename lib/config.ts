/**
 * Central brand configuration.
 *
 * Every customer-facing string, phone number, address, price, and image
 * path lives here so a new deployment only requires editing this file
 * (plus swapping assets in /public and colors in globals.css).
 */

// ─── Company ────────────────────────────────────────────────────────
export const COMPANY_NAME = 'Pure O Water'
export const COMPANY_LEGAL = 'Pure O Water'
export const TAGLINE = 'Small Enough To Care. Big Enough To Deliver.'
export const FOUNDING_YEAR = 2005

export const STATS = {
  yearsInBusiness: '20+',
  customers: '6,000+',
  communities: '11',
} as const

// ─── Website ────────────────────────────────────────────────────────
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://pureowater.com'
export const DOMAIN = 'pureowater.com'

// ─── Contact ────────────────────────────────────────────────────────
export const PHONES = {
  primary: { label: 'Ventura County', display: '(805) 991-7400', href: 'tel:+18059917400', intl: '+18059917400' },
  secondary: { label: 'Antelope Valley & Santa Clarita', display: '(661) 522-7002', href: 'tel:+16615227002', intl: '+16615227002' },
  tollFree: { label: 'Toll-Free', display: '(844) 522-7000', href: 'tel:+18445227000', intl: '+18445227000' },
} as const

export const EMAILS = {
  hello: `hello@${DOMAIN}`,
  contact: `contact@${DOMAIN}`,
  orders: `orders@${DOMAIN}`,
} as const

export const ADDRESSES = {
  ventura: {
    label: 'Ventura County',
    street: '4744 Telephone Rd, Suite 3257',
    city: 'Ventura',
    state: 'CA',
    zip: '93003',
    full: '4744 Telephone Rd, Suite 3257\nVentura, CA 93003',
  },
  antelope: {
    label: 'Antelope Valley & Santa Clarita',
    street: '19425 Soledad Canyon Rd, Suite 205',
    city: 'Canyon Country',
    state: 'CA',
    zip: '91351',
    full: '19425 Soledad Canyon Rd, Suite 205\nCanyon Country, CA 91351',
  },
} as const

export const HOURS = [
  { day: 'Monday – Friday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
] as const

// ─── Social ─────────────────────────────────────────────────────────
export const SOCIAL = {
  facebook: 'https://www.facebook.com/pureowater',
  instagram: 'https://www.instagram.com/pureowater',
  yelp: 'https://www.yelp.com/biz/pure-o-water',
} as const

// ─── Pricing ────────────────────────────────────────────────────────
export const PRICING = {
  deliveryFee: 7,
  purified: 6.99,
  alkaline: 8.99,
} as const

// ─── Service Regions ────────────────────────────────────────────────
export const REGIONS = ['Ventura County', 'Santa Clarita', 'Antelope Valley'] as const
export const REGION_SUMMARY = 'Ventura County, Santa Clarita, and the Antelope Valley'
export const REGION_SHORT = 'Southern California'

export const GEO = {
  latitude: 34.1975,
  longitude: -119.1771,
  primaryCity: 'Oxnard',
  state: 'CA',
  country: 'US',
} as const

// ─── Images ─────────────────────────────────────────────────────────
export const IMAGES = {
  logo: '/logo.png',
  favicon: '/favicon.png',
  ogImage: '/pure-o-water-bottles.png',
  heroBackground: '/pure-o-water-bottles.png',
  parallax: '/pure-o-water.png',
} as const

// ─── Opening hours (schema.org format) ──────────────────────────────
export const SCHEMA_OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
]

// ─── Areas served (schema.org format) ───────────────────────────────
export const SCHEMA_AREAS_SERVED = [
  { '@type': 'City' as const, name: 'Oxnard' },
  { '@type': 'City' as const, name: 'Ventura' },
  { '@type': 'City' as const, name: 'Santa Clarita' },
  { '@type': 'City' as const, name: 'Palmdale' },
  { '@type': 'City' as const, name: 'Lancaster' },
  { '@type': 'City' as const, name: 'Thousand Oaks' },
  { '@type': 'City' as const, name: 'Simi Valley' },
]
