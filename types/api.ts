/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = any> {
  data: T
  message?: string
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  error: string
  message?: string
  statusCode?: number
}

/**
 * API response type (union of success and error)
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Reorder request body
 */
export interface ReorderRequest {
  id: string
  order: number
}
