# SEO Strategy for theoria.co

## ✅ Implemented (Technical SEO)

### Metadata & Tags
- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ OpenGraph tags for social sharing (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Robots meta tags
- ✅ Dynamic title templates for all pages

### Site Structure
- ✅ sitemap.xml (auto-generated via Next.js)
- ✅ robots.txt (blocks /admin, allows everything else)
- ✅ JSON-LD structured data (Organization, Website schemas)

### Performance
- ✅ Asset preloading (images, fonts, video)
- ✅ Font optimization (swap display)
- ✅ Image optimization (Next.js Image component)

---

## 🔴 TODO: Critical Actions (Do These First!)

### 1. Create OG Image
**Priority: HIGH**
- Create `/public/og-image.jpg` (1200x630px)
- Should showcase your best work or brand
- Use in social shares (Twitter, LinkedIn, Facebook)

### 2. Google Search Console Setup
**Priority: HIGH**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `theoria.co`
3. Verify ownership via HTML file or DNS
4. Submit sitemap: `https://theoria.co/sitemap.xml`
5. Add verification code to `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: 'your-verification-code-here',
   }
   ```

### 3. Google Analytics Setup
**Priority: HIGH**
1. Create GA4 property
2. Add tracking code to `src/app/layout.tsx`
3. Track: page views, case study opens, email clicks

### 4. Bing Webmaster Tools
**Priority: MEDIUM**
1. Go to [Bing Webmaster](https://www.bing.com/webmasters)
2. Add and verify site
3. Submit sitemap

---

## 📝 Content SEO Strategy

### Target Keywords (Focus on these!)
**Primary:**
- "product design studio sarajevo"
- "ux design agency bosnia"
- "saas design agency"
- "healthcare product design"

**Secondary:**
- "fintech ui design"
- "enterprise ux design"
- "b2b saas design"

### Content Recommendations

#### Homepage (`/`)
- **Current**: Good hero statement
- **Add**: Client logos section with alt text
- **Add**: Brief case study previews with keyword-rich descriptions

#### Work Page (`/work`)
- **Add**: SEO-friendly project descriptions
- **Add**: Client testimonials
- **Add**: H1: "Our Work: Product Design Portfolio"

#### About Page (`/about`)
- **Current**: Good intro text
- **Add**: More content about your process
- **Add**: Awards/recognition section
- **Add**: H1: "About theoria: Product Design Studio in Sarajevo"

#### Case Studies
- **Add**: Dedicated pages per project (`/work/kindbody`)
- **Add**: Problem → Solution → Results structure
- **Add**: Testimonials from clients
- **Add**: Process breakdown with images

#### Blog (Future)
- Start a design blog (`/insights` or `/blog`)
- Topics: "How to design for healthcare", "SaaS UX best practices"
- Target long-tail keywords
- Build authority and backlinks

---

## 🔗 Off-Page SEO (Backlinks)

### Quick Wins
1. **Design Directories**
   - Dribbble (link to theoria.co)
   - Behance portfolio
   - Awwwards submission
   - CSS Design Awards

2. **Local Listings**
   - Google Business Profile
   - Clutch.co profile
   - GoodFirms listing

3. **Industry Mentions**
   - Guest posts on design blogs
   - Product Hunt launch (for any internal tools)
   - LinkedIn articles

4. **Social Signals**
   - Active LinkedIn company page
   - Twitter/X presence
   - Instagram with project showcases

---

## 🎯 Performance Optimization

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Already good with preloading
- **FID (First Input Delay)**: Monitor with GA4
- **CLS (Cumulative Layout Shift)**: Ensure all images have width/height

### Additional Optimizations
- ✅ Lazy load below-fold images
- ✅ Preload critical fonts
- ⚠️ Consider reducing video file size (background-video.webm is 2.5MB)
- ⚠️ Add `loading="lazy"` to non-critical images

---

## 📊 Tracking & Monitoring

### Tools to Set Up
1. **Google Search Console** - Track search performance
2. **Google Analytics 4** - Track user behavior
3. **PageSpeed Insights** - Monitor performance
4. **Ahrefs/SEMrush** (paid) - Track rankings and backlinks

### Monthly Tasks
- Review Search Console for errors
- Check top-performing pages
- Monitor keyword rankings
- Review and update content
- Check backlink profile

---

## 🚀 Quick Win Checklist (Next 7 Days)

- [ ] Create og-image.jpg
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Add GA verification code
- [ ] Submit sitemap to GSC
- [ ] Create LinkedIn company page
- [ ] Submit to Clutch.co
- [ ] Create Dribbble profile with link
- [ ] Add client testimonials to site
- [ ] Optimize video file size

---

## 📈 Long-Term Strategy (3-6 Months)

### Month 1-2
- Launch case study pages
- Set up blog/insights section
- Write 4-6 high-quality articles

### Month 3-4
- Guest posting on design blogs
- Reach out for client testimonials
- Submit best work to Awwwards

### Month 5-6
- Build industry relationships
- Speaking at conferences
- Podcast appearances

---

## 🎓 Pro Tips

1. **Content is King**: The best SEO is great work + great storytelling
2. **Local SEO**: "Sarajevo" is your unique advantage - lean into it
3. **Case Studies**: Detailed case studies rank well and attract clients
4. **Speed Matters**: Fast sites rank better - keep preloading assets
5. **Mobile First**: Google uses mobile-first indexing

---

## Need Help?

**Quick SEO Audit Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Schema Markup Validator](https://validator.schema.org/)

**Questions?** All the technical SEO is done. Focus on:
1. Creating that OG image
2. Setting up Search Console
3. Writing great content about your work
