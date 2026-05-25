# ΒάΛτο Τέρμα

Event reservation web app.

## Setup

### 1. Install Node.js

Download and install [Node.js](https://nodejs.org/) (v18+).

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.local` and fill in your values:

```
DATABASE_URL="file:./dev.db"
RESEND_API_KEY=""          # Get from https://resend.com (optional for dev)
ADMIN_PASSWORD="admin123"  # Change in production
NEXT_PUBLIC_EVENT_DATE="2025-05-24"
```

### 4. Initialize database

```bash
npx prisma migrate dev --name init
```

### 5. Seed demo data

```bash
npm run db:seed
```

### 6. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the visitor page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard (password: `admin123`).

## Project Structure

```
src/
  app/
    page.tsx              # Visitor page
    admin/page.tsx        # Admin dashboard
    api/
      bookings/           # POST booking
      tables/             # GET table availability
      event/              # GET event info
      admin/
        login/            # POST admin auth
        logout/           # POST logout
        check/            # GET auth check
        bookings/         # GET/DELETE bookings
        bookings/export/  # GET CSV export
        event/            # PUT event settings
        photos/           # POST/PUT/DELETE photos
  components/
    Hero.tsx
    PhotoGallery.tsx
    AvailabilityBar.tsx
    TableMap.tsx
    BookingForm.tsx
  lib/
    prisma.ts             # Prisma client singleton
    email.ts              # Resend email integration
    auth.ts               # Admin auth helper
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Demo data
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- Resend (email)
