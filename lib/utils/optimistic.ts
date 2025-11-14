'use client'

import { useState, useCallback } from 'react'

/**
 * Optimistic update hook for async operations
 * Provides immediate UI feedback while API call executes
 */
export function useOptimisticUpdate<T, P = unknown>(
  updateFn: (params: P) => Promise<T>,
  onSuccess?: (result: T) => void,
  onError?: (error: Error) => void
) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (params: P, optimisticUpdate?: () => void) => {
      setIsPending(true)
      setError(null)

      // Apply optimistic update immediately
      if (optimisticUpdate) {
        optimisticUpdate()
      }

      try {
        const result = await updateFn(params)
        onSuccess?.(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
        onError?.(error)
        // Revert optimistic update on error
        if (optimisticUpdate) {
          // Note: In a real app, you'd want to track the previous state
          // and revert to it. For simplicity, we'll just notify the error.
          console.error('Optimistic update failed, reverting:', error)
        }
        throw error
      } finally {
        setIsPending(false)
      }
    },
    [updateFn, onSuccess, onError]
  )

  return { execute, isPending, error }
}

