export type PresenceUser = {
  id: string
  name: string
  avatar?: string
  color: string
  cursor?: { x: number; y: number }
  lastSeen: number
  currentView?: string
}

export type PresenceState = {
  users: Map<string, PresenceUser>
  localUser: PresenceUser
}

// Presence hook for real-time collaboration
import { useEffect, useState } from 'react'

const COLORS = [
  'hsl(210, 100%, 50%)', // blue
  'hsl(140, 60%, 45%)',  // green
  'hsl(280, 60%, 55%)',  // purple
  'hsl(30, 90%, 55%)',   // orange
  'hsl(340, 75%, 55%)',  // pink
]

export function usePresence(projectId: string) {
  const [presence, setPresence] = useState<PresenceState>({
    users: new Map(),
    localUser: {
      id: 'local-user',
      name: 'You',
      color: COLORS[0],
      lastSeen: Date.now(),
    }
  })

  useEffect(() => {
    // Initialize local user with random color
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const localUser: PresenceUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: 'Anonymous',
      color,
      lastSeen: Date.now(),
    }

    setPresence(prev => ({ ...prev, localUser }))

    // Simulate presence updates (in production, use Supabase Realtime)
    const interval = setInterval(() => {
      setPresence(prev => {
        const users = new Map(prev.users)
        
        // Randomly add/remove simulated users
        if (Math.random() > 0.7 && users.size < 3) {
          const id = `user-${Math.random().toString(36).substr(2, 9)}`
          users.set(id, {
            id,
            name: ['Alex', 'Jordan', 'Taylor', 'Morgan'][Math.floor(Math.random() * 4)],
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            lastSeen: Date.now(),
            currentView: ['feed', 'decisions', 'tensions'][Math.floor(Math.random() * 3)]
          })
        }

        // Remove stale users
        users.forEach((user, id) => {
          if (Date.now() - user.lastSeen > 30000) {
            users.delete(id)
          }
        })

        return { ...prev, users }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [projectId])

  const updateCursor = (x: number, y: number) => {
    setPresence(prev => ({
      ...prev,
      localUser: { ...prev.localUser, cursor: { x, y }, lastSeen: Date.now() }
    }))
  }

  const updateView = (view: string) => {
    setPresence(prev => ({
      ...prev,
      localUser: { ...prev.localUser, currentView: view, lastSeen: Date.now() }
    }))
  }

  return { presence, updateCursor, updateView }
}
