import { useEffect, useCallback } from 'react'

type ShortcutConfig = {
  key: string
  meta?: boolean
  shift?: boolean
  ctrl?: boolean
  alt?: boolean
  handler: () => void
  description: string
}

export function useKeyboardShortcut(config: ShortcutConfig) {
  const { key, meta, shift, ctrl, alt, handler } = config

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const metaMatch = meta ? (e.metaKey || e.ctrlKey) : true
      const shiftMatch = shift ? e.shiftKey : !e.shiftKey
      const ctrlMatch = ctrl ? e.ctrlKey : true
      const altMatch = alt ? e.altKey : true

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        metaMatch &&
        shiftMatch &&
        ctrlMatch &&
        altMatch
      ) {
        e.preventDefault()
        handler()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, meta, shift, ctrl, alt, handler])
}

// Power user shortcuts
export const SHORTCUTS = {
  COMMAND_PALETTE: { key: 'k', meta: true, description: 'Open command palette' },
  DIAGNOSE: { key: 'd', meta: true, shift: true, description: 'Run diagnosis' },
  NEXT_ITEM: { key: 'j', description: 'Next item' },
  PREV_ITEM: { key: 'k', description: 'Previous item' },
  TOGGLE_AGENTS: { key: 'a', meta: true, description: 'Toggle agents panel' },
  FOCUS_CHAT: { key: '/', description: 'Focus chat' },
  ESCAPE: { key: 'Escape', description: 'Close modal' },
}

export function useNavigationShortcuts(
  onNext: () => void,
  onPrev: () => void
) {
  useKeyboardShortcut({ ...SHORTCUTS.NEXT_ITEM, handler: onNext })
  useKeyboardShortcut({ ...SHORTCUTS.PREV_ITEM, handler: onPrev })
}
