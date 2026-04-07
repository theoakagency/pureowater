export type ServiceData = {
  slug: string
  name: string
  headline: string
  subheadline: string
  heroDesc: string
  painPoints: { icon: string; title: string; desc: string }[]
  benefits: string[]
  typicalOrder: { bottles: string; size: string; frequency: string }
  testimonial: { quote: string; name: string; role: string; initials: string }
  faq: { q: string; a: string }[]
  metaTitle: string
  metaDesc: string
}

export const services: ServiceData[] = [
  {
    slug: 'office',
    name: 'Office',
    headline: 'Water Delivery for Offices & Businesses',
    subheadline: 'Keep your team hydrated and productive with reliable scheduled delivery.',
    heroDesc: 'Pure O Water delivers premium purified and alkaline water to offices across Ventura County, Santa Clarita, and the Antelope Valley. Flexible scheduling, no contracts, and a dedicated account for your business.',
    painPoints: [
      { icon: 'Droplets',   title: 'Running out mid-week',       desc: 'We set your delivery frequency so you never run dry between orders.' },
      { icon: 'DollarSign', title: 'Overpriced national brands',  desc: 'Local delivery means lower overhead and better pricing than the big guys.' },
      { icon: 'Clock',      title: 'Unreliable delivery windows', desc: 'We show up when we say we will — every time.' },
      { icon: 'Package',    title: 'Managing multiple vendors',   desc: 'One call, one invoice, one reliable local partner for all your water needs.' },
    ],
    benefits: [
      'Purified and alkaline water options for every preference',
      'Hot & cold cooler rentals available',
      'Flexible delivery — weekly, bi-weekly, or monthly',
      'Volume discounts for 6+ bottles per delivery',
      'Monthly invoicing available for businesses',
      'Empty bottle pickup included at no charge',
      'Priority scheduling for commercial accounts',
    ],
    typicalOrder: { bottles: '6–12 bottles', size: '5 Gallon', frequency: 'Weekly or bi-weekly' },
    testimonial: {
      quote: 'We have 25 employees and Pure O Water keeps everyone hydrated without us thinking about it. The delivery is always on time and the team loves the alkaline water option.',
      name: 'Sandra M.',
      role: 'Office Manager, Oxnard',
      initials: 'SM',
    },
    faq: [
      { q: 'Do you offer monthly invoicing for businesses?', a: 'Yes — commercial accounts can be set up with monthly invoicing instead of paying per delivery. Contact us to get this set up.' },
      { q: 'Can we get both purified and alkaline water?', a: 'Absolutely. Many offices order a mix of both so employees can choose their preference.' },
      { q: 'Do you provide coolers for offices?', a: 'Yes, we rent both hot/cold and cold-only dispensers. Ask us about cooler options when you sign up.' },
      { q: 'What if we need an extra delivery between scheduled dates?', a: 'Just call us and we will arrange an on-demand delivery, usually within 1–2 business days.' },
    ],
    metaTitle: 'Office Water Delivery | Pure O Water — Ventura County',
    metaDesc: 'Reliable water delivery for offices and businesses across Ventura County, Santa Clarita, and the Antelope Valley. Purified and alkaline water, flexible scheduling, volume discounts.',
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    headline: 'Water Delivery for Restaurants & Food Service',
    subheadline: 'Better water means better food, better drinks, and better customer experiences.',
    heroDesc: 'The quality of your water directly affects the taste of everything you serve — from coffee and tea to sauces and soups. Pure O Water delivers consistently pure, great-tasting water to restaurants across Southern California.',
    painPoints: [
      { icon: 'Coffee',      title: 'Tap water affecting taste',    desc: 'Chlorine and minerals in tap water alter the flavor of coffee, tea, and food. Pure water lets your ingredients shine.' },
      { icon: 'Users',       title: 'Customer expectations',        desc: 'Diners notice water quality. Serving premium water signals premium standards throughout.' },
      { icon: 'RefreshCw',   title: 'Inconsistent supply',          desc: 'We work around your kitchen schedule so you always have what you need before service.' },
      { icon: 'ShieldCheck', title: 'Health code confidence',       desc: 'NSF certified purified water gives you and your health inspector one less thing to worry about.' },
    ],
    benefits: [
      'NSF certified purified water for food preparation',
      'Alkaline water available for customer table service',
      'Delivery scheduled around your kitchen hours',
      'High-volume ordering available — 12+ bottles per delivery',
      'Consistent quality batch to batch, every delivery',
      'Empty bottle pickup included',
      'Flexible invoicing for food service businesses',
    ],
    typicalOrder: { bottles: '8–20 bottles', size: '5 Gallon', frequency: 'Weekly' },
    testimonial: {
      quote: 'We switched our whole kitchen to Pure O Water and the difference in our coffee and sauces was immediately noticeable. Our customers comment on it. Worth every penny.',
      name: 'Ana L.',
      role: 'Restaurant Owner, Ventura',
      initials: 'AL',
    },
    faq: [
      { q: 'Is your water safe for food preparation?', a: 'Yes — our purified water is NSF certified and goes through a 10-stage filtration process that removes 99.9% of contaminants.' },
      { q: 'Can you deliver before our morning prep starts?', a: 'We work with your schedule. Let us know your preferred delivery window and we will do our best to accommodate it.' },
      { q: 'Do you offer high-volume discounts for restaurants?', a: 'Yes — restaurants ordering 8 or more bottles per delivery qualify for volume pricing. Contact us for a custom quote.' },
      { q: 'Can we get alkaline water for table service separately from purified for the kitchen?', a: 'Absolutely. Many restaurant customers order both types and we deliver them together.' },
    ],
    metaTitle: 'Restaurant Water Delivery | Pure O Water — Ventura County',
    metaDesc: 'Premium water delivery for restaurants and food service businesses in Ventura County and Southern California. NSF certified purified water for cooking, alkaline water for table service.',
  },
  {
    slug: 'home',
    name: 'Home',
    headline: 'Water Delivery for Your Home',
    subheadline: 'Pure, great-tasting water delivered to your door — no more lugging heavy cases from the store.',
    heroDesc: 'Stop buying single-use plastic bottles from the grocery store. Pure O Water delivers fresh purified and alkaline water directly to your home on a schedule that works for your family.',
    painPoints: [
      { icon: 'ShoppingCart', title: 'Heavy cases from the store',     desc: 'Stop hauling water home every week. We bring it right to your door.' },
      { icon: 'Trash2',       title: 'Single-use plastic waste',       desc: 'Reusable 5-gallon bottles dramatically reduce your household plastic footprint.' },
      { icon: 'DollarSign',   title: 'Overpaying for bottled water',   desc: 'Home delivery costs less per gallon than grocery store cases of single-use bottles.' },
      { icon: 'Droplets',     title: 'Tap water taste and quality',    desc: 'Give your family consistently clean, great-tasting water every day.' },
    ],
    benefits: [
      'Purified and alkaline water options for the whole family',
      'Delivered to your front door on your schedule',

      '3 and 5 gallon bottles available',
      'Cooler rentals available for hot and cold water',
      'No contracts — pause or cancel anytime',
      'No long-term contracts — cancel anytime',
    ],
    typicalOrder: { bottles: '2–4 bottles', size: '3 or 5 Gallon', frequency: 'Every 2 weeks' },
    testimonial: {
      quote: 'Best decision we made for our family. The kids drink so much more water now because it actually tastes good. And I love not hauling cases from Costco anymore.',
      name: 'Jennifer W.',
      role: 'Homeowner, Thousand Oaks',
      initials: 'JW',
    },
    faq: [
      { q: 'What if I am not home during delivery?', a: 'No problem — just tell us a safe drop-off spot like your front porch or garage and we will leave your bottles there and pick up the empties.' },
      { q: 'How much does home delivery cost?', a: 'Pricing depends on water type and bottle size. Contact us for current pricing — delivery is always included, no separate delivery fee.' },
      { q: 'Do I need to buy a water cooler?', a: 'You can use your own existing cooler or rent one from us. We have hot/cold and cold-only options available.' },
      { q: 'Can I change how often you deliver?', a: 'Yes, anytime. Just call or email us and we will adjust your schedule for the next delivery.' },
    ],
    metaTitle: 'Home Water Delivery | Pure O Water — Ventura County',
    metaDesc: 'Fresh purified and alkaline water delivered to your home in Ventura County, Santa Clarita, and the Antelope Valley. No contracts, flexible scheduling.',
  },
  {
    slug: 'gym',
    name: 'Gym & Fitness',
    headline: 'Water Delivery for Gyms & Fitness Studios',
    subheadline: 'Fuel your members with premium alkaline water — the hydration choice of serious athletes.',
    heroDesc: 'Your members push hard. Give them water that works as hard as they do. Pure O Water delivers pH 9.5 alkaline water and purified water to gyms, CrossFit boxes, yoga studios, and fitness centers across Southern California.',
    painPoints: [
      { icon: 'Zap',         title: 'Members demanding better hydration', desc: 'Health-conscious gym members notice and appreciate premium alkaline water over standard tap or filtered water.' },
      { icon: 'DollarSign',  title: 'Expensive vending alternatives',     desc: 'Providing quality water builds member loyalty — more valuable than the markup on vending machine bottles.' },
      { icon: 'RefreshCw',   title: 'Running out during peak hours',      desc: 'We size your delivery to match your member volume so you never run dry on a busy Monday morning.' },
      { icon: 'Star',        title: 'Differentiating your facility',      desc: 'Premium alkaline water is a tangible amenity that sets your gym apart from the competition.' },
    ],
    benefits: [
      'pH 9.5 alkaline water — the hydration choice for athletes',
      'Purified water also available for general use',
      'High-volume delivery for large member bases',
      'Flexible scheduling around your peak hours',
      'Hot/cold cooler rentals for member areas and staff',
      'Volume discounts for high-frequency orders',
      'Empty bottle pickup included',
    ],
    typicalOrder: { bottles: '6–16 bottles', size: '5 Gallon', frequency: 'Weekly' },
    testimonial: {
      quote: 'Our members love the alkaline water. We have it front and center in the gym and it has become a real selling point. Pure O is reliable, affordable, and the water quality is excellent.',
      name: 'Marcus T.',
      role: 'Gym Owner, Santa Clarita',
      initials: 'MT',
    },
    faq: [
      { q: 'Why alkaline water for gyms specifically?', a: 'Alkaline water at pH 9.5 helps neutralize lactic acid buildup during intense exercise, potentially reducing muscle fatigue and improving recovery.' },
      { q: 'How many bottles does a typical gym need?', a: 'It depends on membership size and hours. Most gyms we serve order 6 to 16 bottles per week. We can help you estimate the right quantity.' },
      { q: 'Can we put your branding or signage near the cooler?', a: 'We can provide Pure O Water branded materials for display near coolers. Ask us when you sign up.' },
      { q: 'Do you deliver to multiple locations?', a: 'Yes — if you have more than one gym location we can set up separate delivery schedules for each address.' },
    ],
    metaTitle: 'Gym & Fitness Water Delivery | Pure O Water — Ventura County',
    metaDesc: 'Premium alkaline and purified water delivery for gyms, CrossFit boxes, and fitness studios in Ventura County and Southern California. pH 9.5 alkaline water for serious athletes.',
  },
  {
    slug: 'catering',
    name: 'Catering & Craft Services',
    headline: 'Water Delivery for Catering & Craft Services',
    subheadline: 'Keep your crew, cast, and guests hydrated — on set, on location, or at the event.',
    heroDesc: 'From film and TV production craft services to wedding catering and corporate events, Pure O Water delivers premium purified and alkaline water throughout Ventura County, Santa Clarita, and the Antelope Valley.',
    painPoints: [
      { icon: 'Users',      title: 'Large crews to hydrate',         desc: 'Film sets, event staffs, and catering crews need reliable water — not cases of single-use bottles.' },
      { icon: 'Clock',      title: 'Early calls and tight timelines', desc: 'We work around your call sheet and event schedule to ensure water is there when you need it.' },
      { icon: 'RefreshCw',  title: 'Inconsistent supply',            desc: 'One reliable local supplier — no scrambling at the last minute before a shoot or event.' },
      { icon: 'DollarSign', title: 'Cost of single-use bottles',     desc: 'Reusable 5-gallon bottles are more economical and dramatically reduce on-set plastic waste.' },
    ],
    benefits: [
      'Purified and alkaline water for cast, crew, and guests',
      'Large-format 5-gallon bottles reduce plastic waste on set',
      'Delivery scheduled around your production or event dates',
      'On-demand orders available for last-minute needs',
      'Hot/cold cooler rentals for craft service stations',
      'Serving Ventura County, Santa Clarita, and Antelope Valley film country',
      'Empty bottle pickup included',
    ],
    typicalOrder: { bottles: '8–20 bottles', size: '5 Gallon', frequency: 'Per event or weekly' },
    testimonial: {
      quote: 'We run craft services on film sets throughout the Santa Clarita area and Pure O Water is our go-to. Reliable, great quality, and they always work around our schedule.',
      name: 'Derek H.',
      role: 'Craft Services Coordinator, Santa Clarita',
      initials: 'DH',
    },
    faq: [
      { q: 'Can you accommodate same-day or rush orders?', a: 'We do our best for last-minute requests — call us directly at (805) 522-7002 and we will tell you what we can do.' },
      { q: 'Do you deliver to film locations and event venues?', a: 'Yes. We deliver throughout Ventura County, Santa Clarita, and the Antelope Valley — including production facilities, ranches, and event spaces.' },
      { q: 'Do you provide coolers for on-set craft service stations?', a: 'Yes, we rent hot/cold and cold-only dispensers that work great for craft service tables and catering setups.' },
      { q: 'Can we set up a standing order for a recurring production?', a: 'Absolutely. If you have a recurring show or regular event schedule, we can set up a standing delivery account.' },
    ],
    metaTitle: 'Catering & Craft Services Water Delivery | Pure O Water',
    metaDesc: 'Premium water delivery for film production craft services, catering, and events in Ventura County, Santa Clarita, and the Antelope Valley. Purified and alkaline water for cast and crew.',
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug)
}
