'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight, Sparkles, Activity, FileText, Zap } from 'lucide-react'

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  target?: string // CSS selector for highlighting
}

const tourSteps: TourStep[] = [
  {
    id: 'health-monitor',
    title: 'Live Health Monitor',
    description: 'Real-time project health tracking with predictive risk detection. Updates automatically as your project evolves.',
    icon: <Activity className="size-5" />,
  },
  {
    id: 'briefing-engine',
    title: 'Executive Briefing Engine',
    description: 'AI-generated stakeholder-specific briefings. Saves 15+ hours per week on status reports.',
    icon: <FileText className="size-5" />,
  },
  {
    id: 'mitigations',
    title: 'One-Click Mitigations',
    description: 'Instant risk mitigation actions. Execute with a single click - no PowerPoint needed.',
    icon: <Zap className="size-5" />,
  },
]

interface OnboardingTourProps {
  autoStart?: boolean
  onComplete?: () => void
}

export function OnboardingTour({ autoStart = false, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (autoStart && !completed) {
      const wasCompleted = localStorage.getItem('onboarding-tour-completed')
      if (wasCompleted !== 'true') {
        setCurrentStep(0)
      }
    }
  }, [autoStart, completed])

  const handleNext = () => {
    if (currentStep === null || currentStep >= tourSteps.length - 1) {
      handleComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setCurrentStep(null)
    setCompleted(true)
    localStorage.setItem('onboarding-tour-completed', 'true')
    onComplete?.()
  }

  const handleSkip = () => {
    handleComplete()
  }

  if (currentStep === null || completed) {
    return null
  }

  const step = tourSteps[currentStep]
  if (!step) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Tour Card */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md mx-4 pointer-events-auto">
        <Card className="border-2 shadow-2xl p-6 space-y-4 animate-slide-up">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              onClick={handleSkip}
              aria-label="Skip tour"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
            >
              Skip Tour
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

