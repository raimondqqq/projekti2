/**
 * Admin Form Hook
 *
 * Shared logic for admin CRUD forms (Project & Team).
 * Handles form submission, error handling, and navigation.
 *
 * Usage:
 * const { isSubmitting, onSubmit } = useAdminForm({
 *   endpoint: '/api/admin/projects',
 *   itemId: project?.id,
 *   mode: 'create',
 *   onSuccess: () => console.log('Saved!'),
 * })
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface UseAdminFormOptions<T> {
  /**
   * API endpoint for create/update operations
   * Examples: '/api/admin/projects', '/api/admin/team'
   */
  endpoint: string

  /**
   * Item ID for edit mode (undefined for create mode)
   */
  itemId?: string | number

  /**
   * Form mode: 'create' or 'edit'
   */
  mode: 'create' | 'edit'

  /**
   * Transform form data before sending to API
   * Useful for converting types or formatting data
   */
  transformData?: (data: T) => any

  /**
   * Success callback after successful submission
   */
  onSuccess?: () => void

  /**
   * Error callback if submission fails
   */
  onError?: (error: Error) => void

  /**
   * Redirect path after successful submission
   * Defaults to '/admin'
   */
  redirectTo?: string

  /**
   * Success toast message
   * Defaults to 'Saved successfully'
   */
  successMessage?: string

  /**
   * Error toast message
   * Defaults to 'Failed to save'
   */
  errorMessage?: string
}

interface UseAdminFormReturn<T> {
  /**
   * Whether the form is currently submitting
   */
  isSubmitting: boolean

  /**
   * Form submission handler
   * Call this from react-hook-form's handleSubmit
   */
  onSubmit: (data: T) => Promise<void>
}

/**
 * Hook for admin form submissions
 *
 * Handles the common pattern of:
 * 1. Determine endpoint (create vs edit)
 * 2. Make API request
 * 3. Handle success/error
 * 4. Show toast notifications
 * 5. Navigate away
 */
export function useAdminForm<T = any>(
  options: UseAdminFormOptions<T>
): UseAdminFormReturn<T> {
  const {
    endpoint,
    itemId,
    mode,
    transformData,
    onSuccess,
    onError,
    redirectTo = '/admin',
    successMessage = 'Saved successfully',
    errorMessage = 'Failed to save',
  } = options

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: T) => {
    try {
      setIsSubmitting(true)

      // Transform data if transformer provided
      const payload = transformData ? transformData(data) : data

      // Determine URL and method based on mode
      const url = mode === 'create' ? endpoint : `${endpoint}/${itemId}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      // Make API request
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorMessage)
      }

      // Success handling
      toast.success(successMessage)
      onSuccess?.()
      router.push(redirectTo)
      router.refresh()
    } catch (error) {
      console.error('Form submission error:', error)
      const message = error instanceof Error ? error.message : errorMessage
      toast.error(message)
      onError?.(error instanceof Error ? error : new Error(String(error)))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    onSubmit,
  }
}

/**
 * Example usage with ProjectForm:
 *
 * const { isSubmitting, onSubmit } = useAdminForm({
 *   endpoint: '/api/admin/projects',
 *   itemId: project?.id,
 *   mode,
 *   transformData: (data) => ({
 *     ...data,
 *     startYear: parseInt(data.startYear),
 *     services: data.services.split(','),
 *     industry: data.industry.split(','),
 *   }),
 * })
 *
 * const form = useForm({
 *   resolver: zodResolver(schema),
 * })
 *
 * return (
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     {/* form fields *\/}
 *     <Button type="submit" disabled={isSubmitting}>
 *       {isSubmitting ? 'Saving...' : 'Save'}
 *     </Button>
 *   </form>
 * )
 */
