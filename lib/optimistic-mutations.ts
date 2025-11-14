import { useState, useCallback } from 'react'
import { toast } from 'sonner'

type MutationStatus = 'idle' | 'pending' | 'success' | 'error'

export type OptimisticUpdate<T> = {
  id: string
  data: T
  status: MutationStatus
  timestamp: number
  rollback?: () => void
}

export function useOptimisticMutation<T>() {
  const [mutations, setMutations] = useState<Map<string, OptimisticUpdate<T>>>(new Map())

  const mutate = useCallback(async (
    id: string,
    data: T,
    asyncFn: () => Promise<void>,
    rollback: () => void
  ) => {
    // Optimistic update
    setMutations(prev => {
      const next = new Map(prev)
      next.set(id, {
        id,
        data,
        status: 'pending',
        timestamp: Date.now(),
        rollback
      })
      return next
    })

    try {
      await asyncFn()
      
      // Success - mark as complete
      setMutations(prev => {
        const next = new Map(prev)
        const mutation = next.get(id)
        if (mutation) {
          next.set(id, { ...mutation, status: 'success' })
        }
        return next
      })

      // Remove after animation
      setTimeout(() => {
        setMutations(prev => {
          const next = new Map(prev)
          next.delete(id)
          return next
        })
      }, 1000)

    } catch (error) {
      // Rollback on error
      rollback()
      setMutations(prev => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
      
      toast.error('Action failed', {
        description: 'Your change couldn\'t be saved. Please try again.',
        action: {
          label: 'Retry',
          onClick: () => mutate(id, data, asyncFn, rollback)
        }
      })
    }
  }, [])

  return { mutations, mutate }
}
