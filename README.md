# SpliceList — Cable Splicing Contractor Directory

**splicelist.com** | National directory for telecom, fiber optic, and copper cable splicing contractors.

---

## Quick Start

```bash
cd Documents/GitHub/splicer
npm install
npm run dev
```

Open http://localhost:3000

---

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP
- **Database**: PostgreSQL via Prisma 7
- **Forms**: react-hook-form + zod
- **Hosting**: Vercel (recommended)

---

## Environment Setup

Edit `.env.local` and fill in your values:

```
DATABASE_URL="postgresql://user:password@host:5432/splicelist"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://splicelist.com"
ADMIN_SECRET="your-admin-import-secret"
NEXT_PUBLIC_ADMIN_PASSWORD="your-admin-ui-password"
```

Recommended free PostgreSQL: Neon (neon.tech) — serverless Postgres, free tier.

---

## Database

```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations (requires DATABASE_URL)
npm run db:seed        # Seed with 10 sample listings
npm run db:studio      # Browse data visually
```

---

## Site Structure

```
/                           Homepage
/fiber-optic-splicing       Fiber category (SEO)
/telecom-cable-splicing     Telecom category (SEO)
/copper-cable-splicing      Copper category (SEO)
/services/emergency-repair  Emergency repair page
/locations                  All 50 states
/locations/[state]          State directory
/locations/[state]/[city]   City page (programmatic SEO)
/contractors/[slug]         Contractor profile page
/search                     Search results
/blog                       Blog index
/blog/[slug]                Blog article
/listings/submit            Submit your business
/pricing                    Pricing tiers
/admin                      Admin dashboard (password-gated)
```

---

## Data Import (Outscraper Pipeline)

1. Run Outscraper export for queries like "fiber optic splicing contractors"
2. Clean and categorize in Google Sheets using Apps Script
3. Export as JSON array, POST to `/api/import/listings` with Bearer token

JSON record format:
```json
{
  "business_name": "Acme Fiber Co",
  "phone": "(555) 123-4567",
  "city": "Denver",
  "state": "CO",
  "category": ["FIBER"],
  "services": ["Fusion Splicing", "OTDR Testing"],
  "rating": 4.5,
  "reviews_count": 12
}
```

Then publish approved listings via `/admin`.

---

## Photos

Drop field photos into:

- `public/images/fiber/` — fiber splicing work
- `public/images/copper/` — copper splicing
- `public/images/tools/` — splicing equipment
- `public/images/equipment/` — job site and vehicles
- `public/images/team/` — field crew

See `public/images/PHOTOS.md` for full naming guide.

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set all env vars in Vercel > Project > Settings > Environment Variables.

---

## Admin

Visit `/admin`. Dev password: `splice2025`
Set `NEXT_PUBLIC_ADMIN_PASSWORD` in env for production.
