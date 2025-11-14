'use client'

import { Sparkles, AlertTriangle, Command } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ContextBar() {
  return (
    <div className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-8 px-8">
        {/* Left: Current Context */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-success animate-pulse" />
            <span className="font-semibold">Mercy Valley Health EHR</span>
          </div>
          <div className="h-4 w-px bg-border/60" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>87% Ready</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="gap-2 text-warning hover:bg-warning/10 hover:text-warning"
          >
            <AlertTriangle className="size-4" />
            2 Blockers
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="gap-2"
          >
            <Sparkles className="size-4 text-primary" />
            AI Insights
            <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary border-0">
              3
            </Badge>
          </Button>

          <div className="h-4 w-px bg-border/60" />
          
          <Button size="sm" className="gap-2 font-semibold">
            <Command className="size-4" />
            Diagnose Project
          </Button>
        </div>
      </div>
    </div>
  )
}
