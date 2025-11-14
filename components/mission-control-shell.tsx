'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { CommandPalette } from '@/components/command-palette'
import { FloatingContextPill } from '@/components/floating-context-pill'
import { MissionControlHero } from '@/components/mission-control-hero'
import { ExecutiveBriefingEngine, StakeholderProfile } from '@/components/executive-briefing-engine'
import { LiveHealthMonitor } from '@/components/live-health-monitor'
import { DemoBanner } from '@/components/demo-banner'
import { OnboardingTour } from '@/components/onboarding-tour'
import { Button } from '@/components/ui/button'
import { layoutTokens, spacingTokens, typographyTokens } from '@/lib/design-system'
import type { ProjectRecord, HealthMetricRecord } from '@/lib/data/projects'
import { Search, Activity, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const IntelligenceFeedLazy = dynamic(
  () => import('@/components/intelligence-feed').then(mod => ({ default: mod.IntelligenceFeed })),
  { ssr: false }
)

const StreamingDiagnose = dynamic(
  () => import('@/components/streaming-diagnose').then(mod => ({ default: mod.StreamingDiagnose })),
  { ssr: false }
)

interface MissionControlShellProps {
  project: ProjectRecord | null
  healthMetrics: HealthMetricRecord[]
  stakeholders: StakeholderProfile[]
}

export function MissionControlShell({ project, healthMetrics, stakeholders }: MissionControlShellProps) {
  const [commandOpen, setCommandOpen] = useState(false)
  const [diagnoseOpen, setDiagnoseOpen] = useState(false)
  const [showDemoBanner, setShowDemoBanner] = useState(!project)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleTryDemo = async () => {
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to seed demo data')
      }

      const result = await response.json()
      toast.success('Demo project created!', {
        description: `Seeded ${result.data.healthMetrics} metrics, ${result.data.risks} risks, and ${result.data.stakeholders} stakeholders.`,
      })

      // Reload page to show new data
      window.location.reload()
    } catch (error) {
      toast.error('Failed to create demo project', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setCommandOpen(true)
      }
      if (event.key === 'd' && event.shiftKey && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setDiagnoseOpen(true)
      }
      if (event.key === 'Escape') {
        setCommandOpen(false)
        setDiagnoseOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const projectName = project?.name ?? 'Transformation Portfolio'

  return (
    <div className="min-h-screen bg-background">
      <FloatingContextPill />
      {showDemoBanner && <DemoBanner onDismiss={() => setShowDemoBanner(false)} />}
      <OnboardingTour autoStart={showOnboarding} onComplete={() => setShowOnboarding(false)} />

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {diagnoseOpen && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Deep scan diagnostics"
        >
          <div className="bg-card border-2 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-auto p-8 animate-scale-in contain-paint relative">
            <StreamingDiagnose />
            <button
              onClick={() => setDiagnoseOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close diagnose modal"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className={`${layoutTokens.container} ${spacingTokens.sectionY}`}>
        <div className={layoutTokens.stackXl}>
          <header className="space-y-6" aria-labelledby="mission-control-heading">
            <div className="space-y-4 max-w-3xl">
              <h1 id="mission-control-heading" className={typographyTokens.heroHeading}>
                {projectName}
              </h1>
              <p className={typographyTokens.bodyMuted}>
                Transformation office-level governance, risk management, and proactive remediation at 1/10th the cost.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!project && (
                <Button
                  size="lg"
                  className="gap-2 h-12"
                  onClick={handleTryDemo}
                >
                  <Sparkles className="size-4" />
                  <span>Try Demo</span>
                </Button>
              )}
              <Button
                size="lg"
                className="gap-2 h-12"
                onClick={() => setCommandOpen(true)}
                aria-expanded={commandOpen}
                aria-controls="command-palette"
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
                aria-expanded={diagnoseOpen}
                aria-controls="diagnose-panel"
              >
                <Activity className="size-4" />
                <span>Deep Scan</span>
                <kbd className="hidden sm:inline-block ml-2 px-2 py-1 text-xs bg-muted rounded">
                  ⌘⇧D
                </kbd>
              </Button>
            </div>
          </header>

          <section aria-label="Mission control metrics" className="space-y-8">
            <MissionControlHero
              projectName={projectName}
              baselineHealthScore={project?.health_score ?? undefined}
              timelineConfidence={project?.timeline_confidence ?? undefined}
            />
            <LiveHealthMonitor healthMetrics={healthMetrics} />
          </section>

          <section aria-label="Executive briefing tool" className="space-y-6">
            <h2 className={typographyTokens.sectionHeading}>Executive Briefing Engine</h2>
            <ExecutiveBriefingEngine stakeholders={stakeholders} />
          </section>

          <section aria-label="Intelligence feed" className="space-y-6">
            <h2 className={typographyTokens.sectionHeading}>Intelligence Feed</h2>
            <IntelligenceFeedLazy selectedIndex={0} />
          </section>
        </div>
      </main>
    </div>
  )
}

