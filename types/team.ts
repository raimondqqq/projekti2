import { TeamMember as PrismaTeamMember } from '@prisma/client'

/**
 * TeamMember type - Derived from Prisma schema
 * This is the source of truth for all team member types
 */
export type TeamMember = PrismaTeamMember

/**
 * Team member input type for API requests (create/update)
 * Used when receiving data from forms or API clients
 */
export interface TeamMemberInput {
  name: string
  role: string
  babyPhoto: string
  adultPhoto: string
  email?: string | null
  linkedin?: string | null
  cvLink?: string | null
}

/**
 * Team member output type for API responses
 * Currently identical to TeamMember, but kept for future extensibility
 */
export interface TeamMemberOutput extends TeamMember {}
