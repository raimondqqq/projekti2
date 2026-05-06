# Custom Case Studies

This directory contains custom React components for project case studies. Each project can have a fully customized layout and content while the basic project information (title, years, services, etc.) is managed through the CMS.

## How It Works

1. **Create a Custom Component**: Copy `ExampleCaseStudy.tsx` and customize it for your project
2. **Register the Component**: Add it to `index.ts` with a unique slug
3. **Link in CMS**: Set the `caseStudySlug` field in the admin panel to match your slug

## Creating a New Case Study

### Step 1: Create the Component

```bash
# Copy the example file
cp src/components/case-studies/ExampleCaseStudy.tsx src/components/case-studies/AcmeCorpCaseStudy.tsx
```

Then customize the content, layout, and styling in your new file.

### Step 2: Register in index.ts

```typescript
import { AcmeCorpCaseStudy } from "./AcmeCorpCaseStudy"

export const caseStudyComponents: Record<string, React.ComponentType<any>> = {
  "example": ExampleCaseStudy,
  "acme-corp": AcmeCorpCaseStudy,  // Add your component here
}
```

### Step 3: Set the Slug in Admin Panel

1. Go to `/admin/projects`
2. Edit your project
3. Set "Custom Case Study Slug" to `acme-corp`
4. Uncheck "Coming Soon" if it's checked
5. Save

## Component Props

Each custom case study component receives a `project` prop with all project data:

```typescript
interface Project {
  id: string
  name: string
  client: string
  summary?: string | null
  startYear: number
  endYear?: number | null
  heroImage: string
  deviceMockup: string
  deviceType: string
  layoutVariant: string
  comingSoon: boolean
  caseStudy?: string | null
  caseStudySlug?: string | null
  services?: string  // JSON string array
  industry?: string  // JSON string array
}
```

## Fallback Behavior

The system uses this priority:

1. **Custom Component** (if `caseStudySlug` is set and component exists)
2. **Markdown Content** (if `caseStudy` field has content)
3. **Coming Soon** (if `comingSoon` is true or no content exists)

## Tips

- Use the `project` prop to access all CMS-managed data
- Parse `services` and `industry` fields using `JSON.parse()`
- You have full control over layout, styling, and animations
- Import any components you need (Image, custom UI components, etc.)
- Each case study can be completely unique!
