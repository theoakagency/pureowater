export type CityData = {
  slug: string
  name: string
  county: string
  heroDesc: string
  neighborhoods: string[]
  customerTypes: string[]
  testimonial: { quote: string; name: string; role: string; initials: string }
  mapQuery: string
}

export const cities: CityData[] = [
  {
    slug: 'oxnard',
    name: 'Oxnard',
    county: 'Ventura County',
    heroDesc: 'Serving Oxnard, Port Hueneme, and surrounding neighborhoods with premium purified and alkaline water delivered on your schedule.',
    neighborhoods: ['Downtown Oxnard', 'Port Hueneme', 'Silver Strand', 'Hollywood Beach', 'Colonia', 'El Rio'],
    customerTypes: ['Homes & Apartments', 'Offices & Businesses', 'Restaurants & Food Service', 'Gyms & Fitness Studios', 'Industrial Facilities'],
    testimonial: {
      quote: "Pure O Water has been delivering to our office in Oxnard for over 2 years. Always on time, always great quality. The alkaline water keeps our whole team hydrated.",
      name: 'Maria R.',
      role: 'Office Manager, Oxnard',
      initials: 'MR',
    },
    mapQuery: 'Oxnard+CA',
  },
  {
    slug: 'ventura',
    name: 'Ventura',
    county: 'Ventura County',
    heroDesc: 'Premium water delivery throughout Ventura — from the harbor to the foothills — for homes, offices, and local businesses.',
    neighborhoods: ['Downtown Ventura', 'Midtown', 'Westside', 'Pierpont', 'Ondulando', 'East Ventura'],
    customerTypes: ['Homes & Families', 'Downtown Offices', 'Restaurants & Cafés', 'Yoga Studios & Gyms', 'Retail Businesses'],
    testimonial: {
      quote: "Our restaurant switched to Pure O Water and the difference in our food and beverages was immediately noticeable. Couldn't be happier with the service.",
      name: 'Ana L.',
      role: 'Restaurant Owner, Ventura',
      initials: 'AL',
    },
    mapQuery: 'Ventura+CA',
  },
  {
    slug: 'santa-clarita',
    name: 'Santa Clarita',
    county: 'Los Angeles County',
    heroDesc: 'Water delivery for homes, offices, and businesses throughout Santa Clarita — Valencia, Saugus, Newhall, and Canyon Country.',
    neighborhoods: ['Valencia', 'Saugus', 'Newhall', 'Canyon Country', 'Stevenson Ranch', 'Castaic'],
    customerTypes: ['Homes & Families', 'Corporate Offices', 'Schools & Daycares', 'Fitness Centers', 'Restaurants'],
    testimonial: {
      quote: "Best water delivery in Santa Clarita. We've tried others and Pure O is simply better — cleaner taste, more reliable, and the customer service is outstanding.",
      name: 'David K.',
      role: 'Homeowner, Valencia',
      initials: 'DK',
    },
    mapQuery: 'Santa+Clarita+CA',
  },
  {
    slug: 'antelope-valley',
    name: 'Antelope Valley',
    county: 'Los Angeles County',
    heroDesc: 'Serving Palmdale, Lancaster, and the entire Antelope Valley with reliable water delivery for homes and businesses.',
    neighborhoods: ['Palmdale', 'Lancaster', 'Quartz Hill', 'Acton', 'Littlerock', 'Lake Los Angeles'],
    customerTypes: ['Homes & Families', 'Offices & Warehouses', 'Agricultural Businesses', 'Schools', 'Restaurants'],
    testimonial: {
      quote: "In the Antelope Valley heat, having Pure O deliver fresh alkaline water is a game changer. Our whole family stays hydrated and we love the convenience.",
      name: 'Carlos M.',
      role: 'Homeowner, Palmdale',
      initials: 'CM',
    },
    mapQuery: 'Palmdale+CA',
  },
  {
    slug: 'thousand-oaks',
    name: 'Thousand Oaks',
    county: 'Ventura County',
    heroDesc: 'Premium water delivery for Thousand Oaks, Newbury Park, Westlake Village, and Agoura Hills homes and businesses.',
    neighborhoods: ['Thousand Oaks', 'Newbury Park', 'Westlake Village', 'Agoura Hills', 'Oak Park', 'Moorpark'],
    customerTypes: ['Homes & Families', 'Corporate Campuses', 'Medical Offices', 'Gyms & Wellness Centers', 'Restaurants'],
    testimonial: {
      quote: "Pure O Water is the best value for water delivery in Thousand Oaks. Professional, punctual, and the alkaline water is exceptional. Highly recommend.",
      name: 'Jennifer W.',
      role: 'Homeowner, Thousand Oaks',
      initials: 'JW',
    },
    mapQuery: 'Thousand+Oaks+CA',
  },
  {
    slug: 'simi-valley',
    name: 'Simi Valley',
    county: 'Ventura County',
    heroDesc: 'Water delivery for Simi Valley homes, offices, and businesses — purified and alkaline water on your schedule.',
    neighborhoods: ['Downtown Simi Valley', 'Wood Ranch', 'Big Sky', 'Berylwood', 'Oakridge', 'Stonegate'],
    customerTypes: ['Homes & Families', 'Offices & Businesses', 'Gyms & Studios', 'Restaurants & Cafés', 'Schools'],
    testimonial: {
      quote: "Switched to Pure O Water six months ago and we'll never go back. The water quality is incredible and the delivery team is always friendly and professional.",
      name: 'Robert T.',
      role: 'Business Owner, Simi Valley',
      initials: 'RT',
    },
    mapQuery: 'Simi+Valley+CA',
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug)
}
