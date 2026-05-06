/**
 * Case Study Component Registry
 *
 * This file exports all custom case study components with lazy loading.
 * Lazy loading reduces initial bundle size by ~200KB.
 *
 * When adding a new case study:
 * 1. Create a new component file in this directory
 * 2. Add it to the caseStudyComponents map with dynamic import
 * 3. Set the caseStudySlug in the admin panel to match the slug
 *
 * Note: Components are loaded on-demand when user opens a case study.
 */

import dynamic from 'next/dynamic'

// Lazy-loaded case study components
// These are only loaded when the user opens a specific case study
const ExampleCaseStudy = dynamic(() =>
  import('./ExampleCaseStudy').then(mod => ({ default: mod.ExampleCaseStudy }))
)

const CaseStudySematext = dynamic(() =>
  import('./CaseStudySematext').then(mod => ({ default: mod.CaseStudySematext }))
)

const CaseStudyKindbody = dynamic(() =>
  import('./CaseStudyKindbody').then(mod => ({ default: mod.CaseStudyKindbody }))
)

const CaseStudyBimify = dynamic(() =>
  import('./CaseStudyBimify').then(mod => ({ default: mod.CaseStudyBimify }))
)

// Map of slug -> lazy-loaded component
export const caseStudyComponents: Record<string, React.ComponentType<any>> = {
  "example": ExampleCaseStudy,
  "sematext": CaseStudySematext,
  "kindbody": CaseStudyKindbody,
  "bimify": CaseStudyBimify,
  // Add your custom case studies here:
  // "acme-corp": dynamic(() => import('./CaseStudyAcmeCorp').then(m => ({ default: m.CaseStudyAcmeCorp }))),
  // "tech-startup": dynamic(() => import('./CaseStudyTechStartup').then(m => ({ default: m.CaseStudyTechStartup }))),
}
