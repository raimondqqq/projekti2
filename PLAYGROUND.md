# Playground Deployment Guide

## Overview

Your `/haris` page automatically fetches and displays all GitHub repositories that start with `playground-*`. When you click on any playground card, a modal opens showing the live component in an iframe.

## How It Works

1. **Automatic Discovery**: The system fetches all your GitHub repos with prefix `playground-*`
2. **Live Preview**: Uses the repo's `homepage` field for the iframe URL
3. **Metadata Display**: Shows title, description, tags, and action buttons
4. **Smart Caching**: Data cached for 1 hour for performance

## Adding a New Playground Component

### Step 1: Create Your Playground Repo

```bash
# Create a new repo on GitHub with the naming convention
playground-[component-name]

# Examples:
playground-button-morph
playground-scroll-reveal
playground-menu-dock
```

### Step 2: Deploy to Vercel

```bash
# Clone the repo locally
cd ~/Documents
git clone https://github.com/harisovcina/playground-[component-name].git

# Navigate to the repo
cd playground-[component-name]

# Deploy to Vercel (make sure Vercel CLI is installed)
vercel --prod --yes
```

This will:
- Create a new Vercel project
- Link your GitHub repo for automatic deployments
- Deploy your component to a `.vercel.app` domain
- Return a production URL like `https://playground-[component-name].vercel.app`

### Step 3: Set the Homepage URL

```bash
# Update GitHub repo's homepage field with your Vercel URL
gh repo edit harisovcina/playground-[component-name] --homepage "https://playground-[component-name].vercel.app"
```

### Step 4: Wait for Cache Refresh

Your component will automatically appear on `/haris` within:
- **Locally**: Restart dev server or clear `.next` cache
- **Production**: Up to 1 hour (cache revalidation time)

To force immediate update locally:
```bash
rm -rf .next && npm run dev
```

## Project Structure

### Required Files for Previews

Add a `preview.png` to the root of your playground repo for thumbnail images:
```
playground-[component-name]/
├── preview.png           # 1200x630 recommended
├── app/
├── components/
├── package.json
└── README.md
```

**Image Updates**: Preview images automatically update when you push changes to your repo. The system uses cache-busting based on your repo's `pushed_at` timestamp, so updated preview.png files will reflect immediately after the next page revalidation (max 1 hour).

### Recommended Repo Setup

1. **Description**: Add a clear description in GitHub repo settings
2. **Topics/Tags**: Add relevant tags (e.g., `gsap`, `animation`, `react`)
3. **Homepage URL**: Set during Step 3 above
4. **README**: Document your component with usage examples

## GitHub Pages Configuration

The system reads the following from your GitHub repo:
- `name`: Automatically converted to title (e.g., `playground-menu-dock` → "Menu Dock")
- `description`: Shows under the title
- `homepage`: Used for iframe preview
- `topics`: Displayed as tags
- `updated_at`: Shows last update date
- `html_url`: Links to GitHub repo

## Vercel Configuration

### Auto-Deployments
Once linked, Vercel will automatically:
- Deploy on every push to `main`
- Create preview deployments for PRs
- Update production URL

### Manual Redeployment
```bash
cd playground-[component-name]
vercel --prod
```

## Troubleshooting

### Preview Image Not Updating
1. **Wait for cache revalidation** - The page cache refreshes every hour (ISR revalidation)
2. **Force immediate update locally**: `rm -rf .next && npm run dev`
3. **Force production update**: Push any change to trigger redeployment, or wait up to 1 hour
4. **Verify image exists**: Check `https://raw.githubusercontent.com/[username]/[repo]/[branch]/preview.png`
5. **Note**: Images use automatic cache-busting based on repo's `pushed_at` timestamp

### Preview Not Loading
1. Verify homepage URL is set: `gh repo view harisovcina/playground-[component-name] --web`
2. Check Vercel deployment: `vercel inspect [deployment-url]`
3. Ensure preview.png exists in repo root
4. Check Next.js image optimization in production logs

### Component Not Appearing
1. Ensure repo name starts with `playground-`
2. Wait for cache revalidation (1 hour) or force refresh
3. Check GitHub API: `curl https://api.github.com/repos/harisovcina/playground-[component-name]`

### Iframe Shows Empty State
1. Confirm `homepage` field is set in GitHub
2. Test URL directly in browser
3. Check Vercel deployment logs

## Quick Command Reference

```bash
# Full deployment workflow
git clone https://github.com/harisovcina/playground-new-component.git
cd playground-new-component
vercel --prod --yes
gh repo edit harisovcina/playground-new-component --homepage "https://playground-new-component.vercel.app"

# Force local refresh
cd ~/Documents/haris-starter-pack
rm -rf .next && npm run dev

# Check deployment
vercel ls
vercel logs playground-new-component

# Update existing deployment
cd playground-new-component
git push origin main  # Vercel auto-deploys
```

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Animations**: GSAP (modal transitions)
- **Deployment**: Vercel
- **API**: GitHub REST API v3
- **Cache**: Next.js ISR (1 hour revalidation)

## Notes

- All playground repos must be public for the system to fetch them
- The GitHub API has rate limits (60 requests/hour without token, 5000 with token)
- Consider adding `GITHUB_TOKEN` to `.env.local` for higher rate limits
- Iframe uses sandbox mode for security: `allow-scripts allow-same-origin allow-forms`
