'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { CommandPalette } from '@/components/command-palette'
import { FloatingContextPill } from '@/components/floating-context-pill'
import { IntelligenceFeed } from '@/components/intelligence-feed'
import { MissionControlHero } from '@/components/mission-control-hero'
import { ExecutiveBriefingEngine } from '@/components/executive-briefing-engine'
import { Button } from '@/components/ui/button'
import { Search, Activity } from 'lucide-react'

const IntelligenceFeedLazy = dynamic(
  () => import('@/components/intelligence-feed').then(mod => ({ default: mod.IntelligenceFeed })),
  { 
    loading: () => <FeedSkeleton />,
    ssr: false 
  }
)

const StreamingDiagnose = dynamic(
  () => import('@/components/streaming-diagnose').then(mod => ({ default: mod.StreamingDiagnose })),
  { ssr: false }
)

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-xl" />
      ))}
    </div>
  )
}

export default function VantagePage() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [diagnoseOpen, setDiagnoseOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(true)
      }
      if (e.key === 'd' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault()
        setDiagnoseOpen(true)
      }
      if (e.key === 'Escape') {
        setCommandOpen(false)
        setDiagnoseOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <FloatingContextPill />
      
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {diagnoseOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card border-2 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-auto p-8 animate-scale-in contain-paint relative">
            <StreamingDiagnose />
            <button
              onClick={() => setDiagnoseOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
              aria-label="Close diagnose"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="space-y-12">
          {/* Hero section */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-display">
                Replace $10M in Consulting Fees
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Transformation office-level governance, risk management, and proactive remediation at 1/10th the cost.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                size="lg"
                className="gap-2 h-12"
                onClick={() => setCommandOpen(true)}
              >
                <Search className="size-4" />
                <span>Command</span>
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs bg-primary-foreground/20 rounded">
                  ⌘K
                </kbd>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="gap-2 h-12"
                onClick={() => setDiagnoseOpen(true)}
              >
                <Activity className="size-4" />
                <span>Deep Scan</span>
              </Button>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
            <MissionControlHero />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <ExecutiveBriefingEngine />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
            <div className="space-y-6">
              <h2 className="text-title">Intelligence Feed</h2>
              <IntelligenceFeedLazy selectedIndex={0} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
