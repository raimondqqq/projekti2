# Theoria — Product Design Studio

Modern portfolio website built with Next.js 16, featuring cinematic animations, case studies, and an admin panel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** PostgreSQL (Vercel Postgres) with Prisma ORM
- **Storage:** Vercel Blob for images
- **Auth:** NextAuth.js with Google OAuth
- **Styling:** Tailwind CSS
- **Animations:** GSAP with ScrollTrigger

## Local Development

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostgreSQL connection string
   # For local PostgreSQL: DATABASE_URL="postgresql://user:password@localhost:5432/theoria"
   ```

3. **Setup local PostgreSQL (using Docker):**
   ```bash
   docker run --name theoria-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=theoria -p 5432:5432 -d postgres
   # Update .env.local with: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/theoria"
   ```

4. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run dev server:**
   ```bash
   npm run dev
   ```

## Deployment to Vercel

### 1. Create Vercel Project
```bash
vercel
```

### 2. Add Vercel Postgres
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Environment variables `DATABASE_URL` and `DIRECT_URL` are auto-added

### 3. Enable Vercel Blob
1. In **Storage** tab
2. Click **Create Store** → **Blob**
3. `BLOB_READ_WRITE_TOKEN` is auto-added

### 4. Set Additional Environment Variables
Add these in Vercel project settings → Environment Variables:

```
AUTH_SECRET=<generate with: openssl rand -base64 32>
AUTH_URL=https://your-domain.vercel.app
AUTH_GOOGLE_ID=<your-google-oauth-client-id>
AUTH_GOOGLE_SECRET=<your-google-oauth-secret>
BYPASS_AUTH=false
```

### 5. Deploy and Run Migrations
After first deployment:
```bash
vercel env pull .env.production
npx prisma db push
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel routes
│   └── api/               # API routes
├── components/
│   ├── admin/             # Admin UI components
│   ├── case-studies/      # Custom case study components
│   └── home/              # Landing page components
├── lib/                   # Utilities
└── prisma/                # Database schema
```

## Features

- 🎬 Cinematic homepage with video background
- 🎨 Custom case study pages with GSAP animations
- 🔐 Protected admin panel
- 📱 Fully responsive design
- ⚡ Optimized with Turbopack
- 🖼️ Image management with Vercel Blob
