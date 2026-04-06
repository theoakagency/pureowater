# Pure O Water — Website

Premium water delivery website for Pure O Water, serving Ventura County, Santa Clarita, and the Antelope Valley.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: SQLite + Prisma ORM
- **Email**: Resend
- **Auth**: iron-session (cookie-based)
- **Hosting**: Vercel (recommended)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.local.example` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

```env
DATABASE_URL="file:./dev.db"

# Resend — get your key at resend.com (free tier works)
RESEND_API_KEY="re_your_key_here"

# Joseph's email for order + contact notifications
JOSEPH_EMAIL="joseph@pureowater.com"

# Public URL (no trailing slash)
NEXT_PUBLIC_SITE_URL="https://pureowater.com"

# Admin login credentials — CHANGE BEFORE DEPLOYING
ADMIN_USERNAME="joseph"
ADMIN_PASSWORD="choose-a-strong-password"

# Session secret — generate a random 64-char string
SESSION_SECRET="generate-a-random-64-character-string-here"
```

Generate a session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout (fonts, OG metadata, JSON-LD)
├── sitemap.ts                # Dynamic sitemap for all pages
├── robots.ts                 # robots.txt
├── not-found.tsx             # Custom 404
│
├── about/page.tsx            # About Us
├── products/page.tsx         # Products detail page
├── faq/page.tsx              # FAQ with accordion
├── offers/page.tsx           # Current offers + pricing table
├── contact/page.tsx          # Contact form
│
├── areas/
│   └── [city]/page.tsx       # Dynamic city SEO landing pages
│
├── admin/
│   ├── page.tsx              # Admin login
│   └── dashboard/page.tsx    # Order management dashboard
│
└── api/
    ├── orders/
    │   ├── route.ts          # GET (list) + POST (create order + send emails)
    │   └── [id]/route.ts     # PATCH (update status/notes) + DELETE
    ├── contact/route.ts      # Contact form → Resend emails
    └── admin/
        ├── auth/route.ts     # POST login / DELETE logout
        └── export/route.ts   # CSV export of orders

components/
├── Navbar.tsx                # Fixed nav with mobile menu
├── Hero.tsx                  # Homepage hero with zip checker
├── Products.tsx              # Product cards section
├── HowItWorks.tsx            # 4-step process
├── OrderForm.tsx             # Full order form with validation
├── ServiceAreas.tsx          # City grid
├── Reviews.tsx               # Trust bar + testimonials
├── Footer.tsx                # Full footer
└── PageHero.tsx              # Reusable inner page hero

lib/
├── db.ts                     # Prisma client singleton
├── session.ts                # iron-session config
└── cities.ts                 # City data for all landing pages

middleware.ts                 # Protects /admin/dashboard
prisma/schema.prisma          # Database schema
```

---

## Admin Dashboard

Access at `/admin` — login with the credentials set in `.env.local`.

Features:
- View all orders sorted by date (newest first)
- Filter by status: new / confirmed / active / paused / cancelled
- Search by name, city, email, or phone
- Click any row to expand full order details
- Update order status via inline dropdown
- Add internal notes per order
- Export filtered orders to CSV
- Direct email/call links per customer

---

## Adding a New City

1. Open `lib/cities.ts`
2. Add a new entry to the `cities` array following the existing format
3. The page is automatically available at `/areas/your-city-slug`
4. It's automatically included in the sitemap

---

## Email Setup (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify your domain (`pureowater.com`)
3. Create an API key and add it to `.env.local`

Two email flows are active:
- **Order submitted** → notification to Joseph + confirmation to customer
- **Contact form** → notification to Joseph + auto-reply to sender

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all `.env.local` variables in the Vercel dashboard under **Settings → Environment Variables**.

For the database in production, switch from SQLite to [Vercel Postgres](https://vercel.com/storage/postgres) or [PlanetScale](https://planetscale.com) and update `DATABASE_URL` and the Prisma schema provider accordingly.

---

## After Launch Checklist

- [ ] Set `ADMIN_PASSWORD` to a strong password
- [ ] Set `SESSION_SECRET` to a random 64-char string
- [ ] Add Google Search Console verification token in `layout.tsx`
- [ ] Upload a real `og-image.png` (1200×630px) to `/public`
- [ ] Add Google Analytics 4 tag to `layout.tsx`
- [ ] Submit sitemap to Google Search Console: `https://pureowater.com/sitemap.xml`
- [ ] Verify Google Business Profile is linked and optimized
- [ ] Test order form end-to-end (submit a test order, confirm emails arrive)
- [ ] Test admin login and dashboard
- [ ] Add real customer testimonials to `components/Reviews.tsx`
- [ ] Add real photos to product pages

---

## Support

Built by [Your Agency Name]. For questions or changes, contact [your@email.com].
