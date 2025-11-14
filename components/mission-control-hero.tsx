'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

interface MissionControlHeroProps {
  projectName?: string
  baselineHealthScore?: number
  timelineConfidence?: number
}

export function MissionControlHero({
  projectName,
  baselineHealthScore = 85,
  timelineConfidence = 87,
}: MissionControlHeroProps) {
  const [healthScore, setHealthScore] = useState(baselineHealthScore)

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = (Math.random() - 0.5) * 0.3
        const target = baselineHealthScore
        const eased = prev + (target - prev) * 0.05 + change
        return Math.max(0, Math.min(100, eased))
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [baselineHealthScore])

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-success'
    if (score >= 70) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <Card className="border-2 shadow-lg overflow-hidden relative contain-paint">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/3 pointer-events-none" />

      <div className="p-8 space-y-8 relative">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border" aria-live="polite">
            <div className="size-1.5 rounded-full bg-success animate-health-pulse" />
            <span className="text-small text-muted-foreground font-medium">
              Live • {projectName ?? 'Portfolio Health'}
            </span>
          </div>

          <div className="space-y-3">
            <div
              className={`text-[120px] leading-none font-semibold tabular transition-colors duration-500 ${getHealthColor(healthScore)}`}
              style={{ willChange: 'color' }}
            >
              {Math.round(healthScore)}
            </div>
            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-success/10 text-success border-success/30 text-base px-4 py-1.5">
                {healthScore >= 85 ? 'Excellent Health' : healthScore >= 70 ? 'Healthy' : 'Needs Attention'}
              </Badge>
              <div className="flex items-center gap-1.5 text-success">
                <TrendingUp className="size-4" />
                <span className="text-small font-medium">Tracking {projectName ?? 'portfolio'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            label="Savings vs Consultants"
            value="$847K"
            change="+$12K this week"
            positive
          />
          <MetricCard
            label="AI Actions Taken"
            value="23"
            change="5 in last 24h"
            positive
          />
          <MetricCard
            label="Go-Live Confidence"
            value={`${Math.round(timelineConfidence)}%`}
            change="On-track milestone"
            positive
          />
        </div>

        <div className="pt-4">
          <Button size="lg" className="w-full gap-3 h-12 group">
            <Sparkles className="size-4 transition-transform group-hover:rotate-12 duration-300" />
            <span className="text-base">Review AI Recommendations</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 duration-300" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function MetricCard({
  label,
  value,
  change,
  positive,
}: {
  label: string
  value: string
  change: string
  positive: boolean
}) {
  return (
    <div className="p-4 space-y-3 rounded-xl border bg-card hover:border-primary/30 transition-all duration-300 contain-paint">
      <div className="text-small text-muted-foreground font-medium">
        {label}
      </div>
      <div className={`text-3xl font-semibold tabular ${positive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {value}
      </div>
      <div className="text-small text-success font-medium">
        {change}
      </div>
    </div>
  )
}
