import { Project as PrismaProject } from '@prisma/client'

/**
 * Project type - Derived from Prisma schema
 * This is the source of truth for all project-related types
 */
export type Project = PrismaProject

/**
 * Project input type for API requests (create/update)
 * Used when receiving data from forms or API clients
 */
export interface ProjectInput {
  name: string
  client: string
  summary?: string | null
  startYear: number
  endYear?: number | null
  services: string[]  // Array format for easier manipulation
  industry: string[]  // Array format for easier manipulation
  website?: string | null
  heroImage: string
  deviceMockup: string
  deviceType: 'laptop' | 'mobile'
  layoutVariant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  caseStudy?: string | null
  caseStudySlug?: string | null
  comingSoon: boolean
}

/**
 * Project output type for API responses
 * Includes parsed array fields for easier consumption
 */
export interface ProjectOutput extends Project {
  servicesArray?: string[]
  industryArray?: string[]
}

/**
 * Props for case study components
 */
export interface CaseStudyProps {
  project: Project
}

/**
 * Device type literal type
 */
export type DeviceType = 'laptop' | 'mobile'

/**
 * Layout variant literal type
 */
export type LayoutVariant = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
