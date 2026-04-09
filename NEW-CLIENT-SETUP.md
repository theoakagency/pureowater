# New Client Setup Guide

How to launch this water delivery website for a new client. The entire codebase is white-label ready — all brand-specific values live in a handful of files.

---

## Quick Overview

| What to change | File(s) |
|---|---|
| Company name, phones, emails, addresses, pricing, tagline | `lib/config.ts` |
| Brand colors | `app/globals.css` (the `@theme` block) |
| Logo, favicon, hero images | `/public/` folder |
| Service area cities & neighborhoods | `lib/cities.ts` |
| Service types (office, home, gym, etc.) | `lib/services.ts` |
| Environment variables (DB, email, analytics) | `.env.local` |
| Domain & DNS | Vercel project settings |

---

## Step-by-Step

### 1. Clone & Install

```bash
git clone <repo-url> <client-name>
cd <client-name>
npm install
```

### 2. Edit `lib/config.ts`

This is the main file. Open it and update every section:

**Company info:**
```ts
export const COMPANY_NAME = 'Acme Water Co'      // Appears everywhere on the site
export const COMPANY_LEGAL = 'Acme Water Co LLC'  // Legal footer text
export const TAGLINE = 'Fresh Water, Fast.'       // Used in emails & print pages
export const FOUNDING_YEAR = 2018                 // "Delivering since..." text
```

**Stats (shown on homepage hero & order form):**
```ts
export const STATS = {
  yearsInBusiness: '6+',
  customers: '2,000+',
  communities: '5',
} as const
```

**Website:**
```ts
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://acmewater.com'
export const DOMAIN = 'acmewater.com'
```

**Phone numbers:**
```ts
export const PHONES = {
  primary:   { label: 'Main Office', display: '(555) 123-4567', href: 'tel:+15551234567', intl: '+15551234567' },
  secondary: { label: 'North County', display: '(555) 987-6543', href: 'tel:+15559876543', intl: '+15559876543' },
  tollFree:  { label: 'Toll-Free', display: '(800) 555-0199', href: 'tel:+18005550199', intl: '+18005550199' },
} as const
```
> If the client only has one or two numbers, keep the same structure but duplicate the primary number into the unused slots. The footer and contact page iterate over all three.

**Email addresses:**
```ts
export const EMAILS = {
  hello: `hello@${DOMAIN}`,
  contact: `contact@${DOMAIN}`,
  orders: `orders@${DOMAIN}`,
} as const
```
> These are the "from" addresses for transactional emails via Resend. You'll need to verify the client's domain in Resend (see Step 6).

**Physical addresses:**
```ts
export const ADDRESSES = {
  ventura: {
    label: 'Main Office',
    street: '123 Water Way',
    city: 'Springfield',
    state: 'CA',
    zip: '90210',
    full: '123 Water Way\nSpringfield, CA 90210',
  },
  antelope: { ... },  // Second location, or remove if only one
} as const
```

**Business hours:**
```ts
export const HOURS = [
  { day: 'Monday – Friday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
] as const
```

**Social media:**
```ts
export const SOCIAL = {
  facebook: 'https://www.facebook.com/acmewater',
  instagram: 'https://www.instagram.com/acmewater',
  yelp: 'https://www.yelp.com/biz/acme-water',
} as const
```

**Pricing:**
```ts
export const PRICING = {
  deliveryFee: 7,
  purified: 6.99,
  alkaline: 8.99,
} as const
```

**Service regions:**
```ts
export const REGIONS = ['Springfield', 'Shelbyville', 'Capital City'] as const
export const REGION_SUMMARY = 'Springfield, Shelbyville, and Capital City'
export const REGION_SHORT = 'Central Illinois'
```

**Geo (for schema.org structured data):**
```ts
export const GEO = {
  latitude: 39.7817,
  longitude: -89.6501,
  primaryCity: 'Springfield',
  state: 'IL',
  country: 'US',
} as const
```

**Images (paths relative to `/public/`):**
```ts
export const IMAGES = {
  logo: '/logo.png',
  favicon: '/favicon.png',
  ogImage: '/og-image.png',
  heroBackground: '/hero-bg.png',
  parallax: '/parallax-bg.png',
} as const
```

**Schema.org opening hours & areas served** — update to match the client's schedule and delivery cities.

---

### 3. Replace Brand Assets in `/public/`

| File | Purpose | Recommended Size |
|---|---|---|
| `logo.png` | Header, footer, admin pages, print sheets | SVG or PNG, ~400px wide, transparent bg |
| `favicon.png` | Browser tab icon | 512x512 PNG |
| `pure-o-water-bottles.png` | OG image (social sharing preview) | 1200x630 |
| `home-hero.png` | Homepage hero background | 1920x1080+ |
| `pure-o-water.png` | Parallax divider background | 1920x1080+ |

> Rename the files to match whatever paths you set in `IMAGES` in config.ts, or just overwrite the existing files with the new client's assets.

---

### 4. Update Brand Colors in `app/globals.css`

Open the `@theme` block at the top and replace the hex values:

```css
@theme {
  --color-navy:       #0d2b4e;   /* Primary dark (headers, buttons, hero bg) */
  --color-blue:       #1565c0;   /* Button hover, accents */
  --color-sky:        #1e90d6;   /* Links, section labels */
  --color-aqua:       #00c9e4;   /* CTA buttons, badges, highlights */
  --color-aqua-light: #00dff8;   /* CTA hover state */
  --color-ice:        #e8f6fb;   /* Light accent backgrounds */
  --color-muted:      #5a7080;   /* Secondary text */
  --color-border:     #d0e4ef;   /* Card borders, dividers */
  --color-gray:       #f4f7fa;   /* Page backgrounds, table rows */
  --color-dark:       #1a2a3a;   /* Body text */
  --color-deeper:     #061c35;   /* Hero gradient start */
  --color-ocean:      #0f4a7a;   /* Hero gradient end */
  --color-gold:       #f0a500;   /* Star ratings */
}
```

> Tip: Start by changing `navy`, `aqua`, and `sky` — those three control 80% of the visual identity.

---

### 5. Update Service Areas in `lib/cities.ts`

Replace the cities array with the new client's delivery areas. Each city entry needs:

```ts
{
  slug: 'springfield',           // URL: /areas/springfield
  name: 'Springfield',           // Display name
  county: 'Sangamon County',     // Used for grouping on sitemap page
  phone: '(555) 123-4567',      // Regional phone for this city
  heroDesc: 'Premium water...',  // 1-2 sentence hero description
  neighborhoods: ['Downtown', 'East Side', ...],
  zips: ['62701', '62702', ...],
  customerTypes: ['Homes & Families', 'Offices & Businesses', ...],
  testimonial: {
    quote: `${COMPANY_NAME} delivers...`,  // Use backticks + ${COMPANY_NAME}
    name: 'Jane D.',
    role: 'Homeowner, Springfield',
    initials: 'JD',
  },
  mapQuery: 'Springfield+IL',
}
```

> The sitemap page groups cities by the `county` field. Make sure county values are consistent.

---

### 6. Update Service Types in `lib/services.ts` (Optional)

If the client serves different customer segments, update the services array. Each entry powers a full landing page at `/services/[slug]`. The default set (office, restaurant, home, gym, catering) works well for most water delivery companies.

Key fields to update per service:
- `metaTitle` and `metaDesc` — include `${COMPANY_NAME}`
- `heroDesc` — include `${COMPANY_NAME}`
- `testimonial.quote` — use backticks with `${COMPANY_NAME}`
- `faq` answers — update any brand-specific references

---

### 7. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

| Variable | What it is | Where to get it |
|---|---|---|
| `DATABASE_URL` | Postgres connection (pooled) | Neon, Supabase, or any Postgres host |
| `DATABASE_URL_UNPOOLED` | Postgres direct connection | Same provider, direct/non-pooled URL |
| `RESEND_API_KEY` | Email sending | [resend.com](https://resend.com) |
| `JOSEPH_EMAIL` | Receives order & contact notifications | Client's email address |
| `NEXT_PUBLIC_SITE_URL` | Production URL (no trailing slash) | The client's domain |
| `ADMIN_USERNAME` | Admin login username | Choose for client |
| `ADMIN_PASSWORD` | Admin login password | Choose a strong one |
| `SESSION_SECRET` | Cookie signing key (min 32 chars) | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID | Client's GA4 property |

---

### 8. Set Up Resend Domain

1. Go to [resend.com](https://resend.com) > Domains
2. Add the client's domain
3. Add the DNS records Resend provides (SPF, DKIM, DMARC)
4. Wait for verification (usually a few minutes)
5. The `from` addresses in emails (`contact@`, `hello@`, `orders@`) will then work

---

### 9. Set Up the Database

```bash
npx prisma db push
```

This creates the `Order` table in the new database. No seed data needed — orders come from the website form.

---

### 10. Deploy to Vercel

```bash
vercel
```

Or connect the repo to Vercel via the dashboard:
1. Import the repo
2. Add all env variables from `.env.local`
3. Set the custom domain
4. Deploy

---

### 11. Post-Launch Checklist

- [ ] Verify all pages load (home, products, about, FAQ, contact, offers, each city, each service)
- [ ] Submit an order through the form — confirm it saves to DB and sends both emails
- [ ] Submit the contact form — confirm notification + auto-reply emails
- [ ] Log into `/admin` with the configured credentials
- [ ] Check OG image previews (paste URL into [opengraph.xyz](https://opengraph.xyz))
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify Google Analytics is tracking
- [ ] Test on mobile

---

## File Reference

```
lib/config.ts          ← All brand strings, phones, emails, pricing, images
app/globals.css        ← Color palette (@theme block, lines 3-17)
lib/cities.ts          ← Service area cities, neighborhoods, zip codes
lib/services.ts        ← Service type pages (office, home, gym, etc.)
public/                ← Logo, favicon, hero images, OG image
.env.local             ← Database, email API key, admin credentials, analytics
prisma/schema.prisma   ← Database schema (rarely needs changes)
```

---

## What NOT to Change

- **Component files** (`components/*.tsx`, `app/*/page.tsx`) — these all read from config. No brand strings should be hardcoded in them.
- **API routes** (`app/api/`) — these use config for email templates. Only touch these if you need to change email layout/design.
- **`app/layout.tsx`** — pulls everything from config. No edits needed.
- **`app/sitemap.ts`** and **`app/robots.ts`** — auto-generated from config + city/service data.
