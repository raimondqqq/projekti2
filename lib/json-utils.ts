/**
 * Utility functions for parsing and stringifying JSON fields
 *
 * These functions handle JSON fields stored as strings in the database,
 * with fallback support for comma-separated strings.
 */

/**
 * Parse a JSON or comma-separated string field into an array
 *
 * @param field - The field to parse (can be JSON string or comma-separated)
 * @returns Array of strings, or empty array if field is null/undefined
 *
 * @example
 * ```typescript
 * parseJsonField('["UX Design", "UI Design"]') // => ['UX Design', 'UI Design']
 * parseJsonField('UX Design, UI Design')       // => ['UX Design', 'UI Design']
 * parseJsonField(null)                         // => []
 * ```
 */
export function parseJsonField(field: string | null | undefined): string[] {
  if (!field) return []

  try {
    const parsed = JSON.parse(field)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Fallback: treat as comma-separated string
    return field.split(',').map(s => s.trim()).filter(Boolean)
  }
}

/**
 * Parse JSON field and join with separator (for display purposes)
 *
 * @param field - The field to parse
 * @param separator - String to join array elements (default: ", ")
 * @returns Joined string, or empty string if field is null/undefined
 *
 * @example
 * ```typescript
 * parseJsonFieldAsString('["UX", "UI"]')      // => 'UX, UI'
 * parseJsonFieldAsString('["UX", "UI"]', ' · ') // => 'UX · UI'
 * ```
 */
export function parseJsonFieldAsString(
  field: string | null | undefined,
  separator: string = ', '
): string {
  return parseJsonField(field).join(separator)
}

/**
 * Convert an array to JSON string for database storage
 *
 * @param array - Array of strings to stringify
 * @returns JSON string representation
 *
 * @example
 * ```typescript
 * stringifyJsonField(['UX Design', 'UI Design'])
 * // => '["UX Design","UI Design"]'
 * ```
 */
export function stringifyJsonField(array: string[]): string {
  return JSON.stringify(array)
}

/**
 * Safely parse a JSON string with a fallback value
 *
 * @param json - JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @returns Parsed value or fallback
 *
 * @example
 * ```typescript
 * safeJsonParse('{"name": "John"}', {})    // => { name: 'John' }
 * safeJsonParse('invalid json', {})        // => {}
 * ```
 */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback

  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}
