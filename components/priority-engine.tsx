'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Zap, TrendingUp, Clock, ArrowRight } from 'lucide-react'

interface PriorityScore {
  impact: number // 0-100
  probability: number // 0-100
  urgency: number // days until critical
  score: number // composite
}

interface PriorityItem {
  id: string
  title: string
  description: string
  scores: PriorityScore
  category: 'vendor' | 'budget' | 'resource' | 'stakeholder'
  recommended_action: string
}

const prioritizedItems: PriorityItem[] = [
  {
    id: '1',
    title: 'Vendor Delivery Velocity Declining',
    description: 'ML model detected 40% slowdown over 3 phases. High probability of Phase 4 delay.',
    scores: { impact: 92, probability: 87, urgency: 14, score: 89 },
    category: 'vendor',
    recommended_action: 'Executive escalation'
  },
  {
    id: '2',
    title: 'Knowledge Concentration Risk',
    description: 'Jamie single point of failure on 14 critical tasks. Bus factor = 1.',
    scores: { impact: 88, probability: 65, urgency: 7, score: 82 },
    category: 'resource',
    recommended_action: 'Immediate knowledge transfer'
  },
  {
    id: '3',
    title: 'CFO Engagement Declining',
    description: 'Missed last 2 steering meetings. Budget approval authority at risk.',
    scores: { impact: 85, probability: 72, urgency: 21, score: 78 },
    category: 'stakeholder',
    recommended_action: 'One-on-one meeting'
  }
]

export function PriorityEngine() {
  return (
    <Card className="p-6 border-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-warning" />
            <h3 className="text-lg font-semibold">AI Priority Engine</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sorted by impact × probability × urgency
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          89% confidence
        </Badge>
      </div>

      <div className="space-y-3">
        {prioritizedItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border-2 bg-card hover:bg-accent/5 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-xs font-bold">
                    #{index + 1}
                  </Badge>
                  <h4 className="font-semibold">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="text-right space-y-1">
                <div className="text-2xl font-bold tabular-nums text-destructive">
                  {item.scores.score}
                </div>
                <div className="text-xs text-muted-foreground">priority</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Impact</div>
                <div className="font-semibold tabular-nums">{item.scores.impact}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Probability</div>
                <div className="font-semibold tabular-nums">{item.scores.probability}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Urgency</div>
                <div className="font-semibold tabular-nums flex items-center gap-1">
                  <Clock className="size-3" />
                  {item.scores.urgency}d
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50">
              <Button size="sm" className="gap-2 w-full">
                <TrendingUp className="size-4" />
                {item.recommended_action}
                <ArrowRight className="size-3 ml-auto" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
