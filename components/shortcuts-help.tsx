'use client'

import { useState } from 'react'
import { SHORTCUTS } from '@/lib/keyboard-shortcuts'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Keyboard } from 'lucide-react'

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Keyboard className="h-4 w-4" />
        Shortcuts
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {Object.entries(SHORTCUTS).map(([name, config]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {config.description}
                </span>
                <div className="flex items-center gap-1">
                  {config.meta && (
                    <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">⌘</kbd>
                  )}
                  {config.shift && (
                    <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">⇧</kbd>
                  )}
                  <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                    {config.key.toUpperCase()}
                  </kbd>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
