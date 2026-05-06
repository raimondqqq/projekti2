import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

/**
 * List of email addresses authorized to access admin routes
 * Add new admin emails here
 */
export const AUTHORIZED_ADMIN_EMAILS = [
  "haris.ovcina@gmail.com"
] as const

/**
 * Allow bypassing authentication in development mode
 * Set BYPASS_AUTH=true in .env.local for local development
 */
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

/**
 * Middleware to require admin authentication for API routes
 *
 * @param req - Next.js request object
 * @returns null if authorized, NextResponse with 401 error if unauthorized
 *
 * @example
 * ```typescript
 * export async function POST(req: NextRequest) {
 *   const authError = await requireAdmin(req)
 *   if (authError) return authError
 *
 *   // ... your business logic here
 * }
 * ```
 */
export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  // Bypass auth check in development mode if enabled
  if (BYPASS_AUTH_IN_DEV) {
    return null
  }

  // Get the current session
  const session = await auth()

  // Check if user is authenticated and authorized
  if (!session?.user?.email || !AUTHORIZED_ADMIN_EMAILS.includes(session.user.email as any)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // User is authorized
  return null
}

/**
 * Higher-order function to wrap API route handlers with authentication
 *
 * @param handler - The API route handler function
 * @returns Wrapped handler with authentication check
 *
 * @example
 * ```typescript
 * export const POST = withAuth(async (req: NextRequest) => {
 *   // Auth is already checked, just write business logic
 *   const body = await req.json()
 *   // ... rest of logic
 * })
 * ```
 */
export function withAuth<T extends any[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    const authError = await requireAdmin(req)
    if (authError) return authError

    return handler(req, ...args)
  }
}

/**
 * Check if a user session is from an authorized admin
 * Use this for component-level auth checks (e.g., in layouts)
 *
 * @param email - User email from session
 * @returns true if user is authorized admin, false otherwise
 */
export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return AUTHORIZED_ADMIN_EMAILS.includes(email as any)
}
