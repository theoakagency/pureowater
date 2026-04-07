export type CityData = {
  slug: string
  name: string
  county: string
  phone: string
  heroDesc: string
  neighborhoods: string[]
  zips: string[]
  customerTypes: string[]
  testimonial: { quote: string; name: string; role: string; initials: string }
  mapQuery: string
}

export const cities: CityData[] = [
  {
    slug: 'oxnard',
    name: 'Oxnard',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Serving Oxnard, Port Hueneme, and surrounding neighborhoods with premium purified and alkaline water delivered on your schedule.',
    neighborhoods: ['Downtown Oxnard', 'Port Hueneme', 'Silver Strand', 'Hollywood Beach', 'Colonia', 'El Rio'],
    zips: ['93030','93031','93032','93033','93034','93035','93036','93041','93044'],
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
    phone: '(805) 991-7400',
    heroDesc: 'Premium water delivery throughout Ventura — from the harbor to the foothills — for homes, offices, and local businesses.',
    neighborhoods: ['Downtown Ventura', 'Midtown', 'Westside', 'Pierpont', 'Ondulando', 'East Ventura'],
    zips: ['93001','93002','93003','93004','93005','93006','93007','93009'],
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
    slug: 'camarillo',
    name: 'Camarillo',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Premium purified and alkaline water delivery for homes and businesses throughout Camarillo and surrounding areas.',
    neighborhoods: ['Old Town Camarillo', 'Mission Oaks', 'Springville', 'Las Posas Estates', 'Camarillo Heights'],
    zips: ['93010','93011','93012'],
    customerTypes: ['Homes & Families', 'Offices & Businesses', 'Restaurants', 'Gyms & Studios'],
    testimonial: {
      quote: "Reliable, affordable, and the water quality is excellent. Pure O Water has been a great find for our Camarillo office.",
      name: 'David R.',
      role: 'Business Owner, Camarillo',
      initials: 'DR',
    },
    mapQuery: 'Camarillo+CA',
  },
  {
    slug: 'thousand-oaks',
    name: 'Thousand Oaks',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Premium water delivery for Thousand Oaks, Newbury Park, Westlake Village, and Oak Park homes and businesses.',
    neighborhoods: ['Thousand Oaks', 'Newbury Park', 'Westlake Village', 'Oak Park', 'Lang Ranch', 'Conejo Valley'],
    zips: ['91358','91359','91360','91361','91362','91319','91320','91377'],
    customerTypes: ['Homes & Families', 'Corporate Campuses', 'Medical Offices', 'Gyms & Wellness Centers', 'Restaurants'],
    testimonial: {
      quote: "Pure O Water is the best value for water delivery in Thousand Oaks. Professional, punctual, and the alkaline water is exceptional.",
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
    phone: '(805) 991-7400',
    heroDesc: 'Water delivery for Simi Valley homes, offices, and businesses — purified and alkaline water on your schedule.',
    neighborhoods: ['Downtown Simi Valley', 'Wood Ranch', 'Big Sky', 'Berylwood', 'Oakridge', 'Stonegate'],
    zips: ['93062','93063','93065','93093','93094'],
    customerTypes: ['Homes & Families', 'Offices & Businesses', 'Gyms & Studios', 'Restaurants & Cafés', 'Schools'],
    testimonial: {
      quote: "Switched to Pure O Water six months ago and we'll never go back. The water quality is incredible and the delivery team is always friendly.",
      name: 'Robert T.',
      role: 'Business Owner, Simi Valley',
      initials: 'RT',
    },
    mapQuery: 'Simi+Valley+CA',
  },
  {
    slug: 'moorpark',
    name: 'Moorpark',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Fresh purified and alkaline water delivery for Moorpark homes and businesses, delivered on your schedule.',
    neighborhoods: ['Downtown Moorpark', 'Campus Canyon', 'Tierra Rejada', 'Mountain Meadows', 'Varsity Park'],
    zips: ['93020','93021'],
    customerTypes: ['Homes & Families', 'Offices', 'Restaurants', 'Gyms'],
    testimonial: {
      quote: "Pure O Water makes it so easy. They deliver to our Moorpark home every two weeks and we've never had an issue.",
      name: 'Lisa M.',
      role: 'Homeowner, Moorpark',
      initials: 'LM',
    },
    mapQuery: 'Moorpark+CA',
  },
  {
    slug: 'fillmore',
    name: 'Fillmore',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Reliable water delivery for Fillmore and Santa Paula area homes and businesses — clean, pure water on your schedule.',
    neighborhoods: ['Downtown Fillmore', 'Fillmore Heights', 'Santa Paula', 'Bardsdale', 'Piru'],
    zips: ['93015','93016','93060','93061','93040'],
    customerTypes: ['Homes & Families', 'Agricultural Businesses', 'Offices', 'Restaurants'],
    testimonial: {
      quote: "Great service and great water. Pure O Water has been delivering to our family in Fillmore for over a year now.",
      name: 'Carlos V.',
      role: 'Homeowner, Fillmore',
      initials: 'CV',
    },
    mapQuery: 'Fillmore+CA',
  },
  {
    slug: 'ojai',
    name: 'Ojai',
    county: 'Ventura County',
    phone: '(805) 991-7400',
    heroDesc: 'Premium water delivery for Ojai and Oak View — pure alkaline and purified water for the Ojai Valley community.',
    neighborhoods: ['Downtown Ojai', 'Oak View', 'Meiners Oaks', 'Mira Monte', 'Casitas Springs'],
    zips: ['93023','93024','93022'],
    customerTypes: ['Homes & Families', 'Wellness Businesses', 'Restaurants & Cafés', 'Yoga Studios', 'Offices'],
    testimonial: {
      quote: "In a health-conscious community like Ojai, Pure O Water's alkaline water is a perfect fit. Reliable delivery and excellent quality.",
      name: 'Sarah K.',
      role: 'Wellness Studio Owner, Ojai',
      initials: 'SK',
    },
    mapQuery: 'Ojai+CA',
  },
  {
    slug: 'santa-clarita',
    name: 'Santa Clarita',
    county: 'Los Angeles County',
    phone: '(661) 522-7002',
    heroDesc: 'Water delivery for homes and businesses throughout Santa Clarita — Valencia, Saugus, Newhall, and Canyon Country.',
    neighborhoods: ['Valencia', 'Saugus', 'Newhall', 'Canyon Country', 'Stevenson Ranch', 'Castaic', 'Agua Dulce'],
    zips: ['91350','91380','91382','91383','91390','91351','91387','91321','91354','91355'],
    customerTypes: ['Homes & Families', 'Corporate Offices', 'Schools & Daycares', 'Fitness Centers', 'Restaurants'],
    testimonial: {
      quote: "Best water delivery in Santa Clarita. Pure O is simply better — cleaner taste, more reliable, and the customer service is outstanding.",
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
    phone: '(661) 522-7002',
    heroDesc: 'Serving Palmdale, Lancaster, and the entire Antelope Valley with reliable water delivery for homes and businesses.',
    neighborhoods: ['Palmdale', 'Lancaster', 'Quartz Hill', 'Acton', 'Littlerock', 'Lake Los Angeles', 'Rosamond', 'Pearblossom', 'Mojave', 'California City', 'Tehachapi'],
    zips: [
      '93534','93535','93536','93539','93584',
      '93550','93551','93552','93590','93591','93599',
      '93510','93532','93543','93544','93560','93561','93531',
      '93501','93505','93516','93523','93524',
    ],
    customerTypes: ['Homes & Families', 'Offices & Warehouses', 'Agricultural Businesses', 'Schools', 'Restaurants'],
    testimonial: {
      quote: "In the Antelope Valley heat, having Pure O deliver fresh alkaline water is a game changer. Our whole family stays hydrated.",
      name: 'Carlos M.',
      role: 'Homeowner, Palmdale',
      initials: 'CM',
    },
    mapQuery: 'Palmdale+CA',
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug)
}
