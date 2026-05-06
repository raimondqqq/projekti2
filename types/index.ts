/**
 * Centralized type definitions for the Theoria application
 *
 * All shared types should be imported from this module to ensure consistency
 * across the codebase.
 *
 * Usage:
 * ```typescript
 * import { Project, TeamMember, ProjectInput } from '@/types'
 * ```
 */

// Project types
export type {
  Project,
  ProjectInput,
  ProjectOutput,
  CaseStudyProps,
  DeviceType,
  LayoutVariant,
} from './project'

// Team types
export type {
  TeamMember,
  TeamMemberInput,
  TeamMemberOutput,
} from './team'

// API types
export type {
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  ReorderRequest,
} from './api'
