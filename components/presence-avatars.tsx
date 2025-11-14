'use client'

import { usePresence } from '@/lib/presence'
import { motion, AnimatePresence } from 'framer-motion'

export function PresenceAvatars({ projectId }: { projectId: string }) {
  const { presence } = usePresence(projectId)

  return (
    <div className="flex items-center gap-1">
      <AnimatePresence mode="popLayout">
        {Array.from(presence.users.values()).map((user) => (
          <motion.div
            key={user.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative"
          >
            <div
              className="h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-white"
              style={{ backgroundColor: user.color }}
              title={`${user.name} viewing ${user.currentView || 'project'}`}
            >
              {user.name.charAt(0)}
            </div>
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background"
              style={{ backgroundColor: user.color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {presence.users.size > 0 && (
        <span className="ml-2 text-xs text-muted-foreground">
          {presence.users.size} {presence.users.size === 1 ? 'person' : 'people'} viewing
        </span>
      )}
    </div>
  )
}
