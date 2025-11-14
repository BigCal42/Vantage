'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Sparkles, Info } from 'lucide-react'

interface DemoBannerProps {
  onDismiss?: () => void
}

export function DemoBanner({ onDismiss }: DemoBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if banner was previously dismissed
    const wasDismissed = localStorage.getItem('demo-banner-dismissed')
    if (wasDismissed === 'true') {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('demo-banner-dismissed', 'true')
    onDismiss?.()
  }

  if (dismissed) {
    return null
  }

  return (
    <Card className="border-primary/30 bg-primary/5 p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Info className="size-5 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Sparkles className="size-3" />
              Demo Mode
            </Badge>
            <span className="text-sm font-medium">You're viewing demo data</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a demonstration of Vantage Mission Control with sample project data. 
            Connect your Supabase project to see real-time data from your transformations.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleDismiss}
          aria-label="Dismiss demo banner"
        >
          <X className="size-4" />
        </Button>
      </div>
    </Card>
  )
}

