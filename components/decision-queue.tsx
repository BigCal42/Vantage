'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Target, Clock, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react'

interface Decision {
  id: string
  title: string
  context: string
  options: { label: string; impact: string }[]
  impact: 'high' | 'medium' | 'low'
  urgency: string
  recommendation: string
}

const decisions: Decision[] = [
  {
    id: '1',
    title: 'Hire contractors now or delay Phase 3?',
    context: 'Q3 resource gap requires 2 additional developers. Requisitions take 3 weeks to fill.',
    options: [
      { label: 'Hire 2 contractors ($90K)', impact: 'Start Phase 3 on time, higher cost' },
      { label: 'Delay Phase 3 by 3 weeks', impact: 'Save $90K, push go-live date' }
    ],
    impact: 'high',
    urgency: 'Must decide by Friday',
    recommendation: 'Option A - ROI analysis shows $90K investment prevents $400K delay costs'
  },
  {
    id: '2',
    title: 'Vendor integration approach?',
    context: 'Vendor offers pre-built integration ($50K) or custom development (in-house, 6 weeks).',
    options: [
      { label: 'Buy vendor integration', impact: 'Faster but vendor lock-in' },
      { label: 'Build custom', impact: 'More control but higher risk' }
    ],
    impact: 'high',
    urgency: 'Blocks Phase 4 kickoff',
    recommendation: 'Option A - Pre-built reduces risk, custom dev has failed in 3 similar projects'
  },
  {
    id: '3',
    title: 'Training timeline?',
    context: 'End-user training can start early (during build) or late (after testing).',
    options: [
      { label: 'Early training', impact: 'Higher adoption but may need retraining' },
      { label: 'Late training', impact: 'Accurate but rushed adoption' }
    ],
    impact: 'medium',
    urgency: 'Recommend decision in 2 weeks',
    recommendation: 'Option A - Early training shows 40% better adoption in healthcare projects'
  }
]

export function DecisionQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="size-5 text-warning" />
          Decision Queue
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Next 10 decisions prioritized by impact × urgency
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {decisions.map((decision, i) => (
          <Card key={decision.id} className="p-5 border-2 hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-muted font-mono">
                      #{i + 1}
                    </Badge>
                    <h4 className="font-semibold">{decision.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {decision.context}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    decision.impact === 'high' 
                      ? 'bg-destructive/10 text-destructive border-destructive/30'
                      : 'bg-warning/10 text-warning border-warning/30'
                  }
                >
                  {decision.impact} impact
                </Badge>
              </div>

              <div className="space-y-2">
                {decision.options.map((option, j) => (
                  <div 
                    key={j}
                    className="p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="bg-background mt-0.5 font-mono">
                        {String.fromCharCode(65 + j)}
                      </Badge>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-warning" />
                  <span className="text-warning font-medium">{decision.urgency}</span>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <TrendingUp className="size-4 text-primary mt-0.5" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium">AI Recommendation: </span>
                    <span className="text-muted-foreground">{decision.recommendation}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  Decide Now
                  <ArrowRight className="size-3" />
                </Button>
                <Button variant="outline" className="flex-1">
                  Need More Data
                </Button>
                <Button variant="ghost">
                  Defer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
